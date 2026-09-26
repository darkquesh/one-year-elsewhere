// Course Catalog: Core Courses and Electives with Academic Rigor
export const COURSES = {
  cores: [
    {
      id: 'core_language',
      name: 'Host Country Language & Literature',
      type: 'humanities',
      difficulty: 6,
      desc: 'Mandatory language study. Essential for understanding classroom dialogue and local idioms.'
    },
    {
      id: 'core_history',
      name: 'National History & Civil Culture',
      type: 'humanities',
      difficulty: 5,
      desc: 'Exploring host nation historical milestones, constitutional systems, and cultural heritage.'
    },
    {
      id: 'core_pe',
      name: 'Physical Education & Athletics',
      type: 'athletics',
      difficulty: 2,
      desc: 'Team sports, fitness routines, and healthy social bonding with classmates on the field.'
    }
  ],
  electives: [
    {
      id: 'elec_calculus',
      name: 'Advanced Calculus (AP/Higher Math)',
      type: 'math',
      difficulty: 9,
      desc: 'Differential and integral calculus. Heavy workload, but yields high academic standing.',
      academicYield: 18,
      socialYield: -4
    },
    {
      id: 'elec_algebra',
      name: 'Standard Algebra & Statistics',
      type: 'math',
      difficulty: 4,
      desc: 'Practical mathematics and statistical analysis with moderate homework pressure.',
      academicYield: 8,
      socialYield: 0
    },
    {
      id: 'elec_physics',
      name: 'Laboratory Physics & Mechanics',
      type: 'science',
      difficulty: 8,
      desc: 'Weekly lab experiments, Newtonian physics, and group problem-solving.',
      academicYield: 15,
      socialYield: 2
    },
    {
      id: 'elec_psychology',
      name: 'Introductory Psychology',
      type: 'humanities',
      difficulty: 5,
      desc: 'Understanding human behavior, cognition, and cultural sociology. Very popular among peers.',
      academicYield: 9,
      socialYield: 8
    },
    {
      id: 'elec_drama',
      name: 'Theater Arts & Public Speaking',
      type: 'arts',
      difficulty: 3,
      desc: 'Stage performance, improvisation games, and overcoming speech anxiety in the host language.',
      academicYield: 4,
      socialYield: 16
    },
    {
      id: 'elec_visual_arts',
      name: 'Studio Painting & Ceramics',
      type: 'arts',
      difficulty: 3,
      desc: 'Creative self-expression, studio time, and relaxing artistic decompression.',
      academicYield: 5,
      socialYield: 6
    },
    {
      id: 'elec_cs',
      name: 'Computer Programming & Logic',
      type: 'science',
      difficulty: 7,
      desc: 'Coding algorithms and web development. Cross-lingual logic skills shine here.',
      academicYield: 14,
      socialYield: 2
    },
    {
      id: 'elec_culinary',
      name: 'Culinary Arts & Home Economics',
      type: 'lifestyle',
      difficulty: 2,
      desc: 'Hands-on kitchen skills, baking, and tasting local regional dishes. A great stress-reliever!',
      academicYield: 3,
      socialYield: 12
    }
  ]
};
