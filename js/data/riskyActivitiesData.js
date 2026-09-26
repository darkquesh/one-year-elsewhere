// High-Risk Rebellions & Forbidden Activities Data Module
// Implements the "Four D's" (No Drugs, No Drinking, No Driving, No Disobedience)
// Direct integration with js/violations.js and the tension engine

export const RISKY_ACTIVITIES = {
  weed_bonfire: {
    id: 'weed_bonfire',
    title: 'Cannabis by the Quarry Bonfire',
    subtitle: 'Pass the joint under the stars with senior rebels',
    severity: 'critical', // In exchange rules, drugs are critical zero-tolerance!
    iconKey: 'flame',
    color: '#f43f5e',
    initialDanger: 35,
    dangerPerRound: 25,
    rewards: {
      social: 25,
      happiness: 20,
      xp: 45,
      targetNpc: 'leo',
      affectionDelta: 15
    },
    debuff: {
      id: 'debuff_smoke_smell',
      name: 'Pungent Smoke Odor',
      stat: 'adaptation',
      delta: -5,
      weeksLeft: 1,
      reason: 'Clothes reek of campfire and weed'
    },
    bustScenario: {
      title: 'Headlights in the Distance!',
      speaker: 'Host Mom & Police Siren',
      prompt: 'A patrol cruiser bounces down the quarry dirt road with searchlights sweeping the trees! You scatter into the brush and make it back to your host house at 2:30 AM, but the front porch light is on and Host Mom Sarah is standing in the doorway with folded arms.',
      alibiBranches: [
        {
          id: 'alibi_bluff',
          label: 'Fabricate an Alibi: "We were stargazing at the lake!"',
          skillReq: { stat: 'adaptation', min: 55, label: 'Adaptation' },
          successFeedback: 'Your calm tone and detailed story about checking star constellations for astronomy homework convinces Sarah. She sighs, gives you a glass of water, and tells you to go straight to bed. Crisis averted!',
          failFeedback: 'Sarah catches the trembling in your voice and instantly smells the smoke on your denim jacket. "Do not lie to me!" She picks up the phone to call coordinator Peterson immediately.',
          successDeltas: { hostFamilyBond: -8 },
          failViolation: {
            category: 'drugs',
            severity: 'critical',
            desc: 'Caught past curfew under the influence of cannabis at quarry bonfire'
          }
        },
        {
          id: 'alibi_confess',
          label: 'Confess Immediately & Plead for Mercy',
          skillReq: { stat: 'hostFamilyBond', min: 65, label: 'Host Family Bond' },
          successFeedback: 'Tears well in Sarah’s eyes. Because of your deep mutual bond and immediate honesty, she decides to handle this within the family. "I am grounding you for two weeks, but I will not call the coordinator and get you sent home."',
          failFeedback: 'Sarah shakes her head in cold disappointment. "I trusted you with my home, and you broke our sacred rules." She dials your program coordinator to issue a formal critical strike.',
          successDeltas: { hostFamilyBond: -15, happiness: -10 },
          failViolation: {
            category: 'drugs',
            severity: 'critical',
            desc: 'Confessed to marijuana consumption past curfew'
          }
        },
        {
          id: 'alibi_ally',
          label: 'Ping Leo on Smartphone to Vouch for You (-15 Leo Affection)',
          requiresNpc: { id: 'leo', minAffection: 40 },
          successFeedback: 'Leo answers your distress text instantly and calls your host house within 2 minutes with a genius cover story about helping him fix a flat tire on his bicycle down the road. Sarah buys it, though she is still annoyed about the hour.',
          successDeltas: { hostFamilyBond: -5 },
          affectionCost: { npcId: 'leo', delta: -15 }
        }
      ]
    }
  },

  rave_drugs: {
    id: 'rave_drugs',
    title: 'Underground EDM Warehouse Rave',
    subtitle: 'Bass rattling your chest, neon lasers, and mystery party pills',
    severity: 'critical',
    iconKey: 'zap',
    color: '#8b5cf6',
    initialDanger: 45,
    dangerPerRound: 30,
    rewards: {
      social: 35,
      happiness: 30,
      xp: 75,
      awardItem: 'vip_wristband'
    },
    debuff: {
      id: 'debuff_severe_hangover',
      name: 'Severe Chemical Crash',
      stat: 'academics',
      delta: -20,
      weeksLeft: 2,
      reason: 'Exhausted serotonin depletion from rave night'
    },
    bustScenario: {
      title: 'Police Raid on the Warehouse!',
      speaker: 'Local Police & PO Security',
      prompt: 'Sirens blare as officers block the warehouse exits with megaphones! You manage to slip out through a back loading dock, but your name was written on the promoter’s guest list. By Monday morning, coordinator Peterson has requested an urgent meeting in the principal’s office.',
      alibiBranches: [
        {
          id: 'alibi_bluff_rave',
          label: 'Claim you only went for the music and left early',
          skillReq: { stat: 'social', min: 65, label: 'Social Charisma' },
          successFeedback: 'You present yourself with complete composure, claiming you were just documenting local underground electronic music for a cultural media project. Peterson grumbles but lets you off with an official warning.',
          failFeedback: 'Peterson produces a photo from local nightlife police records. Your pupils are dilated and you are clearly caught. "This is an egregious violation of your visa conditions."',
          failViolation: {
            category: 'drugs',
            severity: 'critical',
            desc: 'Identified at raided illicit rave warehouse party'
          }
        }
      ]
    }
  },

  binge_drinking: {
    id: 'binge_drinking',
    title: 'Senior Backyard Kegger / House Party',
    subtitle: 'Solo cups, beer pong tournaments, and deafening music',
    severity: 'major',
    iconKey: 'zap',
    color: '#f97316',
    initialDanger: 30,
    dangerPerRound: 20,
    rewards: {
      social: 22,
      happiness: 16,
      adaptation: 8,
      xp: 35
    },
    debuff: {
      id: 'debuff_hangover',
      name: 'Pounding Hangover Headache',
      stat: 'academics',
      delta: -10,
      weeksLeft: 1,
      reason: 'Dehydrated headache after house party'
    },
    bustScenario: {
      title: 'Noise Complaints & Police Squad Cars!',
      speaker: 'Host Mom & Coordinator Peterson',
      prompt: 'Neighbors called the police over the blaring sound system! Two squad cars pull onto the lawn as kids jump fences into neighboring yards. You stumble home with a bruised knee and smell distinctly of cheap beer.',
      alibiBranches: [
        {
          id: 'alibi_drink_confess',
          label: 'Apologize to Host Parents for Binge Drinking',
          skillReq: { stat: 'hostFamilyBond', min: 60, label: 'Host Family Bond' },
          successFeedback: 'Your host parents give you two large glasses of water, two aspirins, and a lecture on peer pressure. They agree not to report it to the coordinator this once.',
          failFeedback: 'Host parents are mortified. "Our contract with the placement agency is clear. We have a legal liability to report alcohol consumption."',
          failViolation: {
            category: 'alcohol',
            severity: 'major',
            desc: 'Documented underage alcohol consumption at busted house party'
          }
        }
      ]
    }
  },

  joyriding: {
    id: 'joyriding',
    title: 'Midnight Joyride Without a License',
    subtitle: 'Borrowing senior classmate’s car keys to race down backroads',
    severity: 'critical', // Driving a motorized vehicle is strictly prohibited by J-1/F-1 regulations
    iconKey: 'alertTriangle',
    color: '#eab308',
    initialDanger: 40,
    dangerPerRound: 25,
    rewards: {
      social: 28,
      happiness: 22,
      xp: 50
    },
    bustScenario: {
      title: 'Flashing Red & Blue Lights in Rearview Mirror',
      speaker: 'State Trooper',
      prompt: 'A highway patrol cruiser flips on its siren behind you for an expired tail light. The officer walks up to your rolled-down window with a flashlight. "License and registration please."',
      alibiBranches: [
        {
          id: 'alibi_traffic_stop',
          label: 'Present Foreign Passport & Claim an Emergency',
          skillReq: { stat: 'adaptation', min: 70, label: 'Adaptation' },
          successFeedback: 'You explain in trembling English that your friend felt faint and you were trying to reach the 24-hour pharmacy. The officer takes pity on you, drives you home, and issues a verbal warning to the host parents without filing a police citation!',
          failFeedback: 'The officer runs your name through the dispatch database. Operating a motor vehicle without a valid state license or insurance is an automatic citation. The placement organization is notified by sunrise.',
          failViolation: {
            category: 'motor_vehicle',
            severity: 'critical',
            desc: 'Cited by state police for operating a motorized vehicle without a license'
          }
        }
      ]
    }
  },

  sneak_out: {
    id: 'sneak_out',
    title: 'Midnight Curfew Evasion (Sneaking Out)',
    subtitle: 'Sliding open the bedroom window at 2:00 AM to meet someone special',
    severity: 'major',
    iconKey: 'clock',
    color: '#38bdf8',
    initialDanger: 25,
    dangerPerRound: 15,
    rewards: {
      social: 18,
      happiness: 15,
      xp: 30
    },
    bustScenario: {
      title: 'Empty Bed Discovered!',
      speaker: 'Host Dad Mark',
      prompt: 'When you climb back through the bedroom window at 4:15 AM with muddy sneakers, host dad Mark is sitting in your desk chair waiting in silence.',
      alibiBranches: [
        {
          id: 'alibi_sneak_sleepwalk',
          label: 'Claim you couldn’t sleep and went for an anxious walk',
          skillReq: { stat: 'adaptation', min: 50, label: 'Adaptation' },
          successFeedback: 'Mark looks at you with concern rather than rage. "If you cannot sleep, come wake us up. Walking around strange suburbs at 3 AM is dangerous." No strike issued.',
          failFeedback: 'Mark notices your phone screen lit up with texts from classmates. "Do not treat me like an idiot." He logs a formal curfew strike with the coordinator.',
          failViolation: {
            category: 'curfew',
            severity: 'major',
            desc: 'Sneaked out of host home past curfew until 4 AM'
          }
        }
      ]
    }
  }
};
