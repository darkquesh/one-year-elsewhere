// Rule Violations, Documentation Risk, Strikes & Early Return System
import { PO_LOCATIONS, PO_STRICTNESS } from './data/poData.js';
import { statEvents } from './statEvents.js';

export class ViolationSystem {
  // Check if a rule violation was spotted and documented
  static evaluateDocumentationRisk(riskConfig, po, rngInstance) {
    const locConfig = PO_LOCATIONS[po.location] || PO_LOCATIONS.suburban;
    const strictConfig = PO_STRICTNESS[po.strictness] || PO_STRICTNESS.moderate;

    const baseChance = riskConfig.chance || 0.40;
    const finalChance = Math.min(0.98, baseChance * locConfig.docDetectionRate * strictConfig.investigationThreshold);

    const isDocumented = rngInstance.next() < finalChance;
    return {
      isDocumented,
      finalChance: Math.round(finalChance * 100)
    };
  }

  // Process a documented strike
  static processViolation(violation, gameState, rngInstance) {
    gameState.violations.strikeCount++;
    const strikeNum = gameState.violations.strikeCount;

    let outcome = 'warning';
    let isEarlyReturn = false;

    // Severe critical violations (drugs, motor vehicle) can trigger instant expulsion even on Strike 1!
    if (violation.severity === 'critical') {
      const immediateReturnChance = 0.50; // 50% random chance of immediate deportation
      if (rngInstance.next() < immediateReturnChance || strikeNum >= 3) {
        outcome = 'critical_expulsion';
        isEarlyReturn = true;
      } else {
        outcome = 'critical_probation';
      }
    } else if (strikeNum >= 4) {
      outcome = 'strike_expulsion';
      isEarlyReturn = true;
    } else if (strikeNum === 3) {
      // Small random chance of early return on Strike 3
      if (rngInstance.next() < 0.35) {
        outcome = 'random_early_return_strike3';
        isEarlyReturn = true;
      } else {
        outcome = 'final_warning_parents_called';
      }
    } else if (strikeNum === 2) {
      // 10% random chance of early return on Strike 2
      if (rngInstance.next() < 0.10) {
        outcome = 'random_early_return_strike2';
        isEarlyReturn = true;
      } else {
        outcome = 'formal_probation_meeting';
      }
    } else if (strikeNum === 1) {
      // 5% random shock early return on Strike 1 if coordinator trust is broken
      if (gameState.flags.coordinator_trust_low && rngInstance.next() < 0.20) {
        outcome = 'random_early_return_strike1';
        isEarlyReturn = true;
      } else {
        outcome = 'first_written_warning';
      }
    }

    gameState.violations.history.push({
      month: gameState.meta.month,
      category: violation.category,
      severity: violation.severity,
      desc: violation.desc,
      strikeNum,
      outcome,
      isEarlyReturn
    });

    statEvents.emit('strikeAdded', {
      strikeCount: strikeNum,
      violation,
      outcome,
      isEarlyReturn
    });

    return { strikeNum, outcome, isEarlyReturn };
  }
}
