# Survey Says

A real-time "Family Feud" style board game with a **quiz-show reveal** mechanic.
The host runs the board and decides when each answer is revealed; guests watch
live on their own devices and only learn an answer the moment the host flips its
card open — like *Who Wants to Be a Millionaire*, where the audience only knows
the answer once it's shown, but the host always knows it.

Built with **React** (frontend) + **Node.js / Socket.io** (real-time backend).

## How it works

- **Two accounts only** — one `host` and one `guest`.
- **Host** orchestrates everything: always sees every answer and its points,
  clicks any card to toggle it open or closed, and moves between questions.
- **Guest** is view-only: no controls. Every answer is a **blank card** until the
  host reveals it, at which point it pops onto the guest's screen instantly.
- **WebSockets** keep every guest screen in perfect sync with the host — each
  reveal, hide, and question change is broadcast live, and unrevealed answers are
  never even sent to guests (so they can't peek).

## Accounts

| Role  | Username | Password    | Sees                                      |
| ----- | -------- | ----------- | ----------------------------------------- |
| Host  | `host`   | `host123`   | All answers + points; controls the board  |
| Guest | `guest`  | `guest123`  | Blank cards until the host reveals them    |

> The `guest` account is shared — open it on as many viewer devices/tabs as you
> like; they all mirror the same live board.

## Run it (development)

Requires Node 20+ (see `.nvmrc`).

```bash
nvm use            # or: nvm use 20.19.5
npm install        # installs server + client (npm workspaces)
npm run dev        # starts the Socket.io server (:3001) and Vite client (:5173)
```

Then open:

- **Host screen:** http://localhost:5173 → log in as `host`
- **Guests:** open the same URL on each device and log in as `guest`

### Playing across devices

Run `npm run dev`, find your laptop's LAN IP (e.g. `192.168.0.12`), and have
guests open `http://192.168.0.12:5173` on their phones. The client connects to
the game server on port `3001` of the same host automatically, so make sure both
ports are reachable on your network.

## Production build (single server)

```bash
npm run build      # builds the React client into client/dist
npm start          # the Node server serves the app + websockets on :3001
```

Then everyone opens `http://<laptop-ip>:3001`.

## How to host a round

1. Read the question aloud.
2. As guesses come in, click the matching card to flip it open — its answer and
   points appear on every guest screen with a "ding".
3. Click a revealed card again to hide it, or **Reveal all** / **Hide all** to
   open or close the whole board at once.
4. Click **Next ▶** to move to the next question (which resets all cards to
   hidden), or **◀ Prev** to go back.
