import Board from "./Board.jsx";

// The guest is a pure spectator. There are no controls and no buzzers — the
// board simply mirrors whatever the host has chosen to reveal, in real time.
// Every unrevealed answer shows as a blank card until the host opens it.
export default function GuestView({ state, me, onLogout }) {
  return (
    <div className="screen guest">
      <header className="topbar">
        <div className="brand">
          SURVEY <span>SAYS</span>
        </div>
        <div className="qmeta">
          {state.sessionLabel} · Question {state.questionIndex + 1} /{" "}
          {state.questionCount}
        </div>
        <div className="tag-group">
          <div className="host-tag you">{me.name}</div>
          <button className="btn-logout" onClick={onLogout} type="button">
            Log out
          </button>
        </div>
      </header>

      <div className="question-bar">{state.questionText}</div>

      <div className="board-status">
        {/* <span>
          {state.revealedCount} / {state.answerCount} revealed
        </span>
        <span className="board-total">{state.revealedPoints} pts on the board</span> */}
      </div>

      {/* No onToggle prop -> read-only, blank cards until the host reveals them. */}
      <Board answers={state.answers} />

      {/* <p className="host-help">
        Watching live — answers appear as the host reveals them.
      </p> */}
    </div>
  );
}
