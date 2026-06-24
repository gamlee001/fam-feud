import { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { playReveal, playWrong, unlockAudio } from "./sound";
import Login from "./components/Login.jsx";
import HostView from "./components/HostView.jsx";
import GuestView from "./components/GuestView.jsx";

// We persist the session (credentials + role) so a page refresh or a flaky
// reconnect doesn't drop the player back to the login screen. Each websocket
// connection is stateless, so on (re)connect we silently log in again and the
// server pushes the current board straight back.
const SESSION_KEY = "survey-says-session";

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

function saveSession(session) {
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export default function App() {
  const saved = loadSession();
  const [me, setMe] = useState(saved?.me || null); // { role, name }
  const [state, setState] = useState(null); // authoritative game state from server
  const [connected, setConnected] = useState(socket.connected);
  const [striking, setStriking] = useState(false); // transient "wrong answer" flash

  // Refs so the long-lived socket listeners always read the latest values.
  const credsRef = useRef(saved?.creds || null);
  const strikeTimer = useRef(null);
  const meRef = useRef(me);
  meRef.current = me;

  // Emit a login and, on success, remember the session for auto re-login.
  function login(creds) {
    return new Promise((resolve) => {
      socket.emit("login", creds, (res) => {
        if (res && res.ok) {
          const nextMe = { role: res.role, name: res.name };
          setMe(nextMe);
          credsRef.current = creds;
          saveSession({ creds, me: nextMe });
        }
        resolve(res);
      });
    });
  }

  useEffect(() => {
    const onConnect = () => {
      setConnected(true);
      // Re-authenticate automatically after a refresh or a dropped connection.
      if (credsRef.current) login(credsRef.current);
    };
    const onDisconnect = () => setConnected(false);
    const onState = (s) => setState(s);
    const onRevealSound = () => playReveal();
    // Wrong answer: buzz, then flash the red ✗ over hidden cards for a beat.
    const onWrongAnswer = () => {
      playWrong();
      setStriking(true);
      if (strikeTimer.current) clearTimeout(strikeTimer.current);
      strikeTimer.current = setTimeout(() => setStriking(false), 1100);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("state", onState);
    socket.on("reveal-sound", onRevealSound);
    socket.on("wrong-answer", onWrongAnswer);

    // Cover the race where the socket connected before this effect ran (the
    // "connect" event would have already fired and been missed). This is what
    // left Safari stuck on "Connecting…".
    setConnected(socket.connected);
    if (socket.connected) {
      if (credsRef.current) login(credsRef.current);
    } else {
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("state", onState);
      socket.off("reveal-sound", onRevealSound);
      socket.off("wrong-answer", onWrongAnswer);
      if (strikeTimer.current) clearTimeout(strikeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogin(creds) {
    unlockAudio(); // unlock sound on the user gesture that submits the login
    return login(creds);
  }

  function handleLogout() {
    credsRef.current = null;
    saveSession(null);
    setMe(null);
    setState(null);
  }

  if (!me) return <Login onLogin={handleLogin} connected={connected} />;

  if (!state) {
    return (
      <div className="screen center">
        <div className="loading">Loading game…</div>
      </div>
    );
  }

  if (me.role === "host")
    return <HostView state={state} striking={striking} onLogout={handleLogout} />;
  return (
    <GuestView
      state={state}
      me={me}
      striking={striking}
      onLogout={handleLogout}
    />
  );
}
