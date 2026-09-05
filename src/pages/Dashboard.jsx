import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEligibility } from '../hooks/useEligibility';
import { StatCard } from '../components/StatCard';
import { ProfileSummary } from '../components/ProfileSummary';
import { SchemeCard } from '../components/SchemeCard';
import { Button } from '../components/Button';

export const Dashboard = () => {
  const { user, profile, savedSchemeIds, toggleSaveScheme } = useAuth();
  
  // Custom Hook: Evaluates user profile against schemes
  const { eligibleSchemes, totalMatchedCount } = useEligibility(profile);

  return (
    <div className="container main-content">
      {/* Dashboard Header Greeting */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            CITIZEN DASHBOARD
          </span>
          <h1 className="section-title" style={{ marginTop: '0.2rem' }}>
            Welcome back, {user?.name || profile?.name || 'User'} 👋
          </h1>
          <p className="section-subtitle">
            Personalized government scheme eligibility overview for your profile.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem' }}>
          <Link to="/schemes">
            <Button variant="primary">
              Find My Benefits →
            </Button>
          </Link>
          <Link to="/assistant">
            <Button variant="accent">
              Ask AI Assistant 🤖
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row & Profile Summary Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.75rem',
        marginBottom: '3rem'
      }}>
        <ProfileSummary profile={profile} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <StatCard
            title="Potentially Eligible Schemes"
            value={`${totalMatchedCount} Schemes`}
            icon="🎯"
            theme="orange"
          />
          <StatCard
            title="Saved Schemes Bookmarked"
            value={`${savedSchemeIds.length} Saved`}
            icon="⭐"
            theme="navy"
          />
          <StatCard
            title="Criteria Match Level"
            value="High Relevance"
            icon="📊"
            theme="amber"
          />
        </div>
      </div>

      {/* Recommended Schemes Section */}
      <div className="section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            RULE MATCHED RECOMMENDATIONS
          </span>
          <h2 className="section-title" style={{ fontSize: '1.6rem', marginTop: '0.2rem' }}>
            Recommended Schemes For You
          </h2>
          <p className="section-subtitle">
            Based on your criteria ({profile?.state}, {profile?.occupation}, Income: ₹{Number(profile?.income).toLocaleString('en-IN')})
          </p>
        </div>
        <Link to="/schemes">
          <Button variant="outline" size="sm">Explore All Schemes →</Button>
        </Link>
      </div>

      {eligibleSchemes.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {eligibleSchemes.slice(0, 4).map(({ scheme, score }) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              isSaved={savedSchemeIds.includes(scheme.id)}
              onToggleSave={toggleSaveScheme}
              matchScore={score}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3 className="empty-title">No Exact Rule Matches Found</h3>
          <p className="empty-text">
            Try adjusting your profile criteria or explore all available schemes in the explorer.
          </p>
          <Link to="/profile">
            <Button variant="primary">Update Profile Criteria</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
