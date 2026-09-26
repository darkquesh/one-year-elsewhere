# 🌍 One Year Elsewhere — Agent Instructions & Knowledge Base (AGENTS.md)

## 📌 Project Overview
**One Year Elsewhere** (formerly *Exchange Student Simulator*) is a modern, tactile narrative life simulation and visual novel game where players experience an international high school exchange student's pivotal 40-week year abroad.

- **Core Themes**: Cultural shock, academic pressure vs country baselines, host family bonds, placement organization (PO) strictness, rule violations & strikes, International Education Week (IEW), teenage relationships & romance, and diverse life outcomes (triumphant graduation, early return, university acceptance, burnout, lifelong bonds).
- **Runtime Environment**: **Browser-First**. The game runs directly in any modern web browser with zero compilation or native dependencies. Mobile (Android/iOS via Capacitor) and Desktop (Windows/macOS/Linux via Tauri) are downstream wrapper targets.
- **Folder Aliases**: Project directory may be named `one-year-elsewhere` or `exchange_student_sim`.

---

## 🏗️ Architecture & Technical Stack

1. **Language & Modules**: Vanilla HTML5 + Vanilla CSS + Vanilla ES Modules (`type="module"`).
   - No bundler is required for local browser play.
   - For fast development and packaging, Vite is used (`npm run dev`, `npm run build`).
2. **Styling & Design Tokens**:
   - `css/tokens.css`: Base CSS custom properties (`:root`) and theme tokens (`[data-theme="dark"]`, `[data-theme="light"]`, and country accents `[data-country="japan"]`, etc.).
   - `css/layout.css`: Viewport constraints, screen stack containers, responsive breakpoints.
   - `css/components.css`: Glassmorphism cards, stat bars, choice buttons, typewriter dialogue box, drawers, phone widget.
   - `css/animations.css`: Hardware-accelerated CSS keyframes (card flips, stat pops, heartbeat pulsing, shake, fades).
   - `css/mobile.css`: Touch targets ($\ge 48\text{px}$), safe-area insets (`env(safe-area-inset-*)`).
   - `css/desktop.css`: 3-column command center layout for screens $\ge 1024\text{px}$, hotkey tags, hover tooltips.
3. **Audio Architecture**:
   - `js/audio.js` implements a **Web Audio API procedural sound synthesizer and ambient generator**.
   - **Why**: Zero external audio file downloads required; guarantees sound effects (heartbeats, notifications, paper rustling, tension ticks) and ambient music always play in the browser without 404s or licensing issues.
   - User gesture gate: AudioContext initializes or resumes on the first click/tap (Title Screen).
4. **State & Persistence**:
   - `js/gameState.js`: Pure data state tree. Never store DOM nodes, functions, or circular references.
   - `js/save.js`: Versioned JSON schema, 3 manual slots (`esc_save_0..2`) + 1 autosave (`esc_autosave`), double-key atomic write (`_staging` -> live -> `_bak`), and sequential schema migration.
5. **Decoupled Event Bus**:
   - `js/statEvents.js`: Pub/sub event bus. HUD subscribes to `statChanged`, `weekChanged`, `strikeAdded` events; never poll `gameState` on an interval.

---

## 📂 File Structure

```text
one-year-elsewhere/
├── AGENTS.md               # This guide for all agent sessions
├── README.md               # Public project overview & instructions
├── index.html              # Single HTML shell with screen containers
├── package.json            # Scripts (dev, build, preview)
├── css/
│   ├── tokens.css          # Color palettes, dark/light themes, country overrides
│   ├── layout.css          # Responsive grid & screen stack containers
│   ├── components.css      # UI components (stat bars, dialogue box, cards, phone HUD)
│   ├── animations.css      # Keyframes, tension pulse, & micro-animations
│   ├── mobile.css          # Mobile-specific touch & notch rules
│   └── desktop.css         # Desktop 3-column layout & hotkey styling
├── js/
│   ├── main.js             # Bootloader & event listeners
│   ├── platform.js         # Unified platform adapter (Web / Capacitor / Tauri)
│   ├── input.js            # Keyboard hotkeys (1-5, Space, Enter, L, J, P, M, Esc, F11)
│   ├── screenStack.js      # Push/pop screen navigation & overlay manager
│   ├── gameState.js        # Pure data state & stat modifier layers
│   ├── statEvents.js       # Event bus (statChanged, weekChanged, strikeAdded)
│   ├── weeklyEngine.js     # 40-week timeline, turn phases, & calendar scheduler
│   ├── dialogueRunner.js   # Typewriter effect, backlog, skip, auto-advance
│   ├── eventEngine.js      # Condition evaluator & weighted event picker
│   ├── school.js           # Courses, academic difficulty diffs, grade placement, IEW
│   ├── violations.js       # Rule violations, documentation odds, random/strike returns
│   ├── hostFamily.js       # Host family archetypes, bond events, transfer logic
│   ├── finance.js          # Debt spiral tracking, scholarship GPA review, odd jobs
│   ├── endings.js          # Ending conditions & ending screen generator
│   ├── save.js             # Versioned save/load system with atomic backups
│   ├── audio.js            # Web Audio API synthesizer for ambient & SFX
│   └── rng.js              # Seeded mulberry32 PRNG
├── js/i18n/
│   ├── i18n.js             # Master localization engine & DOM translator
│   └── locales/            # Language dictionaries (en, tr, de, ja, es)
└── js/data/
    ├── icons.js            # Engine-native Vector SVG Icon library (No emojis)
    ├── flags.js            # Vector SVG national flags for 15+ nations
    ├── countries.js        # 15 destination countries with academic/cultural ratings
    ├── homeCountries.js    # Home countries with cultural & academic baselines
    ├── poData.js           # Placement Organizations (Urban/Suburban/Rural, rules)
    ├── coursesData.js      # Core & elective course catalog with difficulty levels
    ├── eventsData.js       # 80+ dynamic, weighted, balanced narrative events
    └── endingsData.js      # 10+ unique ending outcomes and narratives
```

---

## 🎮 Key Gameplay Systems & Formulas

### 1. Onboarding Flow & Screen Stack Navigation
- **Linear Sequence**:
  1. `screen-title`: Title Screen
  2. `screen-home-country`: Origin Country Selection (sets baseline language and cultural traits)
  3. `screen-funding`: Program Funding Type (Fully-Funded Scholarship vs Self-Paid)
  4. `screen-program-type`: Destination Mode (Mode A Random Draw vs Mode B Priority Ranking)
  5. `screen-envelope-reveal` or `screen-ranking`: Destination matching outcome
  6. `screen-po`: Regional placement organization card (rules, coordinator strictness, grade)
  7. `screen-arrival`: Touchdown cutscene & host family meeting
  8. `screen-courses`: Mandatory courses + 2 electives timetable builder
  9. `screen-game-loop`: Main 40-week gameplay loop
- **Back Navigation**: Every onboarding screen provides a `.btn-back` button invoking `screenStack.pop()`, safely restoring the previous screen state.
- **Card Selection**: All choice cards use `.selectable-card` with high-contrast accent borders (`var(--accent)`), ambient glow (`var(--accent-glow)`), and radio/check badges (`.selection-indicator`).

### 2. Destination Assignment
- **Mode A (Random Envelope)**: True weighted random draw. Player has no advance choice; country card flips in with immediate emotional reaction event.
- **Mode B (Priority List)**: Player ranks top 5 choices. Probabilistic assignment:
  - 1st choice: ~50%
  - 2nd choice: ~25%
  - 3rd choice: ~13%
  - 4th choice: ~4%
  - 5th choice: ~8% (or weighted remainder)
  Emotional reaction event reflects whether player got their #1 choice or a fallback.

### 3. Academic Pressure Calculation
Academic stress is NOT manually chosen by the player. It is calculated dynamically:
$$\text{Academic Pressure} = \text{Course Difficulty Score} + (\text{Host Country Academic Rigor} - \text{Home Country Rigor}) \times 15$$
- *Example*: A Turkish student (high math baseline) taking Calculus in the USA (lower math rigor) experiences low academic pressure and high grade potential. Conversely, taking Literature or moving to a higher-rigor country (like Japan/Germany) elevates pressure.

### 4. 6 Core Player Stats
1. 🧠 **Academics** (0–100): GPA and class standing. High pressure erodes happiness; failing grades endanger scholarships.
2. 💰 **Finance** (0–100): Pocket budget and living allowances. Reaching 0 initiates the 5-Stage Debt Spiral.
3. 😊 **Happiness** (0–100): Mental resilience. 0 triggers the Burnout ending.
4. 🤝 **Social** (0–100): Peer network, popularity, and romantic connections.
5. 🌐 **Adaptation** (0–100): Cultural fluency and language comprehension. Directly drives the Language Deciphering mechanic.
6. 🏠 **Host Family Bond** (0–100): Mutual trust and familial affection with host parents and siblings.

### 5. Host Family System
Every student is matched with one of four archetypes upon arrival:
- 🤗 **Warm & Welcoming**: High emotional support (+Happiness, rapid bond acceleration).
- 📏 **Strict & Traditional**: Enforced curfews, chore charts, and academic scrutiny (−Happiness early, +Academics).
- 🌀 **Chaotic & Loud**: Large family, active siblings, shared bedrooms (+Social, −Academics).
- 🧊 **Distant & Formal**: Respectful independence, hands-off parenting (−Happiness, +Adaptation).

### 6. Rule Violations, Documentation Odds & Early Return
- Categories: Minor (curfew, dress code), Major (unapproved travel, hitchhiking, alcohol), Critical (drugs, motorized vehicles, unauthorized relationships).
- Strictness of PO and Location (Rural = high detection) increase documentation probability.
- **Random Early Return**: Can occur on **any strike (1st, 2nd, or 3rd)** if coordinator trust is broken or the violation is critical. Strike 4 is an automatic, non-negotiable expulsion.

### 7. Modern Interactive Mechanics
- **Diegetic "ExchangePhone"**: Pull up the phone HUD with `[P]` to view incoming texts, group chats with exchange peers (*"The Exiles"*), and the photo feed.
- **Press-Your-Luck Tension Dial**: High-risk activities (senior bonfires, sneaking out, parties) feature an audible heartbeat and rising danger gauge. Players decide when to push their luck or withdraw.
- **Suspicion & Alibi Minigame**: When caught or questioned by coordinators or host parents:
  - Option 1: *Fabricate an Alibi* (Adaptation / Bluff check)
  - Option 2: *Honest Confession & Plead for Mercy* (Host Family Bond check)
  - Option 3: *Call in an Ally* (Consumes friend/partner affinity for a cover story)
- **Language Deciphering**: In the early months, foreign dialogue contains scrambled keywords. Raising the Adaptation stat unscrambles text in real time.
- **Odd-Jobs**: Casual gigs (snow shoveling, lawn mowing, dog walking, leaf raking) open to both funded and self-paid students for emergency cash.

### 8. International Education Week (IEW)
- Occurs mid-year (Month 4 / November).
- Multi-step event: Student chooses venue (high school, church, college, community center), preparation style (cooking traditional food, cultural trinkets, slideshow), and handles live Q&A. Affects Social, Adaptation, and Host Family Bond.

---

## 🛠️ Developer & Agent Rules

1. **Maintain Browser Playability**: Any new feature must work in standard web browsers without needing an active build step or server binary.
2. **Data-Driven Logic**: Keep content in `js/data/` objects rather than hardcoding dialogue strings inside logic modules.
3. **Pure State**: Do not store active DOM references or functions in `gameState`. Everything in `gameState` must be JSON serializable.
4. **Accessible Inputs**: Whenever interactive buttons are added, support both click/tap and relevant keyboard shortcuts (`1-5`, `Space`, `Enter`, `P`, `M`, `Esc`).
5. **Game Feel**: When stats change, always fire `statEvents.emit('statChanged', ...)` so the HUD can play delta animations (`+10`, `-15`) and sound effects.
