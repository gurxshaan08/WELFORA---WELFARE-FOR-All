import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X, ChevronDown, Sun, Moon, Bookmark, ArrowRight, User } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { NavSearchBar } from './NavSearchBar';

const CATEGORY_ITEMS = [
  { name: 'Education', title: 'Education & Scholarships', icon: '🎓', desc: 'Higher ed aid, tuition waivers, student grants', count: 3, color: '#2563eb' },
  { name: 'Healthcare', title: 'Healthcare & Insurance', icon: '🏥', desc: 'Ayushman Bharat PM-JAY, medical covers', count: 2, color: '#0284c7' },
  { name: 'Agriculture', title: 'Agriculture & Farmers', icon: '🌾', desc: 'PM-KISAN cash support, crop insurance & seed aid', count: 3, color: '#16a34a' },
  { name: 'Women & Child Welfare', title: 'Women & Child Welfare', icon: '👩‍👧', desc: 'Sukanya Samriddhi, SHG empowerment, girl child grants', count: 2, color: '#ec4899' },
  { name: 'Employment', title: 'Employment & Skills', icon: '💼', desc: 'Job guarantees, craft toolkits, PMKVY training', count: 2, color: '#f59e0b' },
  { name: 'Housing', title: 'Housing & Shelter', icon: '🏠', desc: 'PM Awas Yojana subsidies, pucca housing assistance', count: 1, color: '#8b5cf6' },
  { name: 'Senior Citizens', title: 'Senior Citizens', icon: '👴', desc: 'BPL elder pensions, healthcare & dignity support', count: 1, color: '#d97706' },
  { name: 'Entrepreneurship', title: 'Entrepreneurship & MSME', icon: '🚀', desc: 'Collateral-free MUDRA loans & Stand-Up credit', count: 2, color: '#0d9488' },
];

export const Navbar = () => {
  const { isAuthenticated, user, logout, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/schemes?category=${encodeURIComponent(categoryName)}`);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const openLogin = () => {
    setAuthModalTab('login');
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const openRegister = () => {
    setAuthModalTab('register');
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.nav-dropdown')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="container navbar-container">
          {/* Brand */}
          <Link
            to="/"
            className="navbar-brand"
            onClick={() => setMobileMenuOpen(false)}
            title="Welfora - Civic Scheme Discovery"
          >
            <div className="brand-icon">W</div>
            <span className="brand-text">Welfora</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Nav Links */}
          <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {/* Animated Expandable Search Bar */}
            <NavSearchBar />

            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/schemes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Explore Schemes
            </NavLink>

            {/* Upgraded Luxury Categories Mega-Dropdown */}
            <div className="nav-dropdown" onMouseLeave={() => setDropdownOpen(false)}>
              <button
                className={`nav-link dropdown-trigger ${dropdownOpen ? 'dropdown-active' : ''}`}
                onClick={() => setDropdownOpen((o) => !o)}
                onMouseEnter={() => setDropdownOpen(true)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <span>Categories</span>
                <ChevronDown
                  size={14}
                  style={{
                    transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>

              {dropdownOpen && (
                <div className="mega-dropdown-menu">
                  <div className="mega-menu-header">
                    <div>
                      <span className="mega-menu-eyebrow">GOVERNMENT WELFARE DOMAINS</span>
                      <h4 className="mega-menu-title">Explore by Citizen Category</h4>
                    </div>
                    <span className="mega-menu-badge">8 Core Sectors</span>
                  </div>

                  <div className="mega-menu-grid">
                    {CATEGORY_ITEMS.map((cat) => (
                      <button
                        key={cat.name}
                        className="mega-menu-item"
                        onClick={() => handleCategoryClick(cat.name)}
                      >
                        <div className="mega-item-icon" style={{ backgroundColor: `${cat.color}18` }}>
                          <span style={{ fontSize: '1.25rem' }}>{cat.icon}</span>
                        </div>
                        <div className="mega-item-content">
                          <div className="mega-item-title-row">
                            <span className="mega-item-title">{cat.title}</span>
                            <span className="mega-item-count">{cat.count} schemes</span>
                          </div>
                          <span className="mega-item-desc">{cat.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mega-menu-footer">
                    <span>Discover 14+ central & state welfare programs</span>
                    <button
                      className="mega-menu-all-btn"
                      onClick={() => {
                        navigate('/schemes');
                        setDropdownOpen(false);
                      }}
                    >
                      <span>Open Scheme Explorer</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a href="/#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </a>

            {isAuthenticated && (
              <>
                <NavLink to="/saved" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                  <Bookmark size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.25rem' }} />
                  Saved
                </NavLink>
                <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </NavLink>
              </>
            )}
          </nav>

          {/* Right Action Icons & User Controls */}
          <div className="navbar-actions">
            {/* Dark Mode Toggle */}
            <button
              className="btn btn-secondary btn-icon theme-toggle-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* User Session Auth */}
            {isAuthenticated ? (
              <div className="user-profile-menu">
                <Link to="/profile" className="user-profile-chip" title="View Citizen Profile">
                  <span className="user-avatar-circle">
                    <User size={15} />
                  </span>
                  <span className="user-display-name">
                    {user?.name ? user.name.split(' ')[0] : 'Citizen'}
                  </span>
                </Link>
                <button
                  className="btn btn-sm btn-secondary logout-btn"
                  onClick={handleLogout}
                  title="Sign Out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons-group">
                <button className="btn btn-sm btn-secondary nav-sign-in-btn" onClick={openLogin}>
                  Sign In
                </button>
                <button className="btn btn-sm btn-primary nav-register-btn" onClick={openRegister}>
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </>
  );
};
