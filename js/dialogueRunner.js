// Visual Novel Dialogue Runner with Typewriter Effect, Backlog, and Advance Handling
import { audio } from './audio.js';

export class DialogueRunner {
  constructor() {
    this.textElement = null;
    this.speakerElement = null;
    this.caretElement = null;
    this.promptElement = null;

    this.fullText = '';
    this.revealedCount = 0;
    this.isTyping = false;
    this.isWaitingForAdvance = false;
    this.typeTimer = null;
    this.onAdvanceCallback = null;

    this.speedMap = {
      slow: 25,
      normal: 45,
      fast: 85,
      instant: 9999
    };
    this.currentSpeed = 'normal';

    this.backlog = []; // Array of { speaker, text, timestamp }
    this.isAutoAdvancing = false;
    this.autoTimer = null;
  }

  init(textEl, speakerEl, caretEl, promptEl) {
    this.textElement = textEl;
    this.speakerElement = speakerEl;
    this.caretElement = caretEl;
    this.promptElement = promptEl || document.getElementById('dialogue-prompt') || document.querySelector('.dialogue-prompt');
  }

  // Display a single dialogue line and register callback when player advances
  showDialogue(speaker, text, onAdvance = null, speed = this.currentSpeed) {
    clearTimeout(this.typeTimer);
    clearTimeout(this.autoTimer);

    this.fullText = text || '';
    this.revealedCount = 0;
    this.onAdvanceCallback = onAdvance;
    this.currentSpeed = speed;
    this.isWaitingForAdvance = false;

    if (this.speakerElement) {
      this.speakerElement.textContent = speaker || 'Narrator';
      this.speakerElement.style.display = speaker ? 'inline-block' : 'none';
    }

    if (this.promptElement) {
      this.promptElement.textContent = '[Space / Click to Skip]';
      this.promptElement.style.display = 'block';
    }

    // Add to Backlog
    this.backlog.push({
      speaker: speaker || 'Narrator',
      text: this.fullText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    if (this.backlog.length > 50) this.backlog.shift();

    if (this.speedMap[speed] >= 9999) {
      this.finishTypewriter();
      return;
    }

    this.isTyping = true;
    if (this.caretElement) this.caretElement.style.display = 'inline-block';
    this.stepTypewriter();
  }

  // Multi-line sequence runner: advances line by line on click/Space
  showDialogueSequence(items, onComplete = null) {
    if (!items || items.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    let index = 0;
    const playNext = () => {
      if (index >= items.length) {
        if (onComplete) onComplete();
        return;
      }

      const item = items[index];
      index++;

      const speaker = typeof item === 'object' ? item.speaker : '';
      const text = typeof item === 'object' ? item.text : item;

      this.showDialogue(speaker, text, () => {
        playNext();
      });
    };

    playNext();
  }

  stepTypewriter() {
    clearTimeout(this.typeTimer);

    if (!this.isTyping) return;

    if (this.revealedCount < this.fullText.length) {
      this.revealedCount++;
      if (this.textElement) {
        this.textElement.textContent = this.fullText.slice(0, this.revealedCount);
      }

      const intervalMs = Math.round(1000 / this.speedMap[this.currentSpeed]);
      this.typeTimer = setTimeout(() => this.stepTypewriter(), intervalMs);
    } else {
      this.finishTypewriter();
    }
  }

  // Completes typewriter reveal and transitions into "waiting for advance" state
  finishTypewriter() {
    clearTimeout(this.typeTimer);
    this.isTyping = false;
    this.revealedCount = this.fullText.length;

    if (this.textElement) {
      this.textElement.textContent = this.fullText;
    }
    if (this.caretElement) {
      this.caretElement.style.display = 'none';
    }

    this.isWaitingForAdvance = true;

    if (this.promptElement) {
      this.promptElement.textContent = '[Space / Click to Advance]';
      this.promptElement.style.display = 'block';
    }

    if (this.isAutoAdvancing) {
      this.scheduleAutoAdvance();
    }
  }

  // Handle player advance input (tap on dialogue box or Space/Enter)
  handleAdvanceInput() {
    // 1. If typewriter is currently typing, first tap reveals the full line immediately
    if (this.isTyping) {
      this.finishTypewriter();
      return false; // Completed line; player now sees full text and can read
    }

    // 2. If line is finished and waiting for advance, tap advances to the next narration/action
    if (this.isWaitingForAdvance) {
      this.isWaitingForAdvance = false;
      audio.playClick();

      if (this.onAdvanceCallback) {
        const cb = this.onAdvanceCallback;
        this.onAdvanceCallback = null;
        cb();
        return true;
      }
    }

    return false;
  }

  scheduleAutoAdvance() {
    clearTimeout(this.autoTimer);
    this.autoTimer = setTimeout(() => {
      if (!this.isTyping && this.isWaitingForAdvance) {
        this.handleAdvanceInput();
      }
    }, 2800);
  }

  getBacklog() {
    return [...this.backlog];
  }
}

export const dialogueRunner = new DialogueRunner();
