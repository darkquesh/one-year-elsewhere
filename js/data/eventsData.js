// Master Narrative Events Catalog (80+ Balanced, Dynamic & Randomized Events)
// Every choice incorporates authentic tradeoffs, opportunity costs, and risk parameters.
// Strictly adheres to zero-sum exchange trilemma and eliminates one-sided "no-brainer" choices.

export const EVENTS = [
  // =========================================================================
  // MONTH 1: ARRIVAL, JETLAG & DOMESTIC ADJUSTMENT (Weeks 1-4)
  // =========================================================================
  {
    id: 'evt_m1_first_dinner',
    title: 'First Dinner with the Host Family',
    months: [1],
    speaker: 'Host Mother',
    text: 'You sit around the dining table, still dazed from a 14-hour flight. The host family serves a traditional meal, watching you curiously. "We are so thrilled to welcome you! How does it taste? Do you eat like this back home?"',
    choices: [
      {
        text: 'Eat enthusiastically and praise their cooking, even if spices are completely unfamiliar.',
        deltas: { hostFamilyBond: 8, adaptation: 4, happiness: -3 },
        feedback: 'Your host parents beam with pride! Your stomach feels a bit heavy, but domestic warmth is real.'
      },
      {
        text: 'Politely explain your food habits and offer to cook a dish from your home culture soon.',
        deltas: { hostFamilyBond: 5, adaptation: 6, social: 2 },
        feedback: 'They are fascinated by your culture and promise to go shopping with you for special ingredients.'
      },
      {
        text: 'Pick at the food timidly; exhaustion and foreign spices feel completely overwhelming.',
        deltas: { hostFamilyBond: -5, happiness: -6, adaptation: -4 },
        feedback: 'An awkward silence falls. Your host parents exchange concerned glances about whether you are homesick.'
      }
    ]
  },
  {
    id: 'evt_m1_jetlag_insomnia',
    title: '3:00 AM Jetlag & The Midnight Kitchen',
    months: [1],
    speaker: 'Inner Monologue',
    text: 'It is 3:15 AM. Your internal biological clock thinks it is midday. You are wide awake, staring at the unfamiliar ceiling while the whole house creaks in silence.',
    choices: [
      {
        text: 'Quietly tip-toe downstairs to make warm milk and write in your journal.',
        deltas: { happiness: 5, hostFamilyBond: 2, adaptation: 3 },
        feedback: 'The quiet house feels peaceful. You spot family photo albums on the counter and learn their names.'
      },
      {
        text: 'Call your friends back home who are currently in the middle of their afternoon.',
        deltas: { happiness: 7, adaptation: -5, social: -3 },
        feedback: 'Hearing familiar voices brings immense comfort, but hanging up leaves a sharp sting of nostalgia.'
      },
      {
        text: 'Toss and turn in frustration until morning light.',
        deltas: { happiness: -8, academics: -4 },
        feedback: 'You greet your first day of school orientation completely drained of energy.'
      }
    ]
  },
  {
    id: 'evt_m1_neighborhood_walk',
    title: 'Getting Lost on Day 3',
    months: [1, 2],
    speaker: 'Local Pedestrian',
    text: 'You decide to take an afternoon walk around the neighborhood to clear your head. After twenty minutes, all the suburban streets and houses look identical. Your phone battery shows 4%.',
    choices: [
      {
        text: 'Work up the courage to approach a neighbor and ask for directions in the local language.',
        deltas: { adaptation: 8, social: 4, happiness: -2 },
        feedback: 'You stumble over words, but the neighbor smiles and points out the landmarks. Major confidence boost!'
      },
      {
        text: 'Use your last 2% battery to call your host father in a mild panic.',
        deltas: { hostFamilyBond: 4, adaptation: -3, happiness: -4 },
        feedback: 'Host father drives out and picks you up within five minutes. He chuckles warmly, but you feel slightly embarrassed.'
      },
      {
        text: 'Wander aimlessly for another hour trying to recognize street signs on your own.',
        deltas: { adaptation: 2, happiness: -10, hostFamilyBond: -4 },
        feedback: 'You finally make it home just as host mother was about to dial the police. Tense dinner follows.'
      }
    ]
  },
  {
    id: 'evt_m1_luggage_lost',
    title: 'Lost Baggage at Terminal 3',
    months: [1],
    speaker: 'Airport Agent',
    text: 'The carousel stops spinning. Your two checked suitcases with all your clothes, winter jacket, and souvenirs are missing in transit. The airline says it will take at least 4 days to locate them.',
    choices: [
      {
        text: 'Graciously borrow oversized clothes and a hoodie from your host sibling for the week.',
        deltas: { hostFamilyBond: 7, happiness: -4, adaptation: 3 },
        feedback: 'You look a bit silly in their rolled-up jeans, but host sibling laughs and shares their favorite sweaters.'
      },
      {
        text: 'Spend $60 of your personal money at a local discount clothing store to buy immediate essentials.',
        cost: 60,
        deltas: { finance: -25, happiness: 3, adaptation: 5 },
        feedback: 'You get basic jeans and shirts, but your wallet takes a painful blow right at the start.'
      },
      {
        text: 'Complain tearfully in your bedroom, refusing to leave the house until the bags arrive.',
        deltas: { happiness: -9, hostFamilyBond: -6, social: -5 },
        feedback: 'Host parents feel helpless and stressed trying to comfort your frustration.'
      }
    ]
  },
  {
    id: 'evt_m1_appliance_mystery',
    title: 'The Foreign Appliance Mystery',
    months: [1],
    speaker: 'Inner Monologue',
    text: 'You stand in the host family bathroom looking at the heating and shower controls. None of the symbols or knobs match what you had back home, and a strange electronic beeping starts.',
    choices: [
      {
        text: 'Humbly ask your host mother to walk you through how the household appliances operate.',
        deltas: { hostFamilyBond: 5, adaptation: 5, happiness: 1 },
        feedback: 'She demonstrates the water heater and thermostat gladly: "Never hesitate to ask, dear!"'
      },
      {
        text: 'Try to decipher the controls with translation camera apps and figure it out alone.',
        deltas: { adaptation: 4, happiness: -3 },
        feedback: 'You accidentally trigger a blast of freezing cold water before finally finding the hot setting.'
      },
      {
        text: 'Twist the dials blindly and hope for the best.',
        deltas: { happiness: -7, hostFamilyBond: -4 },
        feedback: 'You trigger the system override and water leaks onto the floor mats. An awkward mop-up follows.'
      }
    ]
  },
  {
    id: 'evt_m1_supermarket_odyssey',
    title: 'The Supermarket Culture Shock',
    months: [1],
    speaker: 'Supermarket Cashier',
    text: 'Host mother takes you to the local hypermarket to pick your favorite breakfast items. The cereal aisle alone is 40 meters long with hundreds of brightly colored boxes, none of which you recognize.',
    choices: [
      {
        text: 'Pick a simple, modest cereal box and thank host mother for taking you.',
        deltas: { hostFamilyBond: 6, adaptation: 4, happiness: 2 },
        feedback: 'She smiles at your politeness and sneaks a box of chocolate biscuits into the cart for you.'
      },
      {
        text: 'Ask host mother to recommend what local teenagers eat and try her suggestion.',
        deltas: { hostFamilyBond: 8, adaptation: 6, happiness: 3 },
        feedback: 'You discover a delicious local cinnamon granola that becomes your daily morning routine.'
      },
      {
        text: 'Look at the prices and decline everything, feeling anxious about being an expensive burden.',
        deltas: { hostFamilyBond: -4, happiness: -5, adaptation: -3 },
        feedback: 'Host mother notices your hesitation and worries whether you are comfortable in their care.'
      }
    ]
  },

  // =========================================================================
  // MONTH 2: EARLY HIGH SCHOOL & PEER DYNAMICS (Weeks 5-8)
  // =========================================================================
  {
    id: 'evt_m2_hallway_maze',
    title: 'The Locker Combination & The Crowded Hallway',
    months: [2],
    speaker: 'Passing Classmate',
    text: 'Between 2nd and 3rd period, hundreds of students surge through the corridor. You are standing in front of your metal locker, desperately spinning the rotary dial. The five-minute warning bell chimes.',
    choices: [
      {
        text: 'Ask the student at the next locker to demonstrate the dial trick.',
        deltas: { social: 7, adaptation: 5, academics: -2 },
        feedback: 'They laugh kindly: "Two turns past zero, then stop on 14!" You make your first casual acquaintance.'
      },
      {
        text: 'Stay calm, re-read your locker sheet carefully, and crack it on your own.',
        deltas: { academics: 4, adaptation: 3, social: -2 },
        feedback: 'The latch clicks open! You grab your textbook and slide into class right as the bell rings.'
      },
      {
        text: 'Panic, leave your books trapped inside, and sprint into class empty-handed.',
        deltas: { happiness: -6, academics: -5, adaptation: -3 },
        feedback: 'The teacher gives you a cold reprimand for not bringing materials. Language barriers sting.'
      }
    ]
  },
  {
    id: 'evt_m2_cafeteria_seating',
    title: 'Cafeteria Seating Politics',
    months: [2],
    speaker: 'Inner Monologue',
    text: 'You step into the deafening high school cafeteria holding your lunch tray. The tables are strictly divided: athletes in varsity jackets, theater kids, quiet gamers, and popular cliques. Where do you sit?',
    choices: [
      {
        text: 'Approach a lively table and ask: "Is this seat taken?"',
        deltas: { social: 8, adaptation: 6, happiness: -3 },
        feedback: 'Heart pounding! They shuffle over and pepper you with questions about your home country.'
      },
      {
        text: 'Sit with other quiet students or fellow international kids who look approachable.',
        deltas: { social: 4, happiness: 5, adaptation: 1 },
        feedback: 'A relaxed, low-pressure lunch where you can breathe and chat without performance anxiety.'
      },
      {
        text: 'Eat quickly in the library or corner stairwell to escape the noise.',
        deltas: { happiness: -4, social: -6, adaptation: -4 },
        feedback: 'The quiet is comforting, but watching peer groups laughing through the window leaves an empty ache.'
      }
    ]
  },
  {
    id: 'evt_m2_group_project',
    title: 'The Biology Group Project Dilemma',
    months: [2, 3],
    speaker: 'Lab Partner',
    text: 'Your biology teacher assigns a partner lab report due next Monday. Your assigned classmate shrugs: "Look, I got sports practice all weekend. Can you handle the research and I will put my name on it?"',
    choices: [
      {
        text: 'Firmly insist on splitting the sections equally and meeting at the library.',
        deltas: { academics: 6, adaptation: 5, social: -3 },
        feedback: 'They grumble, but respect your boundaries. You turn in a solid, honest B+ report.'
      },
      {
        text: 'Agree to do all the heavy lifting to avoid conflict and stay on their good side.',
        deltas: { academics: 8, social: 3, happiness: -8, hostFamilyBond: -4 },
        feedback: 'You stay up until 2 AM finishing their half. They high-five you on Monday, but you feel completely used.'
      },
      {
        text: 'Privately report the situation to the teacher after class.',
        deltas: { academics: 5, happiness: -4, social: -8 },
        feedback: 'The teacher switches partners, but word spreads that you "snitched." High school hallway cold shoulder.'
      }
    ]
  },
  {
    id: 'evt_m2_roll_call_fumble',
    title: 'The Roll Call Mispronunciation',
    months: [2],
    speaker: 'History Teacher',
    text: 'During 1st period roll call, the history teacher pauses on your name, frowning at the roster. He mangles the pronunciation so horribly that the entire classroom turns around in muffled snickers.',
    choices: [
      {
        text: 'Smile warmly, raise your hand, and teach the whole class how to say your name with humor.',
        deltas: { social: 8, adaptation: 7, happiness: 3 },
        feedback: 'Classmates smile and repeat it after you! The teacher apologizes graciously and notes it down.'
      },
      {
        text: 'Offer a simplified English/local nickname to make things easier for everyone.',
        deltas: { social: 5, adaptation: 3, happiness: -3 },
        feedback: 'Convenient for roll call, but giving up your true name leaves a slight bittersweet aftertaste.'
      },
      {
        text: 'Sink into your desk with burning red cheeks and say nothing.',
        deltas: { happiness: -6, social: -4, adaptation: -3 },
        feedback: 'An awkward cloud hangs over the first half of the lecture. You feel like an invisible alien.'
      }
    ]
  },
  {
    id: 'evt_m2_language_migraine',
    title: 'The 4th Period Brain Melt',
    months: [2],
    speaker: 'Inner Monologue',
    text: 'It is 11:30 AM. You have sat through Math, Literature, and Chemistry listening to non-stop foreign speech. Your temples throb with a splitting headache as your brain struggles to translate every syllable.',
    choices: [
      {
        text: 'Take a five-minute bathroom break to splash cold water on your face and do breathing exercises.',
        deltas: { happiness: 4, adaptation: 4, academics: 2 },
        feedback: 'The cold water resets your focus. You survive the rest of the school day with dignity.'
      },
      {
        text: 'Push through relentlessly, taking frantic verbatim notes in your native language.',
        deltas: { academics: 7, happiness: -8, adaptation: -2 },
        feedback: 'Your notebook is packed, but you arrive at the dinner table looking like a ghost.'
      },
      {
        text: 'Completely zone out and daydream about your hometown during the entire lecture.',
        deltas: { happiness: 3, academics: -7, adaptation: -4 },
        feedback: 'The teacher calls on you unexpectedly; you have no clue what question was just asked.'
      }
    ]
  },

  // =========================================================================
  // MONTH 3: AUTUMN SOCIALS & EXTRACURRICULARS (Weeks 9-12)
  // =========================================================================
  {
    id: 'evt_m3_school_social',
    title: 'The Big Autumn Homecoming Dance',
    months: [3],
    speaker: 'Classmate',
    text: 'Homecoming flyers plaster the school. Everyone is buzzing about pre-dance dinners, corsages, and group photos. A ticket costs $25, and you need to decide where to invest your Friday night.',
    choices: [
      {
        text: 'Buy a ticket, dress up, and join a classmate dinner group.',
        cost: 25,
        deltas: { social: 10, happiness: 6, finance: -12, academics: -4 },
        feedback: 'Loud music, photo booths, and fast dancing! You finally feel like an authentic foreign exchange student.'
      },
      {
        text: 'Politely pass on the dance; spend Friday baking autumn pies with your host family.',
        deltas: { hostFamilyBond: 10, happiness: 5, finance: 0, social: -5 },
        feedback: 'A cozy evening with laughter and pumpkin pie. Your host parents appreciate your domestic presence.'
      },
      {
        text: 'Stay in your room and study for Monday’s chemistry midterm.',
        deltas: { academics: 8, social: -7, happiness: -5 },
        feedback: 'Your chemistry score jumps, but scrolling Instagram stories of the dance later feels bittersweet.'
      }
    ]
  },
  {
    id: 'evt_m3_club_fair',
    title: 'Extracurricular Club Recruitment',
    months: [3],
    speaker: 'Club President',
    text: 'Gymnasium tables overflow with sign-up sheets: Theater Troupe, Debate Society, Robotics Team, and Soccer Tryouts. Joining a club eats up 6 hours every week after school.',
    choices: [
      {
        text: 'Join the Theater / Speech Club to confront the language barrier head-on.',
        deltas: { adaptation: 10, social: 6, happiness: -4, academics: -4 },
        feedback: 'Terrifying at first, but vocal exercises and dramatic readings accelerate your pronunciation drastically!'
      },
      {
        text: 'Join the Sports Team / Athletics Club (Intense physical workouts).',
        deltas: { social: 8, happiness: 6, hostFamilyBond: -4, academics: -5 },
        feedback: 'Locker room banter and team chants create instant camaraderie, but practice leaves you exhausted for dinner.'
      },
      {
        text: 'Decline all clubs to keep afternoons open for host family chores and homework.',
        deltas: { academics: 5, hostFamilyBond: 6, social: -8, adaptation: -4 },
        feedback: 'You keep your grades stable and house spotless, but miss out on key teenage social circles.'
      }
    ]
  },
  {
    id: 'evt_m3_missed_bus',
    title: 'Missing the Last School Bus',
    months: [3, 4],
    speaker: 'Inner Monologue',
    text: 'You lost track of time talking to a teacher after school. The last school bus just pulled away down the boulevard. You live 7 miles away and dusk is settling.',
    choices: [
      {
        text: 'Call your host father to ask for a ride, apologizing profusely.',
        deltas: { hostFamilyBond: 2, happiness: -3, adaptation: 2 },
        feedback: 'He sighs on the phone because he was in the middle of dinner prep, but drives over to pick you up.'
      },
      {
        text: 'Accept a ride from an older senior who just pulled out of the student parking lot.',
        deltas: { social: 6, happiness: 2 },
        riskViolation: { category: 'po_rule', chance: 0.35, desc: 'Unauthorized ride with teenage driver (Strict PO Rule)' },
        feedback: 'The car ride with blaring music is fun, but program rules strictly forbid riding with peer drivers!'
      },
      {
        text: 'Start walking along the sidewalk with headphones on.',
        deltas: { happiness: -8, adaptation: 4, hostFamilyBond: -5 },
        feedback: 'Two hours later you arrive in the dark with blistered feet. Host parents were on the verge of calling the police.'
      }
    ]
  },
  {
    id: 'evt_m3_halloween_haunt',
    title: 'Halloween Fright Night vs. Domestic Pumpkin Carving',
    months: [3],
    speaker: 'Host Sibling',
    text: 'Classmates invited you to an intense haunted corn maze and late-night bonfire. But host mother already bought three giant pumpkins and carving tools, expecting a cozy family evening.',
    choices: [
      {
        text: 'Stay home, carve elaborate jack-o\'-lanterns, and bake pumpkin seeds with the family.',
        deltas: { hostFamilyBond: 9, happiness: 4, social: -5 },
        feedback: 'Your carved pumpkin wins the neighborhood porch praise! Host mother takes dozens of photos.'
      },
      {
        text: 'Negotiate a compromise: carve pumpkins for 2 hours, then get dropped off at the maze until 10 PM.',
        cost: 15,
        deltas: { hostFamilyBond: 4, social: 7, happiness: 5, finance: -5 },
        feedback: 'A masterclass in diplomatic balance! Both your host family and classmate friends feel respected.'
      },
      {
        text: 'Ditch the family abruptly to join the teenagers\' late-night unsupervised party.',
        deltas: { social: 10, hostFamilyBond: -8, happiness: 3 },
        riskViolation: { category: 'curfew', chance: 0.25, desc: 'Late return from unsupervised Halloween party' },
        feedback: 'The maze was thrilling, but coming home to host parents waiting in the dark kitchen is chilling.'
      }
    ]
  },

  // =========================================================================
  // MONTH 4: INTERNATIONAL EDUCATION WEEK (IEW) & CULTURE SHARING (Weeks 13-16)
  // =========================================================================
  {
    id: 'evt_m4_iew_prep',
    title: 'International Education Week (IEW) Crucible',
    months: [4],
    speaker: 'Program Coordinator',
    text: 'It is International Education Week! Every student abroad is required to share their home country culture. "Where will you deliver your showcase, and how ambitious will your presentation be?"',
    choices: [
      {
        text: 'Present to the entire High School Assembly with homemade traditional food samples.',
        cost: 30,
        deltas: { social: 12, adaptation: 8, finance: -14, happiness: -4, academics: -4 },
        flagSet: 'iew_completed_assembly',
        feedback: 'Nerve-wracking public speaking! The auditorium applauds, and students swarm your table for treats.'
      },
      {
        text: 'Present a thoughtful slideshow and cultural trinkets to your social studies class.',
        cost: 10,
        deltas: { academics: 6, adaptation: 6, social: 4, finance: -5 },
        flagSet: 'iew_completed_class',
        feedback: 'Intimate and educational. Your teacher awards you full extra credit, and classmates ask genuine questions.'
      },
      {
        text: 'Present at your host family’s local community hall / church fellowship.',
        cost: 15,
        deltas: { hostFamilyBond: 10, social: 4, adaptation: 5, finance: -6 },
        flagSet: 'iew_completed_community',
        feedback: 'Elderly community members and host family relatives are deeply touched by your presentation.'
      }
    ]
  },
  {
    id: 'evt_m4_cooking_disaster',
    title: 'The Kitchen Smoke Alarm Incident',
    months: [4],
    speaker: 'Host Father',
    text: 'You decide to surprise your host family on Sunday evening by cooking a famous recipe from back home. Halfway through frying, unfamiliar stovetop heat causes hot oil to smoke. The shrieking ceiling fire alarm activates!',
    choices: [
      {
        text: 'Frantically fan the smoke detector with a dishtowel while laughing at the absurdity.',
        deltas: { hostFamilyBond: 7, adaptation: 5, happiness: 2 },
        feedback: 'Host father rushes in, opens all the windows, and bursts out laughing: "Now this is real international living!"'
      },
      {
        text: 'Feel deeply ashamed, apologize twenty times, and clean every inch of the grease-splattered stove.',
        deltas: { hostFamilyBond: 4, happiness: -7, adaptation: 2 },
        feedback: 'Host mother assures you it is fine, but you spend dinner feeling red-faced and stressed.'
      },
      {
        text: 'Save the remaining portions and present the meal with pride despite the slight charring.',
        deltas: { hostFamilyBond: 6, adaptation: 6, social: 3 },
        feedback: 'Everyone agrees the charred edges give it an "authentic barbecue flavor." A memorable evening.'
      }
    ]
  },
  {
    id: 'evt_m4_elementary_ambassador',
    title: 'The 3rd Grade Classroom Ambassador',
    months: [4],
    speaker: 'Elementary Teacher',
    text: 'A local primary school invites you to talk about your country to twenty-five curious 8-year-olds. They sit cross-legged on the rug, staring up at you with wide, excited eyes.',
    choices: [
      {
        text: 'Teach them basic phrases in your language, show traditional coins, and play a folk game.',
        deltas: { adaptation: 9, happiness: 7, social: 4, academics: -2 },
        feedback: 'The kids cheer and write adorable handmade thank-you cards with crayon drawings of your flag!'
      },
      {
        text: 'Deliver a serious geopolitical and geographic presentation with printed maps.',
        deltas: { academics: 5, adaptation: 3, happiness: -3 },
        feedback: 'Half the children start fidgeting and whispering after five minutes. A bit dry, but informative.'
      },
      {
        text: 'Bring traditional candies and snacks from your home country to share.',
        cost: 15,
        deltas: { social: 7, happiness: 5, finance: -5, adaptation: 4 },
        feedback: 'Total sugar rush! The teacher laughs and thanks you for an unforgettable morning visit.'
      }
    ]
  },
  {
    id: 'evt_m4_thanksgiving_harvest',
    title: 'The Giant Extended Family Feast',
    months: [4],
    speaker: 'Host Grandparent',
    text: 'A holiday harvest feast brings 22 aunts, uncles, cousins, and grandparents into the house. You are introduced as the "special international guest" and grilled with dozens of questions about life back home.',
    choices: [
      {
        text: 'Engage warmly with every relative, answer patient questions, and help clear heavy plates.',
        deltas: { hostFamilyBond: 10, adaptation: 7, happiness: -3 },
        feedback: 'Host parents glow with pride. Host grandma whispers that you are the sweetest young person she has met.'
      },
      {
        text: 'Bond with the teenage cousins in the basement playing video games and exchanging music playlists.',
        deltas: { social: 8, happiness: 6, hostFamilyBond: 2 },
        feedback: 'You make great allies in the younger generation of the family who invite you to hang out next weekend.'
      },
      {
        text: 'Slip away to your bedroom after dinner to rest your exhausted ears and call home.',
        deltas: { happiness: 4, hostFamilyBond: -5, adaptation: -4 },
        feedback: 'Relatives wonder why you vanished so early. Host mother makes polite excuses on your behalf.'
      }
    ]
  },

  // =========================================================================
  // MONTH 5: WINTER FREEZE, HOLIDAYS & HOMESICKNESS (Weeks 17-20)
  // =========================================================================
  {
    id: 'evt_m5_winter_homesick',
    title: 'Winter Holidays & The Homesickness Wave',
    months: [5],
    speaker: 'Inner Voice',
    text: 'A blizzard coats the town in deep white snow. Back home, friends are posting photos of familiar festivities. The time difference means your phone buzzes with group chats while you lie in the dark.',
    choices: [
      {
        text: 'Call family for 30 minutes, then join host siblings to decorate the house and wrap gifts.',
        deltas: { hostFamilyBond: 8, happiness: 4, adaptation: 4, social: -3 },
        feedback: 'Tears during the video call, but laughing over hot cocoa with host siblings brings genuine holiday comfort.'
      },
      {
        text: 'Bake traditional holiday cookies to gift to your teachers, neighbors, and host parents.',
        cost: 15,
        deltas: { hostFamilyBond: 7, social: 6, finance: -8, happiness: 2 },
        feedback: 'The neighbors are charmed! One brings over hand-knitted woolen mittens in return.'
      },
      {
        text: 'Retreat into your room with headphones on, binge-watching videos in your native language.',
        deltas: { happiness: -8, hostFamilyBond: -6, adaptation: -6 },
        feedback: 'The nostalgia trap deepens your loneliness. Host mother knocks gently on your door with a plate of dinner.'
      }
    ]
  },
  {
    id: 'evt_m5_gift_budget',
    title: 'Secret Santa & Gift Shopping Pressure',
    months: [5],
    speaker: 'Classmate',
    text: '"Hey! We are doing a $20 Secret Santa gift exchange in home room! Are you in?" Your wallet currently feels painfully light.',
    choices: [
      {
        text: 'Join the exchange and buy a thoughtful local gift.',
        cost: 20,
        deltas: { social: 7, happiness: 4, finance: -10 },
        feedback: 'Your recipient loves the thoughtful touch, and you receive funny holiday socks in return.'
      },
      {
        text: 'Craft a personalized handmade souvenir using art supplies from your home country.',
        deltas: { social: 6, adaptation: 5, finance: 0, academics: -3 },
        feedback: 'Your classmate is fascinated by the authentic foreign keepsake! Creative budget victory.'
      },
      {
        text: 'Decline participation citing tight exchange student finances.',
        deltas: { finance: 0, social: -6, happiness: -4 },
        feedback: 'They say: "No worries!", but sitting quietly during gift unwrapping feels awkward.'
      }
    ]
  },
  {
    id: 'evt_m5_first_snowstorm',
    title: 'Sub-Zero Snow Day & The Frozen Driveway',
    months: [5],
    speaker: 'Host Father',
    text: 'School is canceled after 14 inches of heavy snowfall. Host father is outside bundling up with two metal shovels to clear the 60-foot driveway before ice sets in.',
    choices: [
      {
        text: 'Bundle up in all your layers and shovel alongside host father for two grueling hours.',
        deltas: { hostFamilyBond: 9, adaptation: 5, happiness: -2, academics: 2 },
        feedback: 'Blistered hands and sore muscles, but host father claps your back with profound respect over hot cider.'
      },
      {
        text: 'Build a giant snowman and have an epic snowball battle with host siblings in the yard.',
        deltas: { hostFamilyBond: 7, happiness: 8, adaptation: 3 },
        feedback: 'Pure cinematic joy! Your laughter echoes down the snowy street as you dodge snowballs.'
      },
      {
        text: 'Stay wrapped in your duvet sipping tea and bingeing homework until noon.',
        deltas: { academics: 6, hostFamilyBond: -5, happiness: 1 },
        feedback: 'Host father clears the driveway alone in the freezing wind, looking tired at lunch.'
      }
    ]
  },
  {
    id: 'evt_m5_new_year_countdown',
    title: 'Midnight New Year Countdown Away from Home',
    months: [5],
    speaker: 'Host Mother',
    text: '11:59 PM on New Year’s Eve. Sparkling cider glasses clink as the television countdown ticks down: 5... 4... 3... 2... 1! Happy New Year! You are halfway across the planet from everyone you grew up with.',
    choices: [
      {
        text: 'Embrace your host family warmly, toast to the new year, and share your exchange year hopes.',
        deltas: { hostFamilyBond: 10, happiness: 6, adaptation: 6 },
        feedback: 'Hugs all around! You realize that in five short months, these people have truly become family.'
      },
      {
        text: 'Join an all-night video call marathon with friends back home ringing in the new year.',
        deltas: { happiness: 7, hostFamilyBond: -4, adaptation: -4 },
        feedback: 'Familiar laughter warms your chest, though host parents go to bed wondering why you stayed in your room.'
      },
      {
        text: 'Write a long, reflective journal entry cataloging your personal growth since August.',
        deltas: { adaptation: 7, academics: 4, happiness: 3 },
        feedback: 'Looking back over past journal pages, you are stunned by how much resilience you have gained.'
      }
    ]
  },

  // =========================================================================
  // MONTH 6: MIDTERMS & SCHOLARSHIP COMPLIANCE (Weeks 21-24)
  // =========================================================================
  {
    id: 'evt_m6_midyear_exams',
    title: 'Mid-Year Examinations Week',
    months: [6],
    speaker: 'School Principal',
    text: 'Midterm exam week has arrived. For funded scholarship students, grades will be transmitted to the embassy. Self-paid students must also maintain passing marks for student visa validity.',
    choices: [
      {
        text: 'Form a study group with classmates at the public library.',
        cost: 10,
        deltas: { academics: 8, social: 5, finance: -5, happiness: -3 },
        feedback: 'Studying together helps clarify difficult idioms and technical terminology on the study guide.'
      },
      {
        text: 'Pull solo late-night cram marathons fueled by black tea and coffee.',
        deltas: { academics: 10, happiness: -7, hostFamilyBond: -5 },
        feedback: 'You ace the exams, but your exhausted demeanor and skipped dinners concern your host parents.'
      },
      {
        text: 'Rely on existing knowledge and spend free study periods socializing downtown.',
        deltas: { academics: -10, social: 7, happiness: 3 },
        feedback: 'Your exam marks take a hit. Your guidance counselor schedules a mandatory warning conference.'
      }
    ]
  },
  {
    id: 'evt_m6_language_breakthrough',
    title: 'The Fluency Milestone ("The Dream")',
    months: [6, 7],
    speaker: 'Inner Monologue',
    text: 'You wake up on a Tuesday morning and freeze: you just realized that the dream you were having was entirely in the host country\'s language! You understood every spoken word without translating in your head.',
    choices: [
      {
        text: 'Celebrate at breakfast and actively practice new idioms all day with teachers.',
        deltas: { adaptation: 9, academics: 4, hostFamilyBond: 4 },
        feedback: 'Your host parents clap with joy! You notice your mental hesitation disappearing during conversations.'
      },
      {
        text: 'Text your best friend back home about the exciting milestone.',
        deltas: { happiness: 6, adaptation: 4, social: 2 },
        feedback: 'They cheer you on: "Look at you becoming a local!" A proud milestone in your exchange journey.'
      },
      {
        text: 'Keep it to yourself; you still feel insecure about your grammatical accent.',
        deltas: { adaptation: 3, happiness: -2 },
        feedback: 'Modest, but the internal breakthrough marks a permanent turning point in your cultural immersion.'
      }
    ]
  },
  {
    id: 'evt_m6_unchaperoned_party',
    title: 'The Unchaperoned Saturday Night Invite',
    months: [6],
    speaker: 'Senior Classmate',
    text: '"My parents are out of town for the long weekend. Huge party at my house tonight—everyone from track and cheer is coming. You HAVE to be there!"',
    choices: [
      {
        text: 'Decline firmly: program rules strictly forbid unchaperoned parties with open alcohol.',
        deltas: { academics: 4, hostFamilyBond: 5, social: -6 },
        feedback: 'They scoff and roll their eyes, but you sleep in peace knowing your visa status is 100% safe.'
      },
      {
        text: 'Go for just one hour, stay strictly sober with soda, and leave well before curfew.',
        deltas: { social: 7, happiness: 4, hostFamilyBond: -3 },
        riskViolation: { category: 'minor', chance: 0.20, desc: 'Present at unchaperoned party with minors' },
        feedback: 'High school drama and loud music! You make an early exit, but hope nobody snaps incriminating photos.'
      },
      {
        text: 'Dive into the party all night and crash on the sofa until morning.',
        deltas: { social: 12, happiness: 8, hostFamilyBond: -10, academics: -5 },
        riskViolation: { category: 'major', chance: 0.45, desc: 'Overnight unapproved absence at party with alcohol' },
        feedback: 'Raucous high school revelry! But the morning hangover and missed breakfast create a household storm.'
      }
    ]
  },
  {
    id: 'evt_m6_essay_suspicion',
    title: 'The Vocabulary Suspicion in English Class',
    months: [6],
    speaker: 'Literature Teacher',
    text: 'Your literature teacher calls you to her desk after class, holding your 5-page essay: "Your spoken conversational English still has grammatical gaps, yet this paper uses sophisticated academic prose. Did you use an AI tool or someone else\'s work?"',
    choices: [
      {
        text: 'Calmly walk through your bibliography, rough drafts, and vocabulary flashcard notes.',
        deltas: { academics: 8, adaptation: 6, happiness: -2 },
        feedback: 'Her eyes widen in admiration: "Forgive my suspicion. Your written vocabulary is truly extraordinary."'
      },
      {
        text: 'Offer to write an impromptu short essay on the chalkboard to prove your analytical ability.',
        deltas: { academics: 10, social: 4, adaptation: 7 },
        feedback: 'A bold, confident response! The teacher apologizes sincerely and gives you an A+.'
      },
      {
        text: 'Get defensive and accuse her of prejudice against foreign exchange students.',
        deltas: { academics: -4, happiness: -6, hostFamilyBond: -3 },
        feedback: 'The conversation turns hostile. She submits the paper for formal administrative plagiarism review.'
      }
    ]
  },

  // =========================================================================
  // MONTH 7: WINTER ADVENTURES & DOMESTIC FRICTION (Weeks 25-28)
  // =========================================================================
  {
    id: 'evt_m7_winter_trip',
    title: 'The Weekend Mountain Cabin Outing',
    months: [7],
    speaker: 'Host Father',
    text: '"We are heading up to the mountain cabin for a long weekend of sledding, board games, and wood fires! Pack your thick thermal layers!"',
    choices: [
      {
        text: 'Dive into every outdoor activity enthusiastically, despite freezing winds.',
        deltas: { hostFamilyBond: 9, happiness: 5, adaptation: 4, academics: -3 },
        feedback: 'Hearty laughter around the stone fireplace! You feel deeply embedded in the family unit.'
      },
      {
        text: 'Join meals warmly, but retreat to the cozy couch with textbooks to balance schoolwork.',
        deltas: { hostFamilyBond: 4, academics: 5, happiness: 3 },
        feedback: 'A balanced, peaceful retreat that keeps your academic trajectory secure.'
      },
      {
        text: 'Complain about the sub-zero chill and stay glued to your smartphone screen.',
        deltas: { hostFamilyBond: -8, happiness: -7, adaptation: -5 },
        feedback: 'Host father looks disheartened after driving three hours over snowchains. Chilly domestic tension.'
      }
    ]
  },
  {
    id: 'evt_m7_dishwasher_drama',
    title: 'The House Rules Friction',
    months: [7, 8],
    speaker: 'Host Mother',
    text: 'Host mother calls you into the kitchen. She points to the sink: "We rinse plates and put them in the dishwasher immediately in this house. You left dirty bowls in the sink for the third time this week."',
    choices: [
      {
        text: 'Take immediate responsibility, apologize sincerely, and wash everything by hand right now.',
        deltas: { hostFamilyBond: 6, adaptation: 4, happiness: -3 },
        feedback: 'Her stern expression softens: "Thank you. In our culture, keeping common areas tidy shows mutual respect."'
      },
      {
        text: 'Defensively explain that back home in your family, dishes are washed in evening batches.',
        deltas: { hostFamilyBond: -5, happiness: -5, adaptation: -2 },
        feedback: 'She frowns: "You are not back home right now. You are part of our family household."'
      },
      {
        text: 'Offer to take over daily trash and recycling chores to help around the house.',
        deltas: { hostFamilyBond: 8, adaptation: 6, academics: -2 },
        feedback: 'A proactive response that turns domestic friction into long-term mutual trust.'
      }
    ]
  },
  {
    id: 'evt_m7_shower_limit_friction',
    title: 'The 10-Minute Hot Water Crisis',
    months: [7],
    speaker: 'Host Sibling',
    text: 'You emerge from a luxurious 25-minute steaming shower on a freezing morning. Your host sibling bangs furiously on the door: "You drained the entire hot water tank! Now I have to shower in ice water before school!"',
    choices: [
      {
        text: 'Apologize profusely and promise to set a strict 8-minute timer on your phone from now on.',
        deltas: { hostFamilyBond: 5, adaptation: 4, happiness: -2 },
        feedback: 'Host sibling grumbles through the freezing shower, but appreciates your immediate commitment to change.'
      },
      {
        text: 'Make them hot tea and pack their school lunch bag to make up for the ice-cold shower.',
        deltas: { hostFamilyBond: 8, happiness: 2, adaptation: 3 },
        feedback: 'A sweet gesture that defuses the morning sibling feud completely with laughter.'
      },
      {
        text: 'Roll your eyes and tell them they are making a giant drama over a few gallons of water.',
        deltas: { hostFamilyBond: -8, happiness: -5, adaptation: -3 },
        feedback: 'Host parents get involved at breakfast. The household mood is arctic for the rest of the day.'
      }
    ]
  },
  {
    id: 'evt_m7_flu_quarantine',
    title: 'Bedridden with the Winter Flu',
    months: [7],
    speaker: 'Host Mother',
    text: 'A high fever hits you like a freight train. You lie shivering under three blankets with a scratchy throat and heavy coughing. Being sick so many thousands of miles from home feels terrifyingly lonely.',
    choices: [
      {
        text: 'Accept host mother’s homemade chicken soup and let her care for you like her own child.',
        deltas: { hostFamilyBond: 10, happiness: 4, adaptation: 5, academics: -4 },
        feedback: 'She wipes your forehead with cool towels and checks your temperature every two hours. Deep emotional bonding.'
      },
      {
        text: 'Insist on studying from bed on your laptop so your GPA doesn\'t slip during sick leave.',
        deltas: { academics: 6, happiness: -8, adaptation: 1 },
        feedback: 'You keep up with class readings, but your recovery drags on for an entire agonizing week.'
      },
      {
        text: 'Call your mother back home in tears, lamenting how miserable you feel.',
        deltas: { happiness: -4, adaptation: -6, hostFamilyBond: -3 },
        feedback: 'Your mother panics over the phone and starts drafting anxious emails to your exchange agency.'
      }
    ]
  },

  // =========================================================================
  // MONTH 8: SPRING BREAK & RULE TEMPTATIONS (Weeks 29-32)
  // =========================================================================
  {
    id: 'evt_m8_odd_job',
    title: 'Pocket Money Opportunity',
    months: [8],
    speaker: 'Neighbor',
    text: 'A friendly neighbor asks if you would tutor their middle-school child in foreign language and basic math on weekends for $35 a session.',
    choices: [
      {
        text: 'Check with your regional coordinator for written approval before accepting.',
        deltas: { finance: 12, adaptation: 4, academics: 2 },
        feedback: 'The coordinator reviews program bylaws and grants formal approval for educational tutoring.'
      },
      {
        text: 'Take the gig quietly for direct cash without telling your organization.',
        deltas: { finance: 18, happiness: 2 },
        riskViolation: { category: 'po_rule', chance: 0.25, desc: 'Unauthorized employment without PO documentation' },
        feedback: 'The cash in your pocket is welcome, but you check your phone anxiously whenever your coordinator texts.'
      },
      {
        text: 'Decline the offer to preserve weekends for school sports and rest.',
        deltas: { academics: 4, social: 4, finance: -2 },
        feedback: 'You keep your weekends completely free of stress and legal risk.'
      }
    ]
  },
  {
    id: 'evt_m8_spring_break_trip',
    title: 'Spring Break Road Trip Dilemma',
    months: [8],
    speaker: 'High School Friend',
    text: 'Classmates are planning a 3-day road trip to an amusement park across state lines during Spring Break. Exchange rules mandate submitting Form 104 with signatures 30 days in advance.',
    choices: [
      {
        text: 'Submit the formal PO travel paperwork and wait for official coordinator sign-off.',
        deltas: { adaptation: 5, social: 4, hostFamilyBond: 3 },
        feedback: 'Paperwork clears! You travel with complete legal security and zero anxiety.'
      },
      {
        text: 'Go on the trip anyway without submitting the travel notification.',
        deltas: { social: 12, happiness: 8, finance: -15 },
        riskViolation: { category: 'major', chance: 0.40, desc: 'Unapproved overnight travel across state lines' },
        feedback: 'An unforgettable weekend with friends, but you pray your coordinator doesn’t make a random check-in call.'
      },
      {
        text: 'Stay home and take day trips with your host parents to local historical sites.',
        deltas: { hostFamilyBond: 8, happiness: 4, social: -5 },
        feedback: 'Safe and wholesome. You miss the amusement park photos, but host parents cherish the quality time.'
      }
    ]
  },
  {
    id: 'evt_m8_secret_driving_lesson',
    title: 'The Behind-the-Wheel Temptation',
    months: [8],
    speaker: 'Classmate with Car',
    text: 'You are hanging out at an empty church parking lot. Your friend dangles their car keys: "Come on! Exchange students never get to drive. I\'ll teach you how to drive manual transmission right now—nobody is around!"',
    choices: [
      {
        text: 'Refuse firmly: operating any motorized vehicle is an automatic expulsion violation.',
        deltas: { academics: 3, hostFamilyBond: 4, social: -4 },
        feedback: 'They call you a party pooper, but you remember the signed program contract: ZERO VEHICLE OPERATION.'
      },
      {
        text: 'Get in the driver\'s seat and drive slow circles around the empty lot.',
        deltas: { happiness: 8, social: 6 },
        riskViolation: { category: 'critical', chance: 0.35, desc: 'Operating a motor vehicle without license or authorization' },
        feedback: 'Adrenaline rushes as the tires screech! But a local security patrol vehicle cruises around the corner...'
      },
      {
        text: 'Ask to sit in the passenger seat while they show off their driving drifts.',
        deltas: { social: 4, happiness: 4 },
        riskViolation: { category: 'minor', chance: 0.15, desc: 'Reckless passenger driving involvement' },
        feedback: 'Exhilarating acceleration, though your heart pounds nervously the whole time.'
      }
    ]
  },

  // =========================================================================
  // MONTH 9: SIBLING SECRETS & CURFEW DRAMA (Weeks 33-35)
  // =========================================================================
  {
    id: 'evt_m9_sibling_drama',
    title: 'Host Sibling Secrets & Heartbreak',
    months: [9],
    speaker: 'Host Sibling',
    text: 'Your host sibling knocks on your bedroom door late at night, visibly crying. They just had a painful falling out with their partner and need someone to confide in.',
    choices: [
      {
        text: 'Sit with them for hours, brew hot tea, and listen with deep empathy.',
        deltas: { hostFamilyBond: 10, social: 4, happiness: 3, academics: -3 },
        feedback: 'They hug you with tearful gratitude: "I don’t know what I would do without you here this year."'
      },
      {
        text: 'Encourage them to talk openly with their parents at breakfast tomorrow.',
        deltas: { hostFamilyBond: 7, adaptation: 5, happiness: 2 },
        feedback: 'A mature suggestion that helps bridge communication within the household.'
      },
      {
        text: 'Offer brief comfort, but explain you have a major exam early tomorrow.',
        deltas: { academics: 5, hostFamilyBond: -5, happiness: -4 },
        feedback: 'They apologize and close your door. You study, but feel an uncomfortable knot in your stomach.'
      }
    ]
  },
  {
    id: 'evt_m9_curfew_sprint',
    title: 'The 11:58 PM Curfew Sprint',
    months: [9],
    speaker: 'Inner Monologue',
    text: 'A movie night at a friend\'s house ran late. Your strict weekend curfew is 12:00 AM sharp. Your car ride dropped you off at the corner with two minutes to spare.',
    choices: [
      {
        text: 'Sprint with all your might up the driveway and slip through the front door at 11:59 PM.',
        deltas: { adaptation: 4, happiness: -2, hostFamilyBond: 2 },
        feedback: 'You click the door shut just as the grandfather clock tolls midnight. Host father nods from the armchair.'
      },
      {
        text: 'Walk calmly, enter at 12:08 AM, and apologize honestly for losing track of time.',
        deltas: { hostFamilyBond: -3, happiness: -2 },
        feedback: 'Host parents appreciate your honesty, but remind you that program coordinators track domestic discipline.'
      },
      {
        text: 'Try to sneak through the basement window to avoid being seen.',
        deltas: { happiness: -4 },
        riskViolation: { category: 'minor', chance: 0.35, desc: 'Caught sneaking in past curfew through window' },
        feedback: 'The window squeaks loud enough to alert the family dog. An embarrassing late-night confrontation ensues.'
      }
    ]
  },
  {
    id: 'evt_m9_first_crush_note',
    title: 'A Classmate Asks You Out',
    months: [9],
    speaker: 'Sweet Classmate',
    text: 'After art class, a classmate slips an envelope into your sketchpad: "Hey, I\'ve really loved getting to know you this year. Would you want to go to the retro diner for milkshakes this Saturday?"',
    choices: [
      {
        text: 'Accept with a radiant smile; you would love to spend an afternoon together.',
        deltas: { social: 9, happiness: 8, hostFamilyBond: -2, academics: -3 },
        feedback: 'Heart butterflies! You spend two magical hours sharing milkshakes and laughing at cultural differences.'
      },
      {
        text: 'Politely decline, explaining that romantic entanglements before leaving the country would be too painful.',
        deltas: { adaptation: 5, academics: 4, happiness: -3 },
        feedback: 'A mature, self-protective choice. They respect your honesty, though you wonder what could have been.'
      },
      {
        text: 'Panic and ask your host mother for advice on local dating customs.',
        deltas: { hostFamilyBond: 7, adaptation: 6, social: 3 },
        feedback: 'Host mother is overjoyed and helps you pick an outfit, making the whole household giggle.'
      }
    ]
  },

  // =========================================================================
  // MONTH 10: PROM, SENIORITIS & SPRING FESTIVALS (Weeks 36-37)
  // =========================================================================
  {
    id: 'evt_m10_prom_night',
    title: 'The High School Prom Night',
    months: [10],
    speaker: 'Prom Committee',
    text: 'Prom night! The premier American/international high school rite of passage. Rented tuxedos, glittering gowns, limousine arrivals, and afterparties.',
    choices: [
      {
        text: 'Go all-out: buy formal attire, attend the grand dinner, and dance all night.',
        cost: 45,
        deltas: { social: 12, happiness: 8, finance: -18, academics: -4 },
        feedback: 'Camera flashes, slow dances, and group memories that will last a lifetime in your photo album!'
      },
      {
        text: 'Attend the dance on a thrifted budget with a group of close international friends.',
        cost: 15,
        deltas: { social: 8, happiness: 7, finance: -6 },
        feedback: 'Hilarious and creative! You have just as much fun without draining your entire bank balance.'
      },
      {
        text: 'Skip the dance; celebrate the spring evening taking photos in the park with host family.',
        deltas: { hostFamilyBond: 8, finance: 0, social: -7 },
        feedback: 'Host parents take lovely portraits of you in the blossoming garden, though you wonder about the dance.'
      }
    ]
  },
  {
    id: 'evt_m10_senior_skip_day',
    title: 'Senior Skip Day Temptation',
    months: [10],
    speaker: 'Classmate',
    text: 'It is the unofficial "Senior Skip Day." Nearly half the 12th-grade class is ditching school to spend the sunny afternoon at the beach.',
    choices: [
      {
        text: 'Attend school anyway and enjoy the empty, relaxed classroom periods.',
        deltas: { academics: 6, adaptation: 3, social: -4 },
        feedback: 'Teachers are impressed by your dedication and hand out easy review marks.'
      },
      {
        text: 'Ditch class with your friends and head to the beach.',
        deltas: { social: 9, happiness: 6, academics: -5 },
        riskViolation: { category: 'minor', chance: 0.30, desc: 'Unexcused school truancy on Senior Skip Day' },
        feedback: 'Golden sunshine and sea breeze! But the school automated attendance phone call alerts your host parents.'
      },
      {
        text: 'Ask your host parents for an official excused mental health day to hike together.',
        deltas: { hostFamilyBond: 7, happiness: 5, academics: -2 },
        feedback: 'Legitimate family time that recharges your spirit without violating attendance regulations.'
      }
    ]
  },
  {
    id: 'evt_m10_university_campus_tour',
    title: 'The Prestigious University Campus Tour',
    months: [10],
    speaker: 'Guidance Counselor',
    text: 'Your counselor organizes a bus tour to the top state/national university campus. Walking through ivy-covered brick arches and massive libraries gives you goosebumps.',
    choices: [
      {
        text: 'Speak to the International Admissions Dean about undergraduate degree scholarships.',
        deltas: { academics: 8, adaptation: 7, happiness: 4 },
        flagSet: 'applied_host_university',
        feedback: 'The dean hands you an application fee waiver packet and encourages you to apply!'
      },
      {
        text: 'Enjoy the vibrant campus quad with friends, eating food truck tacos on the lawn.',
        cost: 15,
        deltas: { social: 7, happiness: 6, finance: -5 },
        feedback: 'A taste of collegiate independence. You feel inspired about what the future holds.'
      },
      {
        text: 'Reflect on how much you want to bring what you have learned back to your home country.',
        deltas: { academics: 6, adaptation: 4, hostFamilyBond: 4 },
        feedback: 'You realize your mission is to be a bridge between both cultures for years to come.'
      }
    ]
  },

  // =========================================================================
  // MONTH 11: COLLEGE APPS, FINALS & SCRAPBOOKS (Weeks 38-39)
  // =========================================================================
  {
    id: 'evt_m11_college_apps',
    title: 'The Host Nation University Application Decision',
    months: [11],
    speaker: 'Guidance Counselor',
    text: 'Your counselor sits with you: "You have adapted remarkably well. Have you considered applying to university here in our country? International student scholarship deadlines are this Friday."',
    choices: [
      {
        text: 'Draft the application essays and submit for host university merit admission.',
        cost: 20,
        deltas: { academics: 6, adaptation: 7, finance: -8, happiness: -3 },
        flagSet: 'applied_host_university',
        feedback: 'Essays sent! You feel a thrill knowing your journey with this country might not end in June.'
      },
      {
        text: 'Focus fully on returning home to complete your national university exams.',
        deltas: { academics: 7, hostFamilyBond: 4, social: 3 },
        feedback: 'A grounded choice. You look forward to bringing your foreign language advantage back to your home country.'
      },
      {
        text: 'Procrastinate and let the deadline pass due to burnout.',
        deltas: { happiness: -4, adaptation: -3 },
        feedback: 'The window closes. You feel a brief twinge of regret, but your schedule is less cluttered.'
      }
    ]
  },
  {
    id: 'evt_m11_scrapbook_prep',
    title: 'Crafting the Farewell Keepsake',
    months: [11],
    speaker: 'Inner Monologue',
    text: 'Only a few weeks remain. You flip through hundreds of photos on your phone from the past 10 months. You want to create something meaningful for your host family.',
    choices: [
      {
        text: 'Spend late nights crafting a detailed, handwritten photo scrapbook with personal letters.',
        cost: 15,
        deltas: { hostFamilyBond: 10, happiness: 4, finance: -6, academics: -3 },
        feedback: 'Gluing ticket stubs and writing heartfelt memories brings tears to your own eyes. A priceless keepsake.'
      },
      {
        text: 'Buy a nice decorative home gift from a local boutique.',
        cost: 30,
        deltas: { hostFamilyBond: 6, finance: -15 },
        feedback: 'A polished, tasteful gift that will sit proudly on their living room mantelpiece.'
      },
      {
        text: 'Write a simple thank-you card due to busy final exam study schedules.',
        deltas: { academics: 5, hostFamilyBond: 3 },
        feedback: 'Concise and sweet, keeping your final exam focus uncompromised.'
      }
    ]
  },
  {
    id: 'evt_m11_yearbook_signing',
    title: 'Signing the High School Yearbook',
    months: [11],
    speaker: 'Classmates',
    text: 'Yearbooks are distributed in the courtyard. Pens are passed around as hundreds of students crowd together to scribble heartfelt notes, inside jokes, and farewell messages.',
    choices: [
      {
        text: 'Collect signatures from all your favorite teachers, lab partners, and friends.',
        deltas: { social: 10, adaptation: 7, happiness: 6 },
        feedback: 'Reading paragraphs like "You changed our perspective on the world" makes you choke up.'
      },
      {
        text: 'Write long, personal goodbye letters in the margins for your closest 3 friends.',
        deltas: { social: 8, hostFamilyBond: 3, happiness: 5 },
        feedback: 'Tears and hugs in the hallway. You promise to stay in touch through video calls forever.'
      },
      {
        text: 'Decline to purchase the $45 yearbook to save cash for excess baggage fees.',
        deltas: { finance: 10, social: -5, happiness: -4 },
        feedback: 'Prudent budgeting, though seeing everyone else flipping through photos leaves a twinge of regret.'
      }
    ]
  },
  {
    id: 'evt_m11_overweight_suitcase',
    title: 'The 50-Pound Baggage Scale Crisis',
    months: [11],
    speaker: 'Host Father',
    text: 'You zip your two suitcases and hoist them onto the bathroom scale: 64 lbs and 58 lbs! The airline limit is strictly 50 lbs. Excess fees will cost over $150 at the check-in counter.',
    choices: [
      {
        text: 'Rigorously donate worn clothes and heavy textbooks to the local thrift shop.',
        deltas: { adaptation: 6, hostFamilyBond: 4, happiness: -3 },
        feedback: 'Both bags drop right to 49.5 lbs! Host mother helps you pack with military precision.'
      },
      {
        text: 'Mail a heavy parcel of souvenirs and winter coats home via surface sea mail.',
        cost: 40,
        deltas: { finance: -15, happiness: 3 },
        feedback: 'The boxes will take two months to arrive by ship, but your flight luggage is saved.'
      },
      {
        text: 'Panic and plead with host parents to keep a suitcase in their attic until you visit again.',
        deltas: { hostFamilyBond: 6, happiness: 2 },
        feedback: 'They smile warmly: "It will always be here waiting for you in your room."'
      }
    ]
  },

  // =========================================================================
  // MONTH 12: GRADUATION, FAREWELL BANQUET & DEPARTURE (Week 40)
  // =========================================================================
  {
    id: 'evt_m12_farewell_dinner',
    title: 'The Final Host Family Banquet',
    months: [12],
    speaker: 'Host Mother',
    text: 'The dining table is set with all your favorite foods from throughout the year. Two packed suitcases stand by the entryway. Host father raises his glass with watery eyes: "A year ago, a stranger walked into our home. Tonight, our child sits with us."',
    choices: [
      {
        text: 'Deliver a tearful toast thanking them for treating you like their own family member.',
        deltas: { hostFamilyBond: 10, happiness: 6, social: 4 },
        feedback: 'Nobody can hold back tears. Your host parents promise to visit you in your home country.'
      },
      {
        text: 'Present your handmade scrapbook and reminisce about all the funny blunders.',
        deltas: { hostFamilyBond: 12, happiness: 5, adaptation: 5 },
        feedback: 'Laughter through tears as you flip through the photos of the burnt dinner and snowy cabin!'
      },
      {
        text: 'Keep your composure and focus on practical travel arrangements for tomorrow.',
        deltas: { hostFamilyBond: 2, happiness: -4 },
        feedback: 'You bottle up your emotions to stay strong, but the looming airport departure feels heavy.'
      }
    ]
  },
  {
    id: 'evt_m12_graduation_walk',
    title: 'The High School Graduation Stage',
    months: [12],
    speaker: 'Principal',
    text: 'The brass band plays Pomp and Circumstance. Caps and gowns flutter in the breeze. Thousands of spectators watch from the bleachers as foreign exchange students are called to the podium.',
    choices: [
      {
        text: 'Walk across the stage with head held high and wave proudly to your host parents in the crowd.',
        deltas: { happiness: 8, adaptation: 6, social: 5 },
        feedback: 'Deafening cheers from your classmates! Host mother waves a handmade banner with your name on it.'
      },
      {
        text: 'Toss your graduation cap high into the sky surrounded by your classmate friend group.',
        deltas: { social: 8, happiness: 7, hostFamilyBond: 3 },
        feedback: 'A cinematic high school finale that cements your friendships forever.'
      },
      {
        text: 'Silently reflect on how much you have matured and transformed over the past 10 months.',
        deltas: { adaptation: 8, happiness: 6, academics: 4 },
        feedback: 'You realize you are no longer the timid student who stepped off the plane. You are ready for the world.'
      }
    ]
  },
  {
    id: 'evt_m12_airport_gate_departure',
    title: 'Security Gate Hugs & The Final Boarding Call',
    months: [12],
    speaker: 'Airport PA System',
    text: '"Flight 408 with service to Home International Airport is now boarding at Gate B12." You stand at the transparent glass barrier. Your host parents and friends are waving with tear-stained eyes.',
    choices: [
      {
        text: 'Give host parents one last crushing embrace and whisper: "Thank you for everything, Mom and Dad."',
        deltas: { hostFamilyBond: 15, happiness: 8, adaptation: 8 },
        feedback: 'Host mother breaks down in loving tears. You turn back three times as you walk down the jetbridge.'
      },
      {
        text: 'Take a final group selfie with your best friends and exchange final souvenir tokens.',
        deltas: { social: 10, happiness: 7, adaptation: 6 },
        feedback: 'Your phone lockscreen is set forever with the faces that made this foreign place a home.'
      },
      {
        text: 'Walk through the security checkpoint resolutely, clutching your passport and boarding pass.',
        deltas: { adaptation: 9, academics: 5, happiness: 5 },
        feedback: 'As the airplane engines roar to life on the runway, you realize you have truly conquered the world.'
      }
    ]
  },

  // =========================================================================
  // COUNTRY-SPECIFIC CULTURAL EVENTS (Targeted Immersion)
  // =========================================================================
  {
    id: 'evt_country_japan_bukatsu',
    title: 'Bukatsu Discipline & Senpai Hierarchy',
    countries: ['japan'],
    months: [2, 3, 4],
    weight: 15,
    speaker: 'Club Senpai',
    text: 'You joined an after-school club in Japan. Before practice begins, all underclassmen must line up, bow at exactly 45 degrees, and clean the dojo wooden floorboards on hands and knees.',
    choices: [
      {
        text: 'Embrace the traditional hierarchy diligently, bow deeply, and scrub the floor with pride.',
        deltas: { adaptation: 10, hostFamilyBond: 4, happiness: -3, academics: -3 },
        feedback: 'The Senpai nod approvingly: "Good spirit!" You are invited to join their weekend ramen outing.'
      },
      {
        text: 'Ask respectfully if you can adjust practice times so you can study for Japanese Kanji quizzes.',
        deltas: { academics: 6, adaptation: 3, social: -4 },
        feedback: 'The coach accepts, but you remain somewhat on the periphery of the club\'s tight inner circle.'
      },
      {
        text: 'Complain that exchange students shouldn\'t have to scrub floors like servants.',
        deltas: { adaptation: -8, social: -10, happiness: -6 },
        feedback: 'A painful cultural freeze. The club captain asks you not to return to future practices.'
      }
    ]
  },
  {
    id: 'evt_country_japan_genkan',
    title: 'The Genkan Slippers Faux Pas',
    countries: ['japan'],
    months: [1, 2],
    weight: 15,
    speaker: 'Host Mother',
    text: 'In your morning rush to catch the train, you step off the wooden Genkan entryway back into the hallway while still wearing your outdoor street sneakers!',
    choices: [
      {
        text: 'Instantly realize the mistake, take off the shoes, and meticulously wipe the floor with a cloth.',
        deltas: { hostFamilyBond: 6, adaptation: 7, happiness: -2 },
        feedback: 'Host mother is impressed by your swift awareness and teaches you the proper slipper alignment.'
      },
      {
        text: 'Apologize profusely and promise never to do it again.',
        deltas: { hostFamilyBond: 2, adaptation: 3 },
        feedback: 'She nods gently: "Outside shoes bring outside dust into the sanctuary of the home."'
      },
      {
        text: 'Brush it off: "It was only two steps, no big deal!"',
        deltas: { hostFamilyBond: -7, adaptation: -6 },
        feedback: 'A severe cultural blunder. Host parents view it as a deep lack of respect for the home.'
      }
    ]
  },
  {
    id: 'evt_country_germany_ruhezeit',
    title: 'Sunday Ruhezeit & Quiet Hours Complaint',
    countries: ['germany'],
    months: [2, 3, 4],
    weight: 15,
    speaker: 'Upstairs Neighbor',
    text: 'It is Sunday afternoon at 2:30 PM in your German apartment building. You turn on loud pop music while vacuuming your bedroom. A sharp banging rattles against your front door.',
    choices: [
      {
        text: 'Immediately turn off the music, open the door, and apologize for disturbing Sonntag Ruhezeit.',
        deltas: { adaptation: 8, hostFamilyBond: 4, happiness: -2 },
        feedback: 'The elderly neighbor nods with stern approval: "Rules are rules. Have a peaceful Sunday."'
      },
      {
        text: 'Ask host father to handle the neighbor and explain the quiet hour regulations to you.',
        deltas: { hostFamilyBond: 5, adaptation: 4 },
        feedback: 'Host father explains that in Germany, Sunday is legally protected for absolute calm and silence.'
      },
      {
        text: 'Argue that it is daytime and playing music in your own room is completely normal.',
        deltas: { adaptation: -7, hostFamilyBond: -6, happiness: -5 },
        feedback: 'The neighbor threatens to call the Hausverwaltung (building management). Host parents are mortified.'
      }
    ]
  },
  {
    id: 'evt_country_germany_pfand',
    title: 'The Great Pfand Bottle Expedition',
    countries: ['germany'],
    months: [3, 4, 5],
    weight: 12,
    speaker: 'Host Sibling',
    text: 'Four giant plastic crates of glass and PET beverage bottles have accumulated in the pantry. Host sibling hands you two giant bags: "Time for the Saturday Pfand return at the supermarket!"',
    choices: [
      {
        text: 'Feed every bottle into the automated reverse vending machine and collect the €18 refund voucher.',
        deltas: { adaptation: 8, finance: 8, hostFamilyBond: 5 },
        feedback: 'The rhythmic clatter of bottles! You proudly hand the receipt to host mother at the checkout.'
      },
      {
        text: 'Use the bottle refund money to buy a round of Döner Kebap for you and your host sibling.',
        deltas: { hostFamilyBond: 8, social: 5, happiness: 6 },
        feedback: 'Sitting on the park bench munching spicy Döner in the afternoon sun is peak German teenage life.'
      },
      {
        text: 'Complain about having to drag noisy glass crates through the street.',
        deltas: { hostFamilyBond: -4, adaptation: -3 },
        feedback: 'Host sibling shakes their head: "Recycling is sacred here, my friend."'
      }
    ]
  },
  {
    id: 'evt_country_usa_football',
    title: 'Friday Night Lights & The Stadium Tailgate',
    countries: ['usa'],
    months: [2, 3],
    weight: 16,
    speaker: 'Pep Club Leader',
    text: 'It is Friday night under the massive stadium floodlights. The marching band blares brass fight songs, cheerleaders fly through the air, and 2,000 students in school colors are screaming in the bleachers.',
    choices: [
      {
        text: 'Paint your face with school colors, join the loudest front row, and learn all the chants.',
        deltas: { social: 10, adaptation: 7, happiness: 6, academics: -3 },
        feedback: 'Your voice is hoarse by the 4th quarter! You are fully immersed in American high school culture.'
      },
      {
        text: 'Help the booster club sell hot dogs and nachos at the concession stand with host parents.',
        deltas: { hostFamilyBond: 8, adaptation: 5, social: 3 },
        feedback: 'Host parents love your community spirit, and you get free curly fries and hot chocolate.'
      },
      {
        text: 'Sit quietly at the top of the bleachers feeling overwhelmed by the deafening spectacle.',
        deltas: { adaptation: 2, happiness: -4, social: -3 },
        feedback: 'The sensory overload is immense. You watch the spectacle like a detached documentary filmmaker.'
      }
    ]
  },
  {
    id: 'evt_country_uk_uniform',
    title: 'Headteacher Uniform & Tie Inspection',
    countries: ['uk'],
    months: [1, 2],
    weight: 15,
    speaker: 'Head of Year',
    text: 'At the school gates on a drizzly morning, the Head of Year stands with a clipboard inspecting blazers, polished black leather shoes, and tie lengths: "Top button fastened, tie touching the belt line!"',
    choices: [
      {
        text: 'Adjust your tie with textbook precision, polish your shoes, and nod politely: "Good morning, Sir."',
        deltas: { adaptation: 7, academics: 4, happiness: 1 },
        feedback: 'He nods approvingly: "Splendid standard, well done." You glide through the gate without detention.'
      },
      {
        text: 'Ask a nearby British classmate to quickly tie your school tie in a proper Windsor knot.',
        deltas: { social: 6, adaptation: 5 },
        feedback: 'They laugh and knot it in five seconds flat. British peer solidarity at its finest.'
      },
      {
        text: 'Grumble aloud about how ridiculous school uniforms are compared to your home country.',
        deltas: { academics: -4, adaptation: -5, happiness: -4 },
        feedback: 'The Head of Year overhears and issues a 30-minute break-time detention for uniform defiance.'
      }
    ]
  },
  {
    id: 'evt_country_france_cantine',
    title: 'The 2-Hour Gourmet School Lunch Debate',
    countries: ['france'],
    months: [2, 3, 4],
    weight: 15,
    speaker: 'French Classmate',
    text: 'In France, lunchtime is not a 20-minute cafeteria rush. You sit at a table for 90 minutes over a four-course tray: salad vinaigrette, roast chicken, Brie cheese with baguette, and pear tart. A passionate debate on philosophy erupts.',
    choices: [
      {
        text: 'Contribute your cultural perspective to the debate, using every French vocabulary word you know.',
        deltas: { adaptation: 10, social: 7, academics: 4 },
        feedback: 'Classmates lean in, intrigued by your foreign viewpoint. A brilliant exercise in French rhetoric!'
      },
      {
        text: 'Savor every course quietly and compliment the school chef on the incredible cheese selection.',
        deltas: { adaptation: 6, happiness: 6, social: 2 },
        feedback: 'French culinary culture at its finest! School cafeteria food will never taste the same again.'
      },
      {
        text: 'Complain that school days last until 5:30 PM just because lunch takes so long.',
        deltas: { adaptation: -5, social: -4, happiness: -3 },
        feedback: 'Classmates shrug with Gallic flair: "Manger, c\'est vivre!" (To eat is to live!).'
      }
    ]
  },

  // =========================================================================
  // REACTIVE CRISIS EVENTS (Dynamic Triggers for Struggling Players)
  // =========================================================================
  {
    id: 'evt_crisis_academic_probation',
    title: 'Academic Probation Warning Meeting',
    conditions: { maxAcademics: 45 },
    weight: 25,
    isCrisis: true,
    speaker: 'Guidance Counselor',
    text: 'You sit in the principal’s office alongside your regional coordinator. Your grade report shows failing marks in core subjects: "Your student visa requires satisfactory academic progress. If your marks do not recover within 30 days, we must initiate early return procedures."',
    choices: [
      {
        text: 'Commit to mandatory 2-hour daily tutoring sessions, completely sacrificing social afternoons.',
        deltas: { academics: 14, social: -10, happiness: -6 },
        feedback: 'Exhausting and stressful, but your academic trajectory halts its free-fall. Crisis stabilized.'
      },
      {
        text: 'Ask host parents to supervise your nightly study routines at the dining room table.',
        deltas: { academics: 10, hostFamilyBond: 6, happiness: -4, social: -5 },
        feedback: 'Host parents step up with loving strictness. They quiz you on vocabulary every evening after dinner.'
      },
      {
        text: 'Make excuses about foreign language test unfairness and shut down emotionally.',
        deltas: { academics: -8, happiness: -10, hostFamilyBond: -6 },
        riskViolation: { category: 'po_rule', chance: 0.50, desc: 'Formal academic probation reprimand' },
        feedback: 'The coordinator issues a written probation strike. You are one step away from deportation.'
      }
    ]
  },
  {
    id: 'evt_crisis_severe_homesick',
    title: 'The Silent Tears in the Laundry Room',
    conditions: { maxHappiness: 35 },
    weight: 25,
    isCrisis: true,
    speaker: 'Host Mother',
    text: 'You are sitting on the floor of the laundry room folding clothes, silently sobbing into a towel. The overwhelming weight of foreign isolation, language exhaustion, and missed celebrations back home has shattered your emotional reserves.',
    choices: [
      {
        text: 'Open up completely to your host mother when she finds you, pouring your heart out in tears.',
        deltas: { hostFamilyBond: 14, happiness: 10, adaptation: 5 },
        feedback: 'She pulls you into a warm, motherly hug: "Oh sweetheart, you never have to hide your tears in this house."'
      },
      {
        text: 'Schedule an emergency counseling session with your exchange program student support officer.',
        deltas: { happiness: 8, adaptation: 6, academics: -2 },
        feedback: 'The officer shares coping strategies used by hundreds of past exchange students. You are not alone.'
      },
      {
        text: 'Lock yourself in the bathroom, splash water on your face, and force yourself to bottle it up.',
        deltas: { happiness: -8, adaptation: -6, hostFamilyBond: -4 },
        feedback: 'The emotional bottle tightens. Unaddressed culture shock festers into deep physical exhaustion.'
      }
    ]
  },
  {
    id: 'evt_crisis_host_estrangement',
    title: 'The Host Family Kitchen Confrontation',
    conditions: { maxHostFamilyBond: 35 },
    weight: 25,
    isCrisis: true,
    speaker: 'Host Father',
    text: 'Host father calls a mandatory family meeting at the kitchen table: "We opened our home to share our lives with an exchange student. But for weeks, you treat this house like a hotel—staying in your room, barely speaking to us, and ignoring family dinners."',
    choices: [
      {
        text: 'Humbly apologize, explain your mental exhaustion, and commit to being present in the living room daily.',
        deltas: { hostFamilyBond: 12, adaptation: 6, happiness: 2 },
        feedback: 'A heartfelt, vulnerable breakthrough. Both host parents soften and promise to give you patience.'
      },
      {
        text: 'Suggest establishing a shared weekly cooking or board game night to rebuild bonds step-by-step.',
        deltas: { hostFamilyBond: 10, social: 3, adaptation: 5 },
        feedback: 'A constructive proposal that restores mutual warmth and breaks the cold domestic silence.'
      },
      {
        text: 'Demand that the placement organization transfer you to a different host family.',
        deltas: { hostFamilyBond: -12, happiness: -6 },
        riskViolation: { category: 'po_rule', chance: 0.35, desc: 'Host family breakdown dispute' },
        feedback: 'Tense silence. The coordinator is summoned to mediate an uncomfortable domestic crisis.'
      }
    ]
  },
  {
    id: 'evt_crisis_strike_warning',
    title: 'Coordinator Formal Warning Inspection',
    conditions: { minStrikes: 2 },
    weight: 30,
    isCrisis: true,
    speaker: 'Regional Coordinator',
    text: 'Your regional coordinator sits across from you with your disciplinary dossier: "You currently have multiple documented strikes on file. One more major infraction, and program headquarters in Washington/Berlin/Tokyo will revoke your exchange visa immediately."',
    choices: [
      {
        text: 'Accept full responsibility, sign the compliance pledge, and agree to a 9:00 PM curfew for 30 days.',
        deltas: { adaptation: 6, hostFamilyBond: 6, social: -6, happiness: -4 },
        feedback: 'The coordinator notes your contrition. Your program standing stabilizes on probation.'
      },
      {
        text: 'Ask your host parents to vouch for your recent good behavior and household helpfulness.',
        deltas: { hostFamilyBond: 5, adaptation: 4 },
        feedback: 'Host parents speak up warmly in your defense, softening the coordinator\'s stern stance.'
      },
      {
        text: 'Argue that the program rules are overly draconian compared to normal teenage life.',
        deltas: { happiness: -4, hostFamilyBond: -5 },
        riskViolation: { category: 'po_rule', chance: 0.40, desc: 'Insubordination during coordinator probation hearing' },
        feedback: 'The coordinator slams the dossier shut: "You are on the thinnest ice imaginable, young person."'
      }
    ]
  },

  // =========================================================================
  // 40-WEEK ACADEMIC CRUCIBLE MILESTONES (W10, W12, W17, W20, W25, W30, W35, W37, W40)
  // =========================================================================
  {
    id: 'evt_milestone_w10_midterms',
    title: 'Term 1 Midterm Examinations & Report Card',
    weeks: [10],
    isMilestone: true,
    milestoneId: 'midterms',
    speaker: 'Guidance Counselor',
    text: 'Your Term 1 grades have been officially posted. As an exchange student, your transcript is scrutinized by your teachers, host family, and home organization. Academic rigor is testing your stamina.',
    choices: [
      {
        text: 'Sacrifice weekend social events to attend teacher office hours and retake difficult quizzes.',
        deltas: { academics: 8, social: -5, happiness: -3 },
        feedback: 'Your teachers appreciate the discipline and dedication. Your GPA solidifies in the top tier!'
      },
      {
        text: 'Form an international study group with local classmates at the library.',
        cost: 10,
        deltas: { academics: 6, social: 6, finance: -10 },
        feedback: 'Studying together turns difficult homework into a fun social bond over shared snacks and laughter.'
      },
      {
        text: 'Focus on sports and extracurriculars, settling for average passing grades.',
        deltas: { academics: -6, happiness: 7, social: 5 },
        feedback: 'You maintain high spirits and team camaraderie, but the counselor reminds you of scholarship minimums.'
      }
    ]
  },
  {
    id: 'evt_milestone_w12_iew',
    title: 'International Education Week (IEW) Assembly',
    weeks: [12],
    isMilestone: true,
    milestoneId: 'iew',
    speaker: 'High School Principal',
    text: 'It is International Education Week! The entire student body fills the auditorium. You stand before hundreds of curious local students with your presentation slides, home country artifacts, and traditional sweets.',
    choices: [
      {
        text: 'Deliver a passionate, interactive presentation debunking stereotypes and teaching words in your native language.',
        deltas: { social: 10, adaptation: 8, hostFamilyBond: 6, happiness: -3 },
        flagSet: 'iew_completed',
        feedback: 'Resounding applause! Students crowd around you afterwards asking questions and exchanging social handles.'
      },
      {
        text: 'Host a traditional food tasting session and cultural dance demonstration with your host siblings.',
        cost: 15,
        deltas: { hostFamilyBond: 9, social: 7, adaptation: 5, finance: -15 },
        flagSet: 'iew_completed',
        feedback: 'The aroma of home cooking wins over everyone in the cafeteria. Host parents beam with pride!'
      },
      {
        text: 'Keep it brief and factual with a standard slideshow to avoid the intense public spotlight.',
        deltas: { academics: 4, adaptation: 3, social: -3 },
        flagSet: 'iew_completed',
        feedback: 'A respectable, informative overview. You fulfill program requirements without excessive stress.'
      }
    ]
  },
  {
    id: 'evt_milestone_w17_winter_holidays',
    title: 'Winter Holidays & Acute Homesickness Spike',
    weeks: [17],
    isMilestone: true,
    milestoneId: 'winter_holidays',
    speaker: 'Host Mother',
    text: 'Outside, snow covers the rooftops and holiday carols play in every store. Back home, your family is celebrating without you. A sudden, deep wave of homesickness hits your chest.',
    choices: [
      {
        text: 'Pour your heart into host family holiday traditions—decorating the tree and cooking together.',
        deltas: { hostFamilyBond: 10, happiness: 5, adaptation: 4, social: -3 },
        feedback: 'Sharing heartfelt moments around the fireplace melts the holiday chill. You feel truly loved.'
      },
      {
        text: 'Call home for a 2-hour holiday video call, sharing laughs and wiping away emotional tears.',
        deltas: { happiness: 9, adaptation: -4, hostFamilyBond: 3 },
        feedback: 'Hearing home accents and seeing childhood rooms brings profound relief, though parting is tender.'
      },
      {
        text: 'Volunteer at a local community shelter with high school volunteers.',
        deltas: { adaptation: 8, social: 8, happiness: -3 },
        feedback: 'Giving back to the local town puts your own emotions into perspective and earns community respect.'
      }
    ]
  },
  {
    id: 'evt_milestone_w20_po_review',
    title: 'Mid-Year Placement Organization (PO) Home Inspection',
    weeks: [20],
    isMilestone: true,
    milestoneId: 'po_review',
    speaker: 'Regional Coordinator',
    text: 'Your regional coordinator arrives for the official mid-year evaluation. She inspects your bedroom, interviews your host parents in private, and reviews your attendance records and rule compliance.',
    choices: [
      {
        text: 'Present an immaculate record, highlight your cultural adaptation, and thank your coordinator warmly.',
        deltas: { hostFamilyBond: 8, adaptation: 6, academics: 4 },
        feedback: 'The coordinator awards your placement the highest evaluation marks and commends your maturity.'
      },
      {
        text: 'Honestly discuss early communication hiccups and show the actionable steps you took to resolve them.',
        deltas: { adaptation: 7, hostFamilyBond: 6, happiness: 3 },
        feedback: 'Your honesty is appreciated. The coordinator praises your emotional growth and resilience.'
      },
      {
        text: 'Remain defensive about strict rules and curfews during the private interview.',
        deltas: { hostFamilyBond: -5, happiness: -4 },
        riskViolation: { category: 'po_rule', chance: 0.30, desc: 'Coordinator mid-year insubordination' },
        feedback: 'The coordinator issues a cautionary note in your file regarding attitude and compliance.'
      }
    ]
  },
  {
    id: 'evt_milestone_w25_spring_break',
    title: 'Spring Break Travel Permission (PO Form 104)',
    weeks: [25],
    isMilestone: true,
    milestoneId: 'spring_break',
    speaker: 'Classmate',
    text: '"We are renting a cabin near the national park for Spring Break! You have to come with us!" Program rules strictly require official PO Form 104 travel authorization signed by natural parents, host parents, and your coordinator 3 weeks in advance.',
    choices: [
      {
        text: 'Follow the protocol: submit Form 104 in advance and arrange an approved adult chaperone.',
        cost: 25,
        deltas: { social: 8, adaptation: 5, finance: -25 },
        feedback: 'Authorization granted! You enjoy a legal, breathtaking wilderness getaway with trusted friends.'
      },
      {
        text: 'Spend Spring Break exploring scenic state sights on a road trip with your host family instead.',
        deltas: { hostFamilyBond: 10, happiness: 6, social: -5 },
        feedback: 'A wonderful, stress-free family journey that creates cherished photos for your exchange album.'
      },
      {
        text: 'Sneak out for the weekend without submitting travel paperwork to the coordinator.',
        deltas: { social: 9, happiness: 7 },
        riskViolation: { category: 'travel_unapproved', severity: 'major', desc: 'Unapproved overnight road trip during Spring Break' },
        feedback: 'The trip was wild, but dread lingers every time your phone buzzes with a notification.'
      }
    ]
  },
  {
    id: 'evt_milestone_w30_prom',
    title: 'The Senior Prom Formal',
    weeks: [30],
    isMilestone: true,
    milestoneId: 'prom',
    speaker: 'Prom Committee',
    text: 'Music echoes under glittering chandeliers. Prom night is here—the quintessential high school milestone. You are dressed in formal wear, surrounded by peers taking photos.',
    choices: [
      {
        text: 'Dance all night on the main floor and take memorable group photos with all your friends.',
        cost: 30,
        deltas: { social: 12, happiness: 6, academics: -3, finance: -30 },
        feedback: 'An unforgettable evening! You were voted "Most Adventurous Senior" in the friendly prom polls.'
      },
      {
        text: 'Invite host parents for the pre-prom photo session in the garden before heading to the hall with friends.',
        cost: 20,
        deltas: { hostFamilyBond: 8, social: 8, happiness: 5, finance: -20 },
        feedback: 'Host mother tears up pinning your corsage. The photos will sit on their mantelpiece for years.'
      },
      {
        text: 'Attend an unchaperoned after-party in the woods that host parents specifically forbade.',
        deltas: { social: 9, happiness: 4 },
        riskViolation: { category: 'curfew_alcohol', severity: 'major', desc: 'Attending forbidden unchaperoned post-prom party' },
        feedback: 'Flashing red lights appear at 2:00 AM. A chaotic scramble follows as police disperse the party.'
      }
    ]
  },
  {
    id: 'evt_milestone_w35_finals',
    title: 'Senior Cumulative Final Examinations',
    weeks: [35],
    isMilestone: true,
    milestoneId: 'finals',
    speaker: 'Exam Proctor',
    text: '"Pens up. You have two hours to complete the final cumulative exam." Your final academic transcript and graduation standing hinge directly on this testing week.',
    choices: [
      {
        text: 'Execute a disciplined, week-long study plan: flashcards, textbook review, and sleep.',
        deltas: { academics: 10, happiness: -4, social: -4 },
        feedback: 'Your disciplined revision pays off with top marks across your hardest core subjects!'
      },
      {
        text: 'Form an all-night cramming group with classmates fueled by coffee and pizza.',
        cost: 10,
        deltas: { academics: 7, social: 5, happiness: -5, finance: -10 },
        feedback: 'Exhausting, but collective solidarity carries you through the toughest calculus and literature questions.'
      },
      {
        text: 'Prioritize mental peace and sleep; trust what you learned over the past 34 weeks.',
        deltas: { happiness: 6, academics: 2 },
        feedback: 'Calm and steady. You avoid burnout and achieve respectable, steady passing scores.'
      }
    ]
  },
  {
    id: 'evt_milestone_w37_graduation',
    title: 'High School Graduation Ceremony (Cap & Gown)',
    weeks: [37],
    isMilestone: true,
    milestoneId: 'graduation',
    speaker: 'School Principal',
    text: '"Pomp and Circumstance" plays as the graduating class marches into the stadium in caps and gowns. Your host family waves from the bleachers holding flowers and cameras.',
    choices: [
      {
        text: 'Walk across the stage with proud posture and toss your graduation cap into the sky!',
        deltas: { happiness: 12, hostFamilyBond: 10, social: 8 },
        feedback: 'A thunderous roar from the crowd as your name is called. You did it—an international graduate!'
      },
      {
        text: 'Give a tearful, heartfelt speech thanking your teachers, host family, and classmates.',
        deltas: { hostFamilyBond: 10, social: 10, adaptation: 8, academics: 5 },
        feedback: 'Not a dry eye in the auditorium. Teachers hug you tightly as you step down from the podium.'
      },
      {
        text: 'Spend the afternoon signing yearbooks with heartfelt personalized notes in everyone\'s books.',
        cost: 15,
        deltas: { social: 10, happiness: 6, finance: -15 },
        feedback: 'Your yearbook is covered in phone numbers, heartfelt memories, and invitations to visit.'
      }
    ]
  },
  // =========================================================================
  // ADDITIONAL MULTI-EVENT NARRATIVE ENCOUNTERS (WEEKS 1 - 40)
  // =========================================================================
  {
    id: 'evt_w1_school_bus',
    title: 'The Morning Yellow Bus & The Empty Seats',
    months: [1],
    speaker: 'Bus Driver',
    text: 'It is 6:45 AM. The giant yellow school bus pulls up in the morning mist, pneumatic doors hissing open. Loud teenagers chat in back rows, while the front rows sit half-empty.',
    choices: [
      {
        text: 'Take a seat next to a quiet student with headphones and offer a friendly smile.',
        deltas: { social: 6, adaptation: 5, happiness: 1 },
        feedback: 'They pop off one earphone and introduce themselves. You found your morning bus buddy!'
      },
      {
        text: 'Sit alone near the front, reviewing your school map and schedule notes.',
        deltas: { academics: 5, adaptation: 2, social: -3 },
        feedback: 'You memorize the room numbers for chemistry and history, feeling academically prepared.'
      },
      {
        text: 'Walk nervously to the very back where the senior athletes are laughing loudly.',
        deltas: { social: 7, happiness: -3, adaptation: 2 },
        feedback: 'They stare in surprise, then toss you a high-five. Intimidating, but you survived the deep end!'
      }
    ]
  },
  {
    id: 'evt_w2_cafeteria_table',
    title: 'The High School Cafeteria Seating Dilemma',
    months: [1],
    speaker: 'Lunchroom Monitor',
    text: 'Holding a heavy plastic lunch tray with mystery pizza and chocolate milk, you stand in the center of a roaring 600-person cafeteria. Every table appears divided into rigid social cliques.',
    choices: [
      {
        text: 'Walk up to a table of students from your morning math class and ask: "Is this seat taken?"',
        deltas: { social: 8, adaptation: 6, happiness: 2 },
        feedback: 'They scoot over enthusiastically and ask where your accent is from! First barrier broken.'
      },
      {
        text: 'Eat lunch with the school international club coordinator who is waving from a side table.',
        deltas: { adaptation: 7, hostFamilyBond: 3, social: 2 },
        feedback: 'A safe, supportive conversation about culture shock and tips for surviving high school.'
      },
      {
        text: 'Slip out to the courtyard benches and eat quietly while observing the school culture from afar.',
        deltas: { happiness: -4, adaptation: 1, social: -5 },
        feedback: 'Peaceful, but you feel the cold prickle of isolation watching friend groups laugh together.'
      }
    ]
  },
  {
    id: 'evt_w3_gym_class_uniform',
    title: 'P.E. Locker Room & Physical Culture Shock',
    months: [1],
    speaker: 'Coach',
    text: 'Coach blows the whistle into the echoing gymnasium. "All right newcomers, ten laps around the track, then dodgeball scrimmage!" The gym uniform here is completely different from what you wore back home.',
    choices: [
      {
        text: 'Dive into the dodgeball game with full intensity, diving across the court.',
        deltas: { social: 8, happiness: 5, academics: -2 },
        feedback: 'You dodge two incoming balls and nail a star player! The gymnasium erupts in cheers for the exchange student.'
      },
      {
        text: 'Pace yourself cautiously on the track, chatting with classmates about how gym class works back home.',
        deltas: { adaptation: 6, social: 4, happiness: 1 },
        feedback: 'They are amazed that in your home country gym class didn\'t involve mandatory 8:00 AM mile runs.'
      },
      {
        text: 'Sit on the bleachers with an excuse note, feeling intimidated by the athletic fervor.',
        deltas: { happiness: -6, social: -5, adaptation: -3 },
        feedback: 'Coach frowns, and you spend fifty minutes staring at the rafters feeling out of place.'
      }
    ]
  },
  {
    id: 'evt_w4_pharmacy_cold',
    title: 'Autumn Cold & The Foreign Pharmacy',
    months: [1, 2],
    speaker: 'Pharmacist',
    text: 'A nasty autumn fever hits you. The pharmacy shelves are packed with giant bottles of over-the-counter flu syrups and daytime caps, none of which share brand names with medicine in your home country.',
    choices: [
      {
        text: 'Ask the pharmacist for recommendations, showing them your symptoms on your phone.',
        deltas: { adaptation: 6, happiness: 3, finance: -8 },
        cost: 15,
        feedback: 'She recommends a trusted local cold medicine. By tomorrow morning your throat feels relieved.'
      },
      {
        text: 'Call your host mother to ask what the family normally uses when kids get sick.',
        deltas: { hostFamilyBond: 7, adaptation: 4, happiness: 2 },
        feedback: 'Host mother rushes to pick you up with homemade ginger soup and her favorite family remedy.'
      },
      {
        text: 'Rely only on tea and willpower, refusing to spend dollars on unfamiliar medicine.',
        deltas: { academics: -7, happiness: -8, finance: 0 },
        feedback: 'The fever lingers for four days. You fall behind on reading assignments.'
      }
    ]
  },
  {
    id: 'evt_w5_home_rules_curfew',
    title: 'The 9:30 PM Weeknight Curfew Dilemma',
    months: [2],
    speaker: 'Host Father',
    text: 'Classmates invite you to stay after a varsity volleyball game to grab milkshakes at a local diner. Your PO rules and host family set a strict 9:30 PM school-night curfew. It is currently 9:10 PM.',
    choices: [
      {
        text: 'Politely decline the diner, thank them, and catch your scheduled ride home on time.',
        deltas: { hostFamilyBond: 8, academics: 3, social: -3 },
        feedback: 'Host father is waiting on the porch. "Proud of your punctuality, kiddo." Trust builds stone by stone.'
      },
      {
        text: 'Call host father immediately, explain the situation, and ask politely for a 30-minute extension.',
        deltas: { hostFamilyBond: 5, social: 6, adaptation: 4 },
        feedback: 'Host father appreciates the advance notice: "Ten o\'clock sharp, and no later!" Great balance.'
      },
      {
        text: 'Go to the diner anyway and slip in at 10:45 PM, hoping the house is already asleep.',
        riskViolation: { category: 'minor', severity: 1, desc: 'Curfew violation past 10:30 PM' },
        deltas: { social: 7, hostFamilyBond: -10, happiness: -5 },
        feedback: 'The front porch light is glaring. Both host parents are sitting on the couch with arms crossed.'
      }
    ]
  },
  {
    id: 'evt_w6_club_fair_signup',
    title: 'Extracurricular Club Rush Week',
    months: [2],
    speaker: 'Club President',
    text: 'The school courtyard is packed with club tables: Model UN, Robotics, Drama Troupe, and the Volunteer Society. Joining a club will eat into evening study hours but open doors to local friendships.',
    choices: [
      {
        text: 'Sign up for the Drama Troupe to build stage confidence and improve foreign language fluency.',
        deltas: { social: 8, adaptation: 7, academics: -4 },
        feedback: 'The drama teacher welcomes you warmly! Daily vocal rehearsals accelerate your accent adaptation.'
      },
      {
        text: 'Join the Robotics & STEM Club where technical collaboration requires less fluent speech.',
        deltas: { academics: 7, social: 4, happiness: 3 },
        feedback: 'Your technical skills shine. Teammates respect your dedication to coding the team bot.'
      },
      {
        text: 'Pass on all clubs to focus 100% of after-school time on maintaining high academic grades.',
        deltas: { academics: 8, social: -6, adaptation: -4 },
        feedback: 'Your GPA stays pristine, but you watch club members walk home laughing together in tight groups.'
      }
    ]
  },
  {
    id: 'evt_w7_bathroom_sharing',
    title: 'The Morning Shower Schedule Conflict',
    months: [2],
    speaker: 'Host Sibling',
    text: 'Both you and your 16-year-old host sibling need to leave the house at 7:15 AM. You take a 20-minute hot shower, and when you step out, host sibling is banging on the door in fury: "You used all the hot water!"',
    choices: [
      {
        text: 'Apologize sincerely, offer to switch to evening showers, and help them dry their hair.',
        deltas: { hostFamilyBond: 7, adaptation: 5, happiness: 1 },
        feedback: 'Host sibling grumbles but softens up: "Thanks for understanding. Our water heater is tiny."'
      },
      {
        text: 'Propose a strict morning whiteboard timer system: 8 minutes max per person.',
        deltas: { adaptation: 6, hostFamilyBond: 4, academics: 2 },
        feedback: 'A practical household solution! Host mother praises your maturity over breakfast.'
      },
      {
        text: 'Defend yourself defensively: "I didn\'t know, in my country showers are normal length!"',
        deltas: { hostFamilyBond: -8, happiness: -6, adaptation: -4 },
        feedback: 'Tense car ride to school. Host sibling gives you the silent treatment for the rest of the day.'
      }
    ]
  },
  {
    id: 'evt_w8_slang_misunderstanding',
    title: 'The Slang Word Blunder in Biology',
    months: [2],
    speaker: 'Biology Teacher',
    text: 'During a quiet biology lecture, you attempt to use a local slang idiom you overheard on social media. The entire classroom suddenly stops and bursts into hysterical laughter. Your face burns red.',
    choices: [
      {
        text: 'Laugh out loud at yourself and ask the teacher: "Okay, what did I actually just say?"',
        deltas: { social: 9, adaptation: 6, happiness: 3 },
        feedback: 'The whole room laughs WITH you, not at you. The teacher chuckles and explains the subtle double-meaning.'
      },
      {
        text: 'Turn bright red, shrink into your hoodie, and stare quietly at your notebook for the rest of period.',
        deltas: { happiness: -7, social: -4, adaptation: -3 },
        feedback: 'You feel awful for the rest of the day, dwelling on foreign language anxiety.'
      },
      {
        text: 'Quickly explain in clear language what you meant and ask for the proper academic phrase.',
        deltas: { academics: 5, adaptation: 4, social: 2 },
        feedback: 'The teacher nods respectfully and smoothly steers the classroom back to cell division.'
      }
    ]
  },
  {
    id: 'evt_w9_autumn_pumpkin_carving',
    title: 'Porch Jack-o\'-Lanterns & Autumn Traditions',
    months: [3],
    speaker: 'Host Family',
    text: 'On a brisk October Saturday, host parents bring home three massive orange pumpkins and carving saws. "We do this every autumn! Let\'s see what kind of face you can carve!"',
    choices: [
      {
        text: 'Carve an intricate cultural motif or landmark from your home country into the pumpkin.',
        deltas: { hostFamilyBond: 9, adaptation: 6, happiness: 4 },
        feedback: 'When you light the candle inside, the whole family gasps at how gorgeous it looks on the front porch!'
      },
      {
        text: 'Have a funny competition with host siblings to see who can make the goofiest pumpkin face.',
        deltas: { hostFamilyBond: 8, happiness: 7, social: 2 },
        feedback: 'Seeds flying everywhere and uncontrollable laughter! Host mother roasts pumpkin seeds for a snack.'
      },
      {
        text: 'Decline carving because scooping pumpkin guts feels gross, watching from the kitchen window.',
        deltas: { hostFamilyBond: -5, happiness: -3, adaptation: -4 },
        feedback: 'Host siblings look disappointed that you didn\'t want to get your hands messy with them.'
      }
    ]
  },
  {
    id: 'evt_w11_coordinator_popin',
    title: 'The Unannounced Coordinator Home Visit',
    months: [3],
    speaker: 'Program Coordinator',
    text: 'Your regional placement coordinator rings the doorbell on a Thursday afternoon for a compliance spot-check. They inspect your student bedroom, ask for your grade transcript, and pull you aside privately.',
    choices: [
      {
        text: 'Show your neat bedroom, present high grades proudly, and share positive stories about host life.',
        deltas: { hostFamilyBond: 7, academics: 5, adaptation: 5 },
        feedback: 'Coordinator writes glowing notes in your official file: "Exemplary student and smooth cultural integration."'
      },
      {
        text: 'Be candid about minor homesickness and ask for advice on managing academic pressure.',
        deltas: { adaptation: 7, happiness: 3, hostFamilyBond: 2 },
        feedback: 'Coordinator offers deeply empathetic guidance from past years: "What you feel is 100% normal around Month 3."'
      },
      {
        text: 'Complain about household rules, strict food habits, and petty chores around the house.',
        deltas: { hostFamilyBond: -10, happiness: -6 },
        feedback: 'Coordinator logs a note of domestic tension and schedules a mediation meeting with your host parents.'
      }
    ]
  },
  {
    id: 'evt_w13_garage_sale_weekend',
    title: 'The Host Family Neighborhood Yard Sale',
    months: [4],
    speaker: 'Neighbor',
    text: 'Saturday 7:00 AM: The host family sets up tables in the driveway to sell old bicycles, books, and winter gear. Neighbors flock over to browse and negotiate bargains.',
    choices: [
      {
        text: 'Run the cash box and negotiate friendly discounts with neighbors in the local language.',
        deltas: { hostFamilyBond: 8, social: 6, adaptation: 5 },
        feedback: 'Neighbors are delighted by your charm! Host parents give you a $20 tip from the earnings.'
      },
      {
        text: 'Set up a small table with traditional tea samples and postcards from your home country.',
        deltas: { social: 9, adaptation: 7, hostFamilyBond: 4 },
        feedback: 'A massive hit! Three neighborhood elders stop by just to learn about your culture.'
      },
      {
        text: 'Sleep in until noon and stay upstairs while the family handles the sale in the freezing morning.',
        deltas: { hostFamilyBond: -8, happiness: 2, social: -4 },
        feedback: 'Host father looks exhausted after carrying heavy furniture alone. An uncomfortable chill settles over dinner.'
      }
    ]
  },
  {
    id: 'evt_w14_field_trip_pass',
    title: 'State Capitol Civics Field Trip & Travel Forms',
    months: [4],
    speaker: 'History Teacher',
    text: 'The AP US/World History class is taking a 2-day coach bus excursion to the state capital. Program rules require a signed 3-page out-of-district travel authorization from your coordinator 10 days in advance.',
    choices: [
      {
        text: 'Submit the travel paperwork early, get coordinator stamp, and attend the trip fully compliant.',
        deltas: { academics: 8, social: 6, adaptation: 4 },
        cost: 25,
        feedback: 'Walking through historic senate chambers with classmates is an unforgettable educational highlight!'
      },
      {
        text: 'Decide the fees and paperwork are too burdensome; complete an alternative library research project.',
        deltas: { academics: 6, finance: 5, social: -4 },
        feedback: 'You ace the research paper while saving money, but miss out on bonding on the tour bus.'
      },
      {
        text: 'Forget the deadline, forge a host parent signature on the bus slip, and hope no one notices.',
        riskViolation: { category: 'major', severity: 2, desc: 'Unapproved travel authorization with forged signature' },
        deltas: { social: 5, academics: -4, hostFamilyBond: -10 },
        feedback: 'Teacher notices the signature discrepancy and calls the host family from the highway rest stop.'
      }
    ]
  },
  {
    id: 'evt_w15_winter_coat_budget',
    title: 'First Sub-Zero Freeze & The Inadequate Jacket',
    months: [4, 5],
    speaker: 'Inner Monologue',
    text: 'The temperature plummets to -12°C (10°F). Waiting for the school bus, your thin jacket from back home does nothing against the razor-sharp icy wind. Your teeth clatter violently.',
    choices: [
      {
        text: 'Visit a local thrift store with host mother to find a heavy down parka for $25.',
        cost: 25,
        deltas: { finance: -10, happiness: 6, adaptation: 5, hostFamilyBond: 4 },
        feedback: 'You find a warm, vintage woolen coat! You are cozy at last, and host mother loves thrifting with you.'
      },
      {
        text: 'Humbly ask host brother if you can borrow his spare heavy winter coat for the season.',
        deltas: { hostFamilyBond: 6, finance: 0, happiness: 4, social: -2 },
        feedback: 'He gladly lends you his varsity winter jacket: "It was getting small on me anyway, rock it!"'
      },
      {
        text: 'Refuse to spend money and endure the winter chill wearing three thin t-shirts under your light jacket.',
        deltas: { happiness: -8, academics: -5, adaptation: -4 },
        feedback: 'You arrive at school shivering uncontrollably every morning. Cold misery affects your mood.'
      }
    ]
  },
  {
    id: 'evt_w16_host_dinner_cooking',
    title: 'Cooking Your Grandmother\'s Authentic Recipe',
    months: [4],
    speaker: 'Host Family',
    text: 'On Saturday afternoon, you take over the kitchen. With foreign ingredients bought from the international grocery store, you prepare a famous stew from your home country. Fragrant spices fill the house.',
    choices: [
      {
        text: 'Present the meal with pride, explain the cultural history, and teach them how to eat it traditionally.',
        deltas: { hostFamilyBond: 10, adaptation: 7, happiness: 6 },
        feedback: 'Empty plates and huge smiles! Host mother asks you to write down the recipe in her family cookbook.'
      },
      {
        text: 'Tone down the spices heavily so the foreign family palate doesn\'t find it too intense.',
        deltas: { hostFamilyBond: 7, adaptation: 5, happiness: 2 },
        feedback: 'They find it mild and tasty, though you secretly miss the authentic fiery kick of home.'
      },
      {
        text: 'Get anxious about whether they like it, apologize repeatedly for kitchen mess, and clean compulsively.',
        deltas: { happiness: -4, hostFamilyBond: 3, adaptation: 2 },
        feedback: 'Host father gently takes the sponge from your hands: "Stop apologizing! This dinner is magnificent."'
      }
    ]
  },
  {
    id: 'evt_w18_holiday_light_tour',
    title: 'Suburban Winter Light Festival Tour',
    months: [5],
    speaker: 'Host Mother',
    text: '"Pajamas on, everybody into the minivan!" Host parents hand out thermoses of piping hot chocolate and drive through neighborhood cul-de-sacs famous for synchronized holiday light displays.',
    choices: [
      {
        text: 'Sing along to festive car radio songs and take festive photos with host siblings.',
        deltas: { hostFamilyBond: 9, happiness: 8, adaptation: 5 },
        feedback: 'Pure holiday magic. You feel less like a temporary guest and more like a true family member.'
      },
      {
        text: 'Ask host father thoughtful questions about local holiday customs and religious history.',
        deltas: { adaptation: 7, academics: 4, hostFamilyBond: 6 },
        feedback: 'He gives a fascinating tour of local civic traditions, thrilled by your curiosity.'
      },
      {
        text: 'Scroll on your phone through holiday photos of your friends back home, feeling homesick.',
        deltas: { happiness: -6, hostFamilyBond: -4, adaptation: -5 },
        feedback: 'The dazzling lights outside the car window blur into nostalgic melancholy.'
      }
    ]
  },
  {
    id: 'evt_w19_new_year_potluck',
    title: 'New Year\'s Eve Community Potluck',
    months: [5],
    speaker: 'Town Community Organizer',
    text: 'The local community hall hosts a 100-person New Year\'s Eve countdown. There is music, a massive buffet table, and party hats. Several town council members come over to meet the foreign student.',
    choices: [
      {
        text: 'Introduce yourself confidently, thanking the community for welcoming international students.',
        deltas: { social: 9, adaptation: 8, happiness: 5 },
        feedback: 'The town newspaper editor snaps your photo and writes down your name for the weekly bulletin!'
      },
      {
        text: 'Stick close to your host siblings, dancing and cheering when the midnight balloon drop falls.',
        deltas: { hostFamilyBond: 8, happiness: 7, social: 4 },
        feedback: 'Midnight confetti in your hair! You welcome the new calendar year surrounded by warmth.'
      },
      {
        text: 'Hide by the punch bowl, feeling overwhelmed by the loud noise and unfamiliar crowd.',
        deltas: { happiness: -5, social: -4, adaptation: -3 },
        feedback: 'You count down the seconds wishing you were in your bedroom.'
      }
    ]
  },
  {
    id: 'evt_w21_winter_slump_blues',
    title: 'The Gray January Mid-Year Slump',
    months: [6],
    speaker: 'School Counselor',
    text: 'The holidays are over. Outside is sub-zero gray slush. The novelty of being abroad has worn off, and final graduation still feels distant. You wake up feeling heavy and unmotivated.',
    choices: [
      {
        text: 'Visit the school counselor for a confidential talk about mid-year motivation slump.',
        deltas: { happiness: 7, adaptation: 6, academics: 3 },
        feedback: 'The counselor reveals almost every exchange student hits this exact wall in January. You feel validated.'
      },
      {
        text: 'Force yourself out for an afternoon jog or gym session with a school classmate.',
        deltas: { happiness: 6, social: 5, adaptation: 4 },
        feedback: 'Endorphins kick in! Shaking off the winter lethargy restores your fighting spirit.'
      },
      {
        text: 'Skip assignments and sleep 12 hours a day on weekends, sinking deeper into lethargy.',
        deltas: { academics: -8, happiness: -9, hostFamilyBond: -5 },
        feedback: 'Grades take an alarming hit. Host parents express serious concern over your mental well-being.'
      }
    ]
  },
  {
    id: 'evt_w22_car_steering_test',
    title: 'Classmate\'s Truck in the Empty Snow Lot',
    months: [6],
    speaker: 'Senior Classmate',
    text: '"Hey, check it out! The parking lot behind the stadium is completely covered in smooth snow. Want to sit in the driver\'s seat and do a donut? Nobody will see!" Program rules forbid driving motorized vehicles.',
    choices: [
      {
        text: 'Firmly decline: "Thanks, but if my organization catches me behind a wheel, I get deported on the next plane."',
        deltas: { adaptation: 7, hostFamilyBond: 4, social: -2 },
        feedback: 'They respect your boundaries: "Fair enough, don\'t want you getting kicked out!" Safe decision.'
      },
      {
        text: 'Offer to ride in the passenger seat and record video of their driving tricks instead.',
        deltas: { social: 6, happiness: 3, adaptation: 2 },
        feedback: 'You get thrilling snow drift footage without violating your program\'s strict vehicle ban.'
      },
      {
        text: 'Hop into the driver seat and tap the accelerator for just 30 seconds of adrenaline.',
        riskViolation: { category: 'critical', severity: 3, desc: 'Operation of motorized vehicle without license/insurance' },
        deltas: { social: 6, happiness: 4, hostFamilyBond: -12 },
        feedback: 'A campus security patrol car enters the lot with flashing yellow lights. Your heart drops into your shoes.'
      }
    ]
  },
  {
    id: 'evt_w23_public_library_study',
    title: 'Sunday Cram Session at Town Library',
    months: [6],
    speaker: 'Study Group Peer',
    text: 'A group of rigorous honor students invites you to the historic town public library for a 4-hour study marathon before upcoming midterms. The silence in the mahogany book halls is intense.',
    choices: [
      {
        text: 'Join the group, contribute study flashcards, and drill vocabulary with them.',
        deltas: { academics: 9, social: 5, adaptation: 4, happiness: -2 },
        feedback: 'Your study partners are impressed by your dedication! Your mastery of the course material leaps.'
      },
      {
        text: 'Spend the time reading quiet foreign literature and writing heartfelt letters back home.',
        deltas: { happiness: 6, adaptation: 3, academics: 2 },
        feedback: 'Peaceful and restorative. The calm library atmosphere provides a sanctuary from noisy school days.'
      },
      {
        text: 'Procrastinate by whispering, sending memes, and getting shushed repeatedly by the librarian.',
        deltas: { social: 4, academics: -5, happiness: 1 },
        feedback: 'The librarian asks your table to pack up and leave. The serious students look annoyed.'
      }
    ]
  },
  {
    id: 'evt_w24_host_grandparents_visit',
    title: 'Host Grandparents\' Traditional Sunday Dinner',
    months: [6],
    speaker: 'Host Grandmother',
    text: 'The host grandparents, who were born in the 1940s, arrive in their Sunday best. They have very traditional conservative values and ask blunt questions about your country, culture, and faith.',
    choices: [
      {
        text: 'Answer with warm humility and polite deference, bridging the generational and cultural gap.',
        deltas: { hostFamilyBond: 10, adaptation: 7, happiness: 4 },
        feedback: 'Grandmother clasps your hand with watery eyes: "What a respectful, wonderful young person you are."'
      },
      {
        text: 'Show them family photos and cultural trinkets you brought from home to explain your traditions.',
        deltas: { hostFamilyBond: 8, adaptation: 6, social: 3 },
        feedback: 'Grandfather puts on his reading glasses and inspects the currency and coins with deep fascination.'
      },
      {
        text: 'Argue back aggressively when they make an uninformed stereotype about your continent.',
        deltas: { hostFamilyBond: -12, happiness: -7, adaptation: -5 },
        feedback: 'A deeply uncomfortable dinner. Host parents sit in awkward tension trying to defuse the conversation.'
      }
    ]
  },
  {
    id: 'evt_w26_spring_musical_backstage',
    title: 'Backstage Crew for the High School Musical',
    months: [7],
    speaker: 'Stage Director',
    text: 'Opening night for the school production of "The Sound of Music" or "Grease"! You are running backstage props and spotlight cues. An actor forgets their hat right before their big entrance.',
    choices: [
      {
        text: 'Sprint backstage, grab the spare hat from costume rack, and hand it to them in time.',
        deltas: { social: 9, happiness: 7, adaptation: 5 },
        feedback: 'The scene goes off without a hitch! The entire cast applauds you during the cast party backstage.'
      },
      {
        text: 'Keep your focus strictly on running the spotlight cues accurately according to your script.',
        deltas: { academics: 5, adaptation: 4, social: 2 },
        feedback: 'Your technical lighting is flawless throughout the show. Stage director calls you their MVP technician.'
      },
      {
        text: 'Freeze in panic, drop the prop headset, and miss your lighting transition cue.',
        deltas: { happiness: -7, social: -4, adaptation: -3 },
        feedback: 'An awkward dark spot on stage for five seconds. You feel mortified until the cast comforts you.'
      }
    ]
  },
  {
    id: 'evt_w27_neighborhood_odd_job',
    title: 'Elderly Neighbor\'s Garden Cleanup Offer',
    months: [7],
    speaker: 'Elderly Neighbor',
    text: 'An elderly neighbor sees you raking the host family lawn on a sunny Saturday. "Say, young person! If you help me prune my rose bushes and haul bags of mulch, I\'ll pay you $40 cash and bake you brownies!"',
    choices: [
      {
        text: 'Gladly spend 3 hours helping the neighbor with garden mulch and garden beds.',
        deltas: { finance: 15, hostFamilyBond: 6, adaptation: 5, academics: -2 },
        feedback: 'You earn $40 and eat warm brownies! Neighbor tells your host parents what a fantastic helper you are.'
      },
      {
        text: 'Politely offer to do it for free as a neighborhood community service deed.',
        deltas: { hostFamilyBond: 8, adaptation: 7, social: 5, finance: 0 },
        feedback: 'Neighbor is deeply touched by your generosity and writes a commendation letter to your school principal!'
      },
      {
        text: 'Decline because you planned to spend Saturday afternoon streaming movies in bed.',
        deltas: { happiness: 2, social: -3, adaptation: -2 },
        feedback: 'You rest comfortably, but miss an authentic neighborhood bonding opportunity.'
      }
    ]
  },
  {
    id: 'evt_w28_valentines_carnation',
    title: 'The Anonymous Valentine\'s Carnation',
    months: [7],
    speaker: 'Student Council Seller',
    text: 'On Valentine\'s Day, the student council delivers carnation flowers to lockers. You open your locker and find a red carnation with an unsigned card: "To the bravest exchange student in our school. You inspire me."',
    choices: [
      {
        text: 'Pin the flower proudly to your jacket lapel all day, radiating joyful confidence.',
        deltas: { social: 8, happiness: 8, adaptation: 4 },
        feedback: 'Classmates smile and tease you playfully: "Who sent it?!" Your social status gets a cheerful boost.'
      },
      {
        text: 'Try to investigate discretely among your closest friends to figure out who wrote the note.',
        deltas: { social: 6, adaptation: 4, academics: -2 },
        feedback: 'A sweet mystery! Two classmates blush suspiciously during 4th period chemistry.'
      },
      {
        text: 'Cram the flower inside your locker shelf feeling embarrassed by romantic attention.',
        deltas: { happiness: -2, social: -3 },
        feedback: 'You avoid the spotlight, though you secretly smile whenever you open your locker door.'
      }
    ]
  },
  {
    id: 'evt_w29_standardized_exam',
    title: 'Statewide Standardized Testing Day',
    months: [8],
    speaker: 'Exam Proctor',
    text: 'The entire high school is under strict test lockdown for 4 hours of state proficiency exams. For exchange students, test results do not count toward home transcripts, but poor effort looks bad to teachers.',
    choices: [
      {
        text: 'Take the test with full effort, treating it as a rigorous personal challenge in a foreign language.',
        deltas: { academics: 8, adaptation: 5, happiness: -3 },
        feedback: 'Your reading comprehension score turns out surprisingly high! The vice principal commends your work ethic.'
      },
      {
        text: 'Answer at an average pace, taking mental breaks and not stressing over untranslated idioms.',
        deltas: { academics: 4, happiness: 3, adaptation: 2 },
        feedback: 'A balanced compromise. You pass adequately without draining your mental stamina.'
      },
      {
        text: 'Fill in random bubbles in 15 minutes and sleep with your head on the desk for 3 hours.',
        deltas: { academics: -7, hostFamilyBond: -4, happiness: -2 },
        feedback: 'The proctor reports your blatant disinterest to the principal. Your host family receives an inquiry call.'
      }
    ]
  },
  {
    id: 'evt_w31_rainstorm_boardgame',
    title: 'Spring Thunderstorm & The Board Game Marathon',
    months: [8],
    speaker: 'Host Family',
    text: 'A torrential spring downpour knocks out the neighborhood electricity for six hours. Host mother lights candles in the living room and sets out Monopoly, Catan, and Scrabble.',
    choices: [
      {
        text: 'Dive into the competitive board game marathon, bargaining ruthlessly for property trades.',
        deltas: { hostFamilyBond: 9, happiness: 7, social: 3 },
        feedback: 'Candlelight, board game rivalries, and warm laughter. One of the coziest memories of your entire year abroad.'
      },
      {
        text: 'Teach the host family a traditional card game or dice game from your native country.',
        deltas: { hostFamilyBond: 10, adaptation: 7, happiness: 5 },
        feedback: 'They fall in love with the game! Host father declares it a new official family tradition.'
      },
      {
        text: 'Worry about your uncharged phone and grumble about the lack of Wi-Fi in the dark.',
        deltas: { happiness: -6, hostFamilyBond: -5, adaptation: -4 },
        feedback: 'Your frustration sours the room. The family finishes their game in awkward silence.'
      }
    ]
  },
  {
    id: 'evt_w32_college_rep_visit',
    title: 'University Admissions Fair in the Gym',
    months: [8],
    speaker: 'University Admissions Officer',
    text: 'Dozens of university admission representatives set up colorful displays in the gymnasium. One officer notices your exchange student status: "Ever thought about returning here on an F-1/Tier-4 student visa for college?"',
    choices: [
      {
        text: 'Engage in a detailed discussion about international scholarship requirements and GPA thresholds.',
        deltas: { academics: 8, adaptation: 7, happiness: 4 },
        feedback: 'The admissions officer takes your email and promises to waive your international application fee!'
      },
      {
        text: 'Collect brochures politely, feeling proud that studying abroad has unlocked worldwide options.',
        deltas: { happiness: 6, adaptation: 4, academics: 3 },
        feedback: 'Holding the glossy brochures, you realize how dramatically your world has expanded in 8 months.'
      },
      {
        text: 'Walk away quickly: "College abroad is way too expensive for someone like me."',
        deltas: { happiness: -4, adaptation: -2 },
        feedback: 'You brush off the idea, but a quiet voice in your head wonders what could have been.'
      }
    ]
  },
  {
    id: 'evt_w33_skip_day_temptation',
    title: 'Senior Cut Day & The Lake Trip Invitation',
    months: [9],
    speaker: 'Senior Classmate',
    text: 'It is the first 25°C (77°F) sunny Friday of May. "Almost the whole senior class is skipping 5th and 6th period to go cliff jumping at the lake! Hop in, the teachers won\'t even mark attendance today!"',
    choices: [
      {
        text: 'Decline firmly: "A single unexcused truancy strike could jeopardize my graduation certificate."',
        deltas: { academics: 6, hostFamilyBond: 5, social: -3 },
        feedback: 'You stay in class. It turns out the principal stationed monitors in the parking lot and took names.'
      },
      {
        text: 'Attend all your classes, but meet up with them at the lake right after the final bell at 3:15 PM.',
        deltas: { social: 7, academics: 4, happiness: 6 },
        feedback: 'The smartest play! You did not break any school rules, and you still enjoy the sunny lake afternoon.'
      },
      {
        text: 'Jump into the convertible, roll the windows down, and skip class with the seniors.',
        riskViolation: { category: 'minor', severity: 1, desc: 'Unexcused truancy during school hours' },
        deltas: { social: 8, happiness: 6, academics: -6, hostFamilyBond: -7 },
        feedback: 'Exhilarating cliff jumping, but the school automated attendance system calls host mother\'s mobile.'
      }
    ]
  },
  {
    id: 'evt_w34_prom_outfit_scramble',
    title: 'The Vintage Thrift Store Prom Outfit',
    months: [9],
    speaker: 'Host Sister',
    text: 'Prom is two weeks away. Boutique tuxedo rentals and formal ballgowns cost upwards of $200. Host sister takes you to a quirky vintage consignment shop to see if you can pull off a miracle on a budget.',
    choices: [
      {
        text: 'Find a vintage 1970s velvet blazer / retro dress and tailor it with safety pins for $30.',
        cost: 30,
        deltas: { social: 9, happiness: 7, finance: -10, adaptation: 5 },
        feedback: 'It looks shockingly stylish! Classmates will declare you the most original, fashionable look at prom.'
      },
      {
        text: 'Incorporate a stunning traditional cultural sash or accessories from your home country onto a simple suit.',
        deltas: { social: 10, adaptation: 8, hostFamilyBond: 6, finance: -5 },
        cost: 15,
        feedback: 'A majestic blend of formal wear and heritage! Teachers and peers shower you with sincere compliments.'
      },
      {
        text: 'Give up on going to prom entirely to save money, deciding you will just stay home.',
        deltas: { finance: 0, happiness: -8, social: -7 },
        feedback: 'You save dollars, but scrolling through everyone\'s prom photos on Saturday night brings sharp regret.'
      }
    ]
  },
  {
    id: 'evt_w36_senior_hallway_prank',
    title: 'The Harmless Senior Hallway Balloon Prank',
    months: [9],
    speaker: 'Senior Friend',
    text: 'The night before the last day of classes, a group of seniors is meeting at 9:00 PM with the night custodian\'s permission to fill the main stairwell with 3,000 colorful balloons. They ask you to join.',
    choices: [
      {
        text: 'Join the group to inflate balloons, blow up inflatables, and laugh with classmates all evening.',
        deltas: { social: 9, happiness: 8, hostFamilyBond: 2 },
        feedback: 'In the morning, the underclassmen and teachers walk through an ocean of balloons smiling! Harmless fun.'
      },
      {
        text: 'Show up for 30 minutes to take great photos for the school yearbook, then head home before curfew.',
        deltas: { social: 6, adaptation: 5, academics: 3 },
        feedback: 'You capture historic senior photos and get home before your host parents start to worry.'
      },
      {
        text: 'Refuse to participate, warning everyone that they might get suspended right before graduation.',
        deltas: { social: -6, academics: 2, happiness: -3 },
        feedback: 'Your peers roll their eyes: "Lighten up, it\'s just balloons." You feel like an outsider at the finish line.'
      }
    ]
  },
  {
    id: 'evt_w37_host_extended_barbecue',
    title: 'Farewell Neighborhood Backyard Barbecue',
    months: [10],
    speaker: 'Host Father',
    text: 'Smoke rises from the backyard grill. Thirty neighbors, teachers, and classmates gather in the host family yard for an all-afternoon barbecue honoring your exchange year.',
    choices: [
      {
        text: 'Give a heartfelt short speech standing on the picnic bench thanking everyone for adopting you.',
        deltas: { hostFamilyBond: 12, social: 10, happiness: 8, adaptation: 6 },
        feedback: 'There isn\'t a dry eye in the backyard. Host father wipes away a tear and gives you a bear hug.'
      },
      {
        text: 'Mingle between tables all afternoon, ensuring you personally thank each neighbor and teacher.',
        deltas: { social: 9, hostFamilyBond: 8, adaptation: 5 },
        feedback: 'People share their favorite memories of you: "Remember when you first arrived and couldn\'t find the bus?"'
      },
      {
        text: 'Sit quietly with your closest two friends, avoiding the emotional weight of saying goodbyes.',
        deltas: { happiness: 4, social: 4, hostFamilyBond: -3 },
        feedback: 'Comfortable with your inner circle, but older neighbors feel sad they didn\'t get a proper farewell.'
      }
    ]
  },
  {
    id: 'evt_w38_yearbook_signing_cram',
    title: 'Locker Cleanout & The Final Yearbook Signatures',
    months: [10],
    speaker: 'Home Room Teacher',
    text: 'Empty metal lockers slam shut for the final time. Corridors are filled with students sitting on the linoleum floor cross-legged, passing around thick hardbound yearbooks with multicolored Sharpies.',
    choices: [
      {
        text: 'Write deeply personal, full-page farewell notes in the yearbooks of your five closest friends.',
        deltas: { social: 10, happiness: 8, hostFamilyBond: 4 },
        feedback: 'Tearful embraces and phone number promises. These yearbooks will be treasured for decades.'
      },
      {
        text: 'Ask teachers, coaches, and the principal to sign your yearbook with life advice.',
        deltas: { academics: 6, adaptation: 7, social: 5 },
        feedback: 'Your principal writes: "You brought the world to our small school. Go conquer the future!"'
      },
      {
        text: 'Rush through signatures with generic "Have a great summer!" notes to get out of the building fast.',
        deltas: { happiness: -3, social: -4 },
        feedback: 'You leave early, but holding the half-signed book on the bus leaves an empty feeling.'
      }
    ]
  },
  {
    id: 'evt_w39_overweight_suitcase',
    title: 'The 32kg Suitcase & Packing Crisis',
    months: [10],
    speaker: 'Host Mother',
    text: 'Your bedroom floor is covered in clothes, yearbooks, gifts, hoodies, and snow boots. You put your checked bag on the luggage scale: 32.5 kg! The airline limit is strictly 23 kg (50 lbs).',
    choices: [
      {
        text: 'Donate heavy winter clothes and old shoes to local charity, keeping only priceless memories.',
        deltas: { adaptation: 8, happiness: 5, finance: 0 },
        feedback: 'Lightened luggage and a generous deed! The bag clicks shut right at 22.8 kg.'
      },
      {
        text: 'Pay $75 of your savings to purchase a second checked bag allowance from the airline.',
        cost: 75,
        deltas: { finance: -30, happiness: 6, hostFamilyBond: 3 },
        feedback: 'Expensive, but you don\'t have to part with a single gift, mug, or photo frame.'
      },
      {
        text: 'Sit on the closed zipper with host sister, forcing it to close and praying the airport scale is broken.',
        deltas: { happiness: -4, hostFamilyBond: 2 },
        feedback: 'The zipper teeth bend under immense strain. You are in for a stressful argument at the airline check-in desk.'
      }
    ]
  },
  {
    id: 'evt_w39_photo_album_gift',
    title: 'The Secret Handmade Memory Scrapbook',
    months: [10],
    speaker: 'Inner Monologue',
    text: 'It is 11:30 PM on your second-to-last night. You have printed 60 photos of your exchange year and are assembling a leather-bound scrapbook album as a surprise gift for your host parents.',
    choices: [
      {
        text: 'Spend until 3:00 AM writing handwritten captions for every single family trip and memory.',
        deltas: { hostFamilyBond: 14, happiness: 8, adaptation: 5, academics: -3 },
        feedback: 'When host parents open it tomorrow morning, host father literally breaks down in tears of joy.'
      },
      {
        text: 'Include handwritten thank-you notes from your biological parents back home translated into English.',
        deltas: { hostFamilyBond: 15, happiness: 9, adaptation: 6 },
        feedback: 'Two families connected across continents. Host mother frames the letter on the mantle.'
      },
      {
        text: 'Get too sleepy, glue the photos hurriedly without captions, and go to bed.',
        deltas: { hostFamilyBond: 6, happiness: 3 },
        feedback: 'They love the photos, though you wish you had taken the time to write down the funny inside jokes.'
      }
    ]
  },
  {
    id: 'evt_w40_empty_hallways_goodbye',
    title: 'One Last Walk Through The Silent High School',
    months: [10],
    weeks: [40],
    speaker: 'Inner Monologue',
    text: 'You return to the high school on Monday afternoon to drop off your locker key and pick up official transcripts. The hallways that once terrified you on Day 1 are completely silent and empty.',
    choices: [
      {
        text: 'Walk slowly down the main corridor, pausing at your locker and the cafeteria with deep gratitude.',
        deltas: { adaptation: 10, happiness: 9, hostFamilyBond: 5 },
        feedback: 'You remember the trembling teenager who stood here ten months ago. You are leaving as an independent adult.'
      },
      {
        text: 'Stop by the teachers\' lounge to shake hands with your favorite teachers and say your final goodbyes.',
        deltas: { academics: 8, social: 7, happiness: 7 },
        feedback: 'Your history teacher gives you a firm handshake: "You made our classroom better every single day."'
      },
      {
        text: 'Drop the key in the front office drop box and sprint outside to avoid crying.',
        deltas: { happiness: -2, adaptation: 4 },
        feedback: 'You walk toward the parking lot wiping a stray tear. It\'s time to face the airport gate.'
      }
    ]
  },

  // =========================================================================
  // HIGH-RISK PROACTIVE EXPERIENCES (TENSION & ALIBI MINIGAMES)
  // =========================================================================
  {
    id: 'evt_quarry_bonfire_weed',
    title: 'The Midnight Quarry Bonfire Call',
    weeks: [11, 12, 13, 14],
    speaker: 'Leo Romero',
    text: 'Leo catches you after 6th period by the lockers. "Big bonfire tonight out at the old quarry. No parents, acoustic guitars, and someone brought sweet green herbs from the city. Are you coming or are you a square?"',
    choices: [
      {
        text: 'Hop on Leo\'s bicycle pegs and head out to the quarry bonfire (High Thrill / Risk).',
        triggerTension: 'weed_bonfire'
      },
      {
        text: 'Politely decline: "Host parents are waiting for family dinner tonight."',
        deltas: { hostFamilyBond: 6, adaptation: 2 },
        feedback: 'Leo smirks and rolls his eyes playfully: "Family first, I get it. Rain check exchangee."'
      },
      {
        text: 'Warn Leo that coordinator Peterson has been patrolling the neighborhood.',
        deltas: { academics: 3, adaptation: 4 },
        feedback: 'Leo laughs it off, but thanks you for looking out for him.'
      }
    ]
  },
  {
    id: 'evt_senior_kegger_party',
    title: 'The Off-Campus Senior Kegger',
    weeks: [7, 8, 9, 10],
    speaker: 'Julian Vance',
    text: 'The varsity football team just won their homecoming qualifier! A classmate\'s parents are out of town for the weekend and the backyard keg is already tapped. Red plastic cups are everywhere.',
    choices: [
      {
        text: 'Grab a red cup and dive straight into the backyard beer pong tournament!',
        triggerTension: 'binge_drinking'
      },
      {
        text: 'Sip a canned soda, enjoy the music, and leave before the neighbors call the police.',
        deltas: { social: 8, happiness: 5, adaptation: 4 },
        feedback: 'You dance, chat with classmates, and head home on time. Responsible and fun!'
      },
      {
        text: 'Excuse yourself immediately: "I cannot risk my exchange visa on alcohol."',
        deltas: { academics: 4, hostFamilyBond: 4, social: -3 },
        feedback: 'A few kids tease you, but Julian pats your back: "Respect. Keep your scholarship safe."'
      }
    ]
  },
  {
    id: 'evt_underground_rave_invitation',
    title: 'Neon Underground Warehouse Rave',
    weeks: [22, 23, 24, 25],
    speaker: 'Indie Senior Clique',
    text: 'Bass rattles the windows of a rusted industrial warehouse outside town. A flyer in your pocket promises an all-night underground electronic set with hypnotic laser light shows and mystery party pills.',
    choices: [
      {
        text: 'Slip through the heavy steel doors into the strobe-lit crowd (Extreme Thrill).',
        triggerTension: 'rave_drugs'
      },
      {
        text: 'Turn around and head back to the diner for late night pancakes with Maya.',
        deltas: { social: 7, happiness: 6, hostFamilyBond: 3 },
        feedback: 'You and Maya split a giant stack of blueberry pancakes while laughing about school rumors.'
      }
    ]
  },
  {
    id: 'evt_backroad_joyride',
    title: 'Car Keys Tossed Across the Hood',
    weeks: [17, 18, 19, 20],
    speaker: 'Classmate Kyle',
    text: 'Kyle tosses a jingling set of car keys onto the diner table. "My older brother is passed out in the booth. His vintage Mustang is parked outside. Want to take it for a spin down the winding country highway?"',
    choices: [
      {
        text: 'Catch the keys and start the roaring V8 engine (Forbidden Driving!).',
        triggerTension: 'joyriding'
      },
      {
        text: 'Toss the keys back onto the table: "Operating motorized vehicles is an instant program expulsion."',
        deltas: { academics: 5, adaptation: 5 },
        feedback: 'Kyle shrugs and slips the keys back into his pocket. You kept your record crystal clean.'
      }
    ]
  },
  {
    id: 'evt_midnight_window_sneakout',
    title: 'Tapping on the Second-Story Window',
    weeks: [15, 16, 26, 27],
    speaker: 'Pebble on Glass',
    text: 'It is 1:45 AM. A tiny pebble clicks against your bedroom glass. Below in the moonlit garden stands a figure motioning for you to climb down the oak tree and meet them in the misty park.',
    choices: [
      {
        text: 'Slide open the window screen and shimmy down the oak tree branches into the night.',
        triggerTension: 'sneak_out'
      },
      {
        text: 'Text back from your phone: "Host mom is awake reading downstairs, too risky tonight!"',
        deltas: { hostFamilyBond: 4, happiness: 2 },
        feedback: 'They send a crying emoji and a heart back. You drift off to sleep safely in your warm bed.'
      }
    ]
  }
];
