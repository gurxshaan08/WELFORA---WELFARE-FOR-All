import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, TrendingUp, Tag } from 'lucide-react';
import { mockSchemes } from '../data/mockSchemes';

export const NavSearchBar = ({ isOpenExternal, onCloseExternal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [liveResults, setLiveResults] = useState([]);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const TRENDING_SEARCHES = [
    { label: 'PM Kisan', category: 'Agriculture' },
    { label: 'Ayushman Bharat', category: 'Healthcare' },
    { label: 'Post-Matric Scholarship', category: 'Education' },
    { label: 'Mudra Loan', category: 'Entrepreneurship' },
    { label: 'PM Awas Yojana', category: 'Housing' }
  ];

  const POPULAR_TAGS = ['Farmer', 'Student', 'Women SHG', 'Senior Citizen', 'Scholarship'];

  // Handle external open trigger (e.g. from brand click or hotkey)
  useEffect(() => {
    if (isOpenExternal) {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpenExternal]);

  // Global Ctrl+K / Cmd+K hotkey
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape' && isExpanded) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter live results
  useEffect(() => {
    if (!query.trim()) {
      setLiveResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matches = mockSchemes
      .filter((s) =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.tags?.some((t) => t.toLowerCase().includes(q)) ||
        s.ministry?.toLowerCase().includes(q)
      )
      .slice(0, 5);
    setLiveResults(matches);
  }, [query]);

  const handleClose = () => {
    setIsExpanded(false);
    setQuery('');
    if (onCloseExternal) onCloseExternal();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/schemes?search=${encodeURIComponent(query.trim())}`);
      handleClose();
    }
  };

  const handleSelectScheme = (scheme) => {
    navigate(`/schemes?search=${encodeURIComponent(scheme.title)}`);
    handleClose();
  };

  const handleTagClick = (tag) => {
    setQuery(tag);
    navigate(`/schemes?search=${encodeURIComponent(tag)}`);
    handleClose();
  };

  return (
    <div ref={searchContainerRef} className={`animated-search-wrapper ${isExpanded ? 'expanded' : ''}`}>
      {/* Trigger Button or Active Form */}
      <form onSubmit={handleSearchSubmit} className="animated-search-bar">
        <button
          type="button"
          className="search-icon-btn"
          onClick={() => {
            setIsExpanded(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          aria-label="Open search"
        >
          <Search size={16} className="search-svg" />
        </button>

        <input
          ref={inputRef}
          type="text"
          className="animated-search-input"
          placeholder="Search schemes..."
          value={query}
          onFocus={() => setIsExpanded(true)}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search schemes"
        />

        {isExpanded && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClose}
            aria-label="Close search"
          >
            <X size={15} />
          </button>
        )}
      </form>

      {/* Dropdown Animated Palette */}
      {isExpanded && (
        <div className="search-dropdown-palette">
          {/* Live Search Results if typing */}
          {query.trim().length > 0 ? (
            <div className="search-results-section">
              <div className="palette-header">
                <Sparkles size={13} style={{ color: 'var(--accent-600)' }} />
                <span>Matching Government Schemes ({liveResults.length})</span>
              </div>

              {liveResults.length > 0 ? (
                <div className="live-results-list">
                  {liveResults.map((scheme) => (
                    <button
                      key={scheme.id}
                      type="button"
                      className="live-result-item"
                      onClick={() => handleSelectScheme(scheme)}
                    >
                      <div className="live-result-info">
                        <span className="live-result-title">{scheme.title}</span>
                        <span className="live-result-meta">
                          {scheme.category} • {scheme.beneficiaryType || 'Direct Benefit'}
                        </span>
                      </div>
                      <span className="live-result-badge">{scheme.benefitAmount || 'Explore'}</span>
                    </button>
                  ))}
                  <button
                    type="submit"
                    onClick={handleSearchSubmit}
                    className="view-all-search-btn"
                  >
                    <span>View all matching schemes for "{query}"</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <div className="no-live-results">
                  <p>No direct matches found for "{query}".</p>
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="btn btn-sm btn-primary"
                    style={{ marginTop: '0.5rem' }}
                  >
                    Search in Scheme Explorer
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Suggested Trends when open without typing */
            <div className="search-suggestions-section">
              <div className="palette-header">
                <TrendingUp size={13} style={{ color: 'var(--accent-600)' }} />
                <span>Popular Government Schemes</span>
              </div>
              <div className="trending-grid">
                {TRENDING_SEARCHES.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="trending-chip"
                    onClick={() => handleTagClick(item.label)}
                  >
                    <span className="trend-name">{item.label}</span>
                    <span className="trend-cat">{item.category}</span>
                  </button>
                ))}
              </div>

              <div className="palette-tags-row">
                <span className="quick-tags-label">
                  <Tag size={12} /> Quick Filters:
                </span>
                <div className="tags-pill-list">
                  {POPULAR_TAGS.map((tag, i) => (
                    <button
                      key={i}
                      type="button"
                      className="tag-pill-btn"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
