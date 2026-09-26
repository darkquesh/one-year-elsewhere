// Tension Engine: High-Risk Activities, Danger Dials & Alibi Minigames
// Implements press-your-luck tension mechanics and alibi interrogation trees
import { gameState } from './gameState.js';
import { RISKY_ACTIVITIES } from './data/riskyActivitiesData.js';
import { ViolationSystem } from './violations.js';
import { rng } from './rng.js';
import { audio } from './audio.js';
import { statEvents } from './statEvents.js';
import { rpgEngine } from './rpgEngine.js';
import { getIconSvg } from './data/icons.js';
import { getCharacterPortraitSvg } from './data/portraitsData.js';
import { screenStack } from './screenStack.js';
import { SaveSystem } from './save.js';

export class TensionEngine {
  constructor() {
    this.modal = null;
    this.currentActivity = null;
    this.currentDanger = 0;
    this.roundsPushed = 0;
    this.onCompleteCallback = null;
    this.heartbeatInterval = null;
    this.isProcessingRound = false;
    this.isBailing = false;
    this.isResolvingAlibi = false;
    this.isFinishing = false;
  }

  init(modalElement) {
    this.modal = modalElement;
  }

  // Launch a high-risk activity
  startActivity(activityId, onComplete) {
    const activity = RISKY_ACTIVITIES[activityId];
    if (!activity) return;

    this.currentActivity = activity;
    this.currentDanger = activity.initialDanger || 30;
    this.roundsPushed = 0;
    this.onCompleteCallback = onComplete;
    this.isProcessingRound = false;
    this.isBailing = false;
    this.isResolvingAlibi = false;
    this.isFinishing = false;

    gameState.tension.active = true;
    gameState.tension.currentDanger = this.currentDanger;
    gameState.tension.currentActivityId = activityId;
    gameState.tension.inBust = false;

    if (this.modal) {
      screenStack.openOverlay(this.modal);
    }

    this.startHeartbeatAudio();
    this.renderActivityView();
  }

  startHeartbeatAudio() {
    this.stopHeartbeatAudio();
    // Synthesize low-frequency heartbeat pulse that accelerates with danger
    const getIntervalMs = () => Math.max(350, 1100 - (this.currentDanger * 8));

    const beat = () => {
      if (!gameState.tension.active) return;
      audio.playStatLoss(); // Quick low pulse
      this.heartbeatInterval = setTimeout(beat, getIntervalMs());
    };

    beat();
  }

  stopHeartbeatAudio() {
    if (this.heartbeatInterval) {
      clearTimeout(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  renderActivityView() {
    if (!this.modal || !this.currentActivity) return;

    const titleEl = document.getElementById('tension-modal-title');
    const subtitleEl = document.getElementById('tension-modal-subtitle');
    const dangerValEl = document.getElementById('tension-danger-val');
    const dangerFillEl = document.getElementById('tension-danger-fill');
    const descEl = document.getElementById('tension-description-text');
    const actionsContainer = document.getElementById('tension-actions-stack');
    const interrogationContainer = document.getElementById('tension-interrogation-view');

    if (interrogationContainer) interrogationContainer.style.display = 'none';
    if (actionsContainer) actionsContainer.style.display = 'flex';

    if (titleEl) titleEl.textContent = this.currentActivity.title;
    if (subtitleEl) subtitleEl.textContent = this.currentActivity.subtitle;
    if (descEl) descEl.textContent = `You find yourself in the thick of it. The excitement is electric, but every additional round pushes your danger exposure higher.`;

    this.updateDangerGauge(dangerValEl, dangerFillEl);

    // Build action buttons
    if (actionsContainer) {
      actionsContainer.innerHTML = `
        <button id="btn-push-luck" class="btn btn-primary tension-btn-push">
          ${getIconSvg('flame', 18)}
          <span>Push Your Luck / Keep Going (+Thrills, +Danger)</span>
        </button>

        <button id="btn-bail-safe" class="btn btn-secondary tension-btn-bail">
          ${getIconSvg('check', 18)}
          <span>Bail & Slip Away Now (Lock In Gains, Safe Exit)</span>
        </button>
      `;

      const btnPush = document.getElementById('btn-push-luck');
      const btnBail = document.getElementById('btn-bail-safe');

      if (btnPush) {
        btnPush.addEventListener('click', () => this.handlePushLuck());
      }
      if (btnBail) {
        btnBail.addEventListener('click', () => this.handleBailSafe());
      }
    }
  }

  updateDangerGauge(valEl, fillEl) {
    if (!valEl) valEl = document.getElementById('tension-danger-val');
    if (!fillEl) fillEl = document.getElementById('tension-danger-fill');

    if (valEl) valEl.textContent = `${this.currentDanger}%`;
    if (fillEl) {
      fillEl.style.width = `${Math.min(100, this.currentDanger)}%`;
      if (this.currentDanger > 70) {
        fillEl.className = 'tension-fill danger-high';
      } else if (this.currentDanger > 40) {
        fillEl.className = 'tension-fill danger-med';
      } else {
        fillEl.className = 'tension-fill danger-low';
      }
    }
  }

  handlePushLuck() {
    if (this.isProcessingRound || this.isBailing || !gameState.tension.active || gameState.tension.inBust) return;
    this.isProcessingRound = true;

    // Immediately disable action buttons during resolution to prevent multi-click spam
    const btnPush = document.getElementById('btn-push-luck');
    const btnBail = document.getElementById('btn-bail-safe');
    if (btnPush) btnPush.disabled = true;
    if (btnBail) btnBail.disabled = true;

    audio.playClick();
    this.roundsPushed++;

    // Increment danger
    const dangerInc = this.currentActivity.dangerPerRound || 20;
    this.currentDanger = Math.min(100, this.currentDanger + dangerInc);
    gameState.tension.currentDanger = this.currentDanger;

    // Apply incremental gains
    if (this.currentActivity.rewards) {
      const r = this.currentActivity.rewards;
      if (r.social) gameState.modifyStat('social', Math.round(r.social * 0.4), 'Risky pursuit thrills');
      if (r.happiness) gameState.modifyStat('happiness', Math.round(r.happiness * 0.4), 'Risky pursuit thrills');
      if (r.targetNpc && r.affectionDelta) {
        gameState.modifyAffection(r.targetNpc, Math.round(r.affectionDelta * 0.5));
      }
      if (r.xp) rpgEngine.awardXP(Math.round(r.xp * 0.4), 'Risky escapade');
    }

    this.updateDangerGauge();

    // Check bust roll
    const poLocation = gameState.po?.location || 'suburban';
    let locMultiplier = 1.0;
    if (poLocation === 'rural') locMultiplier = 1.4; // Rural community notices everything
    if (poLocation === 'urban') locMultiplier = 0.8;

    const bustRoll = rng.next() * 100;
    const bustThreshold = this.currentDanger * locMultiplier;

    if (bustRoll < bustThreshold || this.currentDanger >= 95) {
      // BUST OCCURS!
      this.triggerBust();
    } else {
      statEvents.emit('toast', {
        message: `Rounds pushed: ${this.roundsPushed}! Danger rose to ${this.currentDanger}%.`,
        type: 'warning'
      });
      // Cooldown debounce before allowing next push
      setTimeout(() => {
        this.isProcessingRound = false;
        if (btnPush && gameState.tension.active && !gameState.tension.inBust) btnPush.disabled = false;
        if (btnBail && gameState.tension.active && !gameState.tension.inBust) btnBail.disabled = false;
      }, 400);
    }
  }

  handleBailSafe() {
    if (this.isBailing || this.isProcessingRound || !gameState.tension.active || gameState.tension.inBust) return;
    this.isBailing = true;

    // Immediately disable action buttons
    const btnPush = document.getElementById('btn-push-luck');
    const btnBail = document.getElementById('btn-bail-safe');
    if (btnPush) btnPush.disabled = true;
    if (btnBail) btnBail.disabled = true;

    audio.playClick();
    this.stopHeartbeatAudio();

    // Apply debuff if any
    if (this.currentActivity.debuff) {
      const d = this.currentActivity.debuff;
      gameState.addModifier(d.stat, d.delta, d.weeksLeft, d.reason);
    }

    // Award keepsake item if any
    if (this.currentActivity.rewards?.awardItem) {
      rpgEngine.awardItem(this.currentActivity.rewards.awardItem);
    }

    statEvents.emit('toast', {
      message: 'You slipped away safely into the night before anyone caught you!',
      type: 'success'
    });

    SaveSystem.save('auto', true);

    this.closeModal();
    if (this.onCompleteCallback) {
      const cb = this.onCompleteCallback;
      this.onCompleteCallback = null;
      cb();
    }
  }

  triggerBust() {
    this.stopHeartbeatAudio();
    audio.playStrikeAlert();

    // Screen shake visual punch
    document.body.classList.add('screen-shake');
    setTimeout(() => document.body.classList.remove('screen-shake'), 600);

    const scenario = this.currentActivity.bustScenario;
    if (!scenario) {
      this.handleBailSafe();
      return;
    }

    gameState.tension.inBust = true;
    const actionsContainer = document.getElementById('tension-actions-stack');
    const interrogationContainer = document.getElementById('tension-interrogation-view');

    if (actionsContainer) actionsContainer.style.display = 'none';
    if (interrogationContainer) {
      interrogationContainer.style.display = 'flex';
      interrogationContainer.innerHTML = `
        <div class="interrogation-header">
          <div class="interrogation-portrait">
            ${getCharacterPortraitSvg('coordinator', 'strict', 72)}
          </div>
          <div>
            <strong class="interrogation-speaker" style="color: #f43f5e;">${scenario.speaker}</strong>
            <h4 class="interrogation-title">${scenario.title}</h4>
          </div>
        </div>

        <div class="interrogation-prompt">${scenario.prompt}</div>

        <div class="interrogation-branches-stack">
          ${scenario.alibiBranches.map((branch, idx) => `
            <button class="btn btn-secondary alibi-branch-btn" data-branch-idx="${idx}">
              <div style="font-weight: 700; text-align: left;">${branch.label}</div>
              ${branch.skillReq ? `<span class="badge" style="font-size: 0.72rem; align-self: flex-start; margin-top: 4px;">Requires: ${branch.skillReq.label} ${branch.skillReq.min}+</span>` : ''}
            </button>
          `).join('')}
        </div>
      `;

      const branchBtns = interrogationContainer.querySelectorAll('.alibi-branch-btn');
      branchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.getAttribute('data-branch-idx'), 10);
          this.resolveAlibiBranch(scenario.alibiBranches[idx]);
        });
      });
    }
  }

  resolveAlibiBranch(branch) {
    if (this.isResolvingAlibi || !gameState.tension.inBust) return;
    this.isResolvingAlibi = true;

    // Immediately disable all branch buttons
    const interrogationContainer = document.getElementById('tension-interrogation-view');
    if (interrogationContainer) {
      const branchBtns = interrogationContainer.querySelectorAll('.alibi-branch-btn');
      branchBtns.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
      });
    }

    audio.playClick();
    let passed = true;

    if (branch.skillReq) {
      const curVal = gameState.stats[branch.skillReq.stat] || 0;
      passed = curVal >= branch.skillReq.min;
    }

    if (branch.requiresNpc) {
      const aff = gameState.relationships[branch.requiresNpc.id] || 0;
      passed = aff >= branch.requiresNpc.minAffection;
    }

    const feedbackText = passed ? branch.successFeedback : branch.failFeedback;

    if (passed) {
      audio.playStatGain();
      if (branch.successDeltas) {
        Object.entries(branch.successDeltas).forEach(([stat, delta]) => {
          gameState.modifyStat(stat, delta, 'Alibi defense outcome');
        });
      }
      if (branch.affectionCost) {
        gameState.modifyAffection(branch.affectionCost.npcId, branch.affectionCost.delta);
      }
      statEvents.emit('toast', {
        message: 'Crisis Defused! You managed to avoid a documented strike.',
        type: 'success'
      });
    } else {
      audio.playStrikeAlert();
      if (branch.failViolation) {
        const strikeResult = ViolationSystem.processViolation(branch.failViolation, gameState, rng);
        if (strikeResult.isEarlyReturn) {
          statEvents.emit('endingReached', {
            endingId: 'early_return_rule',
            reason: `Expelled after critical violation: ${branch.failViolation.desc}`
          });
          this.closeModal();
          return;
        }
      }
    }

    SaveSystem.save('auto', true);

    if (interrogationContainer) {
      interrogationContainer.innerHTML = `
        <div class="interrogation-outcome-card ${passed ? 'outcome-pass' : 'outcome-fail'}">
          <h4>${passed ? 'Suspicion Evaded' : 'Violation Documented!'}</h4>
          <p>${feedbackText}</p>
          <button id="btn-finish-tension" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">
            Continue Exchange Journey
          </button>
        </div>
      `;

      const btnFinish = document.getElementById('btn-finish-tension');
      if (btnFinish) {
        btnFinish.addEventListener('click', () => {
          if (this.isFinishing) return;
          this.isFinishing = true;
          btnFinish.disabled = true;
          this.closeModal();
          if (this.onCompleteCallback) {
            const cb = this.onCompleteCallback;
            this.onCompleteCallback = null;
            cb();
          }
        });
      }
    }
  }

  closeModal() {
    this.stopHeartbeatAudio();
    gameState.tension.active = false;
    gameState.tension.inBust = false;
    this.isProcessingRound = false;
    this.isBailing = false;
    this.isResolvingAlibi = false;
    this.isFinishing = false;

    if (this.modal) {
      if (screenStack.activeOverlay === this.modal) {
        screenStack.closeOverlay();
      } else {
        this.modal.classList.remove('active');
      }
    }
  }
}

export const tensionEngine = new TensionEngine();
