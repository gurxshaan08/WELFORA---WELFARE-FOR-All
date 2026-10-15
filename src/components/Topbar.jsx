import { useWelfora } from '../context/WelforaContext';

const TOP_LINKS = ['Home', 'Schemes', 'Dashboard', 'AI Assistant', 'About Us'];

export default function Topbar({ page, go }) {
  const { profileName, visibleNotifications } = useWelfora();

  function handleTopLink(linkName) {
    if (linkName === 'Home') go('Dashboard');
    else if (linkName === 'Schemes') go('Explore Schemes');
    else if (linkName === 'About Us') go('About Us');
    else go(linkName);
  }

  function isLinkActive(linkName) {
    if (linkName === 'Dashboard' && page === 'Dashboard') return true;
    if (linkName === 'Schemes' && page === 'Explore Schemes') return true;
    if (linkName === 'Home' && (page === 'Home' || page === 'Dashboard')) return false;
    return page === linkName;
  }

  return (
    <header className="topbar">
      <div className="crumb">
        <span>Workspace</span>
        <b>/</b>
        <strong>{page}</strong>
      </div>

      <nav className="top-links">
        {TOP_LINKS.map(item => (
          <button
            key={item}
            className={isLinkActive(item) ? 'chosen' : ''}
            onClick={() => handleTopLink(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="top-actions">
        <button
          className="round"
          title="Search schemes"
          onClick={() => go('Explore Schemes')}
        >
          ⌕
        </button>

        <button
          className="round"
          title="Notifications"
          onClick={() => go('Notifications')}
        >
          ♧
          {visibleNotifications.length > 0 && <i className="ping" />}
        </button>

        <div className="mini-avatar">
          {profileName.charAt(0).toUpperCase()}
        </div>

        <button className="outline-btn" onClick={() => go('Profile')}>
          Profile
        </button>

        <button
          className="primary-btn small"
          onClick={() => go('Explore Schemes')}
        >
          Get Started
        </button>
      </div>
    </header>
  );
}
