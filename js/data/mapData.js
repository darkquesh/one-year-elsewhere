// Interactive Campus & Regional Town Map Data
// Implements spatial exploration standards from modern narrative games

export const MAP_LOCATIONS = {
  loc_quad: {
    id: 'loc_quad',
    name: 'High School Quad & Lockers',
    category: 'campus',
    iconKey: 'school',
    color: '#38bdf8',
    bgTheme: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)',
    description: 'The bustling center of campus life. Lockers slammed shut, laughter echoing, and flyers for the upcoming school dance.',
    residentNpc: 'maya',
    actions: [
      {
        id: 'action_hallway_chat',
        label: 'Hallway Banter with Peers',
        cost: 0,
        deltas: { social: 4, adaptation: 2 },
        xp: 15,
        desc: 'Chat about weekend gossip and compare homework answers by the red lockers.'
      },
      {
        id: 'action_bulletin_board',
        label: 'Inspect Extracurricular Club Posters',
        cost: 0,
        deltas: { adaptation: 3 },
        xp: 15,
        desc: 'Browse sign-up sheets for Drama, Track, Model UN, and Photography.'
      }
    ]
  },

  loc_library: {
    id: 'loc_library',
    name: 'West Wing Library & Study Alcove',
    category: 'campus',
    iconKey: 'academics',
    color: '#a78bfa',
    bgTheme: 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)',
    description: 'Towering wooden bookshelves, green banker lamps, and absolute silence. Chloe’s favorite study sanctuary.',
    residentNpc: 'chloe',
    actions: [
      {
        id: 'action_study_partner',
        label: 'Study Session with Chloe',
        cost: 0,
        deltas: { academics: 6, adaptation: 2 },
        targetNpc: 'chloe',
        affectionDelta: 6,
        xp: 25,
        desc: 'Solve advanced calculus equations and trade flashcards under the warm lamp glow.'
      },
      {
        id: 'action_bilingual_reading',
        label: 'Read Local Newspapers & Literature',
        cost: 0,
        deltas: { academics: 4, adaptation: 5 },
        xp: 20,
        desc: 'Expand your vocabulary by reading local news headlines and high school magazines.'
      }
    ]
  },

  loc_gym: {
    id: 'loc_gym',
    name: 'Varsity Gymnasium & Bleachers',
    category: 'campus',
    iconKey: 'trophy',
    color: '#fbbf24',
    bgTheme: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)',
    description: 'Polished hardwood floors echoing with basketball dribbles and varsity track runners sprinting the indoor track.',
    residentNpc: 'julian',
    actions: [
      {
        id: 'action_track_laps',
        label: 'Run Track Laps with Julian',
        cost: 0,
        deltas: { happiness: 5, adaptation: 3 },
        targetNpc: 'julian',
        affectionDelta: 7,
        xp: 25,
        desc: 'Pound the rubber track until your lungs burn and exchange high-fives at the finish line.'
      },
      {
        id: 'action_bleachers_hangout',
        label: 'Watch Practice from the Top Bleachers',
        cost: 0,
        deltas: { social: 4, happiness: 3 },
        xp: 15,
        desc: 'Cheer on classmates while sipping cold lemonade under the banner of the school mascot.'
      }
    ]
  },

  loc_home: {
    id: 'loc_home',
    name: 'Host Family Residence',
    category: 'town',
    iconKey: 'house',
    color: '#34d399',
    bgTheme: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)',
    description: 'A cozy suburban home with a welcoming front porch, a well-stocked kitchen, and your host parents Sarah & Mark.',
    residentNpc: 'host_mom',
    actions: [
      {
        id: 'action_cook_dinner',
        label: 'Cook Home Country Dish for Host Family',
        cost: 5,
        deltas: { hostFamilyBond: 10, happiness: 5, adaptation: 4 },
        xp: 35,
        desc: 'Prepare authentic traditional recipes from your homeland. Sarah takes photos to send to neighbors!'
      },
      {
        id: 'action_chores_and_yard',
        label: 'Help with Household Chores & Yard Work',
        cost: 0,
        deltas: { hostFamilyBond: 6, academics: -1 },
        xp: 20,
        desc: 'Mow the lawn, rake autumn leaves, or fold laundry to demonstrate gratitude.'
      }
    ]
  },

  loc_diner: {
    id: 'loc_diner',
    name: 'The Corner 24/7 Neon Diner',
    category: 'town',
    iconKey: 'briefcase',
    color: '#f97316',
    bgTheme: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)',
    description: 'Retro red vinyl booths, a glowing vintage jukebox playing rock hits, and bottomless coffee pots.',
    residentNpc: 'julian',
    actions: [
      {
        id: 'action_order_milkshake',
        label: 'Order Milkshakes & Crispy Fries',
        cost: 6,
        deltas: { happiness: 8, social: 4 },
        xp: 20,
        desc: 'Slurp thick milkshakes while discussing Friday football matches and teenage dreams.'
      },
      {
        id: 'action_diner_shift',
        label: 'Help Bus Tables for Spare Cash',
        cost: 0,
        deltas: { finance: 12, adaptation: 3, happiness: -2 },
        xp: 25,
        desc: 'Clean ketchup bottles and wipe tables for two hours to earn pocket money.'
      }
    ]
  },

  loc_station: {
    id: 'loc_station',
    name: 'Central Rail & Transit Station',
    category: 'town',
    iconKey: 'plane',
    color: '#38bdf8',
    bgTheme: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)',
    description: 'The gateway to regional travel. Departure boards flip rhythmically as trains head out toward big cities.',
    residentNpc: 'maya',
    actions: [
      {
        id: 'action_plan_weekend_trip',
        label: 'Review Regional Weekend Destinations',
        cost: 0,
        deltas: { adaptation: 3 },
        xp: 15,
        desc: 'Check timetables and ticket prices for upcoming weekend getaways.'
      }
    ]
  },

  loc_quarry: {
    id: 'loc_quarry',
    name: 'The Abandoned Quarry & Bonfire Spot',
    category: 'forbidden',
    iconKey: 'flame',
    color: '#f43f5e',
    bgTheme: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%)',
    description: 'A secluded rocky clearing far past the suburban streetlights. The sound of acoustic guitars, crackling bonfires, and laughter.',
    residentNpc: 'leo',
    isNightOnly: true,
    actions: [
      {
        id: 'action_attend_bonfire',
        label: 'Join the Midnight Bonfire Gathering',
        cost: 0,
        deltas: { social: 8, happiness: 7 },
        targetNpc: 'leo',
        affectionDelta: 10,
        riskLevel: 'high',
        xp: 35,
        desc: 'Warm your hands by the blaze, listen to Leo’s guitar, and experience the unfiltered teenage rebellion.'
      }
    ]
  }
};
