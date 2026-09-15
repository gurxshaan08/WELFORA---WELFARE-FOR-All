import React, { useEffect, useRef, useCallback } from 'react';
import {
  X, ExternalLink, Bookmark, BookmarkCheck, MapPin, IndianRupee,
  Users, Calendar, FileText, CheckCircle, Building2, Tag,
  ClipboardList, ArrowRight, Shield
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// ── Helper: Category color classes ─────────────────────────────────────────
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

const formatAmount = (amount) => {
  if (!amount || amount === 0) return null;
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} Lakh`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
};

const formatIncomeLimitLabel = (income) => {
  if (!income) return 'No limit';
  if (income >= 100000) return `₹${(income / 100000).toFixed(1)} Lakh/year`;
  return `₹${income}/year`;
};

// ── Drawer Component ────────────────────────────────────────────────────────
export const SchemeDetailsDrawer = ({ scheme, isOpen, onClose }) => {
  const { savedSchemeIds, toggleSaveScheme } = useAuth();
  const closeButtonRef = useRef(null);
  const drawerRef = useRef(null);

  const isSaved = scheme ? savedSchemeIds.includes(scheme.id) : false;

  // Focus close button when drawer opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ESC key to close
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Backdrop click to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!scheme) return null;

  const benefitAmount = formatAmount(scheme.benefits?.amount);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? 'drawer-backdrop--open' : ''}`}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        ref={drawerRef}
        className={`scheme-drawer ${isOpen ? 'scheme-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={`Scheme details: ${scheme.name}`}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div style={{ flex: 1, minWidth: 0 }}>
            <span className={`category-badge ${getCategoryClass(scheme.category)}`} style={{ fontSize: '0.75rem', marginBottom: '0.5rem', display: 'inline-block' }}>
              {scheme.category}
            </span>
            <h2 className="drawer-title">{scheme.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
              <Building2 size={13} color="var(--neutral-500)" />
              <span style={{ fontSize: '0.825rem', color: 'var(--neutral-600)', fontWeight: 500 }}>
                {scheme.scheme_type || 'Central Scheme'}
              </span>
              <span style={{ color: 'var(--neutral-300)' }}>•</span>
              <MapPin size={13} color="var(--neutral-500)" />
              <span style={{ fontSize: '0.825rem', color: 'var(--neutral-600)' }}>
                {scheme.state || 'All States'}
              </span>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="drawer-close-btn"
            aria-label="Close scheme details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="drawer-body">

          {/* Disclaimer */}
          <div className="drawer-disclaimer">
            <Shield size={13} />
            Demo Preview • Sample Scheme Data
          </div>

          {/* Benefit Highlight */}
          {benefitAmount && (
            <div className="drawer-benefit-box">
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-700)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
                💰 Scheme Benefit
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-900)', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                {benefitAmount}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--neutral-700)', marginTop: '0.25rem' }}>
                {scheme.benefits?.description || scheme.benefit}
              </div>
            </div>
          )}

          {!benefitAmount && scheme.benefit && (
            <div className="drawer-benefit-box">
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-700)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
                🎁 Benefit
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--primary-900)', fontWeight: 600 }}>
                {scheme.benefit}
              </div>
            </div>
          )}

          {/* Eligibility Criteria Grid */}
          <div className="drawer-section">
            <h3 className="drawer-section-title">
              <CheckCircle size={16} /> Eligibility Criteria
            </h3>
            <div className="eligibility-grid">
              <div className="elig-item">
                <span className="elig-label"><Calendar size={13} /> Age Range</span>
                <span className="elig-value">
                  {scheme.target_age_min ?? 0} – {scheme.target_age_max ?? 120} years
                </span>
              </div>
              <div className="elig-item">
                <span className="elig-label"><Users size={13} /> Gender</span>
                <span className="elig-value">
                  {(scheme.eligible_gender || ['All']).join(', ')}
                </span>
              </div>
              <div className="elig-item">
                <span className="elig-label"><IndianRupee size={13} /> Income Limit</span>
                <span className="elig-value">
                  {formatIncomeLimitLabel(scheme.income_limit)}
                </span>
              </div>
              <div className="elig-item">
                <span className="elig-label"><MapPin size={13} /> State / UT</span>
                <span className="elig-value">{scheme.state || 'All States'}</span>
              </div>
              <div className="elig-item">
                <span className="elig-label"><Tag size={13} /> Scheme Type</span>
                <span className="elig-value">{scheme.scheme_type || 'Central'}</span>
              </div>
              <div className="elig-item">
                <span className="elig-label"><Shield size={13} /> Status</span>
                <span className="elig-value" style={{ color: 'var(--success-600)', fontWeight: 700 }}>
                  ✓ {scheme.status || 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="drawer-section">
            <h3 className="drawer-section-title">
              <ClipboardList size={16} /> About this Scheme
            </h3>
            <p style={{ color: 'var(--neutral-700)', lineHeight: '1.7', fontSize: '0.925rem' }}>
              {scheme.shortDescription}
            </p>
            {scheme.eligibility && (
              <div style={{
                marginTop: '0.85rem',
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--neutral-100)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--neutral-200)',
                fontSize: '0.875rem',
                color: 'var(--neutral-700)',
                lineHeight: '1.6'
              }}>
                <strong style={{ color: 'var(--primary-900)' }}>Eligibility Summary: </strong>
                {scheme.eligibility}
              </div>
            )}
          </div>

          {/* Required Documents */}
          {scheme.documents && scheme.documents.length > 0 && (
            <div className="drawer-section">
              <h3 className="drawer-section-title">
                <FileText size={16} /> Required Documents
              </h3>
              <ul className="document-list">
                {scheme.documents.map((doc, i) => (
                  <li key={i} className="document-item">
                    <span className="document-icon">📄</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Application Process */}
          {scheme.applicationProcess && (
            <div className="drawer-section">
              <h3 className="drawer-section-title">
                <ArrowRight size={16} /> How to Apply
              </h3>
              <div style={{
                backgroundColor: 'var(--primary-900)',
                color: 'var(--white)',
                padding: '1.1rem 1.25rem',
                borderRadius: 'var(--radius-xl)',
                fontSize: '0.9rem',
                lineHeight: '1.65'
              }}>
                {scheme.applicationProcess}
              </div>
            </div>
          )}

          {/* Deadline */}
          <div className="drawer-section">
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--warning-100)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #fde68a'
            }}>
              <Calendar size={16} color="var(--warning-600)" />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--warning-600)', textTransform: 'uppercase' }}>Application Deadline</div>
                <div style={{ fontWeight: 700, color: 'var(--primary-900)', fontSize: '0.925rem' }}>
                  {scheme.deadline || 'Open All Year Round'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer — Action Buttons */}
        <div className="drawer-footer">
          <button
            onClick={() => toggleSaveScheme(scheme.id)}
            className={`btn ${isSaved ? 'btn-accent' : 'btn-secondary'}`}
            style={{ flex: 1 }}
            aria-label={isSaved ? 'Remove bookmark' : 'Save scheme'}
          >
            {isSaved
              ? <><BookmarkCheck size={16} /> Saved</>
              : <><Bookmark size={16} /> Save</>
            }
          </button>

          {scheme.application_url ? (
            <a
              href={scheme.application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ flex: 2, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              Apply Now <ExternalLink size={15} />
            </a>
          ) : (
            <button className="btn btn-primary" style={{ flex: 2 }} disabled>
              Apply Now
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
