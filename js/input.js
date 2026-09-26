// Desktop Keyboard Hotkeys and Mouse Ergonomics
import { dialogueRunner } from './dialogueRunner.js';
import { screenStack } from './screenStack.js';
import { SaveSystem } from './save.js';
import { toggleFullscreen } from './platform.js';
import { audio } from './audio.js';
import { statEvents } from './statEvents.js';

export function setupInputListeners() {
  window.addEventListener('keydown', (e) => {
    // Ignore input if user is typing in a form field
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

    // If an overlay is active, let overlay handle its own keys (or close overlay on Esc)
    if (screenStack.activeOverlay) {
      if (e.key === 'Escape') {
        e.preventDefault();
        screenStack.closeOverlay();
      }
      return;
    }

    // Numbers 1-5: Choice selection
    if (['1', '2', '3', '4', '5'].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const choiceBtns = document.querySelectorAll('.choice-btn');
      if (choiceBtns && choiceBtns[idx]) {
        e.preventDefault();
        choiceBtns[idx].click();
      }
      return;
    }

    // Space / Enter: Advance dialogue or progress screen
    if (e.key === ' ' || e.key === 'Enter') {
      const activeScreen = screenStack.peek();
      if (activeScreen === 'screen-game-loop') {
        e.preventDefault();
        const handled = dialogueRunner.handleAdvanceInput();
        if (!handled) {
          // If dialogue is not waiting for advance and choices are visible, activate focused choice
          const focusedChoice = document.querySelector('.choice-btn:focus');
          if (focusedChoice) {
            focusedChoice.click();
          } else {
            const firstChoice = document.querySelector('.choice-btn');
            if (firstChoice) firstChoice.focus();
          }
        }
        return;
      }

      if (activeScreen === 'screen-arrival') {
        e.preventDefault();
        const btn = document.getElementById('btn-arrival-continue');
        if (btn && btn.style.display !== 'none') btn.click();
        return;
      }

      if (activeScreen === 'screen-envelope-reveal') {
        e.preventDefault();
        const continueBtn = document.getElementById('btn-envelope-continue');
        const envelope = document.getElementById('envelope-clickable');
        if (continueBtn && continueBtn.style.display !== 'none') {
          continueBtn.click();
        } else if (envelope && envelope.style.display !== 'none') {
          envelope.click();
        }
        return;
      }

      if (activeScreen === 'screen-po') {
        e.preventDefault();
        const btn = document.getElementById('btn-confirm-po');
        if (btn && !btn.disabled) btn.click();
        return;
      }
    }

    // L key: Toggle Backlog Drawer
    if (e.key === 'l' || e.key === 'L') {
      e.preventDefault();
      const drawer = document.getElementById('drawer-backlog');
      if (drawer) {
        if (drawer.classList.contains('active')) {
          screenStack.closeOverlay();
        } else {
          renderBacklogContent();
          screenStack.openOverlay(drawer);
        }
      }
      return;
    }

    // J key: Toggle Journal Drawer
    if (e.key === 'j' || e.key === 'J') {
      e.preventDefault();
      const modal = document.getElementById('modal-journal');
      if (modal) {
        if (modal.classList.contains('active')) {
          screenStack.closeOverlay();
        } else {
          renderJournalModal();
          screenStack.openOverlay(modal);
        }
      }
      return;
    }

    // S key: Quick Save
    if (e.key === 's' || e.key === 'S') {
      if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        SaveSystem.save('auto');
      }
      return;
    }

    // Esc: Close overlay or open settings
    if (e.key === 'Escape') {
      e.preventDefault();
      const closed = screenStack.closeOverlay();
      if (!closed && screenStack.peek() === 'screen-game-loop') {
        const settingsModal = document.getElementById('modal-settings');
        if (settingsModal) screenStack.openOverlay(settingsModal);
      }
      return;
    }

    // F11 or F: Toggle Fullscreen
    if (e.key === 'f' || e.key === 'F') {
      if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleFullscreen();
      }
      return;
    }

    // M: Toggle audio mute
    if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      const isMuted = audio.toggleMute();
      statEvents.emit('toast', {
        message: isMuted ? 'Audio Muted' : 'Audio Enabled',
        type: isMuted ? 'warn' : 'info'
      });
      return;
    }

    // C: Open Character Sheet
    if (e.key === 'c' || e.key === 'C') {
      if (screenStack.peek() === 'screen-game-loop') {
        e.preventDefault();
        const btn = document.getElementById('btn-quick-character');
        if (btn) btn.click();
      }
      return;
    }

    // Q: Open Quest Log
    if (e.key === 'q' || e.key === 'Q') {
      if (screenStack.peek() === 'screen-game-loop') {
        e.preventDefault();
        const btn = document.getElementById('btn-quick-quests');
        if (btn) btn.click();
      }
      return;
    }
  });

  // Mouse Wheel on Dialogue Card
  const dialogueCard = document.getElementById('dialogue-card');
  if (dialogueCard) {
    dialogueCard.addEventListener('wheel', (e) => {
      if (e.deltaY < -25) {
        // Scroll Up -> Open Backlog
        const drawer = document.getElementById('drawer-backlog');
        if (drawer && !drawer.classList.contains('active')) {
          renderBacklogContent();
          screenStack.openOverlay(drawer);
        }
      } else if (e.deltaY > 25) {
        // Scroll Down -> Advance
        dialogueRunner.handleAdvanceInput();
      }
    }, { passive: true });
  }
}

function renderBacklogContent() {
  const container = document.getElementById('backlog-list');
  if (!container) return;

  const logs = dialogueRunner.getBacklog();
  if (logs.length === 0) {
    container.innerHTML = '<div style="color: var(--text-tertiary); text-align: center; padding: 2rem;">No dialogue history yet.</div>';
    return;
  }

  container.innerHTML = logs.map(l => `
    <div style="margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--surface-border);">
      <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
        <strong style="color: var(--accent);">${l.speaker}</strong>
        <span style="color: var(--text-tertiary); font-family: var(--font-mono);">${l.time}</span>
      </div>
      <div style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.5;">${l.text}</div>
    </div>
  `).join('');

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function renderJournalModal() {
  const container = document.getElementById('journal-list');
  if (!container) return;

  const entries = window.gameState?.journal || [];
  container.innerHTML = entries.map(j => `
    <div style="margin-bottom: 0.85rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--surface-border);">
      <div style="font-family: var(--font-ui); font-size: 0.8rem; color: var(--accent); font-weight: 700;">${j.week ? `Week ${j.week}` : `Month ${j.month}`}</div>
      <div style="font-size: 0.9rem; color: var(--text-primary);">${j.text}</div>
    </div>
  `).join('');
}
