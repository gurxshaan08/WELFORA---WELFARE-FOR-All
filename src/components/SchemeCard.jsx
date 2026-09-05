import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { getSchemeImage } from '../utils/schemeImages';

// Category badge color class mapping
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

export const SchemeCard = ({ scheme, isSaved, onToggleSave, matchScore = null, showImage = true }) => {
  const { id, name, shortDescription, category, state, benefit, deadline } = scheme;
  const imageUrl = getSchemeImage(category);

  return (
    <div className="card scheme-card">
      {/* Category Image Header */}
      {showImage && (
        <img
          src={imageUrl}
          alt={name}
          className="scheme-card-image"
          loading="lazy"
        />
      )}

      <div className="scheme-card-body">
        <div>
          <div className="scheme-card-header">
            <span className={`category-badge ${getCategoryClass(category)}`}>
              {category}
            </span>
            <span style={{ fontSize: '0.825rem', color: 'var(--neutral-600)', fontWeight: 600 }}>
              📍 {state}
            </span>
          </div>

          <h3 className="scheme-title">{name}</h3>

          <div className="scheme-benefit">
            🎁 <strong>Potential Benefit:</strong> {benefit}
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', marginBottom: '1rem', lineHeight: '1.5' }}>
            {shortDescription}
          </p>

          {/* Match Score Pill */}
          {matchScore !== null && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.85rem',
              padding: '0.4rem 0.65rem',
              backgroundColor: matchScore >= 75 ? 'var(--accent-50)' : 'var(--primary-50)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${matchScore >= 75 ? 'var(--accent-100)' : 'var(--primary-100)'}`
            }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 700, color: matchScore >= 75 ? 'var(--accent-700)' : 'var(--primary-900)' }}>
                🎯 {matchScore}% Match Score
              </span>
            </div>
          )}
        </div>

        <div>
          <div className="scheme-meta">
            <span>⏳ Cutoff: <strong>{deadline}</strong></span>
          </div>

          <div className="scheme-actions">
            <Link to={`/schemes/${id}`} style={{ flex: 1 }}>
              <Button variant="primary" size="sm" fullWidth>
                View Details →
              </Button>
            </Link>

            {onToggleSave && (
              <Button
                variant={isSaved ? 'accent' : 'secondary'}
                size="sm"
                onClick={() => onToggleSave(id)}
                title={isSaved ? 'Remove Bookmark' : 'Save Scheme'}
              >
                {isSaved ? '★ Saved' : '🔖 Save'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
