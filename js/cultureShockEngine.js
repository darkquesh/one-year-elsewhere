// Culture Shock & Bilingual Language Deciphering Engine
// Simulates the immigrant / exchange student experience of language barriers & conversational growth
import { gameState } from './gameState.js';
import { audio } from './audio.js';
import { statEvents } from './statEvents.js';

export const SLANG_DICTIONARY = {
  kegger: {
    scrambled: 'k#gg#r',
    definition: 'A large, informal teenage outdoor or house party centered around a keg of beer.'
  },
  flummoxed: {
    scrambled: 'fl#mm#x#d',
    definition: 'Completely bewildered, deeply confused, or perplexed by cultural differences.'
  },
  bonfire: {
    scrambled: 'b#nf#re',
    definition: 'A large outdoor fire used for social celebrations, senior gatherings, and stargazing.'
  },
  homecoming: {
    scrambled: 'h#m#c#m#ng',
    definition: 'An annual American high school autumn tradition featuring a varsity football game and dance.'
  },
  prom: {
    scrambled: 'pr#m',
    definition: 'A formal black-tie high school spring dance, celebrated with corsages, limos, and dates.'
  },
  pep: {
    scrambled: 'p#p r#lly',
    definition: 'A school assembly held to generate excitement and spirit before a major sporting event.'
  },
  bleachers: {
    scrambled: 'bl##ch#rs',
    definition: 'Tiered wooden or metal bench seating overlooking sports fields and basketball courts.'
  }
};

export class CultureShockEngine {
  constructor() {
    this.decipheredWords = new Set();
  }

  // Filter dialogue text according to current Adaptation level
  filterDialogueText(rawText) {
    const adaptation = gameState.stats.adaptation || 45;

    // Above 55 Adaptation: Student is conversationally fluent! Text reads crystal clear.
    if (adaptation >= 55) {
      return rawText;
    }

    let processedText = rawText;

    Object.entries(SLANG_DICTIONARY).forEach(([term, info]) => {
      if (this.decipheredWords.has(term)) return; // Already learned

      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      if (regex.test(processedText)) {
        processedText = processedText.replace(regex, (match) => {
          return `<span class="culture-scramble-word" data-term="${term.toLowerCase()}" title="Tap to Decipher using Pocket Dictionary">${info.scrambled} <small class="scramble-hint">[?]</small></span>`;
        });
      }
    });

    return processedText;
  }

  bindDecipherEvents(containerEl) {
    if (!containerEl) return;

    const words = containerEl.querySelectorAll('.culture-scramble-word');
    words.forEach(span => {
      span.addEventListener('click', (e) => {
        e.stopPropagation();
        const term = span.getAttribute('data-term');
        this.decipherTerm(term, span);
      });
    });
  }

  decipherTerm(term, spanElement) {
    const info = SLANG_DICTIONARY[term];
    if (!info) return;

    audio.playStatGain();
    this.decipheredWords.add(term);

    // Reward player with a point of adaptation for learning local vocabulary
    gameState.modifyStat('adaptation', 1, `Deciphered local slang: ${term}`);

    // Replace scrambled span with glowing learned term
    spanElement.className = 'culture-deciphered-word';
    spanElement.innerHTML = `${term} <small class="deciphered-check">[OK]</small>`;

    statEvents.emit('toast', {
      message: `Vocabulary Learned: "${term.toUpperCase()}" - ${info.definition}`,
      type: 'info'
    });
  }
}

export const cultureShockEngine = new CultureShockEngine();
