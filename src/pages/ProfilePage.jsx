import { useState } from 'react';
import PageTitle from '../components/PageTitle';
import { useWelfora } from '../context/WelforaContext';
import './ProfilePage.css';

export default function ProfilePage({ go }) {
  const {
    profileName,
    authSession,
    eligibility,
    additionalProfile,
    setAdditionalProfile,
    notify,
  } = useWelfora();

  // Signup Details (Immutable / Non-changeable)
  const signupName = authSession?.name || profileName || 'Welfora Citizen';
  const signupEmail = authSession?.email || 'citizen@welfora.in';
  const signupAge = authSession?.profile?.age || eligibility?.age || '20';
  const signupState = authSession?.profile?.state || eligibility?.state || 'Punjab';
  const signupOccupation = authSession?.profile?.occupation || eligibility?.occupation || 'Student';
  const signupIncome = authSession?.profile?.income || 'Below ₹1 lakh';
  const signupEducation = authSession?.profile?.education || eligibility?.education || (signupOccupation === 'Student' ? 'Undergraduate' : 'Completed');
  const signupInterests =
    authSession?.profile?.interests && authSession.profile.interests.length > 0
      ? authSession.profile.interests
      : ['Scholarships & Education', 'General Financial Assistance'];

  // Additional Details State (Editable, only exists in Profile section)
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({ ...additionalProfile });

  const handleStartEdit = () => {
    setDraft({ ...additionalProfile });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setDraft({ ...additionalProfile });
    setIsEditing(false);
  };

  const handleSaveAdditional = e => {
    e.preventDefault();
    setAdditionalProfile(draft);
    setIsEditing(false);
    if (notify) {
      notify('Additional citizen details saved successfully!');
    }
  };

  const updateDraft = (field, val) => {
    setDraft(prev => ({ ...prev, [field]: val }));
  };

  return (
    <section className="page-content profile-page">
      <PageTitle
        eyebrow="CITIZEN IDENTITY"
        title="My Profile"
        subtitle="Review your registered credentials and provide additional citizen details to unlock tailored public welfare schemes."
      />

      {/* Profile Hero Card */}
      <div className="profile-hero-card">
        <div className="profile-hero-left">
          <div className="profile-large-avatar">
            {signupName.charAt(0).toUpperCase()}
          </div>
          <div className="profile-hero-meta">
            <h2>{signupName}</h2>
            <p>{signupEmail}</p>
            <div className="profile-status-badges">
              <span className="profile-chip chip-verified">
                ✓ Verified Account
              </span>
              <span className="profile-chip chip-role">
                {signupOccupation} · {signupState}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-hero-actions">
          <button className="outline-btn" onClick={() => go('Settings')}>
            ⚙️ Account Settings
          </button>
        </div>
      </div>

      {/* 1. REGISTRATION DETAILS SECTION (NON-CHANGEABLE) */}
      <div className="profile-section-panel">
        <div className="profile-section-header">
          <div className="section-header-title">
            <div className="section-icon-badge icon-locked">🔒</div>
            <div className="section-title-texts">
              <h3>
                Registration Details
                <span className="lock-tag">Locked · From Sign Up</span>
              </h3>
              <p>
                These foundational credentials were provided during account registration and cannot be modified.
              </p>
            </div>
          </div>
        </div>

        <div className="locked-grid">
          <div className="locked-field-card">
            <span className="locked-field-label">
              Full Name <span className="field-lock-icon">🔒</span>
            </span>
            <span className="locked-field-val">{signupName}</span>
          </div>

          <div className="locked-field-card">
            <span className="locked-field-label">
              Email Address <span className="field-lock-icon">🔒</span>
            </span>
            <span className="locked-field-val">{signupEmail}</span>
          </div>

          <div className="locked-field-card">
            <span className="locked-field-label">
              Age <span className="field-lock-icon">🔒</span>
            </span>
            <span className="locked-field-val">{signupAge} years</span>
          </div>

          <div className="locked-field-card">
            <span className="locked-field-label">
              State / UT <span className="field-lock-icon">🔒</span>
            </span>
            <span className="locked-field-val">{signupState}</span>
          </div>

          <div className="locked-field-card">
            <span className="locked-field-label">
              Occupation <span className="field-lock-icon">🔒</span>
            </span>
            <span className="locked-field-val">{signupOccupation}</span>
          </div>

          <div className="locked-field-card">
            <span className="locked-field-label">
              Household Income <span className="field-lock-icon">🔒</span>
            </span>
            <span className="locked-field-val">{signupIncome}</span>
          </div>

          {signupEducation && (
            <div className="locked-field-card">
              <span className="locked-field-label">
                Education Level <span className="field-lock-icon">🔒</span>
              </span>
              <span className="locked-field-val">{signupEducation}</span>
            </div>
          )}
        </div>

        {/* Interests provided at signup */}
        <div className="interests-display-block">
          <span className="interests-display-label">
            Benefit Areas of Interest (Selected at Sign Up) <span className="field-lock-icon">🔒</span>
          </span>
          <div className="interests-chips-wrap">
            {signupInterests.map(interest => (
              <span className="interest-locked-chip" key={interest}>
                ✓ {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="locked-disclaimer-note">
          <span>ℹ️</span>
          <span>
            These parameters are locked to maintain demo integrity and preserve initial eligibility matching.
            To add new criteria, complete the Additional Citizen Details below.
          </span>
        </div>
      </div>

      {/* 2. ADDITIONAL DETAILS SECTION (PROFILE ONLY - NOT IN SIGNUP) */}
      <div className="profile-section-panel">
        <div className="profile-section-header">
          <div className="section-header-title">
            <div className="section-icon-badge icon-editable">✨</div>
            <div className="section-title-texts">
              <h3>
                Additional Citizen Details
                <span className="lock-tag" style={{ color: 'var(--cyan)', borderColor: 'rgba(68, 216, 255, 0.3)' }}>
                  Profile Only · Editable
                </span>
              </h3>
              <p>
                These supplemental attributes were not asked during sign up. Fill them out here to discover specialized welfare schemes.
              </p>
            </div>
          </div>

          {!isEditing && (
            <button className="btn-edit-trigger" onClick={handleStartEdit}>
              ✎ Edit Additional Details
            </button>
          )}
        </div>

        {!isEditing ? (
          /* View Mode */
          <div className="additional-details-view-grid">
            <div className="additional-field-card">
              <span className="additional-field-label">Gender / Identity</span>
              <span className="additional-field-val">
                {additionalProfile.gender || <span className="not-set">Not specified</span>}
              </span>
            </div>

            <div className="additional-field-card">
              <span className="additional-field-label">Social Category / Caste Group</span>
              <span className="additional-field-val">
                {additionalProfile.category || <span className="not-set">General</span>}
              </span>
            </div>

            <div className="additional-field-card">
              <span className="additional-field-label">Differently-Abled (PwD)</span>
              <span className="additional-field-val">
                {additionalProfile.disability || <span className="not-set">No</span>}
              </span>
            </div>

            <div className="additional-field-card">
              <span className="additional-field-label">Marital Status</span>
              <span className="additional-field-val">
                {additionalProfile.maritalStatus || <span className="not-set">Single</span>}
              </span>
            </div>

            <div className="additional-field-card">
              <span className="additional-field-label">Area / Locality Type</span>
              <span className="additional-field-val">
                {additionalProfile.areaType || <span className="not-set">Urban</span>}
              </span>
            </div>

            <div className="additional-field-card">
              <span className="additional-field-label">Minority Community Status</span>
              <span className="additional-field-val">
                {additionalProfile.minority || <span className="not-set">No</span>}
              </span>
            </div>

            <div className="additional-field-card">
              <span className="additional-field-label">Contact Mobile</span>
              <span className="additional-field-val">
                {additionalProfile.phone || <span className="not-set">Not provided</span>}
              </span>
            </div>

            <div className="additional-field-card">
              <span className="additional-field-label">District / Residence Area</span>
              <span className="additional-field-val">
                {additionalProfile.district || <span className="not-set">Not provided</span>}
              </span>
            </div>

            <div className="additional-field-card full-width">
              <span className="additional-field-label">Special Needs or Circumstances</span>
              <span className="additional-field-val">
                {additionalProfile.notes || (
                  <span className="not-set">
                    None recorded (e.g., single parent, first-generation graduate, BPL ration card holder)
                  </span>
                )}
              </span>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form className="additional-edit-form" onSubmit={handleSaveAdditional}>
            <div className="additional-form-grid">
              <div className="additional-input-group">
                <label htmlFor="field-gender">Gender / Identity</label>
                <select
                  id="field-gender"
                  value={draft.gender}
                  onChange={e => updateDraft('gender', e.target.value)}
                >
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Non-binary / Other">Non-binary / Other</option>
                </select>
              </div>

              <div className="additional-input-group">
                <label htmlFor="field-category">Social Category / Reservation Group</label>
                <select
                  id="field-category"
                  value={draft.category}
                  onChange={e => updateDraft('category', e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="OBC (Other Backward Classes)">OBC (Other Backward Classes)</option>
                  <option value="SC (Scheduled Caste)">SC (Scheduled Caste)</option>
                  <option value="ST (Scheduled Tribe)">ST (Scheduled Tribe)</option>
                  <option value="EWS (Economically Weaker Section)">EWS (Economically Weaker Section)</option>
                </select>
              </div>

              <div className="additional-input-group">
                <label htmlFor="field-disability">Differently-Abled (PwD) Status</label>
                <select
                  id="field-disability"
                  value={draft.disability}
                  onChange={e => updateDraft('disability', e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Yes (Locomotive / Physical)">Yes (Locomotive / Physical)</option>
                  <option value="Yes (Visual / Hearing)">Yes (Visual / Hearing)</option>
                  <option value="Yes (Other benchmark disability)">Yes (Other benchmark disability)</option>
                </select>
              </div>

              <div className="additional-input-group">
                <label htmlFor="field-marital">Marital Status</label>
                <select
                  id="field-marital"
                  value={draft.maritalStatus}
                  onChange={e => updateDraft('maritalStatus', e.target.value)}
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated / Divorced">Separated / Divorced</option>
                </select>
              </div>

              <div className="additional-input-group">
                <label htmlFor="field-area">Area / Locality Type</label>
                <select
                  id="field-area"
                  value={draft.areaType}
                  onChange={e => updateDraft('areaType', e.target.value)}
                >
                  <option value="Urban">Urban</option>
                  <option value="Rural">Rural</option>
                  <option value="Semi-Urban">Semi-Urban</option>
                </select>
              </div>

              <div className="additional-input-group">
                <label htmlFor="field-minority">Minority Community Member</label>
                <select
                  id="field-minority"
                  value={draft.minority}
                  onChange={e => updateDraft('minority', e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Yes (Recognized Minority Community)">Yes (Recognized Minority Community)</option>
                </select>
              </div>

              <div className="additional-input-group">
                <label htmlFor="field-phone">Contact Mobile Number</label>
                <input
                  id="field-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={draft.phone}
                  onChange={e => updateDraft('phone', e.target.value)}
                />
              </div>

              <div className="additional-input-group">
                <label htmlFor="field-district">District / City</label>
                <input
                  id="field-district"
                  type="text"
                  placeholder="e.g. Amritsar, Ludhiana, Jaipur"
                  value={draft.district}
                  onChange={e => updateDraft('district', e.target.value)}
                />
              </div>

              <div className="additional-input-group full-width">
                <label htmlFor="field-notes">Special Circumstances & Notes</label>
                <textarea
                  id="field-notes"
                  placeholder="Mention any specific criteria like BPL card, first-generation scholar, artisanal background, etc."
                  value={draft.notes}
                  onChange={e => updateDraft('notes', e.target.value)}
                />
              </div>
            </div>

            <div className="additional-form-actions">
              <button
                type="button"
                className="btn-cancel-additional"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button type="submit" className="btn-save-additional">
                ✓ Save Additional Details
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button className="outline-btn" onClick={() => go('Settings')}>
          Open Settings & Preferences ⚙
        </button>
        <button className="primary-btn" onClick={() => go('Explore Schemes')}>
          Explore Schemes with My Profile →
        </button>
      </div>
    </section>
  );
}
