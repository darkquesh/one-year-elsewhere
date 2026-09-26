// NPC Relationships, Romance & Social Dynamics Data
// Implements relationship tracks and gift affinities from visual-novel and rpg skills

export const RELATIONSHIPS_CONFIG = {
  stages: [
    { id: 'acquaintance', min: 0, max: 24, label: 'Acquaintance', color: '#94a3b8' },
    { id: 'friend', min: 25, max: 49, label: 'Good Friend', color: '#38bdf8' },
    { id: 'close_friend', min: 50, max: 74, label: 'Close Confidant', color: '#a78bfa' },
    { id: 'crush', min: 75, max: 89, label: 'Mutual Crush', color: '#f43f5e' },
    { id: 'partner', min: 90, max: 100, label: 'Romantic Partner', color: '#e11d48' }
  ],

  npcs: {
    maya: {
      id: 'maya',
      name: 'Maya Lin',
      role: 'Exchange Student Peer',
      bio: 'Fellow international exchange student. Shares your homesickness, funny cultural misunderstandings, and passion for photography.',
      color: '#38bdf8',
      initialAffection: 15,
      favoriteGifts: ['home_amulet', 'pocket_dict', 'japanese_fan', 'tea_tin'],
      dislikedGifts: ['calculator', 'sports_jersey'],
      dates: [
        {
          id: 'date_maya_boba',
          title: 'Bubble Tea & Homesick Confessions',
          cost: 8,
          minAffection: 25,
          location: 'loc_diner',
          deltas: { social: 6, happiness: 8 },
          affectionGain: 12,
          xp: 30,
          desc: 'Sip sweet boba tea while showing each other photos of your families back home.'
        },
        {
          id: 'date_maya_photoshoot',
          title: 'Sunset Rooftop Photography Session',
          cost: 0,
          minAffection: 50,
          location: 'loc_quad',
          deltas: { happiness: 10, social: 8 },
          affectionGain: 16,
          xp: 40,
          desc: 'Take golden hour portraits for each other’s exchange year photo albums.'
        }
      ]
    },

    julian: {
      id: 'julian',
      name: 'Julian Vance',
      role: 'Varsity Track Captain',
      bio: 'Outgoing, energetic local high school classmate. Always excited to share American high school traditions with you.',
      color: '#fbbf24',
      initialAffection: 20,
      favoriteGifts: ['sports_jersey', 'energy_drink', 'shinkansen_ticket'],
      dislikedGifts: ['poetry_book', 'pocket_dict'],
      dates: [
        {
          id: 'date_julian_diner',
          title: 'Post-Meet Diner Milkshakes',
          cost: 10,
          minAffection: 25,
          location: 'loc_diner',
          deltas: { social: 7, happiness: 7 },
          affectionGain: 12,
          xp: 30,
          desc: 'Share a booth, devour crispy curly fries, and talk about teenage life across continents.'
        },
        {
          id: 'date_julian_drivein',
          title: 'Retro Drive-In Movie Night',
          cost: 15,
          minAffection: 55,
          location: 'loc_town',
          deltas: { happiness: 12, social: 10 },
          affectionGain: 18,
          xp: 45,
          desc: 'Watch an 80s classic on the giant outdoor projection screen from the truck bed.'
        }
      ]
    },

    chloe: {
      id: 'chloe',
      name: 'Chloe Takahashi',
      role: 'Language & Academic Partner',
      bio: 'Brilliant, thoughtful, and top of her class. She loves deep discussions, foreign literature, and quiet library corners.',
      color: '#a78bfa',
      initialAffection: 15,
      favoriteGifts: ['pocket_dict', 'fountain_pen', 'art_sketchbook'],
      dislikedGifts: ['vip_wristband', 'beer_can'],
      dates: [
        {
          id: 'date_chloe_tea',
          title: 'Bilingual Tea & Book Discussion',
          cost: 6,
          minAffection: 25,
          location: 'loc_library',
          deltas: { academics: 8, adaptation: 6, social: 4 },
          affectionGain: 12,
          xp: 35,
          desc: 'Compare historical philosophies and laugh over funny language translations.'
        },
        {
          id: 'date_chloe_planetarium',
          title: 'Weekend Stargazing at the Planetarium',
          cost: 12,
          minAffection: 50,
          location: 'loc_station',
          deltas: { academics: 6, happiness: 10 },
          affectionGain: 16,
          xp: 45,
          desc: 'Sit side by side in the domed theater gazing up at the projected cosmos.'
        }
      ]
    },

    leo: {
      id: 'leo',
      name: 'Leo Romero',
      role: 'Indie Musician & Rebel',
      bio: 'Charismatic, artistic, and completely indifferent to high school social hierarchies. He plays bass and knows all the secret spots.',
      color: '#f43f5e',
      initialAffection: 10,
      favoriteGifts: ['vip_wristband', 'vintage_cassette', 'silver_earring'],
      dislikedGifts: ['calculator', 'grammar_workbook'],
      dates: [
        {
          id: 'date_leo_vinyl',
          title: 'Record Hunting in the Old Quarter',
          cost: 12,
          minAffection: 30,
          location: 'loc_diner',
          deltas: { social: 8, happiness: 10 },
          affectionGain: 14,
          xp: 35,
          desc: 'Flip through vintage vinyl crates and listen to rare indie pressings through shared headphones.'
        },
        {
          id: 'date_leo_bonfire',
          title: 'Private Stargazing at the Quarry Lookout',
          cost: 0,
          minAffection: 55,
          location: 'loc_quarry',
          deltas: { happiness: 14, social: 10 },
          affectionGain: 20,
          xp: 50,
          desc: 'Sit on the hood of an old car looking out over the city lights while Leo plays an acoustic riff.'
        }
      ]
    }
  }
};
