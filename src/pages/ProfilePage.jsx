import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { INDIAN_STATES } from '../data/mockSchemes';
import { Button } from '../components/Button';

export const ProfilePage = () => {
  const { profile, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    age: 20,
    state: 'Punjab',
    occupation: 'Student',
    education: 'Undergraduate',
    income: 200000,
    gender: 'Male'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setSavedSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);

    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  return (
    <div className="container main-content" style={{ maxWidth: '800px' }}>
      <div className="section-header">
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          CITIZEN PROFILE
        </span>
        <h1 className="section-title" style={{ marginTop: '0.25rem' }}>My Citizen Attributes</h1>
        <p className="section-subtitle">
          Update your demographic details to refine your scheme eligibility matching score.
        </p>
      </div>

      {savedSuccess && (
        <div style={{
          backgroundColor: 'var(--accent-50)',
          color: 'var(--accent-700)',
          border: '1px solid var(--accent-100)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2rem',
          fontSize: '0.95rem',
          fontWeight: 700
        }}>
          ✓ Profile attributes saved! Scheme recommendations recalculated.
        </div>
      )}

      <div className="card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-2xl)' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="prof-name">Full Name</label>
              <input
                id="prof-name"
                name="name"
                type="text"
                className="form-control"
                value={formData.name || ''}
                onChange={handleChange}
                required
              />
            </div>

            {/* Age */}
            <div className="form-group">
              <label className="form-label" htmlFor="prof-age">Age (Years)</label>
              <input
                id="prof-age"
                name="age"
                type="number"
                min="0"
                max="120"
                className="form-control"
                value={formData.age || ''}
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label className="form-label" htmlFor="prof-gender">Gender</label>
              <select
                id="prof-gender"
                name="gender"
                className="form-control"
                value={formData.gender || 'Male'}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* State */}
            <div className="form-group">
              <label className="form-label" htmlFor="prof-state">State / UT of Residence</label>
              <select
                id="prof-state"
                name="state"
                className="form-control"
                value={formData.state || 'Punjab'}
                onChange={handleChange}
              >
                {INDIAN_STATES.filter(s => s !== 'All States').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Occupation */}
            <div className="form-group">
              <label className="form-label" htmlFor="prof-occ">Occupation Category</label>
              <select
                id="prof-occ"
                name="occupation"
                className="form-control"
                value={formData.occupation || 'Student'}
                onChange={handleChange}
              >
                <option value="Student">Student</option>
                <option value="Farmer">Farmer</option>
                <option value="Agriculture Worker">Agriculture Worker</option>
                <option value="Self-Employed">Self-Employed / Entrepreneur</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Daily Wage Worker">Daily Wage Worker</option>
                <option value="Craftsperson">Artisan / Craftsperson</option>
                <option value="Senior Citizen">Senior Citizen / Retired</option>
              </select>
            </div>

            {/* Education */}
            <div className="form-group">
              <label className="form-label" htmlFor="prof-edu">Highest Education Level</label>
              <select
                id="prof-edu"
                name="education"
                className="form-control"
                value={formData.education || 'Undergraduate'}
                onChange={handleChange}
              >
                <option value="Primary">Primary School</option>
                <option value="Middle School">Middle School</option>
                <option value="High School">High School (10th)</option>
                <option value="Higher Secondary">Higher Secondary (12th)</option>
                <option value="Undergraduate">Undergraduate (B.Tech, B.Sc, B.A)</option>
                <option value="Postgraduate">Postgraduate (M.Tech, M.Sc, M.A)</option>
              </select>
            </div>

            {/* Annual Income */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label" htmlFor="prof-income">Annual Household Income (₹ INR)</label>
              <input
                id="prof-income"
                name="income"
                type="number"
                step="10000"
                className="form-control"
                value={formData.income || 0}
                onChange={handleChange}
                required
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', marginTop: '0.35rem', display: 'block' }}>
                Note: Used to evaluate income cap eligibility for scholarships and subsidies.
              </span>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" style={{ marginTop: '1.25rem' }}>
            Save & Recalculate Eligibility
          </Button>
        </form>
      </div>
    </div>
  );
};
