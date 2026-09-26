// Exchange Student Smartphone Engine
// Implements interactive messaging, live typing bubbles, and simulated social feed
import { gameState } from './gameState.js';
import { PHONE_CHATS, EXCHANGE_GRAM_FEED } from './data/phoneData.js';
import { CHARACTERS } from './data/portraitsData.js';
import { getIconSvg } from './data/icons.js';
import { audio } from './audio.js';
import { statEvents } from './statEvents.js';
import { rpgEngine } from './rpgEngine.js';
import { screenStack } from './screenStack.js';
import { SaveSystem } from './save.js';

export class PhoneEngine {
  constructor() {
    this.phoneModal = null;
    this.activeTab = 'chats'; // 'chats' | 'feed'
    this.activeChatId = 'group_exchange';
    this.isTyping = false;
  }

  init(modalElement) {
    this.phoneModal = modalElement;
    this.bindEvents();
    this.updateNotificationBadge();
  }

  bindEvents() {
    // Close button
    const btnClose = document.getElementById('btn-close-phone');
    if (btnClose) {
      btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closePhone();
      });
    }

    // Tab buttons
    const tabChats = document.getElementById('phone-tab-chats');
    const tabFeed = document.getElementById('phone-tab-feed');
    if (tabChats && tabFeed) {
      tabChats.addEventListener('click', () => this.switchTab('chats'));
      tabFeed.addEventListener('click', () => this.switchTab('feed'));
    }

    // Listen for week advanced to check for new threads
    statEvents.on('weekAdvanced', (data) => {
      this.checkNewWeeklyMessages(data.week);
    });
  }

  togglePhone() {
    if (this.isOpen()) {
      this.closePhone();
    } else {
      this.openPhone();
    }
  }

  isOpen() {
    return this.phoneModal && (this.phoneModal.classList.contains('active') || screenStack.activeOverlay === this.phoneModal);
  }

  openPhone() {
    if (!this.phoneModal) return;
    audio.playClick();
    screenStack.openOverlay(this.phoneModal);
    gameState.phone.unreadCount = 0;
    this.updateNotificationBadge();
    this.renderCurrentView();
  }

  closePhone() {
    if (!this.phoneModal) return;
    audio.playClick();
    if (screenStack.activeOverlay === this.phoneModal) {
      screenStack.closeOverlay();
    } else {
      this.phoneModal.classList.remove('active');
    }
  }

  switchTab(tab) {
    this.activeTab = tab;
    audio.playClick();

    const tabChats = document.getElementById('phone-tab-chats');
    const tabFeed = document.getElementById('phone-tab-feed');
    const viewChats = document.getElementById('phone-view-chats');
    const viewFeed = document.getElementById('phone-view-feed');

    if (tabChats) tabChats.classList.toggle('active', tab === 'chats');
    if (tabFeed) tabFeed.classList.toggle('active', tab === 'feed');
    if (viewChats) viewChats.style.display = tab === 'chats' ? 'flex' : 'none';
    if (viewFeed) viewFeed.style.display = tab === 'feed' ? 'block' : 'none';

    this.renderCurrentView();
  }

  renderCurrentView() {
    if (this.activeTab === 'chats') {
      this.renderChatList();
      this.renderActiveChatConversation();
    } else {
      this.renderExchangeGramFeed();
    }
  }

  renderChatList() {
    const chatListEl = document.getElementById('phone-chat-channel-list');
    if (!chatListEl) return;

    chatListEl.innerHTML = '';
    Object.values(PHONE_CHATS).forEach(chat => {
      const btn = document.createElement('button');
      btn.className = `phone-chat-item ${this.activeChatId === chat.id ? 'active' : ''}`;
      btn.innerHTML = `
        <div class="chat-item-avatar" style="color: ${chat.color};">
          ${getIconSvg(chat.avatarKey, 20)}
        </div>
        <div class="chat-item-info">
          <strong class="chat-item-name">${chat.name}</strong>
          <span class="chat-item-sub">${chat.subtitle}</span>
        </div>
      `;
      btn.addEventListener('click', () => {
        this.activeChatId = chat.id;
        audio.playClick();
        this.renderChatList();
        this.renderActiveChatConversation();
      });
      chatListEl.appendChild(btn);
    });
  }

  renderActiveChatConversation() {
    const messagesEl = document.getElementById('phone-messages-stream');
    const repliesContainer = document.getElementById('phone-replies-container');
    const chatTitleEl = document.getElementById('phone-active-chat-title');
    if (!messagesEl || !repliesContainer) return;

    const chat = PHONE_CHATS[this.activeChatId];
    if (!chat) return;

    if (chatTitleEl) {
      chatTitleEl.textContent = chat.name;
    }

    messagesEl.innerHTML = '';
    repliesContainer.innerHTML = '';

    const currentWeek = gameState.meta.week || 1;
    // Find active thread for this week or latest unlocked thread
    const availableThreads = (chat.threads || []).filter(t => {
      if (t.triggerWeek && t.triggerWeek > currentWeek) return false;
      if (t.minAffection && t.npcId) {
        const aff = gameState.relationships[t.npcId] || 0;
        if (aff < t.minAffection) return false;
      }
      return true;
    });

    if (availableThreads.length === 0) {
      messagesEl.innerHTML = `
        <div class="chat-empty-state">
          ${getIconSvg('message', 28)}
          <p>No recent messages in this channel. Check back as your exchange semester progresses!</p>
        </div>
      `;
      return;
    }

    const currentThread = availableThreads[availableThreads.length - 1];
    const isAnswered = (gameState.phone.repliedThreads || []).includes(currentThread.id);

    // Render incoming messages
    currentThread.messages.forEach(msg => {
      const char = CHARACTERS[msg.sender] || { name: msg.sender, color: '#38bdf8' };
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble incoming';
      bubble.innerHTML = `
        <strong class="bubble-sender" style="color: ${char.color};">${char.name}</strong>
        <div class="bubble-text">${msg.text}</div>
      `;
      messagesEl.appendChild(bubble);
    });

    // Render player choices or completed status
    if (isAnswered) {
      const completedNote = document.createElement('div');
      completedNote.className = 'chat-answered-note';
      completedNote.innerHTML = `${getIconSvg('check', 14)} Message thread replied.`;
      repliesContainer.appendChild(completedNote);
    } else if (currentThread.playerReplies && currentThread.playerReplies.length > 0) {
      const promptLabel = document.createElement('div');
      promptLabel.className = 'chat-replies-prompt';
      promptLabel.textContent = 'Choose your reply:';
      repliesContainer.appendChild(promptLabel);

      currentThread.playerReplies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'phone-reply-btn';
        btn.innerHTML = `
          <span>${reply.text}</span>
          ${reply.affectionDelta ? `<span class="badge" style="background: rgba(244,63,94,0.2); color: #f43f5e; font-size: 0.72rem;">+Affection</span>` : ''}
        `;
        btn.addEventListener('click', () => {
          this.handlePlayerReply(currentThread, reply);
        });
        repliesContainer.appendChild(btn);
      });
    }

    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  handlePlayerReply(thread, reply) {
    if (!thread || !reply) return;
    if (this.isReplying) return;

    if (!gameState.phone.repliedThreads) gameState.phone.repliedThreads = [];
    if (gameState.phone.repliedThreads.includes(thread.id)) return;

    this.isReplying = true;
    audio.playClick();

    // Immediately disable reply buttons to prevent rapid double-clicks
    const repliesContainer = document.getElementById('phone-replies-container');
    if (repliesContainer) {
      const btns = repliesContainer.querySelectorAll('.phone-reply-btn');
      btns.forEach(b => {
        b.disabled = true;
        b.style.pointerEvents = 'none';
      });
    }

    // Mark as answered
    gameState.phone.repliedThreads.push(thread.id);

    // Apply stat changes
    if (reply.deltas) {
      Object.entries(reply.deltas).forEach(([stat, delta]) => {
        gameState.modifyStat(stat, delta, `Smartphone text: ${thread.id}`);
      });
      if (Object.values(reply.deltas).some(v => v > 0)) {
        audio.playStatGain();
      }
    }

    // Apply affection change
    if (reply.targetNpc && reply.affectionDelta) {
      gameState.modifyAffection(reply.targetNpc, reply.affectionDelta);
      statEvents.emit('toast', {
        message: `${CHARACTERS[reply.targetNpc]?.name || reply.targetNpc} Affection +${reply.affectionDelta}`,
        type: 'success'
      });
    }

    // Award XP
    if (reply.xp) {
      rpgEngine.awardXP(reply.xp, 'Smartphone reply');
    }

    // Set flag
    if (reply.flagSet) {
      gameState.flags[reply.flagSet] = true;
    }

    // Append outgoing bubble to UI
    const messagesEl = document.getElementById('phone-messages-stream');
    if (messagesEl) {
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble outgoing';
      bubble.innerHTML = `
        <strong class="bubble-sender" style="color: #60a5fa;">You</strong>
        <div class="bubble-text">${reply.text}</div>
      `;
      messagesEl.appendChild(bubble);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    this.isReplying = false;
    SaveSystem.save('auto', true);
    // Refresh replies container
    this.renderActiveChatConversation();
  }

  renderExchangeGramFeed() {
    const feedContainer = document.getElementById('phone-feed-stream');
    if (!feedContainer) return;

    feedContainer.innerHTML = '';
    const currentWeek = gameState.meta.week || 1;

    // Show unlocked posts based on current week
    const unlockedPosts = EXCHANGE_GRAM_FEED.filter(p => p.week <= currentWeek);

    if (unlockedPosts.length === 0) {
      feedContainer.innerHTML = `
        <div class="chat-empty-state">
          ${getIconSvg('camera', 28)}
          <p>No photos posted yet! Complete your first school week to begin your photo album.</p>
        </div>
      `;
      return;
    }

    unlockedPosts.slice().reverse().forEach(post => {
      const card = document.createElement('div');
      card.className = 'exchange-gram-card';
      card.innerHTML = `
        <div class="gram-card-header">
          <div class="gram-user">
            <span class="gram-avatar">${getIconSvg('character', 18)}</span>
            <strong>You (Exchangee)</strong>
          </div>
          <span class="gram-week">Week ${post.week}</span>
        </div>
        <div class="gram-photo-frame">
          <div class="gram-photo-placeholder">
            ${getIconSvg('camera', 36)}
            <span>${post.title}</span>
          </div>
        </div>
        <div class="gram-actions-bar">
          <button class="gram-like-btn" title="Like photo">
            ${getIconSvg('heart', 18)}
            <span class="gram-likes-count">${post.likes}</span>
          </button>
        </div>
        <div class="gram-caption">
          <strong>You:</strong> ${post.caption}
        </div>
        <div class="gram-comments-list">
          ${post.comments.map(c => `
            <div class="gram-comment-item">
              <strong>${c.author}:</strong> ${c.text}
            </div>
          `).join('')}
        </div>
      `;

      const likeBtn = card.querySelector('.gram-like-btn');
      if (likeBtn) {
        likeBtn.addEventListener('click', () => {
          audio.playClick();
          post.likes++;
          const countEl = card.querySelector('.gram-likes-count');
          if (countEl) countEl.textContent = post.likes;
          likeBtn.classList.add('liked');
        });
      }

      feedContainer.appendChild(card);
    });
  }

  checkNewWeeklyMessages(week) {
    let hasNew = false;
    Object.values(PHONE_CHATS).forEach(chat => {
      (chat.threads || []).forEach(t => {
        if (t.triggerWeek === week && !(gameState.phone.repliedThreads || []).includes(t.id)) {
          hasNew = true;
        }
      });
    });

    if (hasNew) {
      gameState.phone.unreadCount = (gameState.phone.unreadCount || 0) + 1;
      this.updateNotificationBadge();
      statEvents.emit('toast', {
        message: 'New message received on your Exchange Phone [P]!',
        type: 'info'
      });
    }
  }

  updateNotificationBadge() {
    const badgeEl = document.getElementById('phone-unread-badge');
    const count = gameState.phone?.unreadCount || 0;
    if (badgeEl) {
      if (count > 0) {
        badgeEl.textContent = count;
        badgeEl.style.display = 'inline-flex';
      } else {
        badgeEl.style.display = 'none';
      }
    }
  }
}

export const phoneEngine = new PhoneEngine();
