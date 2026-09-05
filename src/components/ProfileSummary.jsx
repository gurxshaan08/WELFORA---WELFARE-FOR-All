import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export const ProfileSummary = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="card" style={{ height: '100%', padding: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: '3.75rem',
          height: '3.75rem',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-100)',
          color: 'var(--accent-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          fontWeight: '700'
        }}>
          👤
        </div>
        <div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: 'var(--primary-900)' }}>
            {profile.name || 'Citizen Profile'}
          </h3>
          <span style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', fontWeight: 600 }}>
            📍 {profile.state} | {profile.occupation}
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.85rem',
        padding: '1.25rem',
        backgroundColor: 'var(--neutral-100)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '1.5rem',
        fontSize: '0.9rem',
        border: '1px solid var(--neutral-200)'
      }}>
        <div>
          <span style={{ color: 'var(--neutral-600)', display: 'block', fontSize: '0.775rem' }}>Age</span>
          <strong style={{ color: 'var(--primary-900)' }}>{profile.age} Years</strong>
        </div>
        <div>
          <span style={{ color: 'var(--neutral-600)', display: 'block', fontSize: '0.775rem' }}>Gender</span>
          <strong style={{ color: 'var(--primary-900)' }}>{profile.gender}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--neutral-600)', display: 'block', fontSize: '0.775rem' }}>Annual Income</span>
          <strong style={{ color: 'var(--primary-900)' }}>₹{Number(profile.income).toLocaleString('en-IN')}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--neutral-600)', display: 'block', fontSize: '0.775rem' }}>Education</span>
          <strong style={{ color: 'var(--primary-900)' }}>{profile.education}</strong>
        </div>
      </div>

      <Link to="/profile">
        <Button variant="secondary" size="sm" fullWidth>
          Edit Profile Criteria ⚙️
        </Button>
      </Link>
    </div>
  );
};
