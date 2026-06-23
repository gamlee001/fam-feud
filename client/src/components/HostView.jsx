import { socket } from "../socket";
import Board from "./Board.jsx";

export default function HostView({ state, onLogout }) {
  const toggle = (i) => socket.emit("toggle-answer", i);
  const revealAll = () => socket.emit("reveal-all");
  const hideAll = () => socket.emit("hide-all");
  const next = () => socket.emit("next-question");
  const prev = () => socket.emit("prev-question");

  return (
    <div className="screen host">
      <header className="topbar">
        <div className="brand">
          SURVEY <span>SAYS</span>
        </div>
        <div className="qmeta">
          {state.sessionLabel} · Question {state.questionIndex + 1} /{" "}
          {state.questionCount}
        </div>
        <div className="tag-group">
          <div className="host-tag">HOST</div>
          <button className="btn-logout" onClick={onLogout} type="button">
            Log out
          </button>
        </div>
      </header>

      <div className="question-bar">{state.questionText}</div>

      <div className="board-status">
        <span>
          {state.revealedCount} / {state.answerCount} revealed
        </span>
        <span className="board-total">{state.revealedPoints} pts on the board</span>
      </div>

      <Board answers={state.answers} onToggle={toggle} />

      <p className="host-help">
        Click a card to flip it open for the guests — its answer pops onto every
        viewer's screen. Click again to hide it. Guests never see a card until
        you open it.
      </p>

      <div className="host-controls">
        <button className="btn" onClick={prev}>
          ◀ Prev
        </button>
        <button className="btn btn-accent" onClick={revealAll}>
          Reveal all
        </button>
        <button className="btn btn-ghost" onClick={hideAll}>
          Hide all
        </button>
        <button className="btn" onClick={next}>
          Next ▶
        </button>
      </div>
    </div>
  );
}
