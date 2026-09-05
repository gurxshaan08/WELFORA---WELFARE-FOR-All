import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SCHEME_CATEGORIES } from '../data/mockSchemes';
import { Button } from './Button';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/schemes?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/schemes?category=${encodeURIComponent(categoryName)}`);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Filter out "All Categories" for dropdown menu
  const categoryOptions = SCHEME_CATEGORIES.filter(cat => cat !== 'All Categories');

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">W</div>
          <span>Welfora</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle navigation">
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Middle Navigation & Search Bar */}
        <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {/* Functional Mobile Search Bar */}
          <form className="nav-search-form" onSubmit={handleSearchSubmit}>
            <span className="nav-search-icon">🔍</span>
            <input
              type="text"
              className="nav-search-input"
              placeholder="Search schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/schemes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            Explore Schemes
          </NavLink>

          {/* Categories Dropdown */}
          <div className="nav-dropdown" onMouseLeave={() => setDropdownOpen(false)}>
            <button
              className="nav-link dropdown-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
            >
              Categories <span style={{ fontSize: '0.75rem' }}>▾</span>
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                {categoryOptions.map((cat) => (
                  <button
                    key={cat}
                    className="dropdown-item"
                    onClick={() => handleCategoryClick(cat)}
                  >
                    <span>👉</span> {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            How It Works
          </a>

          {isAuthenticated && (
            <>
              <NavLink to="/saved" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                Saved
              </NavLink>
              <NavLink to="/assistant" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                AI Assistant
              </NavLink>
            </>
          )}
        </nav>

        {/* Auth & CTAs */}
        <div className="nav-auth">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Link to="/profile">
                <Button variant="secondary" size="sm">
                  Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Link to="/login">
                <Button variant="secondary" size="sm">Log In</Button>
              </Link>
              <Link to="/schemes">
                <Button variant="primary" size="sm">
                  Find My Benefits
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
