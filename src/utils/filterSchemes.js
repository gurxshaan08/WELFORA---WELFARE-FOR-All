// ============================================================================
// filterSchemes.js — Pure Filtering Utility
// Keeps all scheme filtering logic OUTSIDE of UI components.
// Makes the system testable and ready to move server-side later.
// ============================================================================

/**
 * Filter schemes based on user-provided filter criteria.
 *
 * @param {Array}  schemes - Array of scheme objects from the data layer
 * @param {Object} filters - Filter state from the UI
 * @param {number|string} filters.age      - User age (0–120)
 * @param {string} filters.gender  - "All" | "Male" | "Female" | "Other"
 * @param {string} filters.category - Category name or "All Categories"
 * @param {number} filters.income   - Max income in ₹
 * @param {string} filters.state    - State name or "All States"
 * @param {string} filters.search   - Free-text search query
 * @returns {Array} Filtered array of scheme objects
 */
export function filterSchemes(schemes, filters) {
  const {
    age = '',
    gender = 'All',
    category = 'All Categories',
    income = 1000000,
    state = 'All States',
    search = ''
  } = filters;

  const parsedAge = age !== '' ? parseInt(age, 10) : null;

  return schemes.filter((scheme) => {
    // ── 1. Age Filter ──────────────────────────────────────────────────────
    if (parsedAge !== null && !isNaN(parsedAge)) {
      const minAge = scheme.target_age_min ?? scheme.eligibilityRules?.minAge ?? 0;
      const maxAge = scheme.target_age_max ?? scheme.eligibilityRules?.maxAge ?? 120;
      if (parsedAge < minAge || parsedAge > maxAge) return false;
    }

    // ── 2. Gender Filter ───────────────────────────────────────────────────
    if (gender && gender !== 'All') {
      const eligibleGenders = scheme.eligible_gender || scheme.eligibilityRules?.genders || ['Any'];
      const isAllGender = eligibleGenders.some(
        (g) => g === 'All' || g === 'Any'
      );
      if (!isAllGender) {
        const genderMatches = eligibleGenders.some(
          (g) => g.toLowerCase() === gender.toLowerCase()
        );
        if (!genderMatches) return false;
      }
    }

    // ── 3. Category Filter ─────────────────────────────────────────────────
    if (category && category !== 'All Categories') {
      if (scheme.category !== category) return false;
    }

    // ── 4. Income Filter ───────────────────────────────────────────────────
    if (income !== null && income !== undefined) {
      const schemeIncomeLimit = scheme.income_limit ?? scheme.eligibilityRules?.maxIncome ?? Infinity;
      // Scheme must accept applicants at or above their income limit
      // If income > scheme's limit, the user doesn't qualify
      if (income > schemeIncomeLimit) return false;
    }

    // ── 5. State Filter ────────────────────────────────────────────────────
    if (state && state !== 'All States') {
      const schemeStates = scheme.states || [scheme.state];
      const isNational = schemeStates.some(
        (s) => s === 'All' || s === 'All States'
      );
      if (!isNational) {
        const stateMatches = schemeStates.some(
          (s) => s.toLowerCase() === state.toLowerCase()
        );
        if (!stateMatches) return false;
      }
    }

    // ── 6. Full-Text Search ────────────────────────────────────────────────
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      const searchable = [
        scheme.name,
        scheme.category,
        scheme.shortDescription,
        scheme.benefit,
        scheme.eligibility,
        scheme.state,
        scheme.scheme_type
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (!searchable.includes(q)) return false;
    }

    return true;
  });
}

/**
 * Returns a human-readable income label for a given ₹ value.
 * @param {number} value
 * @returns {string}
 */
export function formatIncome(value) {
  if (value >= 1000000) return `₹${(value / 100000).toFixed(0)} Lakh+`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} Lakh`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

/**
 * Default (empty) filter state.
 */
export const DEFAULT_FILTERS = {
  age: '',
  gender: 'All',
  category: 'All Categories',
  income: 1000000,
  state: 'All States',
  search: ''
};
