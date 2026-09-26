// Weekly Engine: 40-Week Academic Year Lifecycle, Strategic Energy Allocation & Stat Entropy
import { gameState } from './gameState.js';
import { statEvents } from './statEvents.js';
import { audio } from './audio.js';
import { i18n } from './i18n/i18n.js';
import { getIconSvg } from './data/icons.js';
import { COUNTRIES } from './data/countries.js';
import { rng } from './rng.js';

export const FOCUS_ACTIONS = [
  {
    id: 'focus_study',
    iconKey: 'academics',
    titleKey: 'weekly.focus_study_title',
    descKey: 'weekly.focus_study_desc',
    hotkey: '1',
    deltas: { academics: 6, happiness: -5, hostFamilyBond: -4 },
    cost: 0
  },
  {
    id: 'focus_social',
    iconKey: 'social',
    titleKey: 'weekly.focus_social_title',
    descKey: 'weekly.focus_social_desc',
    hotkey: '2',
    deltas: { social: 6, adaptation: 3, academics: -4 },
    cost: 18
  },
  {
    id: 'focus_family',
    iconKey: 'hostFamilyBond',
    titleKey: 'weekly.focus_family_title',
    descKey: 'weekly.focus_family_desc',
    hotkey: '3',
    deltas: { hostFamilyBond: 7, happiness: 3, social: -5, academics: -3 },
    cost: 0
  },
  {
    id: 'focus_rest',
    iconKey: 'happiness',
    titleKey: 'weekly.focus_rest_title',
    descKey: 'weekly.focus_rest_desc',
    hotkey: '4',
    deltas: { happiness: 8, adaptation: -4, social: -3 },
    cost: 0
  },
  {
    id: 'focus_work',
    iconKey: 'finance',
    titleKey: 'weekly.focus_work_title',
    descKey: 'weekly.focus_work_desc',
    hotkey: '5',
    deltas: { academics: -5, happiness: -4 },
    cashGain: 35,
    cost: 0,
    requiresSelfPaidOrLowCash: true
  }
];

export const MILESTONES = {
  10: { id: 'midterms',       titleKey: 'weekly.milestone_w10_title', descKey: 'weekly.milestone_w10_desc', icon: 'academics' },
  12: { id: 'iew',            titleKey: 'weekly.milestone_w12_title', descKey: 'weekly.milestone_w12_desc', icon: 'globe' },
  17: { id: 'winter_holidays',titleKey: 'weekly.milestone_w17_title', descKey: 'weekly.milestone_w17_desc', icon: 'snowflake' },
  20: { id: 'po_review',      titleKey: 'weekly.milestone_w20_title', descKey: 'weekly.milestone_w20_desc', icon: 'backlog' },
  25: { id: 'spring_break',   titleKey: 'weekly.milestone_w25_title', descKey: 'weekly.milestone_w25_desc', icon: 'calendar' },
  30: { id: 'prom',           titleKey: 'weekly.milestone_w30_title', descKey: 'weekly.milestone_w30_desc', icon: 'sparkles' },
  35: { id: 'finals',         titleKey: 'weekly.milestone_w35_title', descKey: 'weekly.milestone_w35_desc', icon: 'journal' },
  37: { id: 'graduation',     titleKey: 'weekly.milestone_w37_title', descKey: 'weekly.milestone_w37_desc', icon: 'diploma' },
  40: { id: 'farewell',       titleKey: 'weekly.milestone_w40_title', descKey: 'weekly.milestone_w40_desc', icon: 'plane' }
};

export class WeeklyEngine {
  // Returns current term (1..4) for a given week (1..40)
  static getTermForWeek(week) {
    if (week <= 10) return 1;
    if (week <= 20) return 2;
    if (week <= 30) return 3;
    return 4;
  }

  // Returns term details (name key, dates, theme)
  static getTermDetails(term) {
    switch (term) {
      case 1:
        return { term: 1, nameKey: 'weekly.term_1_name', range: 'Wk 1–10', season: 'autumn', color: '#60a5fa' };
      case 2:
        return { term: 2, nameKey: 'weekly.term_2_name', range: 'Wk 11–20', season: 'winter', color: '#818cf8' };
      case 3:
        return { term: 3, nameKey: 'weekly.term_3_name', range: 'Wk 21–30', season: 'spring', color: '#34d399' };
      case 4:
      default:
        return { term: 4, nameKey: 'weekly.term_4_name', range: 'Wk 31–40', season: 'summer', color: '#fbbf24' };
    }
  }

  // Returns season for environmental ambient
  static getSeasonForWeek(week) {
    if (week <= 13) return 'autumn';
    if (week <= 24) return 'winter';
    if (week <= 34) return 'spring';
    return 'summer';
  }

  // Checks if a week is a designated milestone
  static getMilestoneForWeek(week) {
    return MILESTONES[week] || null;
  }

  // Applies chosen weekly focus action
  static processWeeklyFocus(actionId) {
    const action = FOCUS_ACTIONS.find(a => a.id === actionId);
    if (!action) return null;

    const deltasApplied = {};

    // Apply stat deltas
    if (action.deltas) {
      Object.entries(action.deltas).forEach(([stat, val]) => {
        gameState.modifyStat(stat, val, i18n.t(action.titleKey));
        deltasApplied[stat] = val;
      });
    }

    // Cash cost (e.g. going out for socializing)
    if (action.cost > 0) {
      gameState.modifyStat('finance', -action.cost, i18n.t(action.titleKey));
      deltasApplied.finance = (deltasApplied.finance || 0) - action.cost;
    }

    // Cash gain (odd jobs)
    if (action.cashGain > 0) {
      gameState.modifyStat('finance', action.cashGain, i18n.t(action.titleKey));
      deltasApplied.finance = (deltasApplied.finance || 0) + action.cashGain;

      // Informal warning risk for unauthorized work (10%)
      if (rng.next() < 0.10) {
        statEvents.emit('toast', {
          message: i18n.t('weekly.work_warning_toast'),
          type: 'warning'
        });
        gameState.modifyStat('happiness', -5, 'PO Inquiry');
      }
    }

    // Record focus in history
    if (!gameState.meta.weeklyFocusHistory) {
      gameState.meta.weeklyFocusHistory = [];
    }
    gameState.meta.weeklyFocusHistory.push({
      week: gameState.meta.week,
      actionId,
      deltas: deltasApplied
    });

    return {
      action,
      deltasApplied
    };
  }

  // Applies weekly natural entropy (stat attrition & cost of living)
  static applyWeeklyEntropy() {
    const dest = COUNTRIES[gameState.player.destCountry] || COUNTRIES.usa;
    const academicAttrition = (dest.academicRigor >= 8) ? -3 : -2;

    const entropyDeltas = {
      academics: academicAttrition,
      hostFamilyBond: -2,
      social: -2,
      finance: -12
    };

    // Apply attrition
    Object.entries(entropyDeltas).forEach(([stat, val]) => {
      gameState.modifyStat(stat, val, 'Weekly Living & Academic Entropy');
    });

    // Check scholarship standing if funded
    if (gameState.player.fundingType === 'funded') {
      if (gameState.stats.academics < 75) {
        gameState.flags.scholarship_warned = (gameState.flags.scholarship_warned || 0) + 1;
        if (gameState.flags.scholarship_warned === 1) {
          statEvents.emit('toast', {
            message: i18n.t('weekly.scholarship_gpa_warning_toast'),
            type: 'danger'
          });
        }
      }
    }

    return entropyDeltas;
  }

  // Advances game week counter and updates metadata
  static advanceWeek() {
    const currentWeek = gameState.meta.week || 1;
    const nextWeek = currentWeek + 1;

    gameState.meta.week = nextWeek;
    gameState.meta.weekEventIndex = 0;
    gameState.meta.term = this.getTermForWeek(nextWeek);
    gameState.meta.season = this.getSeasonForWeek(nextWeek);
    gameState.meta.isMilestoneWeek = !!this.getMilestoneForWeek(nextWeek);

    // Also update month equivalent for backwards compatibility
    gameState.meta.month = Math.min(12, Math.floor((nextWeek - 1) / 3.33) + 1);

    // Tick temporary status modifiers
    gameState.tickModifiers();

    // Emit weekChanged event
    statEvents.emit('weekChanged', {
      week: nextWeek,
      term: gameState.meta.term,
      season: gameState.meta.season,
      isMilestone: gameState.meta.isMilestoneWeek
    });

    return nextWeek;
  }
}
