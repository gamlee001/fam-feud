const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { sessions } = require("./questions");
const { authenticate } = require("./users");

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// In production, serve the built React client.
const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));

// ----- Authoritative game state -----
// The server is the single source of truth. The host mutates it; every guest
// screen is just a live mirror of it, tailored so unrevealed answers stay blank.
const game = {
  sessionIndex: 0,
  questionIndex: 0,
  revealed: [], // bool per answer of the current question
};

function currentQuestion() {
  return sessions[game.sessionIndex].questions[game.questionIndex];
}

function resetRevealedForQuestion() {
  game.revealed = currentQuestion().answers.map(() => false);
}
resetRevealedForQuestion();

// Builds the state to send to a client. The host always sees every answer and
// its points; a guest only sees an answer once the host has revealed it (blank
// card otherwise) — like a quiz show audience who only learns the answer when
// the host opens it.
function buildState(role) {
  const session = sessions[game.sessionIndex];
  const question = currentQuestion();
  const isHost = role === "host";

  const answers = question.answers.map((a, i) => {
    const shown = isHost || game.revealed[i];
    return {
      index: i,
      revealed: !!game.revealed[i],
      text: shown ? a.text : null,
      points: shown ? a.points : null,
    };
  });

  // Points on the board so far (only the revealed answers count). Same for both
  // roles, since it is derived purely from what has been revealed.
  const revealedPoints = question.answers.reduce(
    (sum, a, i) => sum + (game.revealed[i] ? a.points : 0),
    0
  );

  return {
    role,
    sessionLabel: session.label,
    sessionIndex: game.sessionIndex,
    sessionCount: sessions.length,
    questionIndex: game.questionIndex,
    questionCount: session.questions.length,
    questionText: question.text,
    answers,
    answerCount: question.answers.length,
    revealedCount: game.revealed.filter(Boolean).length,
    revealedPoints,
  };
}

// Push fresh state to everyone, tailored to each socket's role.
function broadcastState() {
  for (const [, socket] of io.of("/").sockets) {
    const role = socket.data.role;
    if (!role) continue;
    socket.emit("state", buildState(role));
  }
}

function goToQuestion(sessionIndex, questionIndex) {
  game.sessionIndex = Math.max(0, Math.min(sessions.length - 1, sessionIndex));
  const qCount = sessions[game.sessionIndex].questions.length;
  game.questionIndex = Math.max(0, Math.min(qCount - 1, questionIndex));
  resetRevealedForQuestion();
}

io.on("connection", (socket) => {
  socket.on("login", ({ username, password }, ack) => {
    const user = authenticate(username, password);
    if (!user) {
      if (ack) ack({ ok: false, error: "Invalid username or password." });
      return;
    }
    socket.data.role = user.role;
    socket.data.name = user.name;
    if (ack) ack({ ok: true, role: user.role, name: user.name });
    socket.emit("state", buildState(user.role));
  });

  // ----- Host-only controls -----
  // Every mutation is gated on the host role on the server, so a guest can never
  // reveal an answer or change the question even if they craft their own events.
  function hostOnly(fn) {
    return (...args) => {
      if (socket.data.role !== "host") return;
      fn(...args);
    };
  }

  // Toggle a single card open/closed. When the host opens it, the answer pops
  // onto every guest screen; closing it hides it again.
  socket.on(
    "toggle-answer",
    hostOnly((index) => {
      if (index < 0 || index >= game.revealed.length) return;
      game.revealed[index] = !game.revealed[index];
      // Only celebrate when a card is opened, not when it is hidden again.
      if (game.revealed[index]) io.emit("reveal-sound");
      broadcastState();
    })
  );

  // Contestant gave an answer that isn't on the board. This changes no game
  // state — it's a transient cue: every screen buzzes and flashes a red ✗ over
  // the still-hidden cards (those answers are still valid, just not this guess).
  socket.on(
    "wrong-answer",
    hostOnly(() => {
      io.emit("wrong-answer");
    })
  );

  socket.on(
    "reveal-all",
    hostOnly(() => {
      game.revealed = game.revealed.map(() => true);
      broadcastState();
    })
  );

  socket.on(
    "hide-all",
    hostOnly(() => {
      resetRevealedForQuestion();
      broadcastState();
    })
  );

  socket.on(
    "next-question",
    hostOnly(() => {
      const qCount = sessions[game.sessionIndex].questions.length;
      if (game.questionIndex < qCount - 1) {
        goToQuestion(game.sessionIndex, game.questionIndex + 1);
      } else if (game.sessionIndex < sessions.length - 1) {
        goToQuestion(game.sessionIndex + 1, 0);
      }
      broadcastState();
    })
  );

  socket.on(
    "prev-question",
    hostOnly(() => {
      if (game.questionIndex > 0) {
        goToQuestion(game.sessionIndex, game.questionIndex - 1);
      } else if (game.sessionIndex > 0) {
        const prevQCount = sessions[game.sessionIndex - 1].questions.length;
        goToQuestion(game.sessionIndex - 1, prevQCount - 1);
      }
      broadcastState();
    })
  );

  socket.on(
    "goto",
    hostOnly(({ sessionIndex, questionIndex }) => {
      goToQuestion(sessionIndex, questionIndex);
      broadcastState();
    })
  );
});

// SPA fallback for client-side routing.
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"), (err) => {
    if (err)
      res
        .status(200)
        .send("Survey Says server is running. Start the client with: npm run dev");
  });
});

server.listen(PORT, () => {
  console.log(`Survey Says server listening on http://localhost:${PORT}`);
});
