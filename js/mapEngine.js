// Interactive Town & High School Campus Map Engine
// Implements spatial exploration and proactive player visits
import { gameState } from './gameState.js';
import { MAP_LOCATIONS } from './data/mapData.js';
import { CHARACTERS, getCharacterPortraitSvg } from './data/portraitsData.js';
import { getIconSvg } from './data/icons.js';
import { audio } from './audio.js';
import { statEvents } from './statEvents.js';
import { rpgEngine } from './rpgEngine.js';
import { screenStack } from './screenStack.js';
import { SaveSystem } from './save.js';

export class MapEngine {
  constructor() {
    this.mapModal = null;
    this.selectedLocId = 'loc_quad';
    this.onActionSelectedCallback = null;
    this.isExecutingAction = false;
  }

  init(modalElement) {
    this.mapModal = modalElement;
    this.bindEvents();
  }

  bindEvents() {
    const btnClose = document.getElementById('btn-close-map');
    if (btnClose) {
      btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeMap();
      });
    }

    // Reset weekly excursion allowance on week advance
    statEvents.on('weekChanged', () => {
      if (gameState.map) {
        gameState.map.actionsTakenThisWeek = 0;
      }
    });
  }

  toggleMap() {
    if (this.isOpen()) {
      this.closeMap();
    } else {
      this.openMap();
    }
  }

  isOpen() {
    return this.mapModal && (this.mapModal.classList.contains('active') || screenStack.activeOverlay === this.mapModal);
  }

  openMap(onActionSelected = null) {
    if (!this.mapModal) return;
    audio.playClick();
    this.onActionSelectedCallback = onActionSelected;
    screenStack.openOverlay(this.mapModal);
    this.renderMapLocations();
    this.renderLocationDetails(this.selectedLocId);
  }

  closeMap() {
    if (!this.mapModal) return;
    audio.playClick();
    if (screenStack.activeOverlay === this.mapModal) {
      screenStack.closeOverlay();
    } else {
      this.mapModal.classList.remove('active');
    }
  }

  renderMapLocations() {
    const gridEl = document.getElementById('map-locations-grid');
    if (!gridEl) return;

    gridEl.innerHTML = '';
    Object.values(MAP_LOCATIONS).forEach(loc => {
      const btn = document.createElement('button');
      btn.className = `map-pin-btn ${this.selectedLocId === loc.id ? 'active' : ''} ${loc.category}`;
      btn.innerHTML = `
        <div class="pin-icon-box" style="color: ${loc.color};">
          ${getIconSvg(loc.iconKey, 22)}
        </div>
        <div class="pin-meta">
          <strong class="pin-name">${loc.name}</strong>
          <span class="pin-tag">${loc.category.toUpperCase()}</span>
        </div>
      `;
      btn.addEventListener('click', () => {
        this.selectedLocId = loc.id;
        gameState.map.activeLocation = loc.id;
        audio.playClick();
        this.renderMapLocations();
        this.renderLocationDetails(loc.id);
      });
      gridEl.appendChild(btn);
    });
  }

  renderLocationDetails(locId) {
    const detailsContainer = document.getElementById('map-location-details-pane');
    if (!detailsContainer) return;

    const loc = MAP_LOCATIONS[locId] || MAP_LOCATIONS.loc_quad;
    const residentChar = CHARACTERS[loc.residentNpc];

    detailsContainer.innerHTML = `
      <div class="location-banner" style="background: ${loc.bgTheme};">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="color: ${loc.color};">${getIconSvg(loc.iconKey, 28)}</div>
          <div>
            <h3 style="margin: 0; font-family: var(--font-ui); font-size: 1.15rem; color: var(--text-primary);">${loc.name}</h3>
            <span style="font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase;">Zone: ${loc.category}</span>
          </div>
        </div>
      </div>

      <p class="location-desc" style="padding: 1rem 1.25rem 0.5rem; font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary);">
        ${loc.description}
      </p>

      ${residentChar ? `
        <div class="location-npc-bar" style="margin: 0 1.25rem 0.75rem; padding: 0.6rem 0.8rem; background: var(--surface-translucent); border-radius: var(--radius-md); display: flex; align-items: center; gap: 0.75rem; border: 1px solid var(--surface-border);">
          <div style="width: 44px; height: 44px; flex-shrink: 0;">
            ${getCharacterPortraitSvg(residentChar.id, 'happy', 44)}
          </div>
          <div>
            <strong style="font-size: 0.88rem; color: ${residentChar.color};">${residentChar.name}</strong>
            <div style="font-size: 0.78rem; color: var(--text-tertiary);">${residentChar.role} is currently here</div>
          </div>
        </div>
      ` : ''}
    `;

    const actionsTaken = gameState.map?.actionsTakenThisWeek || 0;
    const maxActions = gameState.map?.maxActionsPerWeek || 1;
    const canTakeAction = actionsTaken < maxActions;

    detailsContainer.innerHTML += `
        <div style="padding: 0 1.25rem 1.25rem; display: flex; flex-direction: column; gap: 0.6rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin: 0.5rem 0 0.25rem;">
            <h4 style="margin: 0; font-size: 0.8rem; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.05em;">Available Proactive Pursuits</h4>
            ${canTakeAction
              ? `<span class="badge" style="background: rgba(16,185,129,0.18); color: #34d399; font-size: 0.72rem;">Free-Time: 1 Available</span>`
              : `<span class="badge" style="background: rgba(239,68,68,0.18); color: #f87171; font-size: 0.72rem;">Weekly Excursion Used (1/1)</span>`
            }
          </div>
          ${!canTakeAction ? `
            <div style="font-size: 0.78rem; color: var(--text-tertiary); line-height: 1.4; padding: 0.4rem 0.6rem; background: var(--surface-translucent); border-radius: var(--radius-sm); border: 1px solid var(--surface-border);">
              You've used your free time this week. Complete the remaining weekly school days to reset your exploration allowance!
            </div>
          ` : ''}
          ${loc.actions.map((act, idx) => `
            <button class="btn btn-secondary map-action-btn" data-act-idx="${idx}" ${!canTakeAction ? 'disabled' : ''} style="display: flex; flex-direction: column; align-items: flex-start; text-align: left; padding: 0.75rem 1rem; gap: 0.25rem; ${!canTakeAction ? 'opacity: 0.55; cursor: not-allowed;' : ''}">
              <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                <strong style="color: var(--text-primary); font-size: 0.92rem;">${act.label}</strong>
                ${act.cost ? `<span class="badge" style="background: rgba(239,68,68,0.2); color: #f87171; font-size: 0.72rem;">-$${act.cost}</span>` : `<span class="badge" style="background: rgba(52,211,153,0.2); color: #34d399; font-size: 0.72rem;">Free</span>`}
              </div>
              <p style="margin: 0; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">${act.desc}</p>
            </button>
          `).join('')}
        </div>
      `;

      if (canTakeAction) {
        const actionBtns = detailsContainer.querySelectorAll('.map-action-btn');
        actionBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-act-idx'), 10);
            this.executeLocationAction(loc.actions[idx], loc);
          });
        });
      }
    }

  executeLocationAction(action, location) {
    if (this.isExecutingAction) return;

    const actionsTaken = gameState.map?.actionsTakenThisWeek || 0;
    const maxActions = gameState.map?.maxActionsPerWeek || 1;
    if (actionsTaken >= maxActions) {
      statEvents.emit('toast', {
        message: 'Weekly campus excursion limit reached. Advance your academic week to explore again!',
        type: 'warning'
      });
      return;
    }

    this.isExecutingAction = true;
    gameState.map.actionsTakenThisWeek = actionsTaken + 1;

    // Immediately disable action buttons to prevent race conditions or spam
    const actionBtns = document.querySelectorAll('.map-action-btn');
    actionBtns.forEach(btn => {
      btn.disabled = true;
      btn.style.pointerEvents = 'none';
    });

    audio.playClick();

    // Financial deduction
    if (action.cost && gameState.player.fundingType === 'selfpaid') {
      gameState.modifyStat('finance', -action.cost, `Location visit: ${action.label}`);
    }

    // Apply stat deltas
    if (action.deltas) {
      Object.entries(action.deltas).forEach(([stat, delta]) => {
        gameState.modifyStat(stat, delta, `Exploration: ${action.label}`);
      });
      if (Object.values(action.deltas).some(v => v > 0)) {
        audio.playStatGain();
      }
    }

    // Apply affection change
    if (action.targetNpc && action.affectionDelta) {
      gameState.modifyAffection(action.targetNpc, action.affectionDelta);
      statEvents.emit('toast', {
        message: `${CHARACTERS[action.targetNpc]?.name || action.targetNpc} Affection +${action.affectionDelta}`,
        type: 'success'
      });
    }

    // Award XP
    if (action.xp) {
      rpgEngine.awardXP(action.xp, action.label);
    }

    // Track visited location
    if (!gameState.map.visitedLocations.includes(location.id)) {
      gameState.map.visitedLocations.push(location.id);
    }

    statEvents.emit('toast', {
      message: `Visited ${location.name}: ${action.label}`,
      type: 'info'
    });

    // Save game state atomically
    SaveSystem.save('auto', true);

    this.closeMap();
    this.isExecutingAction = false;

    if (this.onActionSelectedCallback) {
      this.onActionSelectedCallback(action);
    }
  }
}

export const mapEngine = new MapEngine();
