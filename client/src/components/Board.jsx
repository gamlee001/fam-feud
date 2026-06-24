// The answer board. For the host, every card carries its text + points and is a
// clickable toggle (open = revealed to guests, dashed border = still hidden from
// them). For a guest, an unrevealed card has no text at all — it renders as a
// blank "— — —" placeholder until the host opens it.

export default function Board({ answers, onToggle, striking }) {
  const isHost = !!onToggle;

  return (
    <div className="board">
      {answers.map((a) => {
        const showText = a.text != null; // host: always; guest: only when revealed
        // A wrong guess flashes red over every card that's still hidden — those
        // answers stay valid, this guess just wasn't one of them.
        const struck = striking && !a.revealed;
        const classes = ["slot"];
        if (a.revealed) classes.push("revealed");
        if (isHost) classes.push("host");
        if (isHost && !a.revealed) classes.push("hidden-from-guests");
        if (struck) classes.push("strike");

        return (
          <button
            key={a.index}
            className={classes.join(" ")}
            onClick={isHost ? () => onToggle(a.index) : undefined}
            disabled={!isHost}
            type="button"
          >
            <span className="slot-rank">{a.index + 1}</span>
            {showText ? (
              <>
                <span className="slot-text">{a.text}</span>
                <span className="slot-points">{a.points}</span>
              </>
            ) : (
              <span className="slot-text slot-blank">— — —</span>
            )}
            {isHost && (
              <span className="slot-eye" aria-hidden="true">
                {a.revealed ? "👁" : "🙈"}
              </span>
            )}
            {struck && (
              <span className="slot-x" aria-hidden="true">
                ✗
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
