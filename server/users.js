// Hard-coded accounts. Just two: the host who orchestrates the game and a guest
// who only watches. Logging in with these credentials assigns the player a role.
//
//   Host  -> sees every answer, toggles cards open/closed, moves between questions.
//   Guest -> view-only. Answers are blank until the host reveals them.

const users = [
  { username: "host", password: "host123", role: "host", name: "Host" },
  { username: "guest", password: "guest123", role: "guest", name: "Guest" },
];

function authenticate(username, password) {
  const user = users.find(
    (u) =>
      u.username.toLowerCase() === String(username || "").toLowerCase().trim() &&
      u.password === password
  );
  if (!user) return null;
  const { password: _pw, ...safe } = user;
  return safe;
}

module.exports = { users, authenticate };
