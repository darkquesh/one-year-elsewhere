// Save / Load System: 3 Manual Slots + Autosave, Atomic Double-Key Writes, Versioned Migration
import { gameState, CURRENT_SCHEMA_VERSION } from './gameState.js';
import { statEvents } from './statEvents.js';

const SAVE_PREFIX = 'esc_save_';
const AUTOSAVE_KEY = 'esc_autosave';

export class SaveSystem {
  static getSlotKey(slot) {
    if (slot === 'auto' || slot === 'autosave') return AUTOSAVE_KEY;
    return `${SAVE_PREFIX}${slot}`;
  }

  static atomicWrite(key, dataString) {
    try {
      // 1. Write to staging key
      localStorage.setItem(`${key}_staging`, dataString);
      // 2. Backup current live save
      const prev = localStorage.getItem(key);
      if (prev) {
        localStorage.setItem(`${key}_bak`, prev);
      }
      // 3. Promote staging to live
      localStorage.setItem(key, dataString);
      localStorage.removeItem(`${key}_staging`);
      return true;
    } catch (e) {
      console.error('[SaveSystem] Atomic write error:', e);
      return false;
    }
  }

  static atomicRead(key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('[SaveSystem] Primary save corrupted, attempting backup restore...', e);
      try {
        const bak = localStorage.getItem(`${key}_bak`);
        if (bak) return JSON.parse(bak);
      } catch (bakErr) {
        console.error('[SaveSystem] Backup save also corrupted:', bakErr);
      }
    }
    return null;
  }

  static save(slot = 0, silent = false) {
    const key = this.getSlotKey(slot);
    const json = gameState.serialize();
    const success = this.atomicWrite(key, json);

    if (success && !silent) {
      statEvents.emit('toast', {
        message: slot === 'auto' ? 'Autosaved' : `Saved to Slot ${slot + 1}`,
        type: 'info'
      });
    }
    return success;
  }

  static load(slot = 0, silent = false) {
    const key = this.getSlotKey(slot);
    const data = this.atomicRead(key);
    if (!data) return false;

    const migrated = this.migrate(data);
    gameState.deserialize(migrated);

    if (!silent) {
      statEvents.emit('toast', {
        message: `Loaded Slot ${slot === 'auto' ? 'Autosave' : slot + 1}`,
        type: 'info'
      });
    }
    return true;
  }

  static hasSave(slot = 0) {
    const key = this.getSlotKey(slot);
    return !!localStorage.getItem(key);
  }

  static getSaveMeta(slot = 0) {
    const data = this.atomicRead(this.getSlotKey(slot));
    if (!data) return null;
    return {
      week: data.meta?.week || ((data.meta?.month || 1) - 1) * 4 + 1,
      month: data.meta?.month || 1,
      term: data.meta?.term || 1,
      homeCountry: data.player?.homeCountry || 'Unknown',
      destCountry: data.player?.destCountry || 'Unknown',
      savedAt: data.meta?.savedAt ? new Date(data.meta.savedAt).toLocaleDateString() : 'Unknown'
    };
  }

  // Versioned migration chain
  static migrate(data) {
    let v = data.version || 1;
    while (v < CURRENT_SCHEMA_VERSION) {
      if (v === 1) {
        data.po = data.po || { id: 'po_suburban_mod', location: 'suburban', strictness: 'moderate', rules: [] };
        v = 2;
      } else if (v === 2) {
        data.violations = data.violations || { strikeCount: 0, history: [] };
        v = 3;
      } else if (v === 3) {
        data.player = data.player || {};
        data.player.grade = data.player.grade || 11;
        data.player.diplomaEligible = data.player.diplomaEligible || false;
        v = 4;
      } else if (v === 4) {
        data.meta = data.meta || {};
        const oldMonth = data.meta.month || 1;
        data.meta.week = data.meta.week || Math.min(40, (oldMonth - 1) * 4 + 1);
        data.meta.maxWeeks = 40;
        data.meta.term = Math.min(4, Math.floor((data.meta.week - 1) / 10) + 1);
        data.meta.season = data.meta.season || 'autumn';
        data.meta.weekEventIndex = data.meta.weekEventIndex || 0;
        data.meta.weekTotalEvents = data.meta.weekTotalEvents || 2;
        v = 5;
      } else if (v === 5) {
        data.rpg = data.rpg || {
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
        v = 6;
      } else if (v === 6) {
        data.phone = data.phone || { unreadCount: 1, activeChat: 'group_exchange', repliedThreads: [] };
        data.relationships = data.relationships || { maya: 15, julian: 20, chloe: 15, leo: 10 };
        data.clocks = data.clocks || { coordinatorScrutiny: 0, burnoutCount: 0, promWeeksLeft: 10 };
        data.tension = data.tension || { active: false, currentDanger: 0, currentActivityId: null, inBust: false };
        data.map = data.map || { activeLocation: 'loc_quad', visitedLocations: ['loc_quad'] };
        v = 7;
      }
      data.version = v;
    }
    return data;
  }
}
