export default function SchemeCard({ scheme, saved, onSave, onOpen, onApply }) {
  const fitScore = scheme.fit?.score ?? scheme.match;

  return (
    <article className="scheme-card">
      <div className="scheme-card-top">
        <div className={`scheme-symbol ${scheme.color}`}>{scheme.icon}</div>
        <button
          className={`save-heart ${saved ? 'saved' : ''}`}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${scheme.name} from saved schemes` : `Save ${scheme.name}`}
          onClick={onSave}
          title={saved ? 'Remove from saved' : 'Save scheme'}
        >
          {saved ? '♥' : '♡'}
        </button>
      </div>

      <span className="category-tag">{scheme.category}</span>
      <h3>{scheme.name}</h3>
      <p>{scheme.description}</p>

      <div className="scheme-card-foot">
        <span className="match-pill">✦ {fitScore}% potential fit</span>
        <span className="scheme-deadline">◷ {scheme.deadline}</span>
      </div>

      <div className="scheme-card-actions">
        <button className="outline-btn" onClick={onOpen}>
          Details
        </button>
        <button className="primary-btn" onClick={onApply}>
          Track scheme ↗
        </button>
      </div>
    </article>
  );
}
