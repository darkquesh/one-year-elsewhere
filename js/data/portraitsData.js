// Dynamic Expressive Vector Character Portraits
// Provides high-contrast, scalable, theme-reactive character avatars
// Implements visual novel character presentation standards from .agents/skills/visual-novel

export const CHARACTERS = {
  maya: {
    id: 'maya',
    name: 'Maya Lin',
    role: 'Exchange Student Peer',
    color: '#38bdf8', // Sky blue
    hairColor: '#1e293b',
    accentColor: '#0ea5e9'
  },
  julian: {
    id: 'julian',
    name: 'Julian Vance',
    role: 'Varsity Classmate',
    color: '#fbbf24', // Amber gold
    hairColor: '#78350f',
    accentColor: '#d97706'
  },
  chloe: {
    id: 'chloe',
    name: 'Chloe Takahashi',
    role: 'Language Study Partner',
    color: '#a78bfa', // Purple / lavender
    hairColor: '#312e81',
    accentColor: '#8b5cf6'
  },
  leo: {
    id: 'leo',
    name: 'Leo Romero',
    role: 'Indie Rebel',
    color: '#f43f5e', // Rose / rebel red
    hairColor: '#0f172a',
    accentColor: '#e11d48'
  },
  host_mom: {
    id: 'host_mom',
    name: 'Sarah (Host Mom)',
    role: 'Host Family Guardian',
    color: '#34d399', // Emerald green
    hairColor: '#b45309',
    accentColor: '#059669'
  },
  coordinator: {
    id: 'coordinator',
    name: 'Mr. Peterson',
    role: 'PO Regional Coordinator',
    color: '#94a3b8', // Slate gray
    hairColor: '#475569',
    accentColor: '#64748b'
  }
};

/**
 * Generates an expressive SVG portrait for the given character and mood.
 * @param {string} charId - 'maya' | 'julian' | 'chloe' | 'leo' | 'host_mom' | 'coordinator'
 * @param {string} mood - 'neutral' | 'happy' | 'blush' | 'shocked' | 'suspicious' | 'smirk'
 * @param {number} size - Pixel dimension (width & height)
 * @returns {string} Inline SVG string
 */
export function getCharacterPortraitSvg(charId, mood = 'neutral', size = 110) {
  const char = CHARACTERS[charId] || CHARACTERS.maya;
  const primary = char.color;
  const hair = char.hairColor;
  const accent = char.accentColor;

  // Eyes rendering based on mood
  let eyesSvg = '';
  let mouthSvg = '';
  let blushSvg = '';
  let sweatSvg = '';

  switch (mood) {
    case 'happy':
      // Upturned joyful eyes and open smiling mouth
      eyesSvg = `
        <path d="M26 34 Q32 28 38 34" fill="none" stroke="${primary}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M52 34 Q58 28 64 34" fill="none" stroke="${primary}" stroke-width="2.5" stroke-linecap="round"/>
      `;
      mouthSvg = `
        <path d="M38 52 Q45 62 52 52 Z" fill="${primary}"/>
      `;
      blushSvg = `
        <ellipse cx="28" cy="44" rx="5" ry="2.5" fill="#f43f5e" opacity="0.35"/>
        <ellipse cx="62" cy="44" rx="5" ry="2.5" fill="#f43f5e" opacity="0.35"/>
      `;
      break;

    case 'blush':
      // Wide bashful eyes, heavy blush cheeks, shy mouth
      eyesSvg = `
        <circle cx="32" cy="33" r="3.5" fill="${primary}"/>
        <circle cx="58" cy="33" r="3.5" fill="${primary}"/>
        <circle cx="34" cy="31" r="1.2" fill="#ffffff"/>
        <circle cx="60" cy="31" r="1.2" fill="#ffffff"/>
      `;
      mouthSvg = `
        <path d="M41 53 Q45 56 49 53" fill="none" stroke="${primary}" stroke-width="2" stroke-linecap="round"/>
      `;
      blushSvg = `
        <ellipse cx="27" cy="42" rx="7" ry="3.5" fill="#f43f5e" opacity="0.6"/>
        <ellipse cx="63" cy="42" rx="7" ry="3.5" fill="#f43f5e" opacity="0.6"/>
        <line x1="24" y1="41" x2="30" y2="43" stroke="#e11d48" stroke-width="1.2"/>
        <line x1="60" y1="41" x2="66" y2="43" stroke="#e11d48" stroke-width="1.2"/>
      `;
      break;

    case 'shocked':
      // Wide startled eyes, open mouth, sweat drop
      eyesSvg = `
        <circle cx="32" cy="32" r="5" fill="none" stroke="${primary}" stroke-width="2"/>
        <circle cx="58" cy="32" r="5" fill="none" stroke="${primary}" stroke-width="2"/>
        <circle cx="32" cy="32" r="2" fill="${primary}"/>
        <circle cx="58" cy="32" r="2" fill="${primary}"/>
      `;
      mouthSvg = `
        <ellipse cx="45" cy="54" rx="4" ry="6" fill="${primary}"/>
      `;
      sweatSvg = `
        <path d="M68 22 C68 18 64 16 64 16 C64 16 60 18 60 22 C60 24 64 26 64 26 C64 26 68 24 68 22 Z" fill="#38bdf8" opacity="0.85"/>
      `;
      break;

    case 'suspicious':
    case 'strict':
      // Narrowed interrogating eyes, flat firm mouth, furrowed brow
      eyesSvg = `
        <path d="M25 28 L38 31" stroke="${primary}" stroke-width="2" stroke-linecap="round"/>
        <path d="M65 28 L52 31" stroke="${primary}" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="32" cy="35" rx="3.5" ry="1.5" fill="${primary}"/>
        <ellipse cx="58" cy="35" rx="3.5" ry="1.5" fill="${primary}"/>
      `;
      mouthSvg = `
        <line x1="38" y1="52" x2="52" y2="52" stroke="${primary}" stroke-width="2" stroke-linecap="round"/>
      `;
      break;

    case 'smirk':
      // Winking or sly half-smile
      eyesSvg = `
        <circle cx="32" cy="33" r="3.5" fill="${primary}"/>
        <path d="M52 34 Q58 28 64 34" fill="none" stroke="${primary}" stroke-width="2.5" stroke-linecap="round"/>
      `;
      mouthSvg = `
        <path d="M40 54 Q48 55 54 48" fill="none" stroke="${primary}" stroke-width="2.5" stroke-linecap="round"/>
      `;
      break;

    case 'neutral':
    default:
      // Standard gentle eyes and calm mouth
      eyesSvg = `
        <circle cx="32" cy="33" r="3.2" fill="${primary}"/>
        <circle cx="58" cy="33" r="3.2" fill="${primary}"/>
        <circle cx="33.5" cy="31.5" r="1" fill="#ffffff"/>
        <circle cx="59.5" cy="31.5" r="1" fill="#ffffff"/>
      `;
      mouthSvg = `
        <path d="M40 52 Q45 55 50 52" fill="none" stroke="${primary}" stroke-width="2" stroke-linecap="round"/>
      `;
      break;
  }

  // Character specific hair & accessories silhouette
  let hairAccessoriesSvg = '';

  if (charId === 'maya') {
    // Bangs + cute head band
    hairAccessoriesSvg = `
      <path d="M18 36 C14 18 28 10 45 10 C62 10 76 18 72 36 C68 22 58 16 45 16 C32 16 22 22 18 36 Z" fill="${hair}"/>
      <path d="M22 18 Q45 13 68 18" fill="none" stroke="${accent}" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M20 38 L25 48 L22 55" fill="none" stroke="${hair}" stroke-width="4" stroke-linecap="round"/>
      <path d="M70 38 L65 48 L68 55" fill="none" stroke="${hair}" stroke-width="4" stroke-linecap="round"/>
    `;
  } else if (charId === 'julian') {
    // Athletic crew cut + sporty jacket collar
    hairAccessoriesSvg = `
      <path d="M20 30 C20 12 30 8 45 8 C60 8 70 12 70 30 C65 18 55 14 45 14 C35 14 25 18 20 30 Z" fill="${hair}"/>
      <path d="M24 72 L36 62 L45 74 L54 62 L66 72" fill="none" stroke="${accent}" stroke-width="3" stroke-linejoin="round"/>
    `;
  } else if (charId === 'chloe') {
    // Neat bob hair + round smart glasses
    hairAccessoriesSvg = `
      <path d="M16 40 C14 14 28 10 45 10 C62 10 76 14 74 40 C68 20 60 18 45 18 C30 18 22 20 16 40 Z" fill="${hair}"/>
      <!-- Round Glasses Frame -->
      <circle cx="32" cy="33" r="8" fill="none" stroke="${accent}" stroke-width="1.8"/>
      <circle cx="58" cy="33" r="8" fill="none" stroke="${accent}" stroke-width="1.8"/>
      <line x1="40" y1="33" x2="50" y2="33" stroke="${accent}" stroke-width="1.8"/>
    `;
  } else if (charId === 'leo') {
    // Messy rebel hair + silver earring
    hairAccessoriesSvg = `
      <path d="M18 34 C16 12 28 6 45 6 C62 6 74 12 72 34 C64 16 56 12 45 12 C34 12 26 16 18 34 Z" fill="${hair}"/>
      <path d="M24 16 L28 8 L34 14 L42 6 L48 14 L56 8 L62 16" fill="${hair}"/>
      <!-- Silver Earring on left ear -->
      <circle cx="16" cy="42" r="2.2" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
    `;
  } else if (charId === 'host_mom') {
    // Wavy motherly hair + cozy knit collar
    hairAccessoriesSvg = `
      <path d="M16 42 C12 18 26 10 45 10 C64 10 78 18 74 42 C68 22 58 18 45 18 C32 18 22 22 16 42 Z" fill="${hair}"/>
      <path d="M16 44 Q14 54 22 62" fill="none" stroke="${hair}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M74 44 Q76 54 68 62" fill="none" stroke="${hair}" stroke-width="4.5" stroke-linecap="round"/>
    `;
  } else if (charId === 'coordinator') {
    // Formal parted hair + suit tie collar
    hairAccessoriesSvg = `
      <path d="M20 28 C22 12 32 8 45 8 C58 8 68 12 70 28 C64 16 56 14 45 14 C34 14 26 16 20 28 Z" fill="${hair}"/>
      <polygon points="45,64 42,80 45,86 48,80" fill="${accent}"/>
      <path d="M30 66 L45 74 L60 66" fill="none" stroke="#cbd5e1" stroke-width="2"/>
    `;
  }

  return `
    <svg viewBox="0 0 90 90" width="${size}" height="${size}" class="portrait-svg portrait-${charId}" style="display: block; flex-shrink: 0;" aria-label="${char.name} (${mood})">
      <defs>
        <radialGradient id="grad-bg-${charId}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${primary}" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="${primary}" stop-opacity="0.04"/>
        </radialGradient>
      </defs>

      <!-- Soft Backdrop Circle -->
      <circle cx="45" cy="45" r="41" fill="url(#grad-bg-${charId})" stroke="${primary}" stroke-width="1.5" stroke-opacity="0.4"/>

      <!-- Shoulders / Torso Silhouette -->
      <path d="M18 84 C18 64 30 60 45 60 C60 60 72 64 72 84 Z" fill="rgba(30, 41, 59, 0.75)" stroke="${primary}" stroke-width="1.5"/>

      <!-- Neck -->
      <rect x="40" y="50" width="10" height="13" rx="2" fill="#fde68a" opacity="0.9"/>

      <!-- Face Base Shape -->
      <path d="M22 34 C22 20 32 16 45 16 C58 16 68 20 68 34 C68 50 56 58 45 58 C34 58 22 50 22 34 Z" fill="#fef3c7" stroke="#fcd34d" stroke-width="1.2"/>

      <!-- Ears -->
      <circle cx="21" cy="38" r="4" fill="#fde68a"/>
      <circle cx="69" cy="38" r="4" fill="#fde68a"/>

      <!-- Facial Features -->
      ${blushSvg}
      ${eyesSvg}
      ${mouthSvg}
      ${sweatSvg}

      <!-- Character Specific Hair & Accessories -->
      ${hairAccessoriesSvg}
    </svg>
  `;
}
