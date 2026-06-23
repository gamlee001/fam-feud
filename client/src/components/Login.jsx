import { useState } from "react";

export default function Login({ onLogin, connected }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res = await onLogin({ username, password });
    setBusy(false);
    if (!res || !res.ok) setError((res && res.error) || "Could not log in.");
  }

  return (
    <div className="screen center">
      <form className="login-card" onSubmit={submit}>
        <div className="login-title">
          <span className="title-survey">SURVEY</span>
          <span className="title-says">SAYS</span>
        </div>
        <p className="login-sub">Log in to play</p>

        <label className="field">
          <span>Username</span>
          <input
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect="off"
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>

        {error && <div className="login-error">{error}</div>}

        <button className="btn-primary" disabled={busy || !connected}>
          {connected ? (busy ? "Logging in…" : "Enter") : "Connecting…"}
        </button>
      </form>
    </div>
  );
}
