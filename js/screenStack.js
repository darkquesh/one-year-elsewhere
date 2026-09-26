// Screen Stack Manager (Push, Pop, Peek & Overlay Management)

export class ScreenStack {
  constructor() {
    this.stack = ['screen-title'];
    this.screens = new Map();
    this.activeOverlay = null;
  }

  registerScreen(id, element) {
    this.screens.set(id, element);
  }

  push(id) {
    const nextEl = this.screens.get(id);
    if (!nextEl) {
      console.error(`[ScreenStack] Screen "${id}" not found.`);
      return;
    }

    // Deactivate ALL screens to prevent any visual overlap
    this.screens.forEach(el => el.classList.remove('active'));

    this.stack.push(id);
    nextEl.classList.add('active');
  }

  pop() {
    if (this.stack.length <= 1) return null;

    const topId = this.stack.pop();
    const topEl = this.screens.get(topId);
    if (topEl) topEl.classList.remove('active');

    // Deactivate all screens first
    this.screens.forEach(el => el.classList.remove('active'));

    const prevId = this.peek();
    const prevEl = this.screens.get(prevId);
    if (prevEl) prevEl.classList.add('active');

    return topId;
  }

  peek() {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
  }

  // Overlays (modals / drawers) sit on top without popping screens
  openOverlay(overlayEl) {
    if (!overlayEl) return;
    this.closeOverlay();
    this.activeOverlay = overlayEl;
    overlayEl.classList.add('active');
  }

  closeOverlay() {
    if (this.activeOverlay) {
      this.activeOverlay.classList.remove('active');
      this.activeOverlay = null;
      return true;
    }
    return false;
  }
}

export const screenStack = new ScreenStack();
