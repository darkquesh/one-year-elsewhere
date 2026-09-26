// Unified Cross-Platform Adapter (Web Browser, Capacitor Mobile, Tauri Desktop)

export const Platform = {
  isMobileNative: !!window.Capacitor?.isNativePlatform(),
  isTauri: !!window.__TAURI_INTERNALS__,
  isElectron: !!window.process?.versions?.electron,
  get isDesktopNative() { return this.isTauri || this.isElectron; },
  get isWeb() { return !this.isMobileNative && !this.isDesktopNative; }
};

// Unified Storage Adapter: Uses Capacitor Preferences on mobile, Tauri on desktop, localStorage on web
export const storage = {
  async get(key) {
    if (Platform.isMobileNative && window.Capacitor?.Plugins?.Preferences) {
      try {
        const res = await window.Capacitor.Plugins.Preferences.get({ key });
        return res.value;
      } catch {
        return localStorage.getItem(key);
      }
    }
    if (Platform.isTauri && window.__TAURI__?.store) {
      try {
        const store = await window.__TAURI__.store.load('saves.json');
        return await store.get(key);
      } catch {
        return localStorage.getItem(key);
      }
    }
    return localStorage.getItem(key);
  },

  async set(key, value) {
    if (Platform.isMobileNative && window.Capacitor?.Plugins?.Preferences) {
      try {
        await window.Capacitor.Plugins.Preferences.set({ key, value });
        return;
      } catch {
        return localStorage.setItem(key, value);
      }
    }
    if (Platform.isTauri && window.__TAURI__?.store) {
      try {
        const store = await window.__TAURI__.store.load('saves.json');
        await store.set(key, value);
        return store.save();
      } catch {
        return localStorage.setItem(key, value);
      }
    }
    return localStorage.setItem(key, value);
  },

  async remove(key) {
    if (Platform.isMobileNative && window.Capacitor?.Plugins?.Preferences) {
      try {
        await window.Capacitor.Plugins.Preferences.remove({ key });
        return;
      } catch {
        return localStorage.removeItem(key);
      }
    }
    if (Platform.isTauri && window.__TAURI__?.store) {
      try {
        const store = await window.__TAURI__.store.load('saves.json');
        await store.delete(key);
        return store.save();
      } catch {
        return localStorage.removeItem(key);
      }
    }
    return localStorage.removeItem(key);
  }
};

// Haptic feedback (mobile-only, safe no-op on desktop/web)
export async function hapticTap(style = 'light') {
  if (Platform.isMobileNative && window.Capacitor?.Plugins?.Haptics) {
    try {
      const map = { light: 'LIGHT', medium: 'MEDIUM', heavy: 'HEAVY' };
      window.Capacitor.Plugins.Haptics.impact({ style: map[style] || 'LIGHT' });
    } catch {
      // Ignore
    }
  }
}

// Window & Fullscreen Toggle
export async function toggleFullscreen() {
  if (Platform.isTauri && window.__TAURI__?.window) {
    try {
      const currentWin = window.__TAURI__.window.getCurrentWindow();
      const isFullscreen = await currentWin.isFullscreen();
      await currentWin.setFullscreen(!isFullscreen);
      return;
    } catch (e) {
      console.warn('Tauri window toggle error:', e);
    }
  }

  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen().catch(() => {});
  } else {
    await document.exitFullscreen().catch(() => {});
  }
}
