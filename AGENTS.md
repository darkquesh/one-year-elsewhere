# 🌍 Exchange Student Simulator — Agent Instructions & Knowledge Base (AGENTS.md)

## 📌 Project Overview
**Exchange Student Simulator** is a narrative simulation visual novel game where players experience an exchange student year abroad.
- **Core Themes**: Cultural shock, academic pressure vs country baselines, host family bonds, placement organization (PO) strictness, rule violations & strikes, International Education Week (IEW), and diverse endings (triumphant graduation, early return, university acceptance, asylum, burnout).
- **Runtime Environment**: **Browser-First**. The game runs directly in any modern web browser with zero compilation or native dependencies. Mobile (Android/iOS via Capacitor) and Desktop (Windows/macOS/Linux via Tauri) are downstream wrapper targets.

---

## 🏗️ Architecture & Technical Stack

1. **Language & Modules**: Vanilla HTML5 + Vanilla CSS + Vanilla ES Modules (`type="module"`).
   - No bundler is required for local browser play.
   - For fast development and packaging, Vite is used (`npm run dev`, `npm run build`).
2. **Styling & Design Tokens**:
   - `css/tokens.css`: Base CSS custom properties (`:root`) and theme tokens (`[data-theme="dark"]`, `[data-theme="light"]`, and country accents `[data-country="japan"]`, etc.).
   - `css/layout.css`: Viewport constraints, screen stack containers, responsive breakpoints.
   - `css/components.css`: Glassmorphism cards, stat bars, choice buttons, typewriter dialogue box, drawers.
   - `css/animations.css`: Hardware-accelerated CSS keyframes (card flips, stat pops, shake, fades).
   - `css/mobile.css`: Touch targets ($\ge 48\text{px}$), safe-area insets (`env(safe-area-inset-*)`).
   - `css/desktop.css`: 3-column command center layout for screens $\ge 1024\text{px}$, hotkey tags, hover tooltips.
3. **Audio Architecture**:
   - `js/audio.js` implements a **Web Audio API procedural sound synthesizer and ambient generator**.
   - **Why**: Zero external audio file downloads required; guarantees sounds and ambient music always play in the browser without 404s or licensing issues.
   - User gesture gate: AudioContext initializes or resumes on the first click/tap (Title Screen).
4. **State & Persistence**:
   - `js/gameState.js`: Pure data state tree. Never store DOM nodes, functions, or circular references.
   - `js/save.js`: Versioned JSON schema, 3 manual slots (`esc_save_0..2`) + 1 autosave (`esc_autosave`), double-key atomic write (`_staging` -> live -> `_bak`), and sequential schema migration.
5. **Decoupled Event Bus**:
   - `js/statEvents.js`: Pub/sub event bus. HUD subscribes to `statChanged` events; never poll `gameState` on an interval.

---

## 📂 File Structure

```
exchange_student_sim/
├── AGENTS.md               # This guide for all agent sessions
├── index.html              # Single HTML shell with screen containers
├── package.json            # Scripts (dev, build, preview)
├── css/
│   ├── tokens.css          # Color palettes, dark/light themes, country overrides
│   ├── layout.css          # Responsive grid & screen stack containers
│   ├── components.css      # UI components (stat bars, dialogue box, cards)
│   ├── animations.css      # Keyframes & micro-animations
│   ├── mobile.css          # Mobile-specific touch & notch rules
│   └── desktop.css         # Desktop 3-column layout & hotkey styling
├── js/
│   ├── main.js             # Bootloader & event listeners
│   ├── platform.js         # Unified platform adapter (Web / Capacitor / Tauri)
│   ├── input.js            # Keyboard hotkeys (1-5, Space, Enter, L, J, Esc, F11)
│   ├── screenStack.js      # Push/pop screen navigation & overlay manager
│   ├── gameState.js        # Pure data state & stat modifier layers
│   ├── statEvents.js       # Event bus (statChanged, monthChanged, strikeAdded)
│   ├── dialogueRunner.js   # Typewriter effect, backlog, skip, auto-advance
│   ├── eventEngine.js      # Condition evaluator & weighted event picker
│   ├── school.js           # Courses, academic difficulty diffs, grade placement, IEW
│   ├── violations.js       # Rule violations, documentation odds, random/strike returns
│   ├── hostFamily.js       # Host family archetypes, bond events, transfer logic
│   ├── finance.js          # Debt tracking, scholarship GPA review, odd jobs
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
    └── endingsData.js      # 9+ unique ending outcomes and narratives
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
  7. `screen-arrival`: Touchdown cutscene
  8. `screen-courses`: Mandatory courses + 2 electives timetable builder
  9. `screen-game-loop`: Main monthly gameplay loop
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

### 2. Academic Pressure Calculation
Academic stress is NOT manually chosen by the player. It is calculated dynamically:
$$\text{Academic Pressure} = \text{Course Difficulty Score} + (\text{Host Country Academic Rigor} - \text{Home Country Rigor}) \times 15$$
- *Example*: A Turkish student (high math baseline) taking Calculus in the USA (lower math rigor) experiences low academic pressure and high grade potential. Conversely, taking Literature or moving to a higher-rigor country (like Japan/Germany) elevates pressure.

### 3. Rule Violations & Early Return
- Categories: Minor (curfew, dress code), Major (unapproved travel, hitchhiking, alcohol), Critical (drugs, motorized vehicles, pregnancy).
- Strictness of PO and Location (Rural = "everyone knows everyone") increase documentation chance.
- **Random Early Return**: Can occur on **any strike (1st, 2nd, or 3rd)** if coordinator trust is broken or the violation is critical. Strike 4 is an automatic, non-negotiable expulsion.

### 4. International Education Week (IEW)
- Occurs mid-year (Month 4 / November).
- Multi-step event: Student chooses venue (high school, church, college, community center), preparation style (cooking traditional food, cultural trinkets, slideshow), and handles live Q&A. Affects Social, Adaptation, and Host Family Bond.

---

## 🛠️ Developer & Agent Rules

1. **Maintain Browser Playability**: Any new feature must work in standard web browsers without needing an active build step or server binary.
2. **Data-Driven Logic**: Keep content in `js/data/` objects rather than hardcoding dialogue strings inside logic modules.
3. **Pure State**: Do not store active DOM references or functions in `gameState`. Everything in `gameState` must be JSON serializable.
4. **Accessible Inputs**: Whenever interactive buttons are added, support both click/tap and relevant keyboard shortcuts (`1-5`, `Space`, `Enter`, `Esc`).
5. **Game Feel**: When stats change, always fire `statEvents.emit('statChanged', ...)` so the HUD can play delta animations (`+10`, `-15`) and sound effects.
