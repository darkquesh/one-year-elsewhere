// RPG Data: Keepsakes (Equipment/Items), Perks (Skill Tree), Quests & Level Curve
// Follows rpg/SKILL.md principles: Data-driven items, reversible modifiers, quadratic XP curve.

export const RPG_LEVEL_TITLES = {
  1: 'rpg.title_1',  // Novice Exchangee
  2: 'rpg.title_2',  // Curious Traveler
  3: 'rpg.title_3',  // Cultural Explorer
  4: 'rpg.title_4',  // Bilingual Apprentice
  5: 'rpg.title_5',  // Adaptable Scholar
  6: 'rpg.title_6',  // Beloved Exchangee
  7: 'rpg.title_7',  // Diplomatic Envoy
  8: 'rpg.title_8',  // Distinguished Fellow
  9: 'rpg.title_9',  // Cultural Ambassador
  10: 'rpg.title_10' // Exchange Legend
};

// Quadratic XP curve (Fast early levels, stretching late ones)
export function getXPToNextLevel(level) {
  if (level >= 10) return Infinity;
  return Math.floor(100 * Math.pow(level, 1.45));
}

// Cultural Keepsakes & Equipment (Inventory items that grant passive modifiers)
// icon: key name from icons.js (resolved via getIconSvg in rpgEngine.js)
export const RPG_ITEMS = {
  pocket_dict: {
    id: 'pocket_dict',
    nameKey: 'rpg.item_pocket_dict_name',
    descKey: 'rpg.item_pocket_dict_desc',
    icon: 'journal',
    slot: 'pocket',
    passiveBonus: { adaptation: 5 },
    category: 'starting'
  },
  home_amulet: {
    id: 'home_amulet',
    nameKey: 'rpg.item_home_amulet_name',
    descKey: 'rpg.item_home_amulet_desc',
    icon: 'hostFamilyBond',
    slot: 'trinket',
    passiveBonus: { happiness: 5 },
    category: 'starting'
  },
  transit_pass: {
    id: 'transit_pass',
    nameKey: 'rpg.item_transit_pass_name',
    descKey: 'rpg.item_transit_pass_desc',
    icon: 'finance',
    slot: 'pocket',
    passiveBonus: { financeCostReduction: 4 },
    category: 'equipment'
  },
  varsity_jacket: {
    id: 'varsity_jacket',
    nameKey: 'rpg.item_varsity_jacket_name',
    descKey: 'rpg.item_varsity_jacket_desc',
    icon: 'shield',
    slot: 'wearable',
    passiveBonus: { social: 6 },
    category: 'equipment'
  },
  recipe_card: {
    id: 'recipe_card',
    nameKey: 'rpg.item_recipe_card_name',
    descKey: 'rpg.item_recipe_card_desc',
    icon: 'house',
    slot: 'trinket',
    passiveBonus: { hostFamilyBond: 6 },
    category: 'keepsake'
  },
  calculus_notes: {
    id: 'calculus_notes',
    nameKey: 'rpg.item_calculus_notes_name',
    descKey: 'rpg.item_calculus_notes_desc',
    icon: 'academics',
    slot: 'study',
    passiveBonus: { academics: 6 },
    category: 'study'
  },
  iew_plaque: {
    id: 'iew_plaque',
    nameKey: 'rpg.item_iew_plaque_name',
    descKey: 'rpg.item_iew_plaque_desc',
    icon: 'globe',
    slot: 'trophy',
    passiveBonus: { adaptation: 8, happiness: 5 },
    category: 'trophy'
  },
  prom_corsage: {
    id: 'prom_corsage',
    nameKey: 'rpg.item_prom_corsage_name',
    descKey: 'rpg.item_prom_corsage_desc',
    icon: 'happiness',
    slot: 'keepsake',
    passiveBonus: { social: 8, happiness: 5 },
    category: 'keepsake'
  }
};

// RPG Perks & Specializations (Unlocked upon leveling up)
// icon: key name from icons.js
export const RPG_PERKS = {
  cram_master: {
    id: 'cram_master',
    nameKey: 'rpg.perk_cram_name',
    descKey: 'rpg.perk_cram_desc',
    icon: 'academics',
    academicBonus: 0.25
  },
  polyglot: {
    id: 'polyglot',
    nameKey: 'rpg.perk_polyglot_name',
    descKey: 'rpg.perk_polyglot_desc',
    icon: 'globe',
    adaptationBonus: 0.25
  },
  silver_tongue: {
    id: 'silver_tongue',
    nameKey: 'rpg.perk_silver_name',
    descKey: 'rpg.perk_silver_desc',
    icon: 'social',
    socialBonus: 0.25
  },
  family_favorite: {
    id: 'family_favorite',
    nameKey: 'rpg.perk_family_name',
    descKey: 'rpg.perk_family_desc',
    icon: 'hostFamilyBond',
    bondBonus: 0.25
  },
  street_smart: {
    id: 'street_smart',
    nameKey: 'rpg.perk_street_name',
    descKey: 'rpg.perk_street_desc',
    icon: 'zap',
    violationRiskReduction: 0.30
  },
  iron_will: {
    id: 'iron_will',
    nameKey: 'rpg.perk_iron_name',
    descKey: 'rpg.perk_iron_desc',
    icon: 'shield',
    happinessRetention: 0.20
  }
};

// RPG Quests State Model (Main Quests & Side Quests)
// icon: key name from icons.js
export const RPG_QUESTS = {
  main: [
    {
      id: 'quest_term_1',
      term: 1,
      titleKey: 'rpg.quest_term_1_title',
      descKey: 'rpg.quest_term_1_desc',
      targetWeek: 10,
      xpReward: 200
    },
    {
      id: 'quest_term_2',
      term: 2,
      titleKey: 'rpg.quest_term_2_title',
      descKey: 'rpg.quest_term_2_desc',
      targetWeek: 20,
      xpReward: 250
    },
    {
      id: 'quest_term_3',
      term: 3,
      titleKey: 'rpg.quest_term_3_title',
      descKey: 'rpg.quest_term_3_desc',
      targetWeek: 30,
      xpReward: 300
    },
    {
      id: 'quest_term_4',
      term: 4,
      titleKey: 'rpg.quest_term_4_title',
      descKey: 'rpg.quest_term_4_desc',
      targetWeek: 40,
      xpReward: 500
    }
  ],
  side: [
    {
      id: 'side_dean_list',
      titleKey: 'rpg.side_dean_title',
      descKey: 'rpg.side_dean_desc',
      icon: 'trophy',
      statKey: 'academics',
      targetVal: 85,
      xpReward: 150
    },
    {
      id: 'side_second_family',
      titleKey: 'rpg.side_family_title',
      descKey: 'rpg.side_family_desc',
      icon: 'house',
      statKey: 'hostFamilyBond',
      targetVal: 85,
      xpReward: 150
    },
    {
      id: 'side_polyglot',
      titleKey: 'rpg.side_polyglot_title',
      descKey: 'rpg.side_polyglot_desc',
      icon: 'globe',
      statKey: 'adaptation',
      targetVal: 80,
      xpReward: 150
    },
    {
      id: 'side_popular',
      titleKey: 'rpg.side_popular_title',
      descKey: 'rpg.side_popular_desc',
      icon: 'social',
      statKey: 'social',
      targetVal: 80,
      xpReward: 150
    },
    {
      id: 'side_clean_slate',
      titleKey: 'rpg.side_clean_title',
      descKey: 'rpg.side_clean_desc',
      icon: 'dove',
      specialCheck: (state) => state.violations.strikeCount === 0 && (state.meta.week || 1) >= 20,
      xpReward: 200
    }
  ]
};
