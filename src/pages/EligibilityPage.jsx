import { useState, useMemo } from 'react';
import PageTitle from '../components/PageTitle';
import { useWelfora } from '../context/WelforaContext';

const STATE_OPTIONS = [
  'Punjab',
  'Haryana',
  'Delhi',
  'Uttar Pradesh',
  'Rajasthan',
  'Maharashtra',
  'Other',
];

const OCCUPATION_OPTIONS = [
  'Student',
  'Employed',
  'Farmer',
  'Self-employed',
  'Unemployed',
  'Other',
];

export default function EligibilityPage() {
  const {
    eligibility,
    setEligibility,
    assessedSchemes,
    setSelectedScheme,
    notify,
  } = useWelfora();

  const [hasEvaluated, setHasEvaluated] = useState(false);

  const eligibilityMatches = useMemo(() => {
    return assessedSchemes
      .filter(s => (s.fit?.score || 0) >= 55)
      .sort((a, b) => (b.fit?.score || 0) - (a.fit?.score || 0));
  }, [assessedSchemes]);

  function handleCheckGuidance() {
    const age = Number(eligibility.age);
    const income = Number(eligibility.income);

    if (!eligibility.age || age < 0 || age > 120 || eligibility.income === '' || income < 0) {
      notify('Enter a valid age and non-negative annual income');
      setHasEvaluated(false);
      return;
    }

    setHasEvaluated(true);
    notify('Guidance checklist generated');
  }

  return (
    <section className="page-content">
      <PageTitle
        eyebrow="A STARTING POINT"
        title="Check your eligibility"
        subtitle="This demo offers general guidance only, not an official eligibility decision."
      />

      <div className="eligibility-layout">
        <div className="panel form-panel">
          <h2>Tell us a little about yourself</h2>
          <p>Use these details to explore general guidance.</p>

          <div className="form-grid">
            <label>
              Age
              <input
                value={eligibility.age}
                onChange={e => setEligibility(prev => ({ ...prev, age: e.target.value }))}
                type="number"
                min="0"
                max="120"
              />
            </label>

            <label>
              State / UT
              <select
                value={eligibility.state}
                onChange={e => setEligibility(prev => ({ ...prev, state: e.target.value }))}
              >
                {STATE_OPTIONS.map(st => (
                  <option key={st}>{st}</option>
                ))}
              </select>
            </label>

            <label>
              Occupation
              <select
                value={eligibility.occupation}
                onChange={e => setEligibility(prev => ({ ...prev, occupation: e.target.value }))}
              >
                {OCCUPATION_OPTIONS.map(occ => (
                  <option key={occ}>{occ}</option>
                ))}
              </select>
            </label>

            <label>
              Annual household income (₹)
              <input
                value={eligibility.income}
                onChange={e => setEligibility(prev => ({ ...prev, income: e.target.value }))}
                type="number"
                min="0"
              />
            </label>
          </div>

          <button className="primary-btn" onClick={handleCheckGuidance}>
            Find relevant guidance <span>→</span>
          </button>
        </div>

        <div className="panel eligibility-result">
          <div className="result-icon">✦</div>
          <h2>{hasEvaluated ? 'Your next steps' : 'Your eligibility snapshot'}</h2>
          <p>
            {hasEvaluated
              ? 'Based on your answers, start by reviewing these categories and confirming the official rules.'
              : 'Complete the short form to see a simple next-step checklist.'}
          </p>

          {hasEvaluated && (
            <div className="eligibility-match-list">
              <h3>Potential matches to review</h3>
              {eligibilityMatches.length > 0 ? (
                eligibilityMatches.slice(0, 5).map(scheme => (
                  <article className="eligibility-match" key={scheme.id}>
                    <div>
                      <b>{scheme.name}</b>
                      <span>
                        {scheme.category} · {scheme.fit?.score}% potential fit
                      </span>
                    </div>
                    <ul>
                      {scheme.fit?.reasons.slice(0, 2).map(reason => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                    <button
                      className="outline-btn"
                      onClick={() => setSelectedScheme(scheme)}
                    >
                      Review scheme
                    </button>
                  </article>
                ))
              ) : (
                <p>
                  No strong demo matches were found. Try reviewing all categories and official state resources.
                </p>
              )}
            </div>
          )}

          <div className="disclaimer">
            ⓘ This is a transparent demo matching score, not an official eligibility result. It does not use official eligibility rules, and criteria may vary or change.
          </div>
        </div>
      </div>
    </section>
  );
}
