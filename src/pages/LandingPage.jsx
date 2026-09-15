import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { SchemeCard } from '../components/SchemeCard';
import { SchemeDetailsDrawer } from '../components/SchemeDetailsDrawer';
import { LiveBenefitMatcher } from '../components/LiveBenefitMatcher';
import { mockSchemes, SCHEME_CATEGORIES } from '../data/mockSchemes';
import { useAuth } from '../hooks/useAuth';
import { citizenImages, citizenFallbacks } from '../utils/schemeImages';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Search,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  FileText
} from 'lucide-react';

const CATEGORY_TABS = [
  { name: 'Education', label: 'Education & Aid', icon: '🎓', color: '#2563eb', desc: 'Scholarships, fee waivers & girl child grants' },
  { name: 'Healthcare', label: 'Healthcare & Insurance', icon: '🏥', color: '#0284c7', desc: 'Cashless hospital covers & wellness grants' },
  { name: 'Agriculture', label: 'Agriculture & Farmers', icon: '🌾', color: '#16a34a', desc: 'PM-KISAN cash support, seed & crop insurance' },
  { name: 'Women & Child Welfare', label: 'Women & Child', icon: '👩‍👧', color: '#ec4899', desc: 'Sukanya Samriddhi & SHG micro-credit' },
  { name: 'Employment', label: 'Jobs & Skills', icon: '💼', color: '#f59e0b', desc: 'Skill India certification & MGNREGA wages' },
  { name: 'Housing', label: 'Housing & Shelter', icon: '🏠', color: '#8b5cf6', desc: 'PMAY home loans & construction subsidy' },
  { name: 'Senior Citizens', label: 'Senior Citizens', icon: '👴', color: '#d97706', desc: 'Old-age pension & medical equipment support' },
  { name: 'Entrepreneurship', label: 'Business & MSME', icon: '🚀', color: '#0d9488', desc: 'Collateral-free MUDRA loans & enterprise credit' },
];

export const LandingPage = () => {
  const { savedSchemeIds, toggleSaveScheme } = useAuth();
  const navigate = useNavigate();

  // Active Category for interactive compact view
  const [selectedCategory, setSelectedCategory] = useState('Education');
  // Selected scheme for Drawer
  const [drawerScheme, setDrawerScheme] = useState(null);

  // Filter schemes based on selected category
  const activeCategorySchemes = mockSchemes.filter(
    (s) => s.category === selectedCategory
  );

  const citizenPersonas = [
    { title: 'Students', text: 'Pre & Post-matric scholarships, merit aid, tuition waivers.', icon: '🎓', count: '3 Schemes' },
    { title: 'Farmers', text: 'Direct cash DBT, crop insurance, fertilizer subsidies.', icon: '🌾', count: '3 Schemes' },
    { title: 'Women & Families', text: 'Empowerment credit, child savings, maternal healthcare.', icon: '👩‍👧', count: '2 Schemes' },
    { title: 'Senior Citizens', text: 'Guaranteed pension annuities, free geriatric care.', icon: '👴', count: '1 Scheme' },
    { title: 'Small Business', text: 'Unsecured business loans, technology upgrade funds.', icon: '🚀', count: '2 Schemes' }
  ];

  return (
    <div className="landing-page-wrapper">
      {/* ── HERO SECTION WITH BOUNDARIES & LIVE BENEFIT MATCHER ── */}
      <section className="hero-section-bordered">
        <div className="container">
          <div className="hero-framed-container">
            {/* Left Narrative Column */}
            <div className="hero-content-col">
              <div className="hero-badge-pill">
                <span className="badge-flag">🇮🇳</span>
                <span>Unified Civic-Tech Discovery Platform</span>
                <span className="badge-pulse-dot" />
              </div>

              <h1 className="hero-title">
                Discover the benefits <br />
                <span className="hero-highlight-gradient">you're eligible for</span>.
              </h1>

              <p className="hero-subtitle">
                Welfora cuts through bureaucratic confusion across central and state ministries.
                Verify personalized benefits, application checklists, and direct cash transfer eligibility in seconds.
              </p>

              <div className="hero-cta-group">
                <Link to="/schemes" className="btn btn-primary btn-lg hero-cta-btn">
                  <span>Find My Benefits</span>
                  <ArrowRight size={17} />
                </Link>
                <Link to="/schemes" className="btn btn-secondary btn-lg hero-cta-btn">
                  <span>Explore 14 Schemes</span>
                </Link>
              </div>

              {/* Quick Trust Seals */}
              <div className="hero-trust-bar">
                <div className="trust-item">
                  <CheckCircle2 size={14} className="trust-icon" />
                  <span>100% Free Public Portal</span>
                </div>
                <div className="trust-item">
                  <ShieldCheck size={14} className="trust-icon" />
                  <span>Direct Benefit Transfer (DBT)</span>
                </div>
                <div className="trust-item">
                  <Users size={14} className="trust-icon" />
                  <span>Multi-Lingual Support</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column with LiveBenefitMatcher */}
            <div className="hero-visual-col">
              <div className="hero-visual-frame">
                <img
                  src={citizenImages.heroCitizen}
                  alt="Indian Citizens and Community"
                  className="hero-main-img"
                  onError={(e) => {
                    if (citizenFallbacks.heroCitizen && e.currentTarget.src !== citizenFallbacks.heroCitizen) {
                      e.currentTarget.src = citizenFallbacks.heroCitizen;
                    }
                  }}
                />
                <div className="hero-img-overlay-tint" />
              </div>

              {/* Live Animated Updating Benefit Matcher */}
              <LiveBenefitMatcher />
            </div>
          </div>
        </div>
      </section>

      {/* ── CIVIC TRUST & STAT STRIP (CRISP BOUNDARY) ── */}
      <section className="civic-stat-strip-section">
        <div className="container">
          <div className="civic-stat-grid">
            <div className="stat-strip-item">
              <span className="stat-num">14+</span>
              <span className="stat-desc">Flagship Central & State Schemes</span>
            </div>
            <div className="stat-divider-line" />
            <div className="stat-strip-item">
              <span className="stat-num">8</span>
              <span className="stat-desc">Welfare Citizen Categories</span>
            </div>
            <div className="stat-divider-line" />
            <div className="stat-strip-item">
              <span className="stat-num">28</span>
              <span className="stat-desc">States & UTs Covered Across India</span>
            </div>
            <div className="stat-divider-line" />
            <div className="stat-strip-item">
              <span className="stat-num">₹10 Lakhs+</span>
              <span className="stat-desc">Max Entitled Benefit Cap</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPACT INTERACTIVE SCHEMES-BY-CATEGORY HUB ── */}
      {/* "make the landing page look short and small open these when user click on these categoires" */}
      <section className="compact-category-hub-section" id="categories-hub">
        <div className="container">
          <div className="section-header-compact">
            <div className="header-eyebrow-tag">
              <Sparkles size={13} />
              <span>INTERACTIVE BENEFIT EXPLORER</span>
            </div>
            <h2 className="section-title">Explore Schemes by Category</h2>
            <p className="section-subtitle">
              Click any category below to instantly view eligible schemes without leaving this page.
            </p>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="category-tabs-scroll-wrapper">
            <div className="category-tabs-container">
              {CATEGORY_TABS.map((tab) => {
                const isSelected = selectedCategory === tab.name;
                const count = mockSchemes.filter((s) => s.category === tab.name).length;
                return (
                  <button
                    key={tab.name}
                    type="button"
                    className={`category-selector-tab ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedCategory(tab.name)}
                    style={{
                      '--cat-accent-color': tab.color
                    }}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <div className="tab-info">
                      <span className="tab-label">{tab.label}</span>
                      <span className="tab-count">{count} {count === 1 ? 'Scheme' : 'Schemes'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Category Display Banner */}
          {CATEGORY_TABS.find((t) => t.name === selectedCategory) && (
            <div className="category-active-banner">
              <div className="banner-left">
                <span className="banner-icon">
                  {CATEGORY_TABS.find((t) => t.name === selectedCategory)?.icon}
                </span>
                <div>
                  <h3 className="banner-title">
                    {CATEGORY_TABS.find((t) => t.name === selectedCategory)?.label}
                  </h3>
                  <p className="banner-desc">
                    {CATEGORY_TABS.find((t) => t.name === selectedCategory)?.desc}
                  </p>
                </div>
              </div>

              <Link
                to={`/schemes?category=${encodeURIComponent(selectedCategory)}`}
                className="banner-explore-link"
              >
                <span>Full Category Filter in Explorer</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Interactive Scheme Cards for the Selected Category */}
          <div className="compact-schemes-grid">
            {activeCategorySchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                isSaved={savedSchemeIds.includes(scheme.id)}
                onToggleSave={toggleSaveScheme}
                onSelect={(selected) => setDrawerScheme(selected)}
                showImage={true}
              />
            ))}
          </div>

          <div className="hub-bottom-action">
            <Link to="/schemes" className="btn btn-primary btn-md">
              <span>View All 14 Schemes in Explorer</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (COMPACT & FRAMED) ── */}
      <section id="how-it-works" className="how-it-works-bordered">
        <div className="container">
          <div className="section-header-compact">
            <span className="header-eyebrow-tag">
              <CheckCircle2 size={13} />
              <span>SIMPLE 4-STEP WORKFLOW</span>
            </span>
            <h2 className="section-title">How Welfora Works</h2>
            <p className="section-subtitle">
              From discovering schemes to direct application checklist in under 2 minutes.
            </p>
          </div>

          <div className="how-steps-grid">
            <div className="how-step-card">
              <div className="step-badge-row">
                <span className="step-num-pill">01</span>
                <span className="step-emoji">👤</span>
              </div>
              <h3 className="step-heading">Create Profile</h3>
              <p className="step-description">
                Input your state, age, occupation, and household income level.
              </p>
            </div>

            <div className="how-step-card">
              <div className="step-badge-row">
                <span className="step-num-pill">02</span>
                <span className="step-emoji">⚡</span>
              </div>
              <h3 className="step-heading">Auto-Evaluate</h3>
              <p className="step-description">
                Our eligibility engine matches official ministry criteria against your profile.
              </p>
            </div>

            <div className="how-step-card">
              <div className="step-badge-row">
                <span className="step-num-pill">03</span>
                <span className="step-emoji">📋</span>
              </div>
              <h3 className="step-heading">Review Checklist</h3>
              <p className="step-description">
                Inspect Aadhaar, BPL, income certificates, and required application docs.
              </p>
            </div>

            <div className="how-step-card">
              <div className="step-badge-row">
                <span className="step-num-pill">04</span>
                <span className="step-emoji">🚀</span>
              </div>
              <h3 className="step-heading">Direct Apply</h3>
              <p className="step-description">
                Follow verified official portal links to claim direct benefit transfers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CITIZEN PERSONA STRIP (COMPACT) ── */}
      <section className="citizen-persona-section">
        <div className="container">
          <div className="persona-strip-container">
            <div className="persona-strip-header">
              <h3 className="persona-strip-title">Built For Every Citizen</h3>
              <p className="persona-strip-desc">Dedicated programs categorized by citizen demographics</p>
            </div>

            <div className="persona-pills-row">
              {citizenPersonas.map((p, i) => (
                <div key={i} className="persona-box-card">
                  <div className="persona-box-top">
                    <span className="persona-box-icon">{p.icon}</span>
                    <span className="persona-box-badge">{p.count}</span>
                  </div>
                  <h4 className="persona-box-name">{p.title}</h4>
                  <p className="persona-box-text">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scheme Details Slide-Over Drawer */}
      <SchemeDetailsDrawer
        scheme={drawerScheme}
        isOpen={Boolean(drawerScheme)}
        onClose={() => setDrawerScheme(null)}
        isSaved={drawerScheme ? savedSchemeIds.includes(drawerScheme.id) : false}
        onToggleSave={toggleSaveScheme}
      />
    </div>
  );
};
