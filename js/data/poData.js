// Placement Organization (PO) Archetypes, Location Effects, and Rule Sets
export const PO_LOCATIONS = {
  urban: {
    id: 'urban',
    name: 'Metropolitan City',
    icon: 'globe',
    description: 'High-density urban center with comprehensive subways, cafes, and diverse communities.',
    socialBonus: 10,
    financePenalty: -8,
    docDetectionRate: 0.65 // Anonymity makes some violations harder to notice
  },
  suburban: {
    id: 'suburban',
    name: 'Suburban Town',
    icon: 'house',
    description: 'Quiet neighborhoods with residential cul-de-sacs, public high schools, and shopping plazas.',
    socialBonus: 0,
    financePenalty: 0,
    docDetectionRate: 0.85 // Average coordinator & community oversight
  },
  rural: {
    id: 'rural',
    name: 'Rural Village / Countryside',
    icon: 'sparkles',
    description: 'Small tight-knit agricultural or mountain community where everybody knows everybody.',
    socialBonus: -5,
    bondBonus: 15,
    docDetectionRate: 1.25 // High documentation rate: neighbors report everything to host parents
  }
};

export const PO_STRICTNESS = {
  lenient: {
    id: 'lenient',
    name: 'Lenient Coordinator',
    investigationThreshold: 0.45,
    rules: [
      'curfew_11pm',
      'verbal_overnight_notice',
      'informal_odd_jobs'
    ]
  },
  moderate: {
    id: 'moderate',
    name: 'Standard Protocol',
    investigationThreshold: 0.70,
    rules: [
      'curfew_10pm',
      'written_travel_approval',
      'po_approved_jobs_only',
      'no_unapproved_social_media'
    ]
  },
  strict: {
    id: 'strict',
    name: 'Strict / Zero-Tolerance',
    investigationThreshold: 0.95,
    rules: [
      'curfew_9pm',
      'no_overnight_trips',
      'no_tattoos_or_piercings',
      'strict_travel_ban',
      'weekly_coordinator_checkin'
    ]
  }
};

export const RULE_DEFINITIONS = {
  curfew_9pm: { name: 'Early Curfew (9:00 PM)', severity: 'minor', desc: 'Must be inside host home by 9:00 PM on weeknights.' },
  curfew_10pm: { name: 'Standard Curfew (10:00 PM)', severity: 'minor', desc: 'Must be inside host home by 10:00 PM.' },
  curfew_11pm: { name: 'Flexible Curfew (11:00 PM)', severity: 'minor', desc: 'Must return home by 11:00 PM.' },
  no_tattoos_or_piercings: { name: 'Body Modification Ban', severity: 'minor', desc: 'No acquiring new tattoos or piercings during the exchange year.' },
  written_travel_approval: { name: 'Written Travel Authorisation', severity: 'major', desc: 'Leaving school district overnight requires written coordinator approval 2 weeks in advance.' },
  no_overnight_trips: { name: 'No Overnight Stays Away', severity: 'major', desc: 'All nights must be spent at the designated host family residence.' },
  po_approved_jobs_only: { name: 'Work Permit Requirement', severity: 'minor', desc: 'Odd-jobs (babysitting, tutoring) require formal coordinator approval.' },
  informal_odd_jobs: { name: 'Informal Odd-Jobs Allowed', severity: 'none', desc: 'Casual neighborhood odd-jobs permitted for pocket money.' },
  no_unapproved_social_media: { name: 'Social Media Vetting', severity: 'minor', desc: 'Public exchange student vlogs/blogs must be reviewed by coordinator.' },
  weekly_coordinator_checkin: { name: 'Mandatory Weekly Check-in', severity: 'minor', desc: 'Weekly formal phone call or visit with regional coordinator.' },
  // Universal rules across all programs:
  no_driving_motorized_vehicles: { name: 'Motor Vehicle Prohibition', severity: 'critical', desc: 'Driving cars, motorcycles, or scooters is strictly forbidden.' },
  no_illicit_drugs: { name: 'Zero Drug Tolerance', severity: 'critical', desc: 'Any illicit substance use results in immediate deportation.' },
  no_hitchhiking: { name: 'Hitchhiking Prohibition', severity: 'major', desc: 'Accepting rides from strangers is strictly classified as a major safety violation.' }
};
