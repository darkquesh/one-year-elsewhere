// Ending Outcomes Checker & Epilogue Renderer
import { ENDINGS } from './data/endingsData.js';
import { gameState } from './gameState.js';
import { audio } from './audio.js';
import { i18n } from './i18n/i18n.js';
import { getIconSvg } from './data/icons.js';

export class EndingsManager {
  static evaluateEnding() {
    const stats = gameState.stats;
    const flags = gameState.flags;

    // Check premature game-over conditions:
    if (stats.happiness <= 0) {
      return ENDINGS.burnout;
    }
    if (gameState.violations.strikeCount >= 4) {
      return ENDINGS.early_return_rule;
    }
    if (stats.hostFamilyBond <= 0) {
      return ENDINGS.host_family_conflict;
    }

    // Week 40 (or Month 12 legacy) Completion endings:
    if ((gameState.meta.week && gameState.meta.week >= 40) || gameState.meta.month >= 12) {
      if (flags.applied_host_university && stats.adaptation >= 70 && stats.social >= 65) {
        return ENDINGS.university_acceptance;
      }
      if (stats.academics >= 85) {
        return ENDINGS.academic_excellence;
      }
      if (stats.hostFamilyBond >= 88) {
        return ENDINGS.second_family;
      }
      if (stats.finance <= 20) {
        return ENDINGS.broke_scraped;
      }
      return ENDINGS.triumphant_return;
    }

    return null; // Game continues
  }

  static renderEndingScreen(containerEl, ending) {
    if (!containerEl || !ending) return;

    audio.stopAmbient();
    audio.playStatGain();

    const journalLogs = gameState.journal.map(j => `
      <div style="margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-secondary);">
        <strong style="color: var(--text-primary);">${j.text}</strong>
      </div>
    `).join('');

    containerEl.innerHTML = `
      <div class="flow-container" style="text-align: center; max-width: 680px;">
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 1rem; color: var(--accent);">${getIconSvg(ending.badge || 'globe', 64)}</div>
        <h1 style="font-family: var(--font-ui); font-size: 2.2rem; font-weight: 800; color: var(--text-primary);">${ending.title}</h1>
        <h3 style="font-size: 1.1rem; color: var(--accent); margin-bottom: 1rem;">${ending.tagline}</h3>

        <div class="glass-panel" style="text-align: left; line-height: 1.7; margin-bottom: 1.5rem;">
          <p style="margin-bottom: 1rem;">${ending.description}</p>
          <div style="font-size: 0.85rem; color: var(--text-tertiary); font-family: var(--font-mono);">
            Trigger: ${ending.statRequirements}
          </div>
        </div>

        <div class="glass-panel" style="text-align: left; max-height: 220px; overflow-y: auto; margin-bottom: 1.5rem;">
          <h4 style="font-family: var(--font-ui); margin-bottom: 0.75rem; color: var(--text-primary);">${i18n.t('dialogue.journal_header')}</h4>
          ${journalLogs}
        </div>

        <button id="btn-restart-game" class="btn btn-primary" style="margin: 0 auto; width: 220px;">
          ${i18n.t('endings.restart_btn')}
        </button>
      </div>
    `;

    const restartBtn = containerEl.querySelector('#btn-restart-game');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        window.location.reload();
      });
    }
  }
}
