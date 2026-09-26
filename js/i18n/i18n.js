// Internationalization (i18n) Engine
// Zero-dependency, offline-first ES module localization manager.

import en from './locales/en.js';
import tr from './locales/tr.js';
import de from './locales/de.js';
import ja from './locales/ja.js';
import es from './locales/es.js';
import { statEvents } from '../statEvents.js';

export const SUPPORTED_LOCALES = {
  en: { code: 'en', name: 'English' },
  tr: { code: 'tr', name: 'Türkçe' },
  de: { code: 'de', name: 'Deutsch' },
  ja: { code: 'ja', name: '日本語' },
  es: { code: 'es', name: 'Español' }
};

const DICTIONARIES = { en, tr, de, ja, es };

export class I18nManager {
  constructor() {
    this.currentLocale = localStorage.getItem('esc_locale') || 'en';
    if (!DICTIONARIES[this.currentLocale]) {
      this.currentLocale = 'en';
    }
  }

  init() {
    this.setLocale(this.currentLocale, false);
  }

  setLocale(localeCode, notify = true) {
    if (!DICTIONARIES[localeCode]) {
      console.warn(`[i18n] Unsupported locale: ${localeCode}, falling back to 'en'.`);
      localeCode = 'en';
    }

    this.currentLocale = localeCode;
    localStorage.setItem('esc_locale', localeCode);
    document.documentElement.lang = localeCode;

    this.applyToDOM();

    if (notify) {
      statEvents.emit('languageChanged', { locale: localeCode });
      console.log(`[i18n] Switched language to ${localeCode} (${SUPPORTED_LOCALES[localeCode]?.name})`);
    }
  }

  /**
   * Resolve a dot-notated key with optional interpolation.
   * e.g. i18n.t('hud.month', { month: 4 }) -> "Month 4" or "4. Ay"
   */
  t(keyPath, params = {}) {
    let dict = DICTIONARIES[this.currentLocale] || DICTIONARIES.en;
    let val = this.resolvePath(dict, keyPath);

    // Fallback to English if translation is missing
    if (val === undefined && this.currentLocale !== 'en') {
      val = this.resolvePath(DICTIONARIES.en, keyPath);
    }

    if (val === undefined) {
      return keyPath;
    }

    if (typeof val === 'string' && Object.keys(params).length > 0) {
      return val.replace(/{(\w+)}/g, (_, k) => (params[k] !== undefined ? params[k] : `{${k}}`));
    }

    return val;
  }

  resolvePath(obj, path) {
    return path.split('.').reduce((prev, curr) => (prev && prev[curr] !== undefined ? prev[curr] : undefined), obj);
  }

  /**
   * Scans DOM for [data-i18n] attributes and updates text or properties.
   */
  applyToDOM(root = document) {
    const elements = root.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;

      const translated = this.t(key);
      if (typeof translated === 'string') {
        el.textContent = translated;
      }
    });

    // Update elements with HTML content
    root.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (!key) return;
      const translated = this.t(key);
      if (typeof translated === 'string') {
        el.innerHTML = translated;
      }
    });

    // Update placeholders and titles
    root.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key) el.setAttribute('title', this.t(key));
    });
  }
}

export const i18n = new I18nManager();
