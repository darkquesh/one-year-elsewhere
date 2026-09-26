# 🌍 One Year Elsewhere

> *A rich, tactile narrative life simulation of an international high school exchange student.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Stack-Vanilla%20HTML5%20%2F%20CSS3%20%2F%20ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/Dependencies-Zero-success.svg)](package.json)

---

## 📖 Overview

**One Year Elsewhere** is a modern browser-based narrative life simulation and visual novel game where you step into the shoes of an exchange student spending a pivotal 40-week academic year living with a host family in a foreign country.

From the overwhelming rush of airport arrival to negotiating house rules, handling culture shock, cramming for exams, forging unforgettable friendships, falling in love, and dodging the ever-looming threat of Placement Organization strikes—every week presents meaningful choices that define who you become.

---

## 🎮 Key Features

### 🧳 Character Creation & Origins
- **Home Country Baseline**: Select your country of origin, establishing your baseline academic rigor, native language, and cultural norms.
- **Diverse Destination Countries**: Embark to unique destinations (United States, Japan, Germany, France, South Korea, Brazil, Australia, United Kingdom, Canada, etc.), each featuring distinctive language barriers, cultural difficulty ratings, and local event pools.
- **Two Funding Paths**:
  - 🟢 **Fully Funded Scholarship**: Enjoy financial security with a monthly stipend, but remain subject to strict GPA minimums, academic reports, and stringent conduct compliance.
  - 🔴 **Self-Paid Program**: Experience complete academic freedom, but manage a precarious bank balance, navigate price tags, and survive financial crises.

### 📊 Comprehensive Stat Ecosystem
Balance six interconnected core attributes (0–100):
- 🧠 **Academics**: GPA, homework completion, exam prep, and classroom performance.
- 💰 **Finance**: Discretionary funds, emergency reserves, and daily living budget.
- 😊 **Happiness**: Mental wellbeing, emotional resilience, and morale.
- 🤝 **Social**: High school cliques, friendships, and romantic connections.
- 🌐 **Adaptation**: Language fluency, cultural familiarity, and local slang mastery.
- 🏠 **Host Family Bond**: Trust and rapport with your host parents and siblings.

### 🏡 Dynamic Host Family System
Every student is placed with a distinct host family archetype with tailored personality traits, house rules, and dinner-table dynamics:
- 🤗 **Warm & Welcoming**: Nurturing and supportive (+Happiness, fast bond growth).
- 📏 **Strict & Traditional**: Enforces curfews and chores (−Happiness early, +Academics).
- 🌀 **Chaotic & Energetic**: Busy, loud household with no personal space (+Social, −Academics).
- 🧊 **Distant & Reserved**: Hands-off, independent living (−Happiness, +Adaptation).

### 🚨 Placement Organization (PO) & Strikes Engine
- **Local Coordinators**: Supervised by local reps with varying strictness (Lenient, Moderate, Strict, Zero-Tolerance).
- **The "Three Strikes" Threat**: Documented violations (curfew breaches, unapproved travel, academic warnings, unauthorized driving) earn formal strikes. Accumulating strikes or committing critical infractions risks immediate early return flights home!
- **Suspicion & Alibi Minigame**: Get caught sneaking in past curfew or bending program rules? Test your Adaptation and Host Family Bond to fabricate an alibi, plead for mercy, or call in an ally to cover for you.

### 📱 Modern Interactive Life-Sim Mechanics
- **The "ExchangePhone"**: Diegetic smartphone interface featuring group chats with fellow exchangees (*"The Exiles"*), urgent texts from host mom, and photo updates.
- **Press-Your-Luck Tension Dial**: High-risk activities (senior bonfires, sneaking out, parties) feature an audible heartbeat and rising danger gauge. Players decide when to push their luck or withdraw.
- **Interactive Campus & Town Map**: Spend weekly free time exploring the diner, quad, library, or local spots.
- **Language Deciphering**: Experience genuine culture shock—scrambled foreign vocabulary early in the year resolves into clear speech as your Adaptation stat grows.
- **Odd-Jobs & Seasonal Gigs**: Both funded and self-paid students can shovel snow, mow suburban lawns, or walk neighborhood dogs for pocket cash without violating visa work restrictions.

### 🎭 10+ Branching Endings
Your 40-week journey culminates in varied outcomes:
- 🏆 **Triumphant Return**: Master all stats and return home celebrated.
- 🎓 **Academic Honors**: Top GPA opens international university scholarships.
- 🌍 **Permanent Horizon**: Deeply integrated, paving the way to stay permanently.
- 👨‍👩‍👧 **Second Family**: Forge an unbreakable bond with a family across the globe.
- 💔 **Burnout Withdrawal**: Overcome by stress and homesickness.
- 🏠 **Placement Breakdown**: Host family irreconcilable friction.
- 💸 **Broke & Scraped Through**: Barely survived with empty pockets, but made it.
- 🛫 **Early Return / Deportation**: Expelled by the PO or immigration for strikes.
- ⚡ **The Untamed Legend**: Survived all 40 weeks riding the edge on 3 strikes.

---

## 🛠️ Project Structure

```text
one-year-elsewhere/
├── AGENTS.md                  # Comprehensive AI agent instructions & knowledge base
├── README.md                  # Project overview & documentation
├── index.html                 # Main web entry point & application shell
├── package.json               # Development scripts & Vite configuration
├── css/
│   ├── tokens.css             # Design tokens (colors, typography, glassmorphism)
│   ├── layout.css             # App shell, responsive grid, and viewport layout
│   ├── components.css         # Cards, dialogs, buttons, meters, and phone widget
│   ├── animations.css         # Keyframe animations, screen shake, and transitions
│   ├── mobile.css             # Mobile & portrait optimizations
│   └── desktop.css            # Desktop wide-screen enhancements
├── js/
│   ├── main.js                # App lifecycle & screen flow orchestrator
│   ├── gameState.js           # Reactive game state store & mutation API
│   ├── weeklyEngine.js        # 40-week calendar loop & turn phases
│   ├── eventEngine.js         # Weighted narrative event selector
│   ├── violations.js          # PO strictness, strikes, and documentation risk
│   ├── school.js              # Academic grading curves, exams, & schedules
│   ├── dialogueRunner.js      # Branching narrative dialogue processor
│   ├── endings.js             # Ending conditions & epilogue evaluation
│   ├── save.js                # Crash-safe localStorage persistence & schema versioning
│   ├── audio.js               # Web Audio sound cues and ambient effects
│   ├── platform.js            # Platform abstraction & input handling
│   ├── rng.js                 # Seeded, deterministic pseudorandom generator
│   ├── statEvents.js          # Event bus for stat modifications & alerts
│   ├── i18n/
│   │   ├── i18n.js            # Localization engine
│   │   └── locales/           # Translation dictionaries (en, ja, de, tr, es)
│   └── data/
│       ├── countries.js       # Destination country metadata & perks
│       ├── homeCountries.js   # Origin country profiles & baselines
│       ├── eventsData.js      # Story events, dilemmas, & consequences
│       ├── poData.js          # Coordinator archetypes & strictness rules
│       ├── coursesData.js     # Subjects, difficulty ratings, & credit hours
│       ├── endingsData.js     # Epilogue texts & condition requirements
│       ├── flags.js           # SVG flag assets & country identifiers
│       └── icons.js           # Visual iconography & UI symbols
└── assets/                    # Audio assets, sprites, and illustrations
```

---

## 🚀 Getting Started

### Prerequisites
* Any modern web browser (Chrome, Edge, Firefox, Safari).
* No build tools, compilers, or Node.js runtime required! The project runs entirely on native **Vanilla ES6 Modules**.

### Running Locally

1. **Launch a Local HTTP Server**:
   Because ES6 modules enforce CORS security restrictions on `file:///` URLs, serve the project folder using any local HTTP server:

   * **Using Vite (Fast Dev Server)**:
     ```bash
     npm install
     npm run dev
     ```
   * **Using Python 3**:
     ```bash
     python -m http.server 8000
     ```
   * **Using Node / npx**:
     ```bash
     npx serve .
     ```
   * **Using VS Code Live Server**:
     Right-click `index.html` and choose **"Open with Live Server"**.

2. **Play**:
   Open `http://localhost:5173` (Vite) or `http://localhost:8000` (Python) in your browser.

---

## ⌨️ Controls & Accessibility

- **Mouse / Touch**: Click or tap any decision card, dialog choice, or map pin.
- **Keyboard Shortcuts**:
  - `1` / `2` / `3` / `4`: Select decision options.
  - `P`: Toggle the **ExchangePhone**.
  - `M`: Toggle the **Campus & Town Map**.
  - `Space` / `Enter`: Advance dialogue and dismiss notifications.
  - `Esc`: Pause menu and settings.
- **Accessibility**: Includes options for reduced screen shake, high-contrast text, text-scaling, and colorblind-safe stat meters.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
