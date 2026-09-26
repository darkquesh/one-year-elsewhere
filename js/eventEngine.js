// Event Engine: 40-Week Event Sequencing, Branching Decisions & Stat Resolution
import { EVENTS } from './data/eventsData.js';
import { gameState } from './gameState.js';
import { dialogueRunner } from './dialogueRunner.js';
import { ViolationSystem } from './violations.js';
import { audio } from './audio.js';
import { rng } from './rng.js';
import { statEvents } from './statEvents.js';
import { getIconSvg } from './data/icons.js';
import { WeeklyEngine, MILESTONES } from './weeklyEngine.js';
import { rpgEngine } from './rpgEngine.js';

export class EventEngine {
  constructor() {
    this.currentEvent = null;
    this.choicesContainer = null;
    this.onTurnCompleteCallback = null;
  }

  init(choicesContainerEl, onTurnComplete) {
    this.choicesContainer = choicesContainerEl;
    this.onTurnCompleteCallback = onTurnComplete;
  }

  // Load and display event for a given week (1..40) and event index within the week
  loadWeekEvent(week, eventIdx = 0) {
    const dest = gameState.player.destCountry;
    const home = gameState.player.homeCountry;
    const monthEquiv = Math.min(12, Math.floor((week - 1) / 3.33) + 1);
    const prevEventId = this.currentEvent ? this.currentEvent.id : null;

    // Helper to evaluate conditions
    const satisfiesConditions = (e) => {
      if (!e.conditions) return true;
      const c = e.conditions;
      if (c.minAcademics !== undefined && gameState.stats.academics < c.minAcademics) return false;
      if (c.maxAcademics !== undefined && gameState.stats.academics > c.maxAcademics) return false;
      if (c.minHappiness !== undefined && gameState.stats.happiness < c.minHappiness) return false;
      if (c.maxHappiness !== undefined && gameState.stats.happiness > c.maxHappiness) return false;
      if (c.minHostFamilyBond !== undefined && gameState.stats.hostFamilyBond < c.minHostFamilyBond) return false;
      if (c.maxHostFamilyBond !== undefined && gameState.stats.hostFamilyBond > c.maxHostFamilyBond) return false;
      if (c.minSocial !== undefined && gameState.stats.social < c.minSocial) return false;
      if (c.maxSocial !== undefined && gameState.stats.social > c.maxSocial) return false;
      if (c.minAdaptation !== undefined && gameState.stats.adaptation < c.minAdaptation) return false;
      if (c.maxAdaptation !== undefined && gameState.stats.adaptation > c.maxAdaptation) return false;
      if (c.fundingType && gameState.player.fundingType !== c.fundingType) return false;
      if (c.minStrikes !== undefined && gameState.violations.strikeCount < c.minStrikes) return false;
      if (c.flag && !gameState.flags[c.flag]) return false;
      if (c.notFlag && gameState.flags[c.notFlag]) return false;
      return true;
    };

    // 1. Check for dedicated Crucible Milestone for this week (prioritized on event 0)
    const milestoneDef = MILESTONES[week];
    if (milestoneDef && eventIdx === 0) {
      const milestoneEvent = EVENTS.find(e => 
        (e.isMilestone && e.milestoneId === milestoneDef.id) ||
        (e.weeks && Array.isArray(e.weeks) && e.weeks.includes(week) && e.isMilestone)
      );
      if (milestoneEvent && !gameState.seenEvents.includes(milestoneEvent.id)) {
        this.currentEvent = milestoneEvent;
        gameState.seenEvents.push(milestoneEvent.id);
        console.log(`[EventEngine] Week ${week} Event ${eventIdx + 1} Milestone Triggered: "${milestoneEvent.title}" (${milestoneEvent.id})`);
        this.renderCurrentEvent();
        return;
      }
    }

    // 2. Gather candidates matching week, month equivalent, and country
    let candidates = EVENTS.filter(e => {
      // Milestone events should not appear outside their milestone weeks or on eventIdx > 0
      if (e.isMilestone && (!e.weeks || !e.weeks.includes(week) || eventIdx > 0)) return false;

      // Do not repeat the immediate preceding event in the same week
      if (prevEventId && e.id === prevEventId) return false;

      // Week / Month match check
      const matchesWeek = (e.weeks && Array.isArray(e.weeks) && e.weeks.includes(week)) ||
                          (e.week !== undefined && e.week === week);
      const matchesMonth = (e.months && Array.isArray(e.months) && e.months.includes(monthEquiv)) ||
                           (e.month !== undefined && e.month === monthEquiv);
      const isGeneral = !e.weeks && !e.months && e.week === undefined && e.month === undefined;

      if (!matchesWeek && !matchesMonth && !isGeneral) return false;

      // Country match check
      if (e.countries && Array.isArray(e.countries) && e.countries.length > 0) {
        if (!e.countries.includes(dest)) return false;
      }

      // Home country exclusion
      if (e.excludeHomeCountries && Array.isArray(e.excludeHomeCountries) && e.excludeHomeCountries.includes(home)) {
        return false;
      }

      // Condition check
      return satisfiesConditions(e);
    });

    // Fallback if no matching candidates found
    if (candidates.length === 0) {
      candidates = EVENTS.filter(e => {
        if (e.isMilestone) return false;
        if (prevEventId && e.id === prevEventId) return false;
        const matchesMonth = (e.months && Array.isArray(e.months) && e.months.includes(monthEquiv)) ||
                             (e.month !== undefined && e.month === monthEquiv);
        return matchesMonth || (!e.weeks && !e.months);
      });
      if (candidates.length === 0) {
        candidates = EVENTS.filter(e => !e.isMilestone && (!prevEventId || e.id !== prevEventId));
      }
      if (candidates.length === 0) {
        candidates = EVENTS.filter(e => !e.isMilestone);
      }
    }

    // 3. Separate into unseen vs seen events to prevent repetition
    const unseen = candidates.filter(e => !gameState.seenEvents.includes(e.id));
    const activePool = unseen.length > 0 ? unseen : candidates;

    // 4. Weighted Random Pick
    const totalWeight = activePool.reduce((sum, e) => {
      let w = e.weight || 10;
      if (e.isCrisis) w += 15;
      if (e.weeks && e.weeks.includes(week)) w += 8;
      if (e.countries && e.countries.includes(dest)) w += 6;
      return sum + w;
    }, 0);

    let roll = rng.next() * totalWeight;
    let selected = activePool[0];

    for (const e of activePool) {
      let w = e.weight || 10;
      if (e.isCrisis) w += 15;
      if (e.weeks && e.weeks.includes(week)) w += 8;
      if (e.countries && e.countries.includes(dest)) w += 6;
      roll -= w;
      if (roll <= 0) {
        selected = e;
        break;
      }
    }

    this.currentEvent = selected;

    // Track seen events in gameState
    if (!gameState.seenEvents.includes(this.currentEvent.id)) {
      gameState.seenEvents.push(this.currentEvent.id);
    }

    console.log(`[EventEngine] Week ${week} Event ${eventIdx + 1} drawn: "${this.currentEvent.title}" (${this.currentEvent.id}) from ${activePool.length} active candidates (${unseen.length} fresh).`);

    this.renderCurrentEvent();
  }

  // Legacy Month-based wrapper
  loadMonthEvent(month) {
    const week = Math.min(40, (month - 1) * 3 + 1);
    this.loadWeekEvent(week);
  }

  renderCurrentEvent() {
    if (!this.currentEvent) return;

    if (this.choicesContainer) {
      this.choicesContainer.innerHTML = '';
      this.choicesContainer.style.display = 'none';
    }

    // Combine speaker and event title for rich visual clarity
    const speakerDisplay = this.currentEvent.title
      ? `${this.currentEvent.speaker} • ${this.currentEvent.title}`
      : this.currentEvent.speaker;

    // Run dialogue typewriter
    dialogueRunner.showDialogue(
      speakerDisplay,
      this.currentEvent.text,
      () => this.renderChoices()
    );
  }

  renderChoices() {
    if (!this.currentEvent || !this.choicesContainer) return;

    this.choicesContainer.innerHTML = '';
    this.choicesContainer.style.display = 'flex';

    const promptEl = document.getElementById('dialogue-prompt');
    if (promptEl) {
      promptEl.textContent = `[Choose an Option (1–${this.currentEvent.choices.length}) Below]`;
    }

    this.currentEvent.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.setAttribute('data-choice-idx', index);

      // Hotkey badge [1], [2], etc.
      const hotkeyBadge = `<span class="hotkey-badge">${index + 1}</span>`;

      // RPG Skill Requirement / Approach Badges (Never reveal raw stat delta numbers!)
      let rpgBadgeHtml = '';
      if (choice.skillReq) {
        const curVal = gameState.stats[choice.skillReq.stat] || 0;
        const passed = curVal >= choice.skillReq.min;
        if (passed) {
          rpgBadgeHtml = `<span class="badge rpg-skill-badge met">${getIconSvg('check', 12)} ${choice.skillReq.label} ${choice.skillReq.min}+</span>`;
        } else {
          rpgBadgeHtml = `<span class="badge rpg-skill-badge unmet">${getIconSvg('lock', 12)} ${choice.skillReq.label} ${choice.skillReq.min}+</span>`;
          btn.classList.add('choice-locked');
          btn.title = `${choice.skillReq.label} ${choice.skillReq.min}+ required (Your current ${choice.skillReq.label}: ${curVal})`;
        }
      } else if (choice.approach) {
        rpgBadgeHtml = `<span class="badge rpg-style-badge">${choice.approach}</span>`;
      }

      btn.innerHTML = `
        <div class="choice-content">
          ${hotkeyBadge}
          <span>${choice.text}</span>
        </div>
        <div class="choice-rpg-badges">
          ${rpgBadgeHtml}
        </div>
      `;

      btn.addEventListener('click', () => this.handleChoiceSelect(choice, index));
      this.choicesContainer.appendChild(btn);
    });

    // Focus first available choice for keyboard navigation
    const firstBtn = this.choicesContainer.querySelector('.choice-btn:not(.choice-locked)') ||
                     this.choicesContainer.querySelector('.choice-btn');
    if (firstBtn) firstBtn.focus();
  }

  handleChoiceSelect(choice, index) {
    audio.playClick();

    // RPG Skill Check Enforcement
    if (choice.skillReq) {
      const currentVal = gameState.stats[choice.skillReq.stat] || 0;
      if (currentVal < choice.skillReq.min) {
        audio.playStatLoss();
        statEvents.emit('toast', {
          message: `${choice.skillReq.label} ${choice.skillReq.min}+ required (Current: ${currentVal})`,
          type: 'danger'
        });
        if (this.choicesContainer) {
          this.choicesContainer.style.display = 'flex';
        }
        return;
      }
    }

    if (this.choicesContainer) {
      this.choicesContainer.style.display = 'none';
    }

    // RPG Perk Stat Multipliers
    const perks = gameState.rpg?.perks || [];
    const deltasToApply = { ...(choice.deltas || {}) };

    if (perks.includes('cram_master') && deltasToApply.academics && deltasToApply.academics > 0) {
      deltasToApply.academics = Math.round(deltasToApply.academics * 1.25);
    }
    if (perks.includes('polyglot') && deltasToApply.adaptation && deltasToApply.adaptation > 0) {
      deltasToApply.adaptation = Math.round(deltasToApply.adaptation * 1.25);
    }
    if (perks.includes('silver_tongue') && deltasToApply.social && deltasToApply.social > 0) {
      deltasToApply.social = Math.round(deltasToApply.social * 1.25);
    }
    if (perks.includes('family_favorite') && deltasToApply.hostFamilyBond && deltasToApply.hostFamilyBond > 0) {
      deltasToApply.hostFamilyBond = Math.round(deltasToApply.hostFamilyBond * 1.25);
    }

    // Apply stat changes
    if (Object.keys(deltasToApply).length > 0) {
      Object.entries(deltasToApply).forEach(([stat, delta]) => {
        gameState.modifyStat(stat, delta, choice.text);
      });
      if (Object.values(deltasToApply).some(v => v > 0)) {
        audio.playStatGain();
      } else {
        audio.playStatLoss();
      }
    }

    // Award RPG XP (Growth & Choice Loop)
    let xpGain = 35;
    if (choice.skillReq) xpGain += 25; // Bonus XP for succeeding at a skill check
    if (this.currentEvent?.isMilestone) xpGain += 50; // Milestone decision bonus
    rpgEngine.awardXP(xpGain, `Choice: ${choice.text.slice(0, 25)}...`);

    // Award Item / Keepsake if choice grants one
    if (choice.awardItem) {
      rpgEngine.awardItem(choice.awardItem);
    }

    // Financial cost deduction
    if (choice.cost && gameState.player.fundingType === 'selfpaid') {
      let costToDeduct = choice.cost;
      const passives = rpgEngine.getPassiveModifiers();
      if (passives.financeCostReduction) {
        costToDeduct = Math.max(1, costToDeduct - passives.financeCostReduction);
      }
      gameState.modifyStat('finance', -costToDeduct, 'Event choice expense');
    }

    // Flag setting
    if (choice.flagSet) {
      gameState.flags[choice.flagSet] = true;
    }

    // Record in journal
    const currentWk = gameState.meta.week || 1;
    gameState.addJournalEntry(currentWk, `[Week ${currentWk}] ${choice.text}`);

    // Check for violation risk
    if (choice.riskViolation) {
      const docResult = ViolationSystem.evaluateDocumentationRisk(choice.riskViolation, gameState.po, rng);
      if (docResult.isDocumented) {
        const violationData = {
          category: choice.riskViolation.category,
          severity: choice.riskViolation.severity,
          desc: choice.riskViolation.desc
        };
        const strikeResult = ViolationSystem.processViolation(violationData, gameState, rng);
        audio.playStrikeAlert();

        statEvents.emit('toast', {
          message: `Violation Documented! Strike ${strikeResult.strikeNum} issued.`,
          type: 'danger'
        });

        if (strikeResult.isEarlyReturn) {
          statEvents.emit('endingReached', {
            endingId: 'early_return_rule',
            reason: `Expelled after violation: ${violationData.desc}`
          });
          return;
        }
      }
    }

    // Show feedback narrative
    dialogueRunner.showDialogue(
      'Outcome',
      choice.feedback,
      () => {
        if (this.onTurnCompleteCallback) {
          this.onTurnCompleteCallback();
        }
      }
    );
  }

  getStatIcon(stat) {
    return getIconSvg(stat, 14, 'stat-icon-delta');
  }
}

export const eventEngine = new EventEngine();
