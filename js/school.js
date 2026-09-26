// School Systems: Dynamic Academic Pressure, Grade Placement & IEW Logic
import { COUNTRIES } from './data/countries.js';
import { HOME_COUNTRIES } from './data/homeCountries.js';
import { COURSES } from './data/coursesData.js';
import { gameState } from './gameState.js';

export class SchoolSystem {
  // Academic Pressure formula based on relative country difference + course difficulty
  static calculateAcademicPressure(homeCountryId, destCountryId, electiveIds = []) {
    const home = HOME_COUNTRIES[homeCountryId] || HOME_COUNTRIES.turkey;
    const dest = COUNTRIES[destCountryId] || COUNTRIES.usa;

    // Relative difference in academic rigor
    // If dest country rigor > home country baseline, pressure increases.
    // If home country baseline > dest rigor (e.g. Turkey math 8 > USA rigor 5), student has an advantage!
    const rigorGap = dest.academicRigor - (home.mathBaseline + home.scienceBaseline) / 2;

    // Course difficulty sum
    let courseDifficultySum = 0;
    electiveIds.forEach(id => {
      const elec = COURSES.electives.find(e => e.id === id);
      if (elec) {
        let diff = elec.difficulty;
        // If it's math and home country has strong math baseline, reduce perceived difficulty
        if (elec.type === 'math' && home.mathBaseline >= 7) {
          diff = Math.max(2, diff - 3);
        }
        courseDifficultySum += diff;
      }
    });

    const averageCourseDiff = electiveIds.length > 0 ? (courseDifficultySum / electiveIds.length) : 5;

    // Scale pressure [10 to 95]
    const basePressure = 35 + (rigorGap * 8) + (averageCourseDiff * 5);
    return Math.round(Math.max(10, Math.min(95, basePressure)));
  }

  // Random assignment of Grade Placement and Diploma Eligibility
  static assignGradeAndDiploma(destCountryId, rngInstance) {
    // Standard pool: 11th grade (Junior) is most common (~65%), 12th Senior (~20%), 10th Sophomore (~15%)
    const grades = [
      { item: 11, weight: 65 },
      { item: 12, weight: 20 },
      { item: 10, weight: 15 }
    ];
    const grade = rngInstance.weightedPick(grades);

    // Diploma eligibility: usually only possible if placed in 12th grade, and only ~35% of schools offer it
    let diplomaEligible = false;
    if (grade === 12) {
      diplomaEligible = rngInstance.next() < 0.40;
    }

    return { grade, diplomaEligible };
  }
}
