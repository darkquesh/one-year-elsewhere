// Procedural Web Audio API Sound Engine (Zero external audio file dependencies)
// Designed for soothing, musical ambiance with zero static drone or background hum.

class AudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.musicEnabled = true;
    this.sfxEnabled = true;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.ambientTimer = null;
    this.currentCountry = null;
    this.initialized = false;
    this.activeVoices = [];
  }

  // Must be called upon user interaction to unlock AudioContext
  init() {
    if (this.initialized) {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.musicGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();

      this.masterGain.gain.value = 0.7;
      this.musicGain.gain.value = 0.25;
      this.sfxGain.gain.value = 0.45;

      this.musicGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.7, this.ctx.currentTime, 0.05);
    }
    if (muted) {
      this.stopAmbient();
    } else if (this.currentCountry && this.musicEnabled) {
      this.startAmbientLoop();
    }
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (!this.musicEnabled) {
      this.stopAmbient();
    } else if (this.currentCountry && !this.isMuted) {
      this.startAmbientLoop();
    }
    return this.musicEnabled;
  }

  toggleSfx() {
    this.sfxEnabled = !this.sfxEnabled;
    return this.sfxEnabled;
  }

  // =========================================================================
  // Tactile & Pleasant Sound Effects (SFX)
  // =========================================================================
  
  // Soft tactile UI click (gentle woodblock / soft tap, zero harsh frequencies)
  playClick() {
    if (!this.initialized || this.isMuted || !this.sfxEnabled) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.025);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {}
  }

  // Gentle page/card swipe
  playCardFlip() {
    if (!this.initialized || this.isMuted || !this.sfxEnabled) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

      filter.type = 'lowpass';
      filter.frequency.value = 600;

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }

  // Musical stat gain: Soft 2-note music-box chime (C5 -> E5)
  playStatGain() {
    if (!this.initialized || this.isMuted || !this.sfxEnabled) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const start = now + idx * 0.09;
        gain.gain.setValueAtTime(0.07, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(start);
        osc.stop(start + 0.38);
      });
    } catch {}
  }

  // Subtle acoustic thud for stat loss
  playStatLoss() {
    if (!this.initialized || this.isMuted || !this.sfxEnabled) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.18);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }

  // Serious, low warning tone for strike
  playStrikeAlert() {
    if (!this.initialized || this.isMuted || !this.sfxEnabled) return;
    try {
      const now = this.ctx.currentTime;
      [196, 261.63].forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq;

        filter.type = 'lowpass';
        filter.frequency.value = 500;

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.55);
      });
    } catch {}
  }

  // Celebratory ascending fanfare for RPG Level Up (C5 -> E5 -> G5 -> C6)
  playLevelUp() {
    if (!this.initialized || this.isMuted || !this.sfxEnabled) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const start = now + idx * 0.11;
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(start);
        osc.stop(start + 0.5);
      });
    } catch {}
  }

  // Bright acoustic chime for item / keepsake acquisition (F5 -> A5)
  playItemGain() {
    if (!this.initialized || this.isMuted || !this.sfxEnabled) return;
    try {
      const now = this.ctx.currentTime;
      [698.46, 880.00].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const start = now + idx * 0.08;
        gain.gain.setValueAtTime(0.09, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch {}
  }

  // =========================================================================
  // Musical Generative Ambiance (Zero Electrical Drone / No Buzzing)
  // Generates peaceful, slow acoustic bell/Rhodes chime notes with long decay
  // and breathing room between notes.
  // =========================================================================
  setCountryAmbient(countryId) {
    if (this.currentCountry === countryId && this.ambientTimer) return;
    this.currentCountry = countryId;
    this.stopAmbient();

    if (!this.initialized || this.isMuted || !this.musicEnabled || !this.ctx) return;
    this.startAmbientLoop();
  }

  startAmbientLoop() {
    this.stopAmbient();
    if (!this.currentCountry || this.isMuted || !this.musicEnabled || !this.ctx) return;

    // Peaceful pentatonic chime motifs for each country
    const scaleMap = {
      japan: [293.66, 329.63, 392.00, 440.00, 523.25, 587.33], // Zen pentatonic (D, E, G, A, C)
      usa: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25],   // Folk major pentatonic
      germany: [220.00, 261.63, 293.66, 329.63, 392.00, 440.00], // Classical reflective
      france: [261.63, 329.63, 392.00, 493.88, 587.33],        // Dreamy Major 7th/9th
      turkey: [220.00, 246.94, 261.63, 329.63, 349.23, 440.00], // Aegean warm minor
      brazil: [261.63, 329.63, 392.00, 440.00, 523.25],        // Bossa mellow major
      default: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25] // Lofi peaceful C Major
    };

    const notes = scaleMap[this.currentCountry] || scaleMap.default;
    let step = 0;

    const playChime = () => {
      if (!this.musicEnabled || this.isMuted || !this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        // Pick 1 root note and occasionally a soft 3rd/5th harmony
        const f1 = notes[step % notes.length];
        const f2 = (step % 2 === 0) ? notes[(step + 2) % notes.length] : null;
        step = (step + 1) % notes.length;

        [f1, f2].filter(Boolean).forEach(freq => {
          const osc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.value = freq;

          // Warm, soft acoustic filtering
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(650, now);

          // Soft bell envelope: 40ms attack, 2.2s gentle decay
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(0.035, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.musicGain);

          osc.start(now);
          osc.stop(now + 2.5);
        });
      } catch {}

      // Generates peaceful 3.5 to 5.0 seconds of natural breathing room between chimes
      const nextDelay = 3500 + Math.random() * 1500;
      this.ambientTimer = setTimeout(playChime, nextDelay);
    };

    // Initial chime after 800ms
    this.ambientTimer = setTimeout(playChime, 800);
  }

  stopAmbient() {
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }
}

export const audio = new AudioManager();
