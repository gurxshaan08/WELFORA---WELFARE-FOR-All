import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { mockSchemes } from '../data/mockSchemes';
import { SchemeCard } from '../components/SchemeCard';
import { SchemeDetailsDrawer } from '../components/SchemeDetailsDrawer';

export const SavedSchemesPage = () => {
  const { savedSchemeIds, toggleSaveScheme } = useAuth();
  const [drawerScheme, setDrawerScheme] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const savedSchemes = mockSchemes.filter((s) => savedSchemeIds.includes(s.id));

  const handleViewDetails = (scheme) => {
    setDrawerScheme(scheme);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setDrawerScheme(null), 350);
  };

  return (
    <div className="container main-content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            My Library
          </span>
          <h1 className="section-title" style={{ marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bookmark size={26} color="var(--accent-600)" /> Saved Schemes
          </h1>
          <p className="section-subtitle">
            {savedSchemes.length > 0
              ? `You have bookmarked ${savedSchemes.length} government scheme${savedSchemes.length > 1 ? 's' : ''}.`
              : 'Start bookmarking schemes to track them here.'}
          </p>
        </div>
        {savedSchemes.length > 0 && (
          <Link to="/schemes">
            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowRight size={16} /> Explore More Schemes
            </button>
          </Link>
        )}
      </div>

      {/* Saved Schemes Grid */}
      {savedSchemes.length > 0 ? (
        <>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--accent-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--accent-100)',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            color: 'var(--accent-700)',
            fontWeight: 600
          }}>
            <span>📌 {savedSchemes.length} bookmarked scheme{savedSchemes.length > 1 ? 's' : ''}</span>
            <button
              onClick={() => savedSchemeIds.forEach((id) => toggleSaveScheme(id))}
              style={{ background: 'none', border: 'none', color: 'var(--danger-600)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem' }}
            >
              <Trash2 size={14} /> Remove All
            </button>
          </div>

          <div className="scheme-grid">
            {savedSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                isSaved={true}
                onToggleSave={toggleSaveScheme}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔖</div>
          <h3 className="empty-title">No Saved Schemes Yet</h3>
          <p className="empty-text">
            Browse government schemes and click the bookmark icon to save them here for quick access.
          </p>
          <Link to="/schemes">
            <button className="btn btn-primary">
              <ArrowRight size={16} /> Explore All Schemes
            </button>
          </Link>
        </div>
      )}

      {/* Drawer */}
      <SchemeDetailsDrawer
        scheme={drawerScheme}
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};
