import { io } from "socket.io-client";

// Connect to the game server.
// - VITE_SERVER_URL wins if set (point it at a separately hosted server).
// - In production the game server also serves this page, so default to the
//   page's own origin (Railway exposes only standard HTTPS, no custom port).
// - In local dev Vite serves the page on its own port, so fall back to port
//   3001 on the same host, so guests on the LAN connect to the host's laptop.
const serverUrl =
  import.meta.env.VITE_SERVER_URL ||
  (import.meta.env.PROD
    ? window.location.origin
    : `${window.location.protocol}//${window.location.hostname}:3001`);

export const socket = io(serverUrl, { autoConnect: true });
