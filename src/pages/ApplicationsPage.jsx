import { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Empty from '../components/Empty';
import { useWelfora } from '../context/WelforaContext';
import './ApplicationsPage.css';

const STATUS_PROGRESS = {
  'Not started': 10,
  'Preparing documents': 35,
  'Ready to apply': 60,
  Submitted: 85,
  'Follow up required': 95,
  Completed: 100,
};

const STATUS_OPTIONS = [
  'Not started',
  'Preparing documents',
  'Ready to apply',
  'Submitted',
  'Follow up required',
  'Completed',
];

const STANDARD_DOCUMENTS = [
  'Identity proof (if required)',
  'Residence proof (if required)',
  'Income certificate (if required)',
  'Bank details (if required)',
  'Scheme-specific supporting documents',
];

export default function ApplicationsPage({ go }) {
  const {
    schemes,
    applied,
    applicationStatuses,
    updateApplicationStatus,
    documentChecks,
    toggleDocumentCheck,
    applicationNotes,
    saveApplicationNote,
    removeApplication,
    setSelectedScheme,
  } = useWelfora();

  const [editingId, setEditingId] = useState(null);
  const [noteDraft, setNoteDraft] = useState('');

  const appliedSchemes = schemes.filter(s => applied.includes(s.id));

  function handleStartEditNote(schemeId) {
    if (editingId === schemeId) {
      setEditingId(null);
      setNoteDraft('');
    } else {
      setEditingId(schemeId);
      setNoteDraft(applicationNotes[schemeId] || '');
    }
  }

  function handleSaveNote(schemeId) {
    saveApplicationNote(schemeId, noteDraft.trim());
    setEditingId(null);
  }

  function handleCancelNote() {
    setEditingId(null);
    setNoteDraft('');
  }

  return (
    <section className="page-content applications-page">
      <PageTitle
        eyebrow="STAY ON TRACK"
        title="My applications"
        subtitle="Manage your personal progress and document checklist. Welfora does not submit applications to government portals."
      />

      <div className="application-list">
        {appliedSchemes.map(scheme => {
          const status = applicationStatuses[scheme.id] || 'Not started';
          const progress = STATUS_PROGRESS[status] || 10;
          const checked = documentChecks[scheme.id] || [];
          const note = applicationNotes[scheme.id];
          const isEditing = editingId === scheme.id;
          const statusClass = `status-${status.toLowerCase().replace(/\s+/g, '-')}`;

          return (
            <div className="application-card application-card-expanded" key={scheme.id}>
              <div className={`scheme-symbol ${scheme.color}`}>
                {scheme.icon}
              </div>

              <div className="application-info">
                <h3>{scheme.name}</h3>
                <p className="application-subtitle">{scheme.category} · Personal tracker</p>

                <div className="tracker-status-row">
                  <label className="tracker-label">
                    Application status:
                    <select
                      value={status}
                      onChange={e => updateApplicationStatus(scheme.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="progress-track">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <small className="progress-caption">
                  {progress}% progress · Update this status as you proceed
                </small>

                <div className="document-checklist">
                  <b>📋 Document checklist</b>
                  {STANDARD_DOCUMENTS.map(doc => {
                    const isChecked = checked.includes(doc);
                    return (
                      <label
                        key={doc}
                        className={`document-check ${isChecked ? 'checked-item' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleDocumentCheck(scheme.id, doc)}
                        />
                        <span>{doc}</span>
                      </label>
                    );
                  })}
                  <small>
                    {checked.length} of {STANDARD_DOCUMENTS.length} checklist items completed. Confirm exact requirements on the official scheme portal.
                  </small>
                </div>

                {/* Edit Note Form (active when editing) */}
                {isEditing && (
                  <div className="edit-note-row">
                    <label>
                      <span>Personal note</span>
                      <textarea
                        value={noteDraft}
                        onChange={e => setNoteDraft(e.target.value)}
                        placeholder="Add a reminder, reference number, or next step..."
                        rows={3}
                        autoFocus
                      />
                    </label>
                    <div className="edit-note-actions">
                      <button
                        type="button"
                        className="primary-btn"
                        onClick={() => handleSaveNote(scheme.id)}
                      >
                        Save note
                      </button>
                      <button
                        type="button"
                        className="outline-btn"
                        onClick={handleCancelNote}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Saved Note (prominently visible below) */}
                {note && !isEditing && (
                  <div className="saved-application-note">
                    <div className="saved-note-header">
                      <b>📝 Personal Note</b>
                    </div>
                    <p className="saved-note-text">{note}</p>
                  </div>
                )}

                <div className="tracker-actions">
                  <button
                    type="button"
                    className="outline-btn"
                    onClick={() => setSelectedScheme(scheme)}
                  >
                    View details
                  </button>
                  <button
                    type="button"
                    className="outline-btn"
                    onClick={() => handleStartEditNote(scheme.id)}
                  >
                    {isEditing ? 'Close note' : note ? 'Edit note' : 'Add note'}
                  </button>
                  <button
                    type="button"
                    className="outline-btn danger-btn"
                    onClick={() => removeApplication(scheme.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <span className={`status-pill ${statusClass}`}>{status}</span>
            </div>
          );
        })}

        {appliedSchemes.length === 0 && (
          <Empty
            title="Your tracker is ready"
            text="Open a scheme and select “Track application” to keep it here."
            action="Explore schemes"
            onAction={() => go('Explore Schemes')}
          />
        )}
      </div>
    </section>
  );
}
