import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockSchemes, MOCK_DISCLAIMER } from '../data/mockSchemes';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { getSchemeImage, categoryFallbacks, getFallbackSvg } from '../utils/schemeImages';

const getCategoryClass = (category) => {
  switch (category) {
    case 'Education': return 'category-education';
    case 'Healthcare': return 'category-healthcare';
    case 'Agriculture': return 'category-agriculture';
    case 'Women & Child Welfare': return 'category-women';
    case 'Employment': return 'category-employment';
    case 'Housing': return 'category-housing';
    case 'Senior Citizens': return 'category-senior';
    case 'Entrepreneurship': return 'category-entrepreneurship';
    default: return 'category-education';
  }
};

export const SchemeDetailsPage = () => {
  const { id } = useParams();
  const { savedSchemeIds, toggleSaveScheme } = useAuth();

  const scheme = mockSchemes.find((item) => item.id === id);

  if (!scheme) {
    return (
      <div className="container main-content" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Scheme Not Found</h2>
        <p style={{ color: 'var(--neutral-600)', margin: '1rem 0 1.5rem' }}>
          The requested government scheme ID "{id}" could not be located.
        </p>
        <Link to="/schemes">
          <Button variant="primary">← Back to Explorer</Button>
        </Link>
      </div>
    );
  }

  const isSaved = savedSchemeIds.includes(scheme.id);

  return (
    <div className="container main-content" style={{ maxWidth: '960px' }}>
      {/* Navigation Breadcrumb */}
      <div style={{ marginBottom: '1.75rem' }}>
        <Link to="/schemes" style={{ color: 'var(--accent-600)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          ← Back to Scheme Explorer
        </Link>
      </div>

      {/* Main Details Card Container */}
      <div className="card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-2xl)' }}>
        {/* Category Image Banner */}
        <div style={{
          width: '100%',
          height: '240px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <img
            src={getSchemeImage(scheme.category)}
            alt={scheme.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              const fallback = categoryFallbacks[scheme.category];
              if (fallback && e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              } else {
                e.currentTarget.src = getFallbackSvg(scheme.category);
              }
            }}
          />
        </div>

        {/* Header Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <span className={`category-badge ${getCategoryClass(scheme.category)}`} style={{ fontSize: '0.85rem' }}>
            {scheme.category}
          </span>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--neutral-600)' }}>
            📍 Region Coverage: <strong>{scheme.state}</strong>
          </span>
        </div>

        <h1 style={{ fontSize: '2.25rem', marginBottom: '1rem', color: 'var(--primary-900)' }}>
          {scheme.name}
        </h1>

        <div style={{
          backgroundColor: 'var(--accent-50)',
          border: '1px solid var(--accent-100)',
          color: 'var(--accent-700)',
          padding: '0.6rem 1rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.825rem',
          fontWeight: 700,
          marginBottom: '2rem'
        }}>
          ⚠️ {MOCK_DISCLAIMER}
        </div>

        {/* Key Benefits Highlight Box */}
        <div style={{
          backgroundColor: 'var(--accent-50)',
          borderLeft: '5px solid var(--accent-600)',
          padding: '1.5rem',
          borderRadius: '0 var(--radius-xl) var(--radius-xl) 0',
          marginBottom: '2.5rem'
        }}>
          <h3 style={{ color: 'var(--accent-700)', fontSize: '1.15rem', marginBottom: '0.35rem' }}>
            🎁 Scheme Benefit Summary
          </h3>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-900)' }}>
            {scheme.benefit}
          </p>
        </div>

        {/* Description Section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--primary-900)' }}>About the Scheme</h3>
          <p style={{ color: 'var(--neutral-700)', lineHeight: '1.7', fontSize: '1rem' }}>
            {scheme.shortDescription}
          </p>
        </div>

        {/* Eligibility Criteria */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--primary-900)' }}>Eligibility Guidelines</h3>
          <div style={{
            backgroundColor: 'var(--neutral-100)',
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--neutral-200)',
            color: 'var(--primary-900)',
            lineHeight: '1.7'
          }}>
            {scheme.eligibility}
          </div>
        </div>

        {/* Required Documents List */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.85rem', color: 'var(--primary-900)' }}>Required Documents Checklist</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
            {scheme.documents.map((doc, idx) => (
              <div key={idx} style={{
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--white)',
                border: '1px solid var(--neutral-200)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--primary-900)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <span style={{ color: 'var(--accent-600)' }}>📄</span> {doc}
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Application Process */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--primary-900)' }}>How to Apply</h3>
          <div style={{
            backgroundColor: 'var(--primary-900)',
            color: 'var(--white)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-xl)'
          }}>
            <p style={{ lineHeight: '1.65', fontSize: '0.95rem' }}>{scheme.applicationProcess}</p>
          </div>
        </div>

        {/* Cutoff Date & Actions Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--neutral-200)'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--neutral-600)', display: 'block' }}>Application Cutoff Window</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--accent-600)' }}>⏳ {scheme.deadline}</strong>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem' }}>
            <Button
              variant={isSaved ? 'accent' : 'primary'}
              size="lg"
              onClick={() => toggleSaveScheme(scheme.id)}
            >
              {isSaved ? '✓ Saved to Bookmarks' : '★ Save Scheme'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
