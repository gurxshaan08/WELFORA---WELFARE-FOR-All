// ============================================================================
// WELFORA ELIGIBILITY RULES ENGINE (Prototype Frontend Rule-Matcher)
// Evaluates user profile criteria against scheme eligibility rules.
// Note: Prototype implementation for presentation; future iterations will be backend-driven.
// ============================================================================

export function calculateEligibility(profile, scheme) {
  if (!profile || !scheme || !scheme.eligibilityRules) {
    return { isEligible: false, score: 0, reasons: ["Insufficient data"], matchLevel: "Low" };
  }

  const rules = scheme.eligibilityRules;
  let score = 0;
  const matchReasons = [];
  const disqualifications = [];

  // 1. Income Evaluation (Weight: 35 points)
  if (rules.maxIncome !== undefined) {
    const userIncome = Number(profile.income) || 0;
    if (userIncome <= rules.maxIncome) {
      score += 35;
      matchReasons.push(`Income ₹${userIncome.toLocaleString('en-IN')} is within maximum limit of ₹${rules.maxIncome.toLocaleString('en-IN')}`);
    } else {
      disqualifications.push(`Income ₹${userIncome.toLocaleString('en-IN')} exceeds limit of ₹${rules.maxIncome.toLocaleString('en-IN')}`);
    }
  } else {
    score += 35;
  }

  // 2. State Eligibility (Weight: 25 points)
  const schemeState = scheme.state;
  const userState = profile.state;
  if (schemeState === "All States" || schemeState === userState) {
    score += 25;
    matchReasons.push(`Scheme covers ${schemeState}`);
  } else {
    disqualifications.push(`Scheme is exclusive to ${schemeState} (Your state: ${userState})`);
  }

  // 3. Age Bounds (Weight: 20 points)
  const userAge = Number(profile.age) || 0;
  const minAge = rules.minAge !== undefined ? rules.minAge : 0;
  const maxAge = rules.maxAge !== undefined ? rules.maxAge : 120;

  if (userAge >= minAge && userAge <= maxAge) {
    score += 20;
    matchReasons.push(`Age ${userAge} falls within range (${minAge}-${maxAge} yrs)`);
  } else {
    disqualifications.push(`Age ${userAge} outside eligible range (${minAge}-${maxAge} yrs)`);
  }

  // 4. Occupation Matching (Weight: 20 points)
  if (rules.occupations && rules.occupations.length > 0) {
    if (rules.occupations.includes("Any") || rules.occupations.includes(profile.occupation)) {
      score += 20;
      matchReasons.push(`Occupation '${profile.occupation}' matches scheme target group`);
    } else {
      disqualifications.push(`Occupation '${profile.occupation}' not explicitly targeted`);
    }
  } else {
    score += 20;
  }

  // 5. Gender Filter (Hard Constraint)
  if (rules.genders && !rules.genders.includes("Any")) {
    if (!rules.genders.includes(profile.gender)) {
      disqualifications.push(`Scheme targeted specifically for ${rules.genders.join('/')} applicants`);
      // Major penalty for hard gender mismatches
      score = Math.max(0, score - 50);
    }
  }

  // Determine overall match decision
  const isEligible = score >= 60 && disqualifications.length === 0;
  
  let matchLevel = "Low Match";
  if (score >= 85) matchLevel = "High Match";
  else if (score >= 60) matchLevel = "Moderate Match";

  return {
    isEligible,
    score,
    matchLevel,
    reasons: matchReasons,
    disqualifications
  };
}
