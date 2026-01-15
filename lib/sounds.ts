// Retro Oregon Trail-style sound effects using Web Audio API

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

// Play a simple tone
function playTone(frequency: number, duration: number, type: OscillatorType = 'square', volume: number = 0.3) {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;

    // Fade out
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio not supported or blocked
  }
}

// Play a sequence of tones
function playSequence(notes: { freq: number; dur: number }[], type: OscillatorType = 'square') {
  let delay = 0;
  notes.forEach(({ freq, dur }) => {
    setTimeout(() => playTone(freq, dur, type), delay * 1000);
    delay += dur;
  });
}

// === SOUND EFFECTS ===

// Button click - short blip
export function playClick() {
  playTone(800, 0.05, 'square', 0.2);
}

// Menu select - two tone
export function playSelect() {
  playSequence([
    { freq: 400, dur: 0.08 },
    { freq: 600, dur: 0.08 },
  ]);
}

// Correct answer - happy ascending
export function playCorrect() {
  playSequence([
    { freq: 523, dur: 0.1 },  // C
    { freq: 659, dur: 0.1 },  // E
    { freq: 784, dur: 0.15 }, // G
    { freq: 1047, dur: 0.2 }, // High C
  ]);
}

// Wrong answer - sad descending
export function playWrong() {
  playSequence([
    { freq: 400, dur: 0.15 },
    { freq: 300, dur: 0.15 },
    { freq: 200, dur: 0.3 },
  ], 'sawtooth');
}

// Death sound - classic Oregon Trail death
export function playDeath() {
  playSequence([
    { freq: 400, dur: 0.2 },
    { freq: 350, dur: 0.2 },
    { freq: 300, dur: 0.2 },
    { freq: 250, dur: 0.2 },
    { freq: 200, dur: 0.4 },
  ], 'triangle');
}

// Dysentery/sick sound - gurgling
export function playDysentery() {
  const ctx = getAudioContext();
  try {
    // Create a "stomach gurgle" sound
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const freq = 80 + Math.random() * 60;
        playTone(freq, 0.15, 'sawtooth', 0.25);
      }, i * 120);
    }
    // End with a low rumble
    setTimeout(() => playTone(60, 0.3, 'triangle', 0.3), 600);
  } catch (e) {}
}

// Fart/whoopee sound - for comedic deaths
export function playFart() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(150, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  } catch (e) {}
}

// Good event - cheerful
export function playGoodEvent() {
  playSequence([
    { freq: 523, dur: 0.1 },
    { freq: 659, dur: 0.1 },
    { freq: 784, dur: 0.1 },
  ]);
}

// Bad event - warning
export function playBadEvent() {
  playSequence([
    { freq: 200, dur: 0.2 },
    { freq: 180, dur: 0.2 },
  ], 'sawtooth');
}

// Wagon moving - rhythmic clip-clop
export function playWagonMove() {
  playSequence([
    { freq: 100, dur: 0.05 },
    { freq: 120, dur: 0.05 },
  ], 'triangle');
}

// Victory fanfare
export function playVictory() {
  playSequence([
    { freq: 523, dur: 0.15 },  // C
    { freq: 523, dur: 0.15 },  // C
    { freq: 523, dur: 0.15 },  // C
    { freq: 523, dur: 0.4 },   // C (long)
    { freq: 415, dur: 0.4 },   // Ab
    { freq: 466, dur: 0.4 },   // Bb
    { freq: 523, dur: 0.15 },  // C
    { freq: 466, dur: 0.1 },   // Bb
    { freq: 523, dur: 0.6 },   // C (long)
  ]);
}

// Game over - sad trombone
export function playGameOver() {
  playSequence([
    { freq: 392, dur: 0.4 },  // G
    { freq: 370, dur: 0.4 },  // F#
    { freq: 349, dur: 0.4 },  // F
    { freq: 330, dur: 0.8 },  // E (long, sad)
  ], 'triangle');
}

// Hunting/scanning sound
export function playScanning() {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      playTone(200 + i * 50, 0.1, 'square', 0.15);
    }, i * 100);
  }
}

// Rest/healing sound
export function playRest() {
  playSequence([
    { freq: 300, dur: 0.3 },
    { freq: 350, dur: 0.3 },
    { freq: 400, dur: 0.5 },
  ], 'sine');
}

// Start game sound
export function playStart() {
  playSequence([
    { freq: 262, dur: 0.1 },
    { freq: 330, dur: 0.1 },
    { freq: 392, dur: 0.1 },
    { freq: 523, dur: 0.2 },
  ]);
}
