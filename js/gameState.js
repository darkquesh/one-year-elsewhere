// Central Game State Tree (Pure Serializable Data Only)
import { statEvents } from './statEvents.js';

export const CURRENT_SCHEMA_VERSION = 7;

export class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.version = CURRENT_SCHEMA_VERSION;
    this.meta = {
      savedAt: new Date().toISOString(),
      week: 1,             // Week 1 to 40
      maxWeeks: 40,
      weekEventIndex: 0,   // Current event index within the week (0, 1, ...)
      weekTotalEvents: 2,  // Multiple events per week
      term: 1,             // Term 1 to 4 (Fall, Winter, Spring, Departure)
      season: 'autumn',    // 'autumn', 'winter', 'spring', 'summer'
      isMilestoneWeek: false,
      month: 1,            // Backwards-compatible equivalent (Month 1 to 12)
      playtime: 0,
      currentEventId: null,// Active event being viewed (for perfect refresh restoration)
      seed: Date.now()
    };

    this.rpg = {
      level: 1,
      xp: 0,
      xpToNext: 100,
      title: 'rpg.title_1',
      skillPoints: 0,
      perks: [],
      inventory: ['pocket_dict', 'home_amulet'],
      quests: {
        main: { id: 'quest_term_1', term: 1 },
        side: []
      }
    };

    this.player = {
      name: 'Exchange Student',
      homeCountry: null,
      destCountry: null,
      programType: null,     // 'random' (Mode A) | 'priority' (Mode B)
      rankedChoices: [],     // Top 5 countries if Mode B
      fundingType: null,     // 'funded' | 'selfpaid'
      arrivalType: null,     // 'early' | 'ontime' | 'late'
      arrivalCountry: null,
      grade: 11,             // 9th, 10th, 11th, or 12th
      diplomaEligible: false // True if host school grants diplomas to exchange students
    };

    this.po = null;

    this.courses = {
      cores: ['core_language', 'core_history', 'core_pe'],
      electives: [],
      academicPressure: 50 // Calculated relative difficulty
    };

    this.stats = {
      academics: 70,
      finance: 60,
      happiness: 65,
      social: 50,
      adaptation: 45,
      hostFamilyBond: 60
    };

    this.statModifiers = []; // { stat, delta, monthsLeft, reason }
    this.violations = {
      strikeCount: 0,
      history: [] // { month, category, severity, outcome, desc }
    };

    this.flags = {
      iew_completed: false,
      applied_host_university: false,
      coordinator_trust_low: false,
      scholarship_warned: 0
    };

    this.journal = [
      { month: 1, text: 'Departed home airport with two packed suitcases and big dreams.' }
    ];

    this.seenEvents = [];
    this.settings = {
      theme: 'dark',
      textSpeed: 'normal',
      isMuted: false
    };

    // --- Modern Life-Sim State Extensions (Schema v7) ---
    this.phone = {
      unreadCount: 1,
      activeChat: 'group_exchange',
      repliedThreads: [], // Track thread IDs answered
      activeFeedPostIdx: 0
    };

    this.relationships = {
      maya: 15,
      julian: 20,
      chloe: 15,
      leo: 10
    };

    this.clocks = {
      coordinatorScrutiny: 0, // 0 to 4
      burnoutCount: 0,        // 0 to 4
      promWeeksLeft: 10
    };

    this.tension = {
      active: false,
      currentDanger: 0, // 0 to 100
      currentActivityId: null,
      inBust: false
    };

    this.map = {
      activeLocation: 'loc_quad',
      visitedLocations: ['loc_quad'],
      actionsTakenThisWeek: 0,
      maxActionsPerWeek: 1
    };
  }

  // Safe NPC affection modification [0, 100]
  modifyAffection(npcId, delta) {
    if (typeof this.relationships[npcId] === 'undefined') {
      this.relationships[npcId] = 10;
    }
    const oldVal = this.relationships[npcId];
    const newVal = Math.max(0, Math.min(100, oldVal + delta));
    this.relationships[npcId] = newVal;

    statEvents.emit('affectionChanged', {
      npcId,
      oldVal,
      newVal,
      delta: newVal - oldVal
    });

    return newVal;
  }

  // Safe stat mutation with bounds clamping [0, 100] and pub/sub notification
  modifyStat(stat, delta, reason = '') {
    if (typeof this.stats[stat] === 'undefined') return;

    const oldVal = this.stats[stat];
    const newVal = Math.max(0, Math.min(100, oldVal + delta));
    this.stats[stat] = newVal;

    statEvents.emit('statChanged', {
      stat,
      oldVal,
      newVal,
      delta: newVal - oldVal,
      reason
    });

    return newVal;
  }

  // Get effective stat (base + active modifiers)
  getEffectiveStat(stat) {
    const base = this.stats[stat] || 0;
    const modTotal = this.statModifiers
      .filter(m => m.stat === stat)
      .reduce((sum, m) => sum + m.delta, 0);
    return Math.max(0, Math.min(100, base + modTotal));
  }

  addModifier(stat, delta, monthsLeft, reason) {
    this.statModifiers.push({ stat, delta, monthsLeft, reason });
  }

  tickModifiers() {
    this.statModifiers.forEach(m => m.monthsLeft--);
    this.statModifiers = this.statModifiers.filter(m => m.monthsLeft > 0);
  }

  addJournalEntry(weekOrMonth, text) {
    const week = typeof weekOrMonth === 'number' ? weekOrMonth : (this.meta.week || 1);
    this.journal.push({
      week,
      month: Math.min(12, Math.floor((week - 1) / 3.33) + 1),
      text
    });
  }

  serialize() {
    this.meta.savedAt = new Date().toISOString();
    return JSON.stringify(this);
  }

  deserialize(jsonString) {
    try {
      const data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      this.version = data.version || CURRENT_SCHEMA_VERSION;
      this.meta = { ...this.meta, ...(data.meta || {}) };
      this.rpg = { ...this.rpg, ...(data.rpg || {}) };
      this.player = { ...this.player, ...(data.player || {}) };
      if (data.po !== undefined) this.po = data.po;
      this.courses = { ...this.courses, ...(data.courses || {}) };
      this.stats = { ...this.stats, ...(data.stats || {}) };
      this.statModifiers = data.statModifiers || [];
      this.violations = { ...this.violations, ...(data.violations || {}) };
      this.flags = { ...this.flags, ...(data.flags || {}) };
      this.journal = data.journal || this.journal;
      this.seenEvents = data.seenEvents || [];
      this.settings = { ...this.settings, ...(data.settings || {}) };
      this.phone = { ...this.phone, ...(data.phone || {}) };
      this.relationships = { ...this.relationships, ...(data.relationships || {}) };
      this.clocks = { ...this.clocks, ...(data.clocks || {}) };
      this.tension = { ...this.tension, ...(data.tension || {}) };
      this.map = {
        activeLocation: 'loc_quad',
        visitedLocations: ['loc_quad'],
        actionsTakenThisWeek: 0,
        maxActionsPerWeek: 1,
        ...(data.map || {})
      };
      return true;
    } catch (e) {
      console.error('[GameState] Deserialization failed:', e);
      return false;
    }
  }
}

export const gameState = new GameState();
