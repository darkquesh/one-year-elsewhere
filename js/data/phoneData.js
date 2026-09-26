// Exchange Student Smartphone System (Chats, DMs & Simulated Social Feed)
// Implements diegetic smartphone immersion standards from modern life-sims

export const PHONE_CHATS = {
  group_exchange: {
    id: 'group_exchange',
    name: 'The Exiles ',
    subtitle: 'Maya, Leo, Chloe, You',
    avatarKey: 'users',
    color: '#38bdf8',
    threads: [
      {
        id: 'thread_week_1',
        triggerWeek: 1,
        messages: [
          { sender: 'maya', text: 'Has everyone landed safe?! My luggage got delayed at the terminal ', delay: 800 },
          { sender: 'leo', text: 'Landed 2 hours ago. My host dad literally drives a giant pickup truck lol.', delay: 2200 },
          { sender: 'chloe', text: 'Welcome everyone. Remember orientation begins promptly at 8:00 AM tomorrow in the auditorium.', delay: 3600 }
        ],
        playerReplies: [
          { text: 'Surviving the jetlag! My host family seems super sweet.', deltas: { adaptation: 3, hostFamilyBond: 2 }, xp: 20 },
          { text: 'I am so exhausted, culture shock is already hitting me hard.', deltas: { happiness: -2, adaptation: 1 }, xp: 20 },
          { text: 'Wait, pickup truck?! That is so stereotypically awesome haha.', deltas: { social: 3 }, xp: 20 }
        ]
      },
      {
        id: 'thread_week_4',
        triggerWeek: 4,
        messages: [
          { sender: 'maya', text: 'Did anyone actually understand Mr. Henderson in 3rd period calculus? My brain hurts.', delay: 1000 },
          { sender: 'chloe', text: 'He moves through quadratic integration very quickly. I have handwritten study notes if anyone needs them.', delay: 2400 },
          { sender: 'leo', text: 'Or just skip 4th period study hall and come kick it by the football bleachers.', delay: 3800 }
        ],
        playerReplies: [
          { text: 'Chloe, please save my life with those notes! Library study session?', deltas: { academics: 5, social: 2 }, targetNpc: 'chloe', affectionDelta: 8, xp: 25 },
          { text: 'Bleachers sound way more fun than calculus honestly.', deltas: { social: 5, academics: -3 }, targetNpc: 'leo', affectionDelta: 8, xp: 25 },
          { text: 'I need to study on my own tonight, host mom is checking my grades.', deltas: { academics: 3, hostFamilyBond: 3 }, xp: 20 }
        ]
      },
      {
        id: 'thread_week_12',
        triggerWeek: 12,
        messages: [
          { sender: 'leo', text: 'Yo! Word is the senior bonfire is happening this Friday at the old quarry. Unchaperoned ', delay: 1000 },
          { sender: 'maya', text: 'Is that allowed? Pretty sure our PO handbook strictly forbids unsupervised nighttime bonfires...', delay: 2400 },
          { sender: 'leo', text: 'Live a little Maya. No one ever made exchange year memories by sitting in their bedroom studying.', delay: 3800 }
        ],
        playerReplies: [
          { text: 'Count me in Leo. What time are we meeting up?', deltas: { social: 6, happiness: 4 }, targetNpc: 'leo', affectionDelta: 12, flagSet: 'bonfire_attending', xp: 35 },
          { text: 'Maya is right, coordinator Peterson will destroy us if we get caught.', deltas: { adaptation: 4, hostFamilyBond: 2 }, targetNpc: 'maya', affectionDelta: 8, xp: 25 },
          { text: 'I will decide on Friday depending on how exhausted I am.', deltas: { happiness: 2 }, xp: 20 }
        ]
      },
      {
        id: 'thread_week_28',
        triggerWeek: 28,
        messages: [
          { sender: 'maya', text: 'Spring break is in two weeks! Are you guys planning any weekend travel?', delay: 900 },
          { sender: 'chloe', text: 'Make sure to submit your official PO Travel Authorization forms at least 14 days in advance.', delay: 2200 },
          { sender: 'leo', text: 'Official forms take 3 weeks to get rejected. Just buy a bus ticket and do not tell the coordinator.', delay: 3600 }
        ],
        playerReplies: [
          { text: 'Submitting the official PO form today. Better safe than deported!', deltas: { academics: 2, adaptation: 4 }, flagSet: 'travel_official_planned', xp: 25 },
          { text: 'Leo is right... coordinator is way too strict. What they do not know cannot hurt.', deltas: { social: 5, happiness: 5 }, flagSet: 'travel_rogue_planned', targetNpc: 'leo', affectionDelta: 10, xp: 30 }
        ]
      }
    ]
  },

  host_parents: {
    id: 'host_parents',
    name: 'Sarah & Mark (Host Parents)',
    subtitle: 'Active Household Chat',
    avatarKey: 'house',
    color: '#34d399',
    threads: [
      {
        id: 'host_week_2',
        triggerWeek: 2,
        messages: [
          { sender: 'host_mom', text: 'Hey sweetie! Dinner is in the oven (chicken pot pie). Curfew on weeknights is 9:30 PM sharp, see you soon ', delay: 1000 }
        ],
        playerReplies: [
          { text: 'Smells delicious even from here! Heading home now, on time.', deltas: { hostFamilyBond: 6, happiness: 2 }, xp: 20 },
          { text: 'Running 15 mins late finishing homework at the library, is that okay?', deltas: { academics: 3, hostFamilyBond: 2 }, xp: 20 },
          { text: 'Already ate pizza with classmates after school, sorry!', deltas: { hostFamilyBond: -4, social: 3 }, xp: 15 }
        ]
      },
      {
        id: 'host_week_15',
        triggerWeek: 15,
        messages: [
          { sender: 'host_mom', text: 'We noticed you seemed a little quiet this week. Everything okay at school? Remember our door is always open.', delay: 1200 }
        ],
        playerReplies: [
          { text: 'Thank you Sarah, just feeling a little homesick today. Can we make cookies tonight?', deltas: { hostFamilyBond: 10, happiness: 6 }, xp: 30 },
          { text: 'I am totally fine! Just studying hard for midterms.', deltas: { academics: 4, hostFamilyBond: 3 }, xp: 20 }
        ]
      }
    ]
  },

  crush: {
    id: 'crush',
    name: 'Private Messages',
    subtitle: '1-on-1 Direct Chat',
    avatarKey: 'heart',
    color: '#f43f5e',
    threads: [
      {
        id: 'crush_julian_1',
        npcId: 'julian',
        minAffection: 25,
        messages: [
          { sender: 'julian', text: 'Hey! Saw you at the track meet today. Good cheering section haha.', delay: 800 },
          { sender: 'julian', text: 'Are you free after school tomorrow? Was thinking we could grab milkshakes at the corner diner.', delay: 2400 }
        ],
        playerReplies: [
          { text: 'I would love to! Strawberry milkshake is my favorite.', deltas: { social: 5, happiness: 6 }, targetNpc: 'julian', affectionDelta: 12, xp: 30 },
          { text: 'Only if you promise to explain the rules of American football to me again!', deltas: { social: 6, adaptation: 4 }, targetNpc: 'julian', affectionDelta: 10, xp: 30 },
          { text: 'Tomorrow is tight with homework, but maybe Friday?', deltas: { academics: 3 }, targetNpc: 'julian', affectionDelta: 4, xp: 15 }
        ]
      },
      {
        id: 'crush_maya_1',
        npcId: 'maya',
        minAffection: 25,
        messages: [
          { sender: 'maya', text: 'Hey... are you awake? Cannot sleep, missing my family back in Taipei tonight ', delay: 1000 }
        ],
        playerReplies: [
          { text: 'I am awake! Tell me about home. What is the first street food you miss most?', deltas: { hostFamilyBond: 2, social: 6, happiness: 5 }, targetNpc: 'maya', affectionDelta: 14, xp: 35 },
          { text: 'I feel that in my soul. Exchange year is amazing, but homesickness is so real.', deltas: { adaptation: 4, happiness: 4 }, targetNpc: 'maya', affectionDelta: 10, xp: 30 }
        ]
      },
      {
        id: 'crush_leo_1',
        npcId: 'leo',
        minAffection: 30,
        messages: [
          { sender: 'leo', text: 'Found this vintage indie vinyl in the downtown thrift store. It has your vibe written all over it.', delay: 1000 }
        ],
        playerReplies: [
          { text: 'No way! You have to play it for me. When can I hear it?', deltas: { social: 5, happiness: 6 }, targetNpc: 'leo', affectionDelta: 12, xp: 30 },
          { text: 'My vibe? And what vibe would that be, Mr. Rock star?', deltas: { social: 6 }, targetNpc: 'leo', affectionDelta: 15, xp: 35 }
        ]
      }
    ]
  }
};

export const EXCHANGE_GRAM_FEED = [
  {
    id: 'post_arrival',
    week: 1,
    photoKey: 'airplane_window',
    title: 'Touchdown!',
    caption: 'Suitcases unpacked, new bedroom claimed, and a whole year of adventures ahead! ',
    likes: 48,
    comments: [
      { author: 'Kerem (Istanbul)', text: 'Bro made it!! Don’t forget to send us American snacks!' },
      { author: 'Mom', text: 'So proud of you my darling! Stay warm and eat well ' },
      { author: 'Maya Lin', text: 'Orientation tomorrow! Let’s sit together!' }
    ]
  },
  {
    id: 'post_friday_game',
    week: 6,
    photoKey: 'stadium_lights',
    title: 'Friday Night Lights ',
    caption: 'I still have zero idea how downs work, but the hot chocolate and pep band were unforgettable!',
    likes: 72,
    comments: [
      { author: 'Julian Vance', text: 'Told you the student section gets wild! Great having you there!' },
      { author: 'Zeynep (Home)', text: 'OMG is that an actual varsity stadium?! Like in High School Musical?!' },
      { author: 'Leo Romero', text: 'Diner run after was elite.' }
    ]
  },
  {
    id: 'post_winter_trip',
    week: 20,
    photoKey: 'snow_mountains',
    title: 'Winter Wonderland ',
    caption: 'Frozen fingers, hot cider, and memories that make being 5,000 miles from home feel like an adventure.',
    likes: 95,
    comments: [
      { author: 'Sarah (Host Mom)', text: 'You look so handsome in that winter jacket sweetie! xx' },
      { author: 'Chloe Takahashi', text: 'Beautiful photography! Did you use the manual aperture setting?' },
      { author: 'Cousin Deniz', text: 'It looks freezing over there!! Bring back snow!' }
    ]
  },
  {
    id: 'post_prom',
    week: 33,
    photoKey: 'prom_lights',
    title: 'Prom Night 2026 ',
    caption: 'Dressed up, dancing under disco lights with the best people. Will never forget this night.',
    likes: 134,
    comments: [
      { author: 'Maya Lin', text: 'Best night of the whole exchange year hands down!! ' },
      { author: 'Julian Vance', text: 'You looked incredible. Legend.' },
      { author: 'Best Friend Ali', text: 'Bro is living the Hollywood dream fr fr' }
    ]
  }
];
