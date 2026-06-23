// Synthesized reveal sound using the Web Audio API (no audio file needed).
// A short, bright two-tone "ding!" that fires whenever the host opens a card,
// so guests get an audible cue that a new answer just popped onto the board.

let ctx;

function getCtx() {
  if (!ctx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContext();
  }
  return ctx;
}

// Browsers block audio until the user interacts with the page. Call this from a
// click/keydown so the AudioContext is unlocked before we need to play a sound.
export function unlockAudio() {
  try {
    const c = getCtx();
    if (c.state === "suspended") c.resume();
  } catch (e) {
    /* ignore */
  }
}

function tone(c, freq, start, duration, gainPeak = 0.25) {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(gainPeak, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(start);
  osc.stop(start + duration);
}

export function playReveal() {
  try {
    const c = getCtx();
    if (c.state === "suspended") c.resume();
    const now = c.currentTime;
    // Bright rising two-note ding.
    tone(c, 660, now, 0.18);
    tone(c, 990, now + 0.12, 0.32);
  } catch (e) {
    /* ignore */
  }
}
