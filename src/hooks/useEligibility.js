import { useMemo } from 'react';
import { mockSchemes } from '../data/mockSchemes';
import { calculateEligibility } from '../utils/eligibilityRules';

// Custom hook to calculate scheme eligibility based on user profile attributes
export function useEligibility(userProfile) {
  const eligibilityResults = useMemo(() => {
    if (!userProfile) {
      return {
        eligibleSchemes: [],
        totalMatchedCount: 0,
        matchBreakdown: []
      };
    }

    const matchedList = mockSchemes.map((scheme) => {
      const evaluation = calculateEligibility(userProfile, scheme);
      return {
        scheme,
        ...evaluation
      };
    });

    // Filter schemes that pass minimum eligibility criteria
    const eligibleSchemes = matchedList
      .filter(item => item.isEligible)
      .sort((a, b) => b.score - a.score);

    return {
      eligibleSchemes,
      totalMatchedCount: eligibleSchemes.length,
      allEvaluations: matchedList
    };
  }, [userProfile]);

  return eligibilityResults;
}
