import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, MapPin, ExternalLink, ArrowRight, IndianRupee } from 'lucide-react';
import { getSchemeImage, categoryFallbacks, getFallbackSvg } from '../utils/schemeImages';

// ── Category badge color class mapping ──────────────────────────────────────
const getCategoryClass = (category) => {
  const map = {
    'Education': 'category-education',
    'Healthcare': 'category-healthcare',
    'Agriculture': 'category-agriculture',
    'Women & Child Welfare': 'category-women',
    'Employment': 'category-employment',
    'Housing': 'category-housing',
    'Senior Citizens': 'category-senior',
    'Entrepreneurship': 'category-entrepreneurship',
  };
  return map[category] || 'category-education';
};

// ── Format benefit amount for display ───────────────────────────────────────
const formatBenefitAmount = (scheme) => {
  const amount = scheme.benefits?.amount;
  if (!amount || amount === 0) return null;
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Crore`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} Lakh`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
};

// ── Eligibility Tag Pills ────────────────────────────────────────────────────
const EligibilityTags = ({ scheme }) => {
  const tags = [];

  const minAge = scheme.target_age_min ?? scheme.eligibilityRules?.minAge;
  const maxAge = scheme.target_age_max ?? scheme.eligibilityRules?.maxAge;
  if (minAge !== undefined && maxAge !== undefined) {
    tags.push({ label: `Age ${minAge}–${maxAge}`, icon: '🎂' });
  }

  if (scheme.scheme_type) {
    tags.push({ label: scheme.scheme_type, icon: '🏛️' });
  }

  const genders = scheme.eligible_gender || [];
  if (genders.length > 0 && !genders.includes('All') && !genders.includes('Any')) {
    tags.push({ label: genders.join(', '), icon: '👤' });
  }

  const incomeLimit = scheme.income_limit ?? scheme.eligibilityRules?.maxIncome;
  if (incomeLimit && incomeLimit < 1000000) {
    const label = incomeLimit >= 100000
      ? `Income < ₹${(incomeLimit / 100000).toFixed(1)}L`
      : `Income < ₹${(incomeLimit / 1000).toFixed(0)}K`;
    tags.push({ label, icon: '₹' });
  }

  if (scheme.benefits?.type) {
    tags.push({ label: scheme.benefits.type, icon: '🎁' });
  }

  return (
    <div className="scheme-eligibility-tags">
      {tags.slice(0, 4).map((tag, i) => (
        <span key={i} className="eligibility-tag">
          {tag.icon} {tag.label}
        </span>
      ))}
    </div>
  );
};

// ── Main SchemeCard Component ─────────────────────────────────────────────────
export const SchemeCard = ({
  scheme,
  isSaved,
  onToggleSave,
  matchScore = null,
  showImage = true,
  onViewDetails
}) => {
  const { id, name, shortDescription, category, state, benefit, deadline } = scheme;
  const imageUrl = getSchemeImage(category);
  const benefitAmount = formatBenefitAmount(scheme);

  const handleViewDetails = (e) => {
    e.preventDefault();
    if (onViewDetails) {
      onViewDetails(scheme);
    }
  };

  return (
    <div className="card scheme-card">
      {/* Category Image */}
      {showImage && (
        <div style={{ position: 'relative' }}>
          <img
            src={imageUrl}
            alt={name}
            className="scheme-card-image"
            loading="lazy"
            onError={(e) => {
              const fallback = categoryFallbacks[category];
              if (fallback && e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              } else {
                e.currentTarget.src = getFallbackSvg(category);
              }
            }}
          />
          {/* Scheme type badge over image */}
          {scheme.scheme_type && (
            <div style={{
              position: 'absolute', top: '0.75rem', left: '0.75rem',
              backgroundColor: 'rgba(7,27,65,0.85)',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              backdropFilter: 'blur(4px)'
            }}>
              {scheme.scheme_type}
            </div>
          )}
          {/* Status dot */}
          <div style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            width: '0.6rem', height: '0.6rem',
            borderRadius: '50%',
            backgroundColor: '#16a34a',
            boxShadow: '0 0 0 3px rgba(22,163,74,0.25)'
          }} title="Active Scheme" />
        </div>
      )}

      <div className="scheme-card-body">
        <div>
          {/* Header: Category + State */}
          <div className="scheme-card-header">
            <span className={`category-badge ${getCategoryClass(category)}`}>
              {category}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--neutral-600)', fontWeight: 500 }}>
              <MapPin size={12} /> {state}
            </span>
          </div>

          {/* Scheme Name */}
          <h3 className="scheme-title">{name}</h3>

          {/* Eligibility Tags */}
          <EligibilityTags scheme={scheme} />

          {/* Description */}
          <p style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', marginBottom: '0.85rem', lineHeight: '1.5' }}>
            {shortDescription}
          </p>

          {/* Benefit Highlight Box */}
          <div className="scheme-benefit">
            {benefitAmount ? (
              <>
                <IndianRupee size={15} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.25rem' }} />
                <strong>{benefitAmount}</strong> — {scheme.benefits?.type || 'Financial Benefit'}
              </>
            ) : (
              <>🎁 <strong>Benefit:</strong> {benefit}</>
            )}
          </div>

          {/* Match Score */}
          {matchScore !== null && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.85rem',
              padding: '0.4rem 0.75rem',
              backgroundColor: matchScore >= 75 ? 'var(--accent-50)' : 'var(--primary-50)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${matchScore >= 75 ? 'var(--accent-100)' : 'var(--primary-100)'}`
            }}>
              <span style={{
                fontSize: '0.825rem', fontWeight: 700,
                color: matchScore >= 75 ? 'var(--accent-700)' : 'var(--primary-900)'
              }}>
                🎯 {matchScore}% Match
              </span>
            </div>
          )}
        </div>

        {/* Footer: Meta + Actions */}
        <div>
          <div className="scheme-meta">
            <span>⏳ <strong>{deadline}</strong></span>
          </div>

          <div className="scheme-actions">
            {/* View Details — opens side drawer if callback provided, else navigates */}
            {onViewDetails ? (
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleViewDetails}
                style={{ flex: 1 }}
                aria-label={`View details for ${name}`}
              >
                <ArrowRight size={14} /> View Details
              </button>
            ) : (
              <Link to={`/schemes/${id}`} style={{ flex: 1 }}>
                <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  <ArrowRight size={14} /> View Details
                </button>
              </Link>
            )}

            {/* Apply Now CTA */}
            {scheme.application_url ? (
              <a
                href={scheme.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ flex: 1.2, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                aria-label={`Apply for ${name}`}
              >
                Apply Now <ExternalLink size={13} />
              </a>
            ) : (
              <Link to={`/schemes/${id}`} style={{ flex: 1.2 }}>
                <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                  Apply Now <ExternalLink size={13} />
                </button>
              </Link>
            )}

            {/* Bookmark Button */}
            {onToggleSave && (
              <button
                className={`btn btn-sm ${isSaved ? 'btn-accent' : 'btn-secondary'}`}
                onClick={() => onToggleSave(id)}
                title={isSaved ? 'Remove Bookmark' : 'Save Scheme'}
                aria-label={isSaved ? `Remove ${name} from saved` : `Save ${name}`}
                style={{ padding: '0.45rem 0.65rem' }}
              >
                {isSaved
                  ? <BookmarkCheck size={16} />
                  : <Bookmark size={16} />
                }
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
