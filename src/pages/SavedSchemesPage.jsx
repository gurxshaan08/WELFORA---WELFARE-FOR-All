import React from 'react';
import { Link } from 'react-router-dom';
import { mockSchemes } from '../data/mockSchemes';
import { useAuth } from '../hooks/useAuth';
import { SchemeCard } from '../components/SchemeCard';
import { Button } from '../components/Button';

export const SavedSchemesPage = () => {
  const { savedSchemeIds, toggleSaveScheme } = useAuth();

  // Filter scheme objects matching saved IDs
  const savedSchemes = mockSchemes.filter((scheme) => savedSchemeIds.includes(scheme.id));

  return (
    <div className="container main-content">
      <div className="section-header">
        <h1 className="section-title">My Saved Schemes</h1>
        <p className="section-subtitle">
          Manage schemes you have bookmarked for easy reference and application tracking.
        </p>
      </div>

      {savedSchemes.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {savedSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              isSaved={true}
              onToggleSave={toggleSaveScheme}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <h3 className="empty-title">You haven't saved any schemes yet.</h3>
          <p className="empty-text">
            Explore government welfare programs and click the "Save" button on any scheme to bookmark it here for later.
          </p>
          <Link to="/schemes">
            <Button variant="primary">Browse Scheme Explorer</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
