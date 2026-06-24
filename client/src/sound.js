// Synthesized game-show sounds using the Web Audio API (no audio files needed).
// - playReveal(): a bright, triumphant chime when the host opens a correct answer.
// - playWrong():  a harsh "strike" buzzer when a guess isn't on the board.

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

// One enveloped oscillator note. `type` shapes the timbre (triangle = bell-ish,
// sawtooth = harsh/buzzy), `gainPeak` controls loudness.
function tone(c, freq, start, duration, gainPeak = 0.25, type = "triangle") {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(gainPeak, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(start);
  osc.stop(start + duration);
}

// Correct answer: a loud, rising major arpeggio that rings out like a quiz-show
// "ding ding ding!" — each note carries a bright octave overtone for sparkle.
export function playReveal() {
  try {
    const c = getCtx();
    if (c.state === "suspended") c.resume();
    const now = c.currentTime;
    // C6 - E6 - G6 - C7, climbing and loud.
    const notes = [1047, 1319, 1568, 2093];
    notes.forEach((f, i) => {
      const t = now + i * 0.09;
      tone(c, f, t, 0.5, 0.5, "triangle"); // fundamental (loud)
      tone(c, f * 2, t, 0.35, 0.16, "sine"); // shimmer overtone
    });
  } catch (e) {
    /* ignore */
  }
}

// Wrong answer: the classic harsh game-show buzzer — two low, dissonant
// sawtooth blasts ("ehh-ehh") with a slight downward pitch bend.
export function playWrong() {
  try {
    const c = getCtx();
    if (c.state === "suspended") c.resume();
    const now = c.currentTime;
    const buzz = (start) => {
      const osc = c.createOscillator();
      const osc2 = c.createOscillator();
      const gain = c.createGain();
      osc.type = "sawtooth";
      osc2.type = "square";
      // Detuned pair + downward bend = that sour "wrong!" honk.
      osc.frequency.setValueAtTime(165, start);
      osc.frequency.linearRampToValueAtTime(120, start + 0.42);
      osc2.frequency.setValueAtTime(110, start);
      osc2.frequency.linearRampToValueAtTime(82, start + 0.42);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.5, start + 0.015);
      gain.gain.setValueAtTime(0.5, start + 0.34);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.45);
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(c.destination);
      osc.start(start);
      osc2.start(start);
      osc.stop(start + 0.46);
      osc2.stop(start + 0.46);
    };
    buzz(now);
    buzz(now + 0.5);
  } catch (e) {
    /* ignore */
  }
}
