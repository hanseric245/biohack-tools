import { FREQUENCIES, SYRINGE_UNITS } from "./constants";
import { CalculatorResults, SyringeType } from "./types";

export function computeRecommended(
  vialMg: number,
  doseMg: number,
  syringe: SyringeType,
  dosesPerWeek: number | null,
  bwOverride: number | null
): CalculatorResults | null {
  if (!vialMg || !doseMg || vialMg <= 0 || doseMg <= 0 || doseMg > vialMg) return null;

  const unitsPerMl = SYRINGE_UNITS[syringe];

  let bwUsed: number;
  let bwOverridden = false;

  if (bwOverride && bwOverride > 0) {
    bwUsed = bwOverride;
    bwOverridden = true;
  } else {
    const BW_OPTIONS = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];
    let bestBW = 2;
    let bestScore = Infinity;
    for (const bw of BW_OPTIONS) {
      const concentration = vialMg / bw;
      const volumeMl = doseMg / concentration;
      const units = volumeMl * unitsPerMl;
      if (units < 2 || units > 100) continue;
      const score = Math.abs(units - Math.round(units / 5) * 5);
      if (score < bestScore) {
        bestScore = score;
        bestBW = bw;
      }
    }
    bwUsed = bestBW;
  }

  const concentration = vialMg / bwUsed;
  const volumeMl = doseMg / concentration;
  const syringeUnits = volumeMl * unitsPerMl;
  const totalDoses = vialMg / doseMg;

  let supplyLabel: string | null = null;
  let frequencyLabel: string | null = null;
  if (dosesPerWeek) {
    const match = FREQUENCIES.find((f) => f.dosesPerWeek === dosesPerWeek);
    frequencyLabel = match?.label ?? null;
    const totalDays = (totalDoses / dosesPerWeek) * 7;
    if (totalDays < 14) supplyLabel = `${Math.round(totalDays)} days`;
    else if (totalDays < 60) supplyLabel = `${Math.round(totalDays / 7)} weeks`;
    else supplyLabel = `~${(totalDays / 30).toFixed(1)} months`;
  }

  const unitsDisplay =
    syringeUnits % 1 === 0 ? syringeUnits.toFixed(0) : syringeUnits.toFixed(1);

  const reconstitution = bwOverridden
    ? `Your vial was reconstituted with ${bwUsed}ml of bacteriostatic water.`
    : `Add ${bwUsed}ml of bacteriostatic water to the vial to dissolve the peptide. Do this once when you first open the vial.`;
  const drawInstruction = `Draw to the ${unitsDisplay} unit mark on your ${syringe} syringe each time you dose.`;
  const summary = `${reconstitution} ${drawInstruction}`;

  return {
    bwUsed,
    bwOverridden,
    concentration,
    volumeMl,
    syringeUnits,
    totalDoses,
    supplyLabel,
    frequencyLabel,
    reconstitution,
    drawInstruction,
    summary,
  };
}
