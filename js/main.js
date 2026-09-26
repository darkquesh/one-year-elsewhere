// Master Game Bootloader & Controller
import { COUNTRIES } from './data/countries.js';
import { HOME_COUNTRIES } from './data/homeCountries.js';
import { FLAGS, getFlagSvg } from './data/flags.js';
import { PO_LOCATIONS, PO_STRICTNESS, RULE_DEFINITIONS } from './data/poData.js';
import { COURSES } from './data/coursesData.js';
import { gameState } from './gameState.js';
import { screenStack } from './screenStack.js';
import { rng } from './rng.js';
import { audio } from './audio.js';
import { statEvents } from './statEvents.js';
import { dialogueRunner } from './dialogueRunner.js';
import { eventEngine } from './eventEngine.js';
import { SchoolSystem } from './school.js';
import { EndingsManager } from './endings.js';
import { SaveSystem } from './save.js';
import { setupInputListeners } from './input.js';
import { toggleFullscreen } from './platform.js';
import { getIconSvg } from './data/icons.js';
import { i18n } from './i18n/i18n.js';
import { WeeklyEngine, MILESTONES } from './weeklyEngine.js';
import { rpgEngine } from './rpgEngine.js';
import { phoneEngine } from './phoneEngine.js';
import { tensionEngine } from './tensionEngine.js';
import { mapEngine } from './mapEngine.js';

// Expose engines globally for debugging
window.gameState = gameState;
window.phoneEngine = phoneEngine;
window.tensionEngine = tensionEngine;
window.mapEngine = mapEngine;

export function getMonthDisplayName(month) {
  return i18n.t(`months.${month}`) || `Month ${month}`;
}

let appInitialized = false;
let autoSaveDebounceTimer = null;

export function triggerAutoSave() {
  const activeScreen = screenStack.peek();
  if (activeScreen === 'screen-game-loop') {
    clearTimeout(autoSaveDebounceTimer);
    autoSaveDebounceTimer = setTimeout(() => {
      SaveSystem.save('auto', true);
      localStorage.setItem('esc_active_screen', 'screen-game-loop');
    }, 250);
  }
}

function restoreActiveSession() {
  const activeScreen = localStorage.getItem('esc_active_screen');
  if (!activeScreen || activeScreen === 'screen-title') {
    updateSaveSlotLabels();
    return;
  }

  // Restore active 40-week game loop
  if (activeScreen === 'screen-game-loop' && SaveSystem.hasSave('auto')) {
    if (SaveSystem.load('auto', true)) {
      if (gameState.player && gameState.player.destCountry) {
        console.log('[App] Restoring active game session at week', gameState.meta.week);
        startGameLoop(true);
        statEvents.emit('toast', {
          message: 'Game session restored',
          type: 'info'
        });
        return;
      }
    }
  }

  // Restore onboarding screen if player refreshed during setup flow
  if (SaveSystem.hasSave('auto') && SaveSystem.load('auto', true)) {
    switch (activeScreen) {
      case 'screen-home-country':
        renderHomeCountryScreen();
        screenStack.push('screen-home-country');
        return;
      case 'screen-funding':
        renderFundingScreen();
        screenStack.push('screen-funding');
        return;
      case 'screen-program-type':
        renderProgramTypeScreen();
        screenStack.push('screen-program-type');
        return;
      case 'screen-envelope-reveal':
        renderModeAEnvelopeScreen();
        screenStack.push('screen-envelope-reveal');
        return;
      case 'screen-ranking':
        renderModeBRankingScreen();
        screenStack.push('screen-ranking');
        return;
      case 'screen-po':
        renderPOScreen();
        screenStack.push('screen-po');
        return;
      case 'screen-arrival':
        renderArrivalScreen();
        screenStack.push('screen-arrival');
        return;
      case 'screen-courses':
        renderCourseSelectionScreen();
        screenStack.push('screen-courses');
        return;
    }
  }

  // Fallback to title screen
  localStorage.setItem('esc_active_screen', 'screen-title');
  updateSaveSlotLabels();
}

function initApp() {
  if (appInitialized) return;
  appInitialized = true;

  i18n.init();
  initScreenRegistry();
  initThemeAndSettings();
  initHUD();
  setupInputListeners();
  bindUIEvents();
  restoreActiveSession();

  console.log('[App] Exchange Student Simulator initialized.');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ===========================================================================
// 1. SCREEN REGISTRY
// ===========================================================================
function initScreenRegistry() {
  const screenIds = [
    'screen-title',
    'screen-home-country',
    'screen-program-type',
    'screen-envelope-reveal',
    'screen-ranking',
    'screen-po',
    'screen-funding',
    'screen-arrival',
    'screen-courses',
    'screen-game-loop',
    'screen-ending'
  ];

  screenIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) screenStack.registerScreen(id, el);
  });
}

// ===========================================================================
// 2. THEME & SETTINGS
// ===========================================================================
function initThemeAndSettings() {
  const savedTheme = localStorage.getItem('esc_theme') || 'dark';
  document.documentElement.dataset.theme = savedTheme;

  const btnDark = document.getElementById('btn-theme-dark');
  const btnLight = document.getElementById('btn-theme-light');
  if (btnDark) btnDark.addEventListener('click', () => setTheme('dark'));
  if (btnLight) btnLight.addEventListener('click', () => setTheme('light'));

  // Language switcher controls
  document.querySelectorAll('.btn-lang').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      i18n.setLocale(lang);
      audio.playClick();
      syncLanguageButtons(lang);
    });
  });
  syncLanguageButtons(i18n.currentLocale);

  // Speed controls
  document.querySelectorAll('.btn-speed').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-speed').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      dialogueRunner.currentSpeed = btn.dataset.speed;
    });
  });

  // Audio controls in settings
  const btnAudio = document.getElementById('btn-toggle-audio');
  const btnMusic = document.getElementById('btn-toggle-music');
  const btnSfx = document.getElementById('btn-toggle-sfx');

  if (btnAudio) {
    btnAudio.addEventListener('click', () => {
      audio.init();
      audio.toggleMute();
      updateAudioSettingsButtons();
    });
  }

  if (btnMusic) {
    btnMusic.addEventListener('click', () => {
      audio.init();
      audio.toggleMusic();
      updateAudioSettingsButtons();
    });
  }

  if (btnSfx) {
    btnSfx.addEventListener('click', () => {
      audio.init();
      audio.toggleSfx();
      updateAudioSettingsButtons();
    });
  }

  updateAudioSettingsButtons();
  updateSaveSlotLabels();

  // Save / Load slot buttons
  document.querySelectorAll('.btn-save-slot').forEach(btn => {
    btn.addEventListener('click', () => {
      const slot = parseInt(btn.dataset.slot, 10);
      SaveSystem.save(slot);
    });
  });

  document.querySelectorAll('.btn-load-slot').forEach(btn => {
    btn.addEventListener('click', () => {
      const slot = parseInt(btn.dataset.slot, 10);
      if (SaveSystem.load(slot)) {
        screenStack.closeOverlay();
        startGameLoop();
      }
    });
  });
}

function updateAudioSettingsButtons() {
  const btnAudio = document.getElementById('btn-toggle-audio');
  const btnMusic = document.getElementById('btn-toggle-music');
  const btnSfx = document.getElementById('btn-toggle-sfx');

  if (btnAudio) {
    const isMuted = audio.isMuted;
    const icon = isMuted ? getIconSvg('audioOff', 15) : getIconSvg('audioOn', 15);
    const label = isMuted ? i18n.t('settings.master_audio_muted') : i18n.t('settings.master_audio_on');
    btnAudio.innerHTML = `${icon} <span style="vertical-align: middle; margin-left: 4px;">${label} [U]</span>`;
  }

  if (btnMusic) {
    const icon = getIconSvg('music', 15);
    const label = audio.musicEnabled ? i18n.t('settings.music_on') : i18n.t('settings.music_off');
    btnMusic.innerHTML = `${icon} <span style="vertical-align: middle; margin-left: 4px;">${label}</span>`;
  }

  if (btnSfx) {
    const icon = getIconSvg('bell', 15);
    const label = audio.sfxEnabled ? i18n.t('settings.sfx_on') : i18n.t('settings.sfx_off');
    btnSfx.innerHTML = `${icon} <span style="vertical-align: middle; margin-left: 4px;">${label}</span>`;
  }
}

function updateSaveSlotLabels() {
  document.querySelectorAll('.btn-save-slot').forEach(btn => {
    const slot = parseInt(btn.dataset.slot, 10) + 1;
    btn.textContent = i18n.t('settings.save_slot', { slot });
  });
  document.querySelectorAll('.btn-load-slot').forEach(btn => {
    btn.textContent = i18n.t('settings.load_slot');
  });
}

function syncLanguageButtons(lang) {
  document.querySelectorAll('.btn-lang').forEach(b => {
    if (b.dataset.lang === lang) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('esc_theme', theme);
  gameState.settings.theme = theme;
}

// ===========================================================================
// 3. REACTIVE HUD & NOTIFICATIONS
// ===========================================================================
function updateHUDStatLabels() {
  const statIconMap = {
    academics: 'academics',
    finance: 'finance',
    happiness: 'happiness',
    social: 'social',
    adaptation: 'adaptation',
    hostFamilyBond: 'hostFamilyBond'
  };

  Object.entries(statIconMap).forEach(([stat, iconName]) => {
    const itemEl = document.querySelector(`.stat-item[data-stat="${stat}"] .stat-name`);
    if (itemEl) {
      const label = i18n.t(`stats.${stat}`);
      itemEl.innerHTML = `${getIconSvg(iconName, 16, 'stat-icon')} ${label}`;
    }
  });
}

function refreshActiveScreenAndUI() {
  i18n.applyToDOM();
  updateHUDStatLabels();
  syncLanguageButtons(i18n.currentLocale);
  updateAudioSettingsButtons();
  updateSaveSlotLabels();

  const currentScreenId = screenStack.peek();
  if (currentScreenId === 'screen-home-country') {
    renderHomeCountryScreen();
  } else if (currentScreenId === 'screen-funding') {
    renderFundingScreen();
  } else if (currentScreenId === 'screen-program-type') {
    renderProgramTypeScreen();
  } else if (currentScreenId === 'screen-ranking') {
    renderModeBRankingScreen();
  } else if (currentScreenId === 'screen-po') {
    renderPOScreen();
  } else if (currentScreenId === 'screen-arrival') {
    renderArrivalScreen();
  } else if (currentScreenId === 'screen-courses') {
    renderCourseSelectionScreen();
  } else if (currentScreenId === 'screen-game-loop') {
    updateGameLoopHUD();
  }
}

function updateGameLoopHUD() {
  if (!gameState.player.destCountry) return;
  const dest = COUNTRIES[gameState.player.destCountry] || COUNTRIES.usa;
  const destNameEl = document.getElementById('hud-dest-name');
  if (destNameEl) destNameEl.textContent = dest.name;

  const gradeBadge = document.getElementById('hud-grade-badge');
  if (gradeBadge) gradeBadge.textContent = i18n.t('hud.grade_format', { grade: gameState.player.grade });

  const fundingBadge = document.getElementById('hud-funding-badge');
  if (fundingBadge) {
    fundingBadge.textContent = gameState.player.fundingType === 'funded' ? i18n.t('funding.scholarship_badge') : i18n.t('funding.selfpaid_badge');
  }

  const diplomaIcon = gameState.player.diplomaEligible ? getIconSvg('diploma', 14) : getIconSvg('certificate', 14);
  const diplomaLabel = gameState.player.diplomaEligible ? i18n.t('hud.diploma_eligible') : i18n.t('hud.attendance_cert');
  const diplomaEl = document.getElementById('hud-diploma-status');
  if (diplomaEl) {
    diplomaEl.innerHTML = `${diplomaIcon} <span style="vertical-align: middle; margin-left: 3px;">${diplomaLabel}</span>`;
  }

  const locEl = document.getElementById('hud-po-location');
  if (locEl && gameState.po) {
    locEl.textContent = i18n.t('hud.location', { loc: gameState.po.location.toUpperCase() });
  }

  const strictEl = document.getElementById('hud-po-strictness');
  if (strictEl && gameState.po) {
    strictEl.textContent = i18n.t('hud.coordinator', { strict: gameState.po.strictness.toUpperCase() });
  }

  const currentWeek = gameState.meta.week || 1;
  const currentTerm = WeeklyEngine.getTermForWeek(currentWeek);
  const termDetails = WeeklyEngine.getTermDetails(currentTerm);
  const currentEventIdx = (gameState.meta.weekEventIndex || 0) + 1;
  const totalEventsInWeek = gameState.meta.weekTotalEvents || 2;

  // Term Badge
  const termBadge = document.getElementById('hud-term-badge');
  if (termBadge) {
    termBadge.textContent = i18n.t(termDetails.nameKey);
    termBadge.style.color = termDetails.color;
  }

  // Week name display
  const hudWeekEl = document.getElementById('hud-week-name');
  if (hudWeekEl) {
    hudWeekEl.textContent = `${i18n.t('weekly.week_indicator', { week: currentWeek })} (${termDetails.range})`;
  }

  // Event Counter Pill
  const eventPill = document.getElementById('hud-event-pill');
  if (eventPill) {
    eventPill.textContent = i18n.t('weekly.event_counter', { current: currentEventIdx, total: totalEventsInWeek });
  }

  // Milestone indicator
  const milestone = WeeklyEngine.getMilestoneForWeek(currentWeek);
  const milestoneIndicator = document.getElementById('hud-milestone-indicator');
  if (milestoneIndicator) {
    if (milestone) {
      milestoneIndicator.style.display = 'inline-flex';
      milestoneIndicator.innerHTML = `${milestone.icon} ${i18n.t(milestone.titleKey)}`;
    } else {
      milestoneIndicator.style.display = 'none';
    }
  }

  // Render 40-segment timeline rail
  renderTimelineRail(currentWeek);

  const strikesBadge = document.getElementById('hud-strikes-badge');
  if (strikesBadge) {
    const strikeIcon = getIconSvg('strike', 13);
    strikesBadge.innerHTML = `${strikeIcon} <span style="vertical-align: middle; margin-left: 2px;">${i18n.t('hud.strikes_badge', { count: gameState.violations.strikeCount })}</span>`;
    if (gameState.violations.strikeCount >= 3) {
      strikesBadge.style.color = '#ef4444';
    } else {
      strikesBadge.style.color = '#34d399';
    }
  }

  // Update stats on both desktop and mobile strips
  Object.keys(gameState.stats).forEach(stat => {
    const val = gameState.stats[stat];
    const valEl = document.getElementById(`stat-val-${stat}`);
    const mobileValEl = document.getElementById(`mobile-stat-val-${stat}`);
    const barEl = document.getElementById(`stat-bar-${stat}`);
    if (valEl) valEl.textContent = val;
    if (mobileValEl) mobileValEl.textContent = val;
    if (barEl) barEl.style.width = `${val}%`;
  });

  // Update Narrative Progress Clocks (Citizen Sleeper / Blades in the Dark Style)
  const pipsScrutiny = document.getElementById('pips-scrutiny');
  if (pipsScrutiny) {
    const scrutinyLevel = Math.min(4, gameState.violations?.strikeCount || 0);
    const pips = pipsScrutiny.querySelectorAll('.pip');
    pips.forEach((pip, idx) => {
      pip.classList.toggle('filled', idx < scrutinyLevel);
    });
  }

  const valProm = document.getElementById('val-clock-prom');
  if (valProm) {
    const weeksToProm = Math.max(0, 33 - currentWeek);
    valProm.textContent = weeksToProm === 0 ? 'Tonight!' : `Wk 33 (${weeksToProm} wks)`;
  }

  const pipsBurnout = document.getElementById('pips-burnout');
  if (pipsBurnout) {
    const hap = gameState.stats.happiness || 65;
    const burnoutLevel = hap < 40 ? Math.min(4, Math.floor((50 - hap) / 10) + 1) : 0;
    const pips = pipsBurnout.querySelectorAll('.pip');
    pips.forEach((pip, idx) => {
      pip.classList.toggle('filled-blue', idx < burnoutLevel);
    });
  }

  // Update Smartphone Unread Badge
  if (phoneEngine && phoneEngine.updateNotificationBadge) {
    phoneEngine.updateNotificationBadge();
  }
}

function renderTimelineRail(currentWeek) {
  const rail = document.getElementById('timeline-rail');
  if (!rail) return;

  rail.innerHTML = '';
  for (let w = 1; w <= 40; w++) {
    const pip = document.createElement('div');
    pip.className = 'timeline-pip';
    pip.dataset.week = w;

    const isPast = w < currentWeek;
    const isActive = w === currentWeek;
    const milestone = WeeklyEngine.getMilestoneForWeek(w);

    if (isPast) pip.classList.add('past');
    if (isActive) pip.classList.add('active');
    if (milestone) {
      pip.classList.add('milestone');
      pip.setAttribute('title', `Wk ${w}: ${i18n.t(milestone.titleKey)}`);
    } else {
      pip.setAttribute('title', `Week ${w}`);
    }

    pip.onclick = () => {
      audio.playClick();
      statEvents.emit('toast', {
        message: milestone 
          ? `Week ${w}: ${i18n.t(milestone.titleKey)} — ${i18n.t(milestone.descKey)}`
          : `Week ${w} / 40 (${WeeklyEngine.getTermDetails(WeeklyEngine.getTermForWeek(w)).range})`,
        type: 'info'
      });
    };

    rail.appendChild(pip);
  }
}

function initHUD() {
  updateHUDStatLabels();

  // Inject vector SVG icons into quick toolbar buttons
  const toolbarMap = {
    'btn-quick-character': 'character',
    'btn-quick-quests': 'questlog',
    'btn-quick-backlog': 'backlog',
    'btn-quick-journal': 'journal',
    'btn-quick-save': 'save',
    'btn-quick-fullscreen': 'fullscreen',
    'btn-quick-settings': 'settings'
  };

  Object.entries(toolbarMap).forEach(([id, iconName]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.innerHTML = getIconSvg(iconName, 18);
    }
  });

  // Inject Vector SVGs into Modern Life-Sim DOM elements
  const modernIconMap = {
    'icon-quick-phone': 'phone',
    'icon-quick-map': 'map',
    'icon-clock-scrutiny': 'strike',
    'icon-clock-prom': 'heart',
    'icon-clock-burnout': 'snowflake',
    'icon-tab-chats': 'message',
    'icon-tab-feed': 'camera',
    'tension-icon-header': 'flame',
    'icon-map-header': 'mapPin'
  };

  Object.entries(modernIconMap).forEach(([id, name]) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = getIconSvg(name, 16);
    }
  });

  // Initialize Modern Life-Sim Engines
  const modalPhone = document.getElementById('modal-phone');
  if (modalPhone) phoneEngine.init(modalPhone);

  const modalTension = document.getElementById('modal-tension');
  if (modalTension) tensionEngine.init(modalTension);

  const modalMap = document.getElementById('modal-map');
  if (modalMap) mapEngine.init(modalMap);

  // Re-translate HUD and active screens when language changes
  statEvents.on('languageChanged', ({ locale }) => {
    refreshActiveScreenAndUI();
  });

  statEvents.on('statChanged', ({ stat, newVal, delta, reason }) => {
    const valEl = document.getElementById(`stat-val-${stat}`);
    const mobileValEl = document.getElementById(`mobile-stat-val-${stat}`);
    const barEl = document.getElementById(`stat-bar-${stat}`);
    const itemEl = document.querySelector(`.stat-item[data-stat="${stat}"]`);

    if (valEl) valEl.textContent = newVal;
    if (mobileValEl) mobileValEl.textContent = newVal;
    if (barEl) barEl.style.width = `${newVal}%`;

    if (itemEl) {
      if (newVal < 20) {
        itemEl.classList.add('critical');
      } else {
        itemEl.classList.remove('critical');
      }
      itemEl.classList.remove('anim-stat-pop');
      void itemEl.offsetWidth; // Trigger reflow
      itemEl.classList.add('anim-stat-pop');
    }

    // Spawn floating delta toast
    if (delta !== 0) {
      const statLabel = i18n.t(`stats.${stat}`) || stat.toUpperCase();
      showToast(`${statLabel} ${delta > 0 ? '+' : ''}${delta}`, delta > 0 ? 'gain' : 'loss');
    }
  });

  statEvents.on('toast', ({ message, type }) => {
    showToast(message, type);
  });

  statEvents.on('endingReached', ({ endingId, reason }) => {
    localStorage.removeItem('esc_active_screen');
    const ending = EndingsManager.evaluateEnding() || {
      id: endingId,
      badge: 'plane',
      title: 'Exchange Concluded',
      tagline: reason || 'Your exchange term has concluded.',
      description: 'Your exchange journey reached its epilogue.',
      statRequirements: reason
    };
    const endingWrapper = document.getElementById('ending-content-wrapper');
    EndingsManager.renderEndingScreen(endingWrapper, ending);
    screenStack.push('screen-ending');
  });

  statEvents.on('rpgXPChanged', ({ xp, xpToNext, level, delta }) => {
    updateRPGHUD(level, xp, xpToNext);
  });

  statEvents.on('rpgLevelUp', ({ level, title }) => {
    updateRPGHUD(level, gameState.rpg?.xp || 0, gameState.rpg?.xpToNext || 100);
    // Update level pill in character sheet header too
    const sheetLvlEl = document.getElementById('rpg-sheet-level');
    if (sheetLvlEl) sheetLvlEl.textContent = `Lvl ${level}`;
  });

  // Reactive auto-save on stats and progress
  statEvents.on('statChanged', () => triggerAutoSave());
  statEvents.on('affectionChanged', () => triggerAutoSave());
  statEvents.on('xpAwarded', () => triggerAutoSave());
  statEvents.on('strikeAdded', () => triggerAutoSave());
  statEvents.on('weekAdvanced', () => triggerAutoSave());

  // Window unload & pagehide sync for crash-safe / refresh-safe persistence
  window.addEventListener('beforeunload', () => {
    const active = screenStack.peek();
    if (active === 'screen-game-loop') {
      SaveSystem.save('auto', true);
      localStorage.setItem('esc_active_screen', 'screen-game-loop');
    } else if (active && active !== 'screen-title' && active !== 'screen-ending') {
      SaveSystem.save('auto', true);
      localStorage.setItem('esc_active_screen', active);
    }
  });

  window.addEventListener('pagehide', () => {
    const active = screenStack.peek();
    if (active === 'screen-game-loop') {
      SaveSystem.save('auto', true);
      localStorage.setItem('esc_active_screen', 'screen-game-loop');
    } else if (active && active !== 'screen-title' && active !== 'screen-ending') {
      SaveSystem.save('auto', true);
      localStorage.setItem('esc_active_screen', active);
    }
  });
}

function updateRPGHUD(level, xp, xpToNext) {
  const percent = Math.min(100, Math.round((xp / xpToNext) * 100));

  const lvlEl = document.getElementById('hud-rpg-level');
  if (lvlEl) lvlEl.textContent = `Lvl ${level}`;

  const titleEl = document.getElementById('hud-rpg-title');
  if (titleEl) titleEl.textContent = i18n.t(gameState.rpg?.title || 'rpg.title_1');

  const fillEl = document.getElementById('hud-rpg-xp-fill');
  if (fillEl) fillEl.style.width = `${percent}%`;

  const textEl = document.getElementById('hud-rpg-xp-text');
  if (textEl) textEl.textContent = `${xp} / ${xpToNext} XP`;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  // Keep maximum 2 toasts on screen so it never covers gameplay
  while (container.children.length >= 2) {
    container.removeChild(container.firstChild);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.25s ease-in forwards';
    setTimeout(() => toast.remove(), 260);
  }, 1800);
}

// ===========================================================================
// 4. UI FLOW BINDINGS & SCREEN CONTROLLERS
// ===========================================================================
function bindUIEvents() {
  // Title Screen
  document.getElementById('btn-start-game').addEventListener('click', () => {
    audio.init();
    audio.playClick();
    gameState.reset();
    localStorage.removeItem('esc_active_screen');
    renderHomeCountryScreen();
    screenStack.push('screen-home-country');
    SaveSystem.save('auto', true);
  });

  document.getElementById('btn-continue-game').addEventListener('click', () => {
    audio.init();
    audio.playClick();
    if (SaveSystem.load('auto', true) || SaveSystem.load(0, true)) {
      startGameLoop(true);
    } else {
      showToast(i18n.t('hud.no_save_found'), 'loss');
    }
  });

  document.getElementById('btn-open-settings').addEventListener('click', () => {
    audio.init();
    audio.playClick();
    const modal = document.getElementById('modal-settings');
    screenStack.openOverlay(modal);
  });

  document.getElementById('btn-close-settings').addEventListener('click', () => {
    audio.playClick();
    screenStack.closeOverlay();
  });

  // Settings Return to Main Menu button
  const btnReturnTitle = document.getElementById('btn-return-title');
  if (btnReturnTitle) {
    btnReturnTitle.addEventListener('click', () => {
      audio.playClick();
      screenStack.closeOverlay();
      localStorage.removeItem('esc_active_screen');
      screenStack.stack = ['screen-title'];
      screenStack.screens.forEach(el => el.classList.remove('active'));
      const titleEl = document.getElementById('screen-title');
      if (titleEl) titleEl.classList.add('active');
      updateSaveSlotLabels();
    });
  }

  // Backdrop click closes any active modal overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        audio.playClick();
        screenStack.closeOverlay();
      }
    });
  });

  document.getElementById('btn-close-backlog').addEventListener('click', () => {
    audio.playClick();
    screenStack.closeOverlay();
  });

  document.getElementById('btn-close-journal').addEventListener('click', () => {
    audio.playClick();
    screenStack.closeOverlay();
  });

  // Dialogue card advance click
  const dialogueCard = document.getElementById('dialogue-card');
  if (dialogueCard) {
    dialogueCard.addEventListener('click', (e) => {
      // Don't trigger advance if clicking on a choice button
      if (e.target.closest('.choice-btn')) return;
      dialogueRunner.handleAdvanceInput();
    });
  }

  // Quick toolbar buttons
  const btnPhone = document.getElementById('btn-quick-phone');
  if (btnPhone) {
    btnPhone.addEventListener('click', () => {
      phoneEngine.togglePhone();
    });
  }

  const btnMap = document.getElementById('btn-quick-map');
  if (btnMap) {
    btnMap.addEventListener('click', () => {
      mapEngine.toggleMap();
    });
  }

  const btnBacklog = document.getElementById('btn-quick-backlog');
  if (btnBacklog) {
    btnBacklog.addEventListener('click', () => {
      audio.playClick();
      const drawer = document.getElementById('drawer-backlog');
      screenStack.openOverlay(drawer);
    });
  }

  const btnJournal = document.getElementById('btn-quick-journal');
  if (btnJournal) {
    btnJournal.addEventListener('click', () => {
      audio.playClick();
      const modal = document.getElementById('modal-journal');
      screenStack.openOverlay(modal);
    });
  }

  const btnSave = document.getElementById('btn-quick-save');
  if (btnSave) {
    btnSave.addEventListener('click', () => {
      audio.playClick();
      SaveSystem.save('auto');
    });
  }

  const btnFullscreen = document.getElementById('btn-quick-fullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      audio.playClick();
      toggleFullscreen();
    });
  }

  const btnSettings = document.getElementById('btn-quick-settings');
  if (btnSettings) {
    btnSettings.addEventListener('click', () => {
      audio.playClick();
      const modal = document.getElementById('modal-settings');
      screenStack.openOverlay(modal);
    });
  }

  // Character Sheet button (C hotkey)
  const btnChar = document.getElementById('btn-quick-character');
  if (btnChar) {
    btnChar.addEventListener('click', () => {
      audio.playClick();
      openCharacterSheet();
    });
  }

  // Quest Log button (Q hotkey)
  const btnQuests = document.getElementById('btn-quick-quests');
  if (btnQuests) {
    btnQuests.addEventListener('click', () => {
      audio.playClick();
      openCharacterSheet('quests');
    });
  }

  // Character Sheet close button
  const btnCloseChar = document.getElementById('btn-close-character-sheet');
  if (btnCloseChar) {
    btnCloseChar.addEventListener('click', () => {
      audio.playClick();
      screenStack.closeOverlay();
    });
  }

  // RPG HUD card click to open character sheet
  const rpgCard = document.getElementById('hud-rpg-card');
  if (rpgCard) {
    rpgCard.addEventListener('click', () => {
      audio.playClick();
      openCharacterSheet();
    });
  }

  // Tab switching inside character sheet modal
  document.querySelectorAll('.rpg-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      audio.playClick();
      rpgEngine.switchTab(btn.dataset.tab);
    });
  });
}

function openCharacterSheet(tab = 'sheet') {
  rpgEngine.renderCharacterSheetModal();
  rpgEngine.switchTab(tab);
  const modal = document.getElementById('modal-character-sheet');
  screenStack.openOverlay(modal);
}


// ---------------------------------------------------------------------------
// Screen 2: Home Country Selection
// ---------------------------------------------------------------------------
function renderHomeCountryScreen() {
  const grid = document.getElementById('home-country-grid');
  const confirmBtn = document.getElementById('btn-confirm-home');
  grid.innerHTML = '';
  confirmBtn.disabled = !gameState.player.homeCountry;

  Object.values(HOME_COUNTRIES).forEach(c => {
    const isSelected = gameState.player.homeCountry === c.id;
    const card = document.createElement('div');
    card.className = 'country-card' + (isSelected ? ' selected' : '');
    card.setAttribute('data-id', c.id);
    card.innerHTML = `
      <div class="country-flag">${getFlagSvg(c.id)}</div>
      <div class="country-name">${c.name}</div>
      <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.4rem;">${c.description}</p>
      <div class="country-stats-row">
        <span>${i18n.t('home.language_label')} <strong>${c.language}</strong></span>
      </div>
    `;

    card.addEventListener('click', () => {
      audio.playClick();
      grid.querySelectorAll('.country-card').forEach(el => el.classList.remove('selected'));
      card.classList.add('selected');
      if (gameState.player.homeCountry !== c.id) {
        gameState.player.homeCountry = c.id;
        gameState.player.destCountry = null;
        gameState.po = null;
        gameState.player.rankedChoices = [];
      }
      confirmBtn.disabled = false;
    });

    grid.appendChild(card);
  });

  const backBtn = document.getElementById('btn-back-home');
  if (backBtn) {
    backBtn.onclick = () => {
      audio.playClick();
      screenStack.pop();
    };
  }

  confirmBtn.onclick = () => {
    audio.playClick();
    renderFundingScreen();
    screenStack.push('screen-funding');
  };
}

// ---------------------------------------------------------------------------
// Screen 3: Program Funding Selection (Immediately After Home Country)
// ---------------------------------------------------------------------------
function renderFundingScreen() {
  const backBtn = document.getElementById('btn-back-funding');
  if (backBtn) {
    backBtn.onclick = () => {
      audio.playClick();
      screenStack.pop();
    };
  }

  const cardScholarship = document.getElementById('card-fund-scholarship');
  const cardSelfpaid = document.getElementById('card-fund-selfpaid');
  const confirmBtn = document.getElementById('btn-confirm-funding');

  // Reflect existing state if user navigated back and forward
  if (gameState.player.fundingType === 'funded') {
    cardScholarship.classList.add('selected');
    cardSelfpaid.classList.remove('selected');
    cardScholarship.querySelector('.selection-indicator-text').textContent = i18n.t('funding.selected');
    cardSelfpaid.querySelector('.selection-indicator-text').textContent = i18n.t('funding.selfpaid_btn');
    confirmBtn.disabled = false;
  } else if (gameState.player.fundingType === 'selfpaid') {
    cardSelfpaid.classList.add('selected');
    cardScholarship.classList.remove('selected');
    cardSelfpaid.querySelector('.selection-indicator-text').textContent = i18n.t('funding.selected');
    cardScholarship.querySelector('.selection-indicator-text').textContent = i18n.t('funding.scholarship_btn');
    confirmBtn.disabled = false;
  } else {
    cardScholarship.classList.remove('selected');
    cardSelfpaid.classList.remove('selected');
    cardScholarship.querySelector('.selection-indicator-text').textContent = i18n.t('funding.scholarship_btn');
    cardSelfpaid.querySelector('.selection-indicator-text').textContent = i18n.t('funding.selfpaid_btn');
    confirmBtn.disabled = true;
  }

  cardScholarship.onclick = () => {
    audio.playClick();
    cardScholarship.classList.add('selected');
    cardSelfpaid.classList.remove('selected');
    cardScholarship.querySelector('.selection-indicator-text').textContent = i18n.t('funding.selected');
    cardSelfpaid.querySelector('.selection-indicator-text').textContent = i18n.t('funding.selfpaid_btn');
    gameState.player.fundingType = 'funded';
    gameState.stats.finance = 80;
    confirmBtn.disabled = false;
  };

  cardSelfpaid.onclick = () => {
    audio.playClick();
    cardSelfpaid.classList.add('selected');
    cardScholarship.classList.remove('selected');
    cardSelfpaid.querySelector('.selection-indicator-text').textContent = i18n.t('funding.selected');
    cardScholarship.querySelector('.selection-indicator-text').textContent = i18n.t('funding.scholarship_btn');
    gameState.player.fundingType = 'selfpaid';
    gameState.stats.finance = 50;
    confirmBtn.disabled = false;
  };

  confirmBtn.onclick = () => {
    audio.playClick();
    renderProgramTypeScreen();
    screenStack.push('screen-program-type');
  };
}

// ---------------------------------------------------------------------------
// Screen 4: Program Type Selection (Mode A vs Mode B)
// ---------------------------------------------------------------------------
function renderProgramTypeScreen() {
  const backBtn = document.getElementById('btn-back-program-type');
  if (backBtn) {
    backBtn.onclick = () => {
      audio.playClick();
      screenStack.pop();
    };
  }

  const cardA = document.getElementById('card-mode-a');
  const cardB = document.getElementById('card-mode-b');
  const confirmBtn = document.getElementById('btn-confirm-program-type');

  if (gameState.player.programType === 'random') {
    cardA.classList.add('selected');
    cardB.classList.remove('selected');
    cardA.querySelector('.selection-indicator-text').textContent = i18n.t('modes.selected');
    cardB.querySelector('.selection-indicator-text').textContent = i18n.t('modes.mode_b_btn');
    confirmBtn.disabled = false;
  } else if (gameState.player.programType === 'priority') {
    cardB.classList.add('selected');
    cardA.classList.remove('selected');
    cardB.querySelector('.selection-indicator-text').textContent = i18n.t('modes.selected');
    cardA.querySelector('.selection-indicator-text').textContent = i18n.t('modes.mode_a_btn');
    confirmBtn.disabled = false;
  } else {
    cardA.classList.remove('selected');
    cardB.classList.remove('selected');
    cardA.querySelector('.selection-indicator-text').textContent = i18n.t('modes.mode_a_btn');
    cardB.querySelector('.selection-indicator-text').textContent = i18n.t('modes.mode_b_btn');
    confirmBtn.disabled = true;
  }

  cardA.onclick = () => {
    audio.playClick();
    cardA.classList.add('selected');
    cardB.classList.remove('selected');
    cardA.querySelector('.selection-indicator-text').textContent = i18n.t('modes.selected');
    cardB.querySelector('.selection-indicator-text').textContent = i18n.t('modes.mode_b_btn');
    gameState.player.programType = 'random';
    confirmBtn.disabled = false;
  };

  cardB.onclick = () => {
    audio.playClick();
    cardB.classList.add('selected');
    cardA.classList.remove('selected');
    cardB.querySelector('.selection-indicator-text').textContent = i18n.t('modes.selected');
    cardA.querySelector('.selection-indicator-text').textContent = i18n.t('modes.mode_a_btn');
    gameState.player.programType = 'priority';
    confirmBtn.disabled = false;
  };

  confirmBtn.onclick = () => {
    audio.playClick();
    if (gameState.player.programType === 'random') {
      renderModeAEnvelopeScreen();
      screenStack.push('screen-envelope-reveal');
    } else {
      renderModeBRankingScreen();
      screenStack.push('screen-ranking');
    }
  };
}

// ---------------------------------------------------------------------------
// Screen 4A: Mode A Envelope Reveal
// ---------------------------------------------------------------------------
function renderModeAEnvelopeScreen() {
  const envelope = document.getElementById('envelope-clickable');
  const revealedCard = document.getElementById('revealed-country-card');
  const continueBtn = document.getElementById('btn-envelope-continue');
  const backBtn = document.getElementById('btn-back-envelope');

  if (backBtn) {
    backBtn.style.display = 'inline-flex';
    backBtn.onclick = () => {
      audio.playClick();
      screenStack.pop();
    };
  }

  // If already revealed and valid host country (not matching homeCountry)
  if (gameState.player.destCountry && gameState.player.destCountry !== gameState.player.homeCountry && COUNTRIES[gameState.player.destCountry]) {
    const dest = COUNTRIES[gameState.player.destCountry];
    revealedCard.innerHTML = `
      <div style="margin-bottom: 0.85rem; display: flex; justify-content: center;">${getFlagSvg(dest.id, 'large')}</div>
      <h2 style="font-family: var(--font-ui); font-size: 2rem; color: var(--accent);">${dest.name}</h2>
      <p style="font-size: 1rem; color: var(--text-primary); margin: 0.75rem 0;">${dest.description}</p>
      <div style="display: flex; gap: 1rem; justify-content: center; font-size: 0.85rem; color: var(--text-secondary); flex-wrap: wrap;">
        <span>${i18n.t('home.language_label')} <strong>${dest.language}</strong></span>
        <span>${i18n.t('courses.academic_pressure')} <strong>${dest.academicRigor}/10</strong></span>
        <span>Climate: <strong>${dest.climate}</strong></span>
      </div>
    `;
    envelope.style.display = 'none';
    revealedCard.style.display = 'block';
    continueBtn.style.display = 'inline-flex';
  } else {
    // Sealed envelope state
    gameState.player.destCountry = null;
    gameState.po = null;
    envelope.style.display = 'flex';
    revealedCard.style.display = 'none';
    continueBtn.style.display = 'none';
  }

  envelope.onclick = () => {
    audio.playCardFlip();
    envelope.style.display = 'none';

    // Weighted random country draw EXCLUDING home country
    const availableCountryKeys = Object.keys(COUNTRIES).filter(k => k !== gameState.player.homeCountry);
    const chosenKey = availableCountryKeys[Math.floor(rng.next() * availableCountryKeys.length)];
    gameState.player.destCountry = chosenKey;
    gameState.po = null; // Re-generate PO for this destination
    const dest = COUNTRIES[chosenKey];

    // Country accent
    document.documentElement.setAttribute('data-country', chosenKey);

    revealedCard.innerHTML = `
      <div style="margin-bottom: 0.85rem; display: flex; justify-content: center;">${getFlagSvg(dest.id, 'large')}</div>
      <h2 style="font-family: var(--font-ui); font-size: 2rem; color: var(--accent);">${dest.name}</h2>
      <p style="font-size: 1rem; color: var(--text-primary); margin: 0.75rem 0;">${dest.description}</p>
      <div style="display: flex; gap: 1rem; justify-content: center; font-size: 0.85rem; color: var(--text-secondary); flex-wrap: wrap;">
        <span>${i18n.t('home.language_label')} <strong>${dest.language}</strong></span>
        <span>${i18n.t('courses.academic_pressure')} <strong>${dest.academicRigor}/10</strong></span>
        <span>Climate: <strong>${dest.climate}</strong></span>
      </div>
    `;
    revealedCard.style.display = 'block';
    revealedCard.classList.add('anim-stat-pop');
    continueBtn.style.display = 'inline-flex';
  };

  continueBtn.onclick = () => {
    audio.playClick();
    renderPOScreen();
    screenStack.push('screen-po');
  };
}

// ---------------------------------------------------------------------------
// Screen 4B: Mode B Priority List Ranking
// ---------------------------------------------------------------------------
function renderModeBRankingScreen() {
  const backBtn = document.getElementById('btn-back-ranking');
  if (backBtn) {
    backBtn.onclick = () => {
      audio.playClick();
      screenStack.pop();
    };
  }

  const grid = document.getElementById('ranking-country-grid');
  const counter = document.getElementById('ranking-counter');
  const submitBtn = document.getElementById('btn-submit-ranking');
  grid.innerHTML = '';

  // Clean up any rankedIds that might match current homeCountry
  gameState.player.rankedChoices = (gameState.player.rankedChoices || []).filter(
    id => id !== gameState.player.homeCountry
  );
  const rankedIds = gameState.player.rankedChoices;

  // Candidate countries excluding player's home country
  const candidateCountries = Object.values(COUNTRIES).filter(c => c.id !== gameState.player.homeCountry);

  candidateCountries.forEach(c => {
    const isSelected = rankedIds.includes(c.id);
    const rankIndex = rankedIds.indexOf(c.id);
    const card = document.createElement('div');
    card.className = 'country-card' + (isSelected ? ' selected' : '');
    card.setAttribute('data-id', c.id);
    card.innerHTML = `
      <div class="country-flag">${getFlagSvg(c.id)}</div>
      <div class="country-name">${c.name}</div>
      <div class="country-stats-row">
        <span>${i18n.t('home.language_label')} <strong>${c.language}</strong></span>
        <span>${i18n.t('courses.academic_pressure')} <strong>${c.academicRigor}/10</strong></span>
      </div>
      ${isSelected ? `<span class="rank-pill">${rankIndex + 1}</span>` : ''}
    `;

    card.addEventListener('click', () => {
      audio.playClick();
      const existingIdx = rankedIds.indexOf(c.id);

      if (existingIdx !== -1) {
        // Deselect
        rankedIds.splice(existingIdx, 1);
        card.classList.remove('selected');
        const pill = card.querySelector('.rank-pill');
        if (pill) pill.remove();
      } else {
        // Select up to 5
        if (rankedIds.length < 5) {
          rankedIds.push(c.id);
          card.classList.add('selected');
          const pill = document.createElement('span');
          pill.className = 'rank-pill';
          pill.textContent = rankedIds.length;
          card.appendChild(pill);
        }
      }

      // Re-index remaining pills
      grid.querySelectorAll('.country-card.selected').forEach(selCard => {
        const id = selCard.getAttribute('data-id');
        const rank = rankedIds.indexOf(id) + 1;
        const pill = selCard.querySelector('.rank-pill');
        if (pill) pill.textContent = rank;
      });

      counter.textContent = i18n.t('ranking.counter', { count: rankedIds.length });
      submitBtn.disabled = rankedIds.length !== 5;
    });

    grid.appendChild(card);
  });

  counter.textContent = i18n.t('ranking.counter', { count: rankedIds.length });
  submitBtn.disabled = rankedIds.length !== 5;

  submitBtn.onclick = () => {
    audio.playCardFlip();
    gameState.player.rankedChoices = [...rankedIds];

    // Probabilistic priority draw: 1st (~50%), 2nd (~25%), 3rd (~13%), 4th (~8%), 5th (~4%)
    const weights = [
      { item: rankedIds[0], weight: 50 },
      { item: rankedIds[1], weight: 25 },
      { item: rankedIds[2], weight: 13 },
      { item: rankedIds[3], weight: 8 },
      { item: rankedIds[4], weight: 4 }
    ];
    const assignedCountryId = rng.weightedPick(weights);
    gameState.player.destCountry = assignedCountryId;
    gameState.po = null; // Re-generate PO for this destination
    document.documentElement.setAttribute('data-country', assignedCountryId);

    const rankNumber = rankedIds.indexOf(assignedCountryId) + 1;
    showToast(`Assigned to your #${rankNumber} Choice: ${COUNTRIES[assignedCountryId].name}!`, 'info');

    renderPOScreen();
    screenStack.push('screen-po');
  };
}

// ---------------------------------------------------------------------------
// Screen 5: PO Card Screen
// ---------------------------------------------------------------------------
function renderPOScreen() {
  const container = document.getElementById('po-card-details');
  const confirmBtn = document.getElementById('btn-confirm-po');

  if (!gameState.po || gameState.po.destCountry !== gameState.player.destCountry) {
    const locationKeys = Object.keys(PO_LOCATIONS);
    const chosenLoc = locationKeys[Math.floor(rng.next() * locationKeys.length)];
    const strictKeys = Object.keys(PO_STRICTNESS);
    const chosenStrict = strictKeys[Math.floor(rng.next() * strictKeys.length)];
    const strictData = PO_STRICTNESS[chosenStrict];

    const { grade, diplomaEligible } = SchoolSystem.assignGradeAndDiploma(gameState.player.destCountry, rng);
    gameState.player.grade = grade;
    gameState.player.diplomaEligible = diplomaEligible;

    gameState.po = {
      id: `po_${chosenLoc}_${chosenStrict}`,
      destCountry: gameState.player.destCountry,
      location: chosenLoc,
      strictness: chosenStrict,
      rules: strictData.rules
    };
  }

  const locData = PO_LOCATIONS[gameState.po.location];
  const strictData = PO_STRICTNESS[gameState.po.strictness];
  const dest = COUNTRIES[gameState.player.destCountry] || COUNTRIES.usa;
  const grade = gameState.player.grade;
  const diplomaEligible = gameState.player.diplomaEligible;

  const rulesListHtml = gameState.po.rules.map(rKey => {
    const rDef = RULE_DEFINITIONS[rKey] || { name: rKey, desc: 'Local rule.' };
    return `<li><strong>${rDef.name}</strong>: ${rDef.desc}</li>`;
  }).join('');

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--surface-border); padding-bottom: 0.75rem;">
      <div style="display: flex; align-items: center; gap: 0.85rem;">
        ${getFlagSvg(dest.id)}
        <div>
          <h3 style="font-family: var(--font-ui); font-size: 1.25rem; color: var(--accent); margin: 0;">
            ${dest.name} — ${locData.name}
          </h3>
          <span style="font-size: 0.8rem; color: var(--text-secondary); display: inline-flex; align-items: center; gap: 0.35rem;">${getIconSvg(locData.icon, 14)} ${i18n.t('po.location_label')} ${locData.name}</span>
        </div>
      </div>
      <span class="badge" style="background: rgba(255,255,255,0.08); padding: 0.3rem 0.6rem; border-radius: 4px; font-family: var(--font-mono); font-size: 0.8rem;">
        ${strictData.name}
      </span>
    </div>

    <p style="color: var(--text-secondary); font-size: 0.95rem;">${locData.description}</p>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 0.5rem 0;">
      <div class="glass-panel" style="padding: 0.75rem;">
        <span style="font-size: 0.8rem; color: var(--text-tertiary);">${i18n.t('po.academic_placement')}</span>
        <div style="font-family: var(--font-ui); font-weight: 700; font-size: 1.1rem; color: var(--text-primary); margin-top: 0.2rem;">
          ${i18n.t('hud.grade_format', { grade })} (${grade === 12 ? i18n.t('po.grade_senior') : grade === 11 ? i18n.t('po.grade_junior') : i18n.t('po.grade_sophomore')})
        </div>
      </div>

      <div class="glass-panel" style="padding: 0.75rem;">
        <span style="font-size: 0.8rem; color: var(--text-tertiary);">${i18n.t('po.diploma_eligibility')}</span>
        <div style="font-family: var(--font-ui); font-weight: 700; font-size: 1.1rem; color: ${diplomaEligible ? '#34d399' : '#f87171'}; margin-top: 0.2rem; display: flex; align-items: center; gap: 0.4rem;">
          ${diplomaEligible ? getIconSvg('diploma', 18) + ' ' + i18n.t('po.diploma_full') : getIconSvg('certificate', 18) + ' ' + i18n.t('po.diploma_cert')}
        </div>
      </div>
    </div>

    <h4 style="font-family: var(--font-ui); color: var(--text-primary); margin-top: 0.5rem;">${i18n.t('po.rules_heading')}</h4>
    <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
      ${rulesListHtml}
      <li>${i18n.t('po.rule_vehicle')}</li>
      <li>${i18n.t('po.rule_drugs')}</li>
    </ul>
  `;

  confirmBtn.onclick = () => {
    audio.playClick();
    renderArrivalScreen();
    screenStack.push('screen-arrival');
  };
}

// ---------------------------------------------------------------------------
// Screen 7: Arrival Cutscene
// ---------------------------------------------------------------------------
function renderArrivalScreen() {
  const titleEl = document.getElementById('arrival-title');
  const textEl = document.getElementById('arrival-text');
  const continueBtn = document.getElementById('btn-arrival-continue');

  const dest = COUNTRIES[gameState.player.destCountry] || COUNTRIES.usa;
  if (!gameState.player.arrivalType || gameState.player.arrivalCountry !== gameState.player.destCountry) {
    const arrivalTypes = ['early', 'ontime', 'late'];
    const arrivalType = arrivalTypes[Math.floor(rng.next() * arrivalTypes.length)];
    gameState.player.arrivalType = arrivalType;
    gameState.player.arrivalCountry = gameState.player.destCountry;

    if (arrivalType === 'early') {
      gameState.modifyStat('hostFamilyBond', 8);
      gameState.modifyStat('adaptation', 6);
    } else if (arrivalType === 'late') {
      gameState.modifyStat('happiness', -8);
      gameState.modifyStat('academics', -6);
    } else {
      gameState.modifyStat('happiness', 4);
      gameState.modifyStat('hostFamilyBond', 5);
    }
  }

  titleEl.textContent = i18n.t('arrival.title', { country: dest.name });

  const flagContainer = document.getElementById('arrival-flag-container');
  if (flagContainer) {
    flagContainer.innerHTML = getFlagSvg(dest.id, 'large');
  }

  let narrative = '';
  if (gameState.player.arrivalType === 'early') {
    narrative = i18n.t('arrival.early_narrative');
  } else if (gameState.player.arrivalType === 'late') {
    narrative = i18n.t('arrival.late_narrative');
  } else {
    narrative = i18n.t('arrival.ontime_narrative');
  }

  textEl.textContent = narrative;

  continueBtn.onclick = () => {
    audio.playClick();
    renderCourseSelectionScreen();
    screenStack.push('screen-courses');
  };
}

// ---------------------------------------------------------------------------
// Screen 8: Course Selection (Timetable Builder)
// ---------------------------------------------------------------------------
function renderCourseSelectionScreen() {
  const coreList = document.getElementById('core-courses-list');
  const electivesGrid = document.getElementById('electives-grid');
  const countEl = document.getElementById('electives-count');
  const pressureValEl = document.getElementById('pressure-val');
  const confirmBtn = document.getElementById('btn-confirm-courses');
  const electivesHeading = document.getElementById('electives-heading');

  coreList.innerHTML = COURSES.cores.map(c => `
    <div class="glass-panel" style="padding: 0.65rem 1rem; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <strong style="color: var(--text-primary); font-size: 0.95rem;">${c.name}</strong>
        <p style="font-size: 0.8rem; color: var(--text-secondary);">${c.desc}</p>
      </div>
      <span style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--accent);">${i18n.t('courses.required')}</span>
    </div>
  `).join('');

  electivesGrid.innerHTML = '';
  const selectedElectives = gameState.courses.electives || [];

  const updatePressure = () => {
    const pressure = SchoolSystem.calculateAcademicPressure(
      gameState.player.homeCountry,
      gameState.player.destCountry,
      selectedElectives
    );
    pressureValEl.textContent = pressure;
    gameState.courses.academicPressure = pressure;
  };

  updatePressure();

  COURSES.electives.forEach(elec => {
    const isSelected = selectedElectives.includes(elec.id);
    const card = document.createElement('div');
    card.className = 'glass-panel' + (isSelected ? ' selected' : '');
    card.style.cursor = 'pointer';
    card.setAttribute('data-id', elec.id);
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
        <strong style="color: var(--text-primary); font-size: 0.95rem;">${elec.name}</strong>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent);">${i18n.t('courses.diff_label', { diff: elec.difficulty })}</span>
      </div>
      <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">${elec.desc}</p>
    `;

    card.addEventListener('click', () => {
      audio.playClick();
      const existingIdx = selectedElectives.indexOf(elec.id);
      if (existingIdx !== -1) {
        selectedElectives.splice(existingIdx, 1);
        card.classList.remove('selected');
      } else {
        if (selectedElectives.length < 2) {
          selectedElectives.push(elec.id);
          card.classList.add('selected');
        }
      }
      countEl.textContent = selectedElectives.length;
      if (electivesHeading) {
        electivesHeading.textContent = i18n.t('courses.electives_pick', { count: selectedElectives.length });
      }
      confirmBtn.disabled = selectedElectives.length !== 2;
      updatePressure();
    });

    electivesGrid.appendChild(card);
  });

  countEl.textContent = selectedElectives.length;
  if (electivesHeading) {
    electivesHeading.textContent = i18n.t('courses.electives_pick', { count: selectedElectives.length });
  }
  confirmBtn.disabled = selectedElectives.length !== 2;

  confirmBtn.onclick = () => {
    confirmBtn.disabled = true;
    audio.playClick();
    gameState.courses.electives = [...selectedElectives];
    startGameLoop();
  };
}

// ---------------------------------------------------------------------------
// Screen 9: Main Game Loop
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Screen 9: Main Game Loop (40-Week Academic Year Lifecycle)
// ---------------------------------------------------------------------------
function startGameLoop(isResume = false) {
  screenStack.push('screen-game-loop');
  localStorage.setItem('esc_active_screen', 'screen-game-loop');

  if (!isResume) {
    gameState.meta.weekEventIndex = 0;
  } else {
    gameState.meta.weekEventIndex = gameState.meta.weekEventIndex || 0;
  }
  gameState.meta.weekTotalEvents = 2; // Multiple interactive narrative events per week

  const destCountry = gameState.player.destCountry || 'usa';
  document.documentElement.setAttribute('data-country', destCountry);
  audio.setCountryAmbient(destCountry);

  // Update HUD
  const dest = COUNTRIES[destCountry] || COUNTRIES.usa;
  const flagEl = document.getElementById('hud-flag');
  if (flagEl) flagEl.innerHTML = getFlagSvg(dest.id, 'hud');
  updateGameLoopHUD();

  // Update Stat Bars
  Object.entries(gameState.stats).forEach(([stat, val]) => {
    statEvents.emit('statChanged', { stat, oldVal: val, newVal: val, delta: 0 });
  });

  // Initialize RPG HUD with current state (important for loaded saves)
  if (gameState.rpg) {
    updateRPGHUD(gameState.rpg.level, gameState.rpg.xp, gameState.rpg.xpToNext);
  }

  // Update phone notification badge
  if (phoneEngine) {
    phoneEngine.updateNotificationBadge();
  }

  // Initialize Dialogue Runner & Event Engine
  const dialogueBody = document.getElementById('dialogue-body');
  const dialogueSpeaker = document.getElementById('dialogue-speaker');
  const dialogueCaret = document.getElementById('dialogue-caret');
  const dialoguePrompt = document.getElementById('dialogue-prompt');
  const choicesContainer = document.getElementById('choices-container');

  dialogueRunner.init(dialogueBody, dialogueSpeaker, dialogueCaret, dialoguePrompt);
  eventEngine.init(choicesContainer, () => onEventFinished());

  // Save auto slot now that game loop is active
  SaveSystem.save('auto', true);

  // Load turn
  loadTurn(gameState.meta.week || 1);
}

function loadTurn(week) {
  updateGameLoopHUD();

  // Update Mini Journal Feed
  const journalFeed = document.getElementById('mini-journal-feed');
  if (journalFeed) {
    journalFeed.innerHTML = gameState.journal.slice(-6).map(j => `<div>${j.text}</div>`).join('');
    journalFeed.scrollTop = journalFeed.scrollHeight;
  }

  // Load week event directly - zero modal interruptions to narrative flow!
  eventEngine.loadWeekEvent(week, gameState.meta.weekEventIndex || 0);
}

// Callback triggered whenever a dialogue choice outcome is completed
function onEventFinished() {
  // Clear event ID since event has completed
  gameState.meta.currentEventId = null;

  // Check premature game over
  const prematureEnding = EndingsManager.evaluateEnding();
  if (prematureEnding) {
    statEvents.emit('endingReached', { endingId: prematureEnding.id, reason: prematureEnding.description });
    return;
  }

  const currentWk = gameState.meta.week || 1;
  const currentEventIdx = gameState.meta.weekEventIndex || 0;
  const totalEventsInWeek = gameState.meta.weekTotalEvents || 2;

  if (currentEventIdx + 1 < totalEventsInWeek) {
    // Progress to next event within the SAME week
    gameState.meta.weekEventIndex = currentEventIdx + 1;
    updateGameLoopHUD();
    SaveSystem.save('auto', true);
    eventEngine.loadWeekEvent(currentWk, gameState.meta.weekEventIndex);
  } else {
    // Completed all events for this week -> advance to next week!
    gameState.meta.weekEventIndex = 0;
    advanceWeeklyTurn();
  }
}

function advanceWeeklyTurn() {
  // Check premature game over
  const prematureEnding = EndingsManager.evaluateEnding();
  if (prematureEnding) {
    statEvents.emit('endingReached', { endingId: prematureEnding.id, reason: prematureEnding.description });
    return;
  }

  const currentWk = gameState.meta.week || 1;
  if (currentWk >= 40) {
    // 40-Week Academic Year completed!
    const finalEnding = EndingsManager.evaluateEnding();
    statEvents.emit('endingReached', { endingId: finalEnding.id, reason: finalEnding.description });
    return;
  }

  // Natural weekly living & academic entropy at week boundary
  WeeklyEngine.applyWeeklyEntropy();

  // Advance week in domain core
  const nextWeek = WeeklyEngine.advanceWeek();

  // Autosave at week boundary
  SaveSystem.save('auto');

  loadTurn(nextWeek);
}
