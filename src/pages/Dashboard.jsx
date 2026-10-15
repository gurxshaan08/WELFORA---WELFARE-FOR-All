import Metric from '../components/Metric';
import QuickStat from '../components/QuickStat';
import { categories } from '../data/categories';
import { formatDaysRemaining } from '../utils/schemeUtils';
import { useWelfora } from '../context/WelforaContext';

export default function Dashboard({ go, query, setQuery, setCategory }) {
  const {
    schemes,
    saved,
    applied,
    profileName,
    deadlineItems,
    reminderPreferences,
    setSelectedScheme,
  } = useWelfora();

  const recommended = [schemes[0], schemes[2], schemes[3], schemes[4]].filter(Boolean);

  return (
    <section className="dashboard-content">
      {/* Hero Banner */}
      <div className="hero">
        <div className="hero-copy">
          <div className="hero-badge">
            <span>◉</span> EMPOWERING CITIZENS, BUILDING A BETTER TOMORROW
          </div>
          <h1>
            Find. Understand.<br />Apply. <span>Succeed.</span>
          </h1>
          <p>
            Discover government schemes you are eligible for, understand them in simple language, and get guidance at every step.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => go('Eligibility Guide')}>
              Find schemes you qualify for <span>→</span>
            </button>
            <button className="hero-secondary" onClick={() => go('Explore Schemes')}>
              Explore schemes
            </button>
          </div>
        </div>

        <div className="hero-art">
          <div className="art-glow" />
          <div className="building-grid">
            <div className="building-dome" />
            <div className="building-roof" />
            <div className="building-top" />
            <div className="building-columns">
              {Array.from({ length: 7 }, (_, i) => <i key={i} />)}
            </div>
            <div className="building-base" />
          </div>
          <div className="art-orbit orbit-a" />
          <div className="art-orbit orbit-b" />
          <div className="float-tag tag-edu"><span>🎓</span> Scholarships</div>
          <div className="float-tag tag-health"><span>✚</span> Healthcare</div>
          <div className="float-tag tag-home"><span>⌂</span> Housing</div>
          <div className="float-tag tag-money"><span>₹</span> Subsidies</div>
          <div className="float-tag tag-aid"><span>♧</span> Financial aid</div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metric-row">
        <Metric icon="♧" color="violet" value="1.2K+" label="Schemes Available" />
        <Metric icon="◈" color="blue" value="28" label="States Covered" />
        <Metric icon="♙" color="pink" value="3.5M+" label="Citizens Helped" />
        <Metric icon="✓" color="mint" value="98%" label="User Satisfaction" />
      </div>

      {/* Welcome & Quick Stats */}
      <div className="welcome-panel">
        <div className="welcome-title">
          <div>
            <h2>
              👋 Welcome back, <span>{profileName}!</span>
            </h2>
            <p>Here's what's happening today.</p>
          </div>
          <label className="searchbox welcome-search">
            <span>⌕</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && go('Explore Schemes')}
              placeholder="Search schemes, benefits..."
            />
            <button onClick={() => go('Explore Schemes')}>↗</button>
          </label>
        </div>

        <div className="quick-stats">
          <QuickStat
            icon="🎓"
            title="Eligible Schemes"
            number="12"
            color="violet"
            onClick={() => go('Recommended')}
          />
          <QuickStat
            icon="▣"
            title="Saved Schemes"
            number={saved.length}
            color="blue"
            onClick={() => go('Saved Schemes')}
          />
          <QuickStat
            icon="▤"
            title="Applications in Progress"
            number={applied.length}
            color="mint"
            onClick={() => go('My Applications')}
          />
          <QuickStat
            icon="▣"
            title="Upcoming Deadlines"
            number={reminderPreferences.upcomingDeadlines ? deadlineItems.length : 0}
            color="orange"
            onClick={() => go('Deadlines')}
          />
        </div>
      </div>

      {/* Dashboard Lower Grid */}
      <div className="dashboard-lower">
        <div className="panel recommendation-panel">
          <div className="panel-heading">
            <h2>Top Recommended for You</h2>
            <button onClick={() => go('Recommended')}>View all ↗</button>
          </div>
          {recommended.map(s => (
            <button className="recommend-row" key={s.id} onClick={() => setSelectedScheme(s)}>
              <span className={`scheme-symbol ${s.color}`}>{s.icon}</span>
              <span className="recommend-name">
                <b>{s.name}</b>
                <i>
                  <span style={{ width: `${s.match}%` }} />
                </i>
              </span>
              <span className="match">{s.match}% match</span>
              <span className="row-arrow">›</span>
            </button>
          ))}
        </div>

        <div className="right-stack">
          <div className="panel deadlines-panel">
            <div className="panel-heading">
              <h2>Upcoming Deadlines</h2>
              <button onClick={() => go('Deadlines')}>View all ↗</button>
            </div>
            {(reminderPreferences.upcomingDeadlines ? deadlineItems.slice(0, 3) : []).map((s, i) => (
              <button className="deadline-mini" key={s.id} onClick={() => setSelectedScheme(s)}>
                <span className={`tiny-date ${['orange', 'pink', 'blue'][i] || 'blue'}`}>◷</span>
                <b>{s.name}</b>
                <span>{s.deadline}</span>
                <i>{formatDaysRemaining(s.parsedDeadline)}</i>
              </button>
            ))}
            {(!reminderPreferences.upcomingDeadlines || deadlineItems.length === 0) && (
              <div className="deadline-empty-note">
                No dated reminders shown. Check official notices for current dates.
              </div>
            )}
          </div>

          <button className="assistant-banner" onClick={() => go('AI Assistant')}>
            <span className="assistant-mini">✦</span>
            <span>
              <b>Welfora Assistant</b>
              <small>Ask about schemes, eligibility, documents...</small>
            </span>
            <span className="assistant-go">↗</span>
          </button>
        </div>
      </div>

      {/* Category Strip */}
      <div className="category-strip">
        <div className="panel-heading">
          <div>
            <h2>Explore by category</h2>
            <p>Find support for what matters to you.</p>
          </div>
          <button onClick={() => go('Explore Schemes')}>All categories ↗</button>
        </div>
        <div className="category-tiles">
          {categories.map(c => (
            <button
              className="category-tile"
              key={c[0]}
              onClick={() => {
                setCategory(c[0]);
                go('Explore Schemes');
              }}
            >
              <span className={`category-icon ${c[3]}`}>{c[1]}</span>
              <b>{c[0]}</b>
              <small>{c[2]}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
