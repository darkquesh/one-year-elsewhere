// RPG Engine: Character Progression, Leveling Curve, Items & Quests System
// Implements patterns from .agents/skills/rpg/SKILL.md & references/stats-combat-quests.md

import { gameState } from './gameState.js';
import { statEvents } from './statEvents.js';
import { audio } from './audio.js';
import { i18n } from './i18n/i18n.js';
import { getIconSvg } from './data/icons.js';
import { RPG_LEVEL_TITLES, RPG_ITEMS, RPG_PERKS, RPG_QUESTS, getXPToNextLevel } from './data/rpgData.js';

export class RPGEngine {
  constructor() {
    this.activeTab = 'sheet'; // 'sheet' | 'inventory' | 'quests'
  }

  // Award XP to player, handle leveling up and notifications
  awardXP(amount, reason = '') {
    if (!gameState.rpg) return;

    gameState.rpg.xp += amount;
    console.log(`[RPGEngine] Gained +${amount} XP (${reason}). Current: ${gameState.rpg.xp}/${gameState.rpg.xpToNext}`);

    let leveledUp = false;
    while (gameState.rpg.level < 10 && gameState.rpg.xp >= gameState.rpg.xpToNext) {
      gameState.rpg.xp -= gameState.rpg.xpToNext;
      gameState.rpg.level += 1;
      gameState.rpg.xpToNext = getXPToNextLevel(gameState.rpg.level);
      gameState.rpg.skillPoints = (gameState.rpg.skillPoints || 0) + 1;
      gameState.rpg.title = RPG_LEVEL_TITLES[gameState.rpg.level] || 'rpg.title_10';
      leveledUp = true;

      // Small baseline stat boost upon leveling up
      gameState.modifyStat('happiness', 5, 'Level Up Joy');
      
      const titleName = i18n.t(gameState.rpg.title);
      statEvents.emit('toast', {
        message: i18n.t('rpg.level_up_toast', { level: gameState.rpg.level, title: titleName }),
        type: 'gain'
      });
    }

    if (leveledUp) {
      audio.playLevelUp();
      statEvents.emit('rpgLevelUp', { level: gameState.rpg.level, title: gameState.rpg.title });
    }

    statEvents.emit('rpgXPChanged', {
      xp: gameState.rpg.xp,
      xpToNext: gameState.rpg.xpToNext,
      level: gameState.rpg.level,
      delta: amount
    });

    this.checkQuests();
  }

  // Award an item to inventory
  awardItem(itemId) {
    if (!gameState.rpg) return;
    const item = RPG_ITEMS[itemId];
    if (!item) return;

    if (!gameState.rpg.inventory) gameState.rpg.inventory = [];
    if (gameState.rpg.inventory.includes(itemId)) return;

    gameState.rpg.inventory.push(itemId);
    audio.playItemGain();

    const itemName = i18n.t(item.nameKey);
    statEvents.emit('toast', {
      message: i18n.t('rpg.item_acquired_toast', { name: itemName }),
      type: 'info'
    });

    statEvents.emit('inventoryChanged', { itemId, item });
  }

  // Unlock an RPG perk using a skill point
  unlockPerk(perkId) {
    if (!gameState.rpg || (gameState.rpg.skillPoints || 0) <= 0) return false;
    const perk = RPG_PERKS[perkId];
    if (!perk) return false;

    if (!gameState.rpg.perks) gameState.rpg.perks = [];
    if (gameState.rpg.perks.includes(perkId)) return false;

    gameState.rpg.perks.push(perkId);
    gameState.rpg.skillPoints -= 1;
    audio.playStatGain();

    const perkName = i18n.t(perk.nameKey);
    statEvents.emit('toast', {
      message: i18n.t('rpg.perk_unlocked_toast', { name: perkName }),
      type: 'gain'
    });

    this.renderCharacterSheetModal();
    return true;
  }

  // Evaluate active side quests and main quest progress
  checkQuests() {
    if (!gameState.rpg) return;
    const sideProgress = gameState.rpg.quests?.side || [];

    RPG_QUESTS.side.forEach(questDef => {
      let stateEntry = sideProgress.find(q => q.id === questDef.id);
      if (!stateEntry) {
        stateEntry = { id: questDef.id, completed: false };
        if (!gameState.rpg.quests) gameState.rpg.quests = { main: {}, side: [] };
        if (!gameState.rpg.quests.side) gameState.rpg.quests.side = [];
        gameState.rpg.quests.side.push(stateEntry);
      }

      if (stateEntry.completed) return;

      let isDone = false;
      if (questDef.statKey) {
        const val = gameState.stats[questDef.statKey] || 0;
        if (val >= questDef.targetVal) {
          isDone = true;
        }
      } else if (questDef.specialCheck) {
        isDone = questDef.specialCheck(gameState);
      }

      if (isDone) {
        stateEntry.completed = true;
        this.awardXP(questDef.xpReward, `Completed Quest: ${i18n.t(questDef.titleKey)}`);
        audio.playStatGain();

        const questTitle = i18n.t(questDef.titleKey);
        statEvents.emit('toast', {
          message: i18n.t('rpg.quest_completed_toast', { title: questTitle, xp: questDef.xpReward }),
          type: 'gain'
        });
      }
    });
  }

  // Calculate passive modifiers from items and perks (Pattern 1: derive, recompute)
  getPassiveModifiers() {
    const mods = {
      academics: 0,
      social: 0,
      adaptation: 0,
      hostFamilyBond: 0,
      happiness: 0,
      financeCostReduction: 0
    };

    if (!gameState.rpg) return mods;

    // Items
    (gameState.rpg.inventory || []).forEach(itemId => {
      const item = RPG_ITEMS[itemId];
      if (item && item.passiveBonus) {
        Object.entries(item.passiveBonus).forEach(([k, v]) => {
          mods[k] = (mods[k] || 0) + v;
        });
      }
    });

    return mods;
  }

  // Render the unified Character Sheet / Inventory / Quest Log modal
  renderCharacterSheetModal() {
    const modal = document.getElementById('modal-character-sheet');
    if (!modal) return;

    const currentLevel = gameState.rpg?.level || 1;
    const currentXP = gameState.rpg?.xp || 0;
    const xpNeeded = gameState.rpg?.xpToNext || 100;
    const xpPercent = Math.min(100, Math.round((currentXP / xpNeeded) * 100));
    const title = i18n.t(gameState.rpg?.title || 'rpg.title_1');
    const skillPoints = gameState.rpg?.skillPoints || 0;
    const passives = this.getPassiveModifiers();

    // 1. Header Banner
    const lvlEl = document.getElementById('rpg-sheet-level');
    if (lvlEl) lvlEl.textContent = `${i18n.t('rpg.level_badge', { level: currentLevel })}`;

    const titleEl = document.getElementById('rpg-sheet-title');
    if (titleEl) titleEl.textContent = title;

    const xpTextEl = document.getElementById('rpg-sheet-xp-text');
    if (xpTextEl) xpTextEl.textContent = `${currentXP} / ${xpNeeded} XP (${xpPercent}%)`;

    const xpFillEl = document.getElementById('rpg-sheet-xp-fill');
    if (xpFillEl) xpFillEl.style.width = `${xpPercent}%`;

    const spBadge = document.getElementById('rpg-sheet-sp-badge');
    if (spBadge) {
      if (skillPoints > 0) {
        spBadge.style.display = 'inline-flex';
        spBadge.textContent = `${skillPoints} ${i18n.t('rpg.perk_points_available')}`;
      } else {
        spBadge.style.display = 'none';
      }
    }

    // 2. Tab: Character Sheet (Attributes + Perks)
    const statsContainer = document.getElementById('rpg-attributes-grid');
    if (statsContainer) {
      const stats = [
        { key: 'academics', name: i18n.t('hud.stat_academics'), val: gameState.stats.academics, icon: getIconSvg('academics', 15) },
        { key: 'social', name: i18n.t('hud.stat_social'), val: gameState.stats.social, icon: getIconSvg('social', 15) },
        { key: 'adaptation', name: i18n.t('hud.stat_adaptation'), val: gameState.stats.adaptation, icon: getIconSvg('adaptation', 15) },
        { key: 'hostFamilyBond', name: i18n.t('hud.stat_bond'), val: gameState.stats.hostFamilyBond, icon: getIconSvg('hostFamilyBond', 15) },
        { key: 'happiness', name: i18n.t('hud.stat_happiness'), val: gameState.stats.happiness, icon: getIconSvg('happiness', 15) },
        { key: 'finance', name: i18n.t('hud.stat_finance'), val: gameState.stats.finance, icon: getIconSvg('finance', 15) }
      ];

      statsContainer.innerHTML = stats.map(s => {
        const bonus = passives[s.key] ? ` <span style="color: #34d399; font-size: 0.75rem;">(+${passives[s.key]} gear)</span>` : '';
        return `
          <div class="glass-panel" style="padding: 0.65rem 0.85rem; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
              ${s.icon}
              <strong>${s.name}</strong>
            </div>
            <div style="font-family: var(--font-mono); font-weight: 700; font-size: 0.95rem;">
              ${s.val}${bonus}
            </div>
          </div>
        `;
      }).join('');
    }

    // Perks Grid
    const perksGrid = document.getElementById('rpg-perks-grid');
    if (perksGrid) {
      const unlocked = gameState.rpg?.perks || [];
      perksGrid.innerHTML = Object.values(RPG_PERKS).map(p => {
        const isUnlocked = unlocked.includes(p.id);
        const canUnlock = !isUnlocked && skillPoints > 0;
        const perkIcon = getIconSvg(p.icon, 18, 'icon-svg perk-icon');
        return `
          <div class="glass-panel ${isUnlocked ? 'perk-unlocked' : 'perk-locked'}" style="padding: 0.75rem; display: flex; flex-direction: column; gap: 0.35rem; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 0.9rem; display: flex; align-items: center; gap: 0.4rem;">
                <span style="color: var(--accent); display: flex;">${perkIcon}</span> ${i18n.t(p.nameKey)}
              </strong>
              ${isUnlocked
                ? `<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 0.7rem; display:flex; align-items:center; gap: 0.25rem;">${getIconSvg('check', 11)} ${i18n.t('rpg.perk_active')}</span>`
                : (canUnlock
                    ? `<button class="btn btn-primary btn-unlock-perk" data-perk="${p.id}" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">${i18n.t('rpg.unlock_btn')}</button>`
                    : `<span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-tertiary); font-size: 0.7rem; display:flex; align-items:center; gap: 0.25rem;">${getIconSvg('lock', 11)} ${i18n.t('rpg.locked_badge')}</span>`
                  )
              }
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.35;">${i18n.t(p.descKey)}</p>
          </div>
        `;
      }).join('');

      // Wire unlock buttons
      perksGrid.querySelectorAll('.btn-unlock-perk').forEach(btn => {
        btn.addEventListener('click', () => {
          this.unlockPerk(btn.dataset.perk);
        });
      });
    }

    // 3. Tab: Inventory & Keepsakes Grid
    const invGrid = document.getElementById('rpg-inventory-grid');
    if (invGrid) {
      const owned = gameState.rpg?.inventory || [];
      if (owned.length === 0) {
        invGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-tertiary); padding: 2rem;">${i18n.t('rpg.no_items')}</div>`;
      } else {
        invGrid.innerHTML = owned.map(id => {
          const item = RPG_ITEMS[id];
          if (!item) return '';
          let passiveLabel = '';
          if (item.passiveBonus) {
            passiveLabel = Object.entries(item.passiveBonus).map(([k, v]) => `+${v} ${k}`).join(', ');
          }
          const itemIcon = getIconSvg(item.icon || 'item', 28, 'icon-svg item-icon');
          return `
            <div class="glass-panel" style="padding: 0.85rem; display: flex; gap: 0.75rem; align-items: flex-start;">
              <span style="color: var(--accent); display: flex; flex-shrink: 0; padding-top: 2px;">${itemIcon}</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                  <strong style="font-size: 0.92rem; color: var(--text-primary);">${i18n.t(item.nameKey)}</strong>
                  <span class="badge" style="background: rgba(99, 102, 241, 0.15); color: var(--accent); font-size: 0.7rem;">${item.slot}</span>
                </div>
                <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 0.35rem;">${i18n.t(item.descKey)}</p>
                ${passiveLabel ? `<div style="font-family: var(--font-mono); font-size: 0.75rem; color: #34d399; font-weight: 600; display:flex; align-items:center; gap:0.3rem;">${getIconSvg('sparkles', 12)} ${passiveLabel}</div>` : ''}
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // 4. Tab: Quest Log
    const questList = document.getElementById('rpg-quests-list');
    if (questList) {
      const currentWeek = gameState.meta.week || 1;
      const currentTerm = Math.min(4, Math.floor((currentWeek - 1) / 10) + 1);

      // Main Quest Item
      const activeMainQuest = RPG_QUESTS.main.find(q => q.term === currentTerm) || RPG_QUESTS.main[0];
      const mainProgressPct = Math.min(100, Math.round(((currentWeek - (activeMainQuest.term - 1) * 10) / 10) * 100));

      let questsHtml = `
        <div style="margin-bottom: 1.25rem;">
          <h4 style="font-family: var(--font-ui); font-size: 0.85rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            ${i18n.t('rpg.main_quest_heading')}
          </h4>
          <div class="glass-panel" style="padding: 1rem; border-color: rgba(99, 102, 241, 0.3);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <strong style="font-size: 1rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.4rem;"><span style="color: var(--accent); display: inline-flex;">${getIconSvg('star', 16)}</span> ${i18n.t(activeMainQuest.titleKey)}</strong>
              <span class="badge" style="background: rgba(99, 102, 241, 0.2); color: var(--accent);">Term ${currentTerm}</span>
            </div>
            <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.6rem;">${i18n.t(activeMainQuest.descKey)}</p>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <div class="stat-track" style="flex: 1;"><div class="stat-fill adaptation" style="width: ${mainProgressPct}%;"></div></div>
              <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-secondary);">Wk ${currentWeek} / ${activeMainQuest.targetWeek}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 style="font-family: var(--font-ui); font-size: 0.85rem; color: #34d399; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            ${i18n.t('rpg.side_quests_heading')}
          </h4>
          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
      `;

      const sideStatus = gameState.rpg?.quests?.side || [];
      questsHtml += RPG_QUESTS.side.map(sq => {
        const isDone = sideStatus.some(s => s.id === sq.id && s.completed);
        let progressLabel = '';
        if (sq.statKey) {
          const curVal = gameState.stats[sq.statKey] || 0;
          progressLabel = `${curVal} / ${sq.targetVal}`;
        }
        const questIcon = getIconSvg(sq.icon || 'questlog', 20, 'icon-svg');

        return `
          <div class="glass-panel" style="padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="color: var(--accent); display: flex;">${questIcon}</span>
              <div>
                <strong style="font-size: 0.9rem; color: var(--text-primary);">${i18n.t(sq.titleKey)}</strong>
                <p style="font-size: 0.78rem; color: var(--text-secondary);">${i18n.t(sq.descKey)}</p>
              </div>
            </div>
            <div style="text-align: right; flex-shrink: 0;">
              ${isDone
                ? `<span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; display:flex; align-items:center; gap:0.25rem;">${getIconSvg('check', 11)} ${i18n.t('rpg.completed_badge')}</span>`
                : `<span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-tertiary);">${progressLabel}</span>`
              }
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent); margin-top: 2px;">+${sq.xpReward} XP</div>
            </div>
          </div>
        `;
      }).join('');

      questsHtml += `</div></div>`;
      questList.innerHTML = questsHtml;
    }
  }

  // Switch tabs in character sheet modal
  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('.rpg-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    document.querySelectorAll('.rpg-tab-pane').forEach(pane => {
      pane.style.display = pane.id === `rpg-tab-${tab}` ? 'block' : 'none';
    });
  }
}

export const rpgEngine = new RPGEngine();
