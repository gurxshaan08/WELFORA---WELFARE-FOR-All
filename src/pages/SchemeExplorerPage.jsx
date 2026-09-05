import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mockSchemes, SCHEME_CATEGORIES, INDIAN_STATES, MOCK_DISCLAIMER } from '../data/mockSchemes';
import { SchemeCard } from '../components/SchemeCard';
import { useAuth } from '../hooks/useAuth';

export const SchemeExplorerPage = () => {
  const { savedSchemeIds, toggleSaveScheme } = useAuth();
  const location = useLocation();

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedState, setSelectedState] = useState('All States');

  // Read URL query parameters (`search` and `category`)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    const catQuery = params.get('category');

    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
    if (catQuery && SCHEME_CATEGORIES.includes(catQuery)) {
      setSelectedCategory(catQuery);
    }
  }, [location.search]);

  // React Hook: useMemo optimizes scheme filtering computations
  const filteredSchemes = useMemo(() => {
    return mockSchemes.filter((scheme) => {
      // 1. Search Query Match
      const matchesSearch = 
        !searchTerm.trim() ||
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.benefit.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Category Match
      const matchesCategory = 
        selectedCategory === 'All Categories' || scheme.category === selectedCategory;

      // 3. State Match
      const matchesState = 
        selectedState === 'All States' || scheme.state === 'All States' || scheme.state === selectedState;

      return matchesSearch && matchesCategory && matchesState;
    });
  }, [searchTerm, selectedCategory, selectedState]);

  return (
    <div className="container main-content">
      {/* Page Header */}
      <div className="section-header">
        <div style={{
          display: 'inline-block',
          backgroundColor: 'var(--accent-50)',
          border: '1px solid var(--accent-100)',
          color: 'var(--accent-700)',
          padding: '0.35rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.8rem',
          fontWeight: 700,
          marginBottom: '0.85rem'
        }}>
          ⚠️ {MOCK_DISCLAIMER}
        </div>
        <h1 className="section-title">Explore Government Schemes</h1>
        <p className="section-subtitle">
          Find benefits, scholarships, healthcare support, and financial assistance that may be relevant to you.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="card" style={{ marginBottom: '2.5rem', backgroundColor: 'var(--white)', padding: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          alignItems: 'center'
        }}>
          {/* Search Input */}
          <div>
            <label className="form-label" htmlFor="search-input">Search Schemes</label>
            <input
              id="search-input"
              type="text"
              className="form-control"
              placeholder="Search by keyword, benefit, scheme name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="form-label" htmlFor="category-select">Category</label>
            <select
              id="category-select"
              className="form-control"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {SCHEME_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* State Dropdown */}
          <div>
            <label className="form-label" htmlFor="state-select">State / Region</label>
            <select
              id="state-select"
              className="form-control"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Results Summary */}
        <div style={{
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--neutral-200)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.9rem',
          color: 'var(--neutral-600)'
        }}>
          <span>Showing <strong>{filteredSchemes.length}</strong> of {mockSchemes.length} schemes</span>
          {(searchTerm || selectedCategory !== 'All Categories' || selectedState !== 'All States') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
                setSelectedState('All States');
              }}
              style={{ background: 'none', border: 'none', color: 'var(--accent-600)', cursor: 'pointer', fontWeight: 700 }}
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Scheme Cards Responsive Grid */}
      {filteredSchemes.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              isSaved={savedSchemeIds.includes(scheme.id)}
              onToggleSave={toggleSaveScheme}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔎</div>
          <h3 className="empty-title">No Matching Schemes Found</h3>
          <p className="empty-text">
            No schemes match your current search parameters. Try clearing your search or category filters.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All Categories');
              setSelectedState('All States');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
