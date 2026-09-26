// Ending Outcomes Catalog with Narrative Epilogues
export const ENDINGS = {
  triumphant_return: {
    id: 'triumphant_return',
    badge: 'trophy',
    title: 'Triumphant Return',
    tagline: 'A Year That Transformed Your Life',
    description: 'You completed your entire exchange year with flying colors. You return to your home country fluent, culturally savvy, independent, and surrounded by lifelong international friendships. The world will never look small to you again.',
    statRequirements: 'Completed Month 12 with all stats balanced above 50.'
  },
  academic_excellence: {
    id: 'academic_excellence',
    badge: 'diploma',
    title: 'Academic Laureate',
    tagline: 'Mastering the Host Curriculum with Distinction',
    description: 'You conquered high-level courses, earned the praise of foreign professors, and received formal academic honors. If your host high school awarded diplomas, your diploma now hangs with pride on your bedroom wall.',
    statRequirements: 'Academics >= 85 at the end of the year.'
  },
  university_acceptance: {
    id: 'university_acceptance',
    badge: 'plane',
    title: '"I\'m Coming Back!"',
    tagline: 'From Exchange High Schooler to International Undergrad',
    description: 'While walking to the departure gate, your phone dings with an email notification: official acceptance to the host nation’s premier university with a merit scholarship! You board the flight knowing this is not goodbye — it is just a brief summer intermission.',
    statRequirements: 'High Adaptation, applied to host university, completed Year.'
  },
  second_family: {
    id: 'second_family',
    badge: 'house',
    title: 'A Second Home for Life',
    tagline: 'Ties That Transcend Borders and Bloodlines',
    description: 'Your bond with your host family became unbreakable. You did not just stay in their house; you became their beloved daughter/son. Even years later, family video calls and return visits every summer remain an essential part of your life.',
    statRequirements: 'Host Family Bond >= 88 at completion.'
  },
  burnout: {
    id: 'burnout',
    badge: 'warning',
    title: 'Emotional Burnout & Early Withdrawal',
    tagline: 'When Cultural Fatigue Overwhelmed Your Spirit',
    description: 'The relentless combination of foreign language strain, severe loneliness, and cultural friction eroded your happiness until you could no longer function. With the help of the program counselor, you withdrew early to heal in the warmth of your hometown.',
    statRequirements: 'Happiness hit 0.'
  },
  early_return_rule: {
    id: 'early_return_rule',
    badge: 'strike',
    title: 'Expulsion & Early Return Flight',
    tagline: 'Program Contract Terminated for Conduct Violations',
    description: 'The coordinator and national office reached a final verdict. Your student exchange visa has been formally revoked. Escorted to the airport with an emergency one-way ticket, you return home prematurely. The memories you made will always be overshadowed by the sting of the sudden return.',
    statRequirements: 'Accumulated 4 strikes or critical violation investigation expulsion.'
  },
  broke_scraped: {
    id: 'broke_scraped',
    badge: 'finance',
    title: 'Broke & Scraped Through',
    tagline: 'Surviving on Instant Noodles and Sheer Tenacity',
    description: 'Your wallet was virtually empty for the second half of the year, but through neighbor odd-jobs, discount grocery runs, and sheer thriftiness, you endured until the graduation ceremony. You return home penniless, but with unmatched street resilience!',
    statRequirements: 'Finance stayed dangerously low throughout the year, but survived to Month 12.'
  },
  host_family_conflict: {
    id: 'host_family_conflict',
    badge: 'zap',
    title: 'Host Family Relocation Crisis',
    tagline: 'Irreconcilable Differences Under One Roof',
    description: 'Communication broke down completely with your host parents. With no emergency replacement families available in the school district, the placement organization had to terminate the exchange placement early.',
    statRequirements: 'Host Family Bond hit 0 with low coordinator trust.'
  }
};
