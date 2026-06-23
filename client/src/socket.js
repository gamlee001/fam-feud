import { io } from "socket.io-client";

// Connect to the game server.
// - In production set VITE_SERVER_URL to the deployed server (e.g. the Render URL).
// - In local dev (no env var) fall back to port 3001 on the same host that is
//   serving the page, so guests on the LAN connect to the host's laptop.
const serverUrl =
  import.meta.env.VITE_SERVER_URL ||
  `${window.location.protocol}//${window.location.hostname}:3001`;

export const socket = io(serverUrl, { autoConnect: true });
