import { useWelfora } from '../context/WelforaContext';

const NAV_ITEMS = [
  ['Dashboard', '▦'],
  ['Recommended', '✧'],
  ['Explore Schemes', '⌕'],
  ['My Applications', '▤'],
  ['Saved Schemes', '♡'],
  ['Deadlines', '◷'],
  ['AI Assistant', '✦'],
  ['Notifications', '♧'],
  ['Profile', '◉'],
  ['Settings', '⚙'],
];

export default function Sidebar({ page, go, onLogout }) {
  const { dark, setDark, profileName, visibleNotifications } = useWelfora();

  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => go('Dashboard')}>
        <span className="brand-mark">W</span>
        <span>
          <b>WELFORA</b>
          <small>Your Gateway to Government Benefits</small>
        </span>
      </button>

      <div className="side-nav">
        {NAV_ITEMS.map(([label, icon]) => (
          <button
            key={label}
            className={`nav-link ${page === label ? 'active' : ''}`}
            aria-current={page === label ? 'page' : undefined}
            onClick={() => go(label)}
          >
            <span className="nav-ico">{icon}</span>
            <span>{label}</span>
            {label === 'Notifications' && visibleNotifications.length > 0 && (
              <i className="nav-badge">{visibleNotifications.length}</i>
            )}
          </button>
        ))}
      </div>

      <div className="side-bottom">
        <button
          className="theme-switch"
          onClick={() => setDark(!dark)}
          title="Toggle color theme"
        >
          <span>
            {dark ? '☾' : '☼'} {dark ? 'Dark Mode' : 'Light Mode'}
          </span>
          <i className={dark ? 'switch on' : 'switch'}>
            <b />
          </i>
        </button>

        <div className="user-chip">
          <div className="avatar">
            {profileName.charAt(0).toUpperCase()}
          </div>
          <span>
            <b>{profileName}</b>
            <small>Your journey starts here</small>
          </span>
          <button
            className="dots"
            onClick={() => go('Profile')}
            title="Open profile"
          >
            ···
          </button>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          <span>↪</span>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
