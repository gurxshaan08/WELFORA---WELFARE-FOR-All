import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, SlidersHorizontal, X, RefreshCw, Filter } from 'lucide-react';
import { SCHEME_CATEGORIES, INDIAN_STATES, MOCK_DISCLAIMER } from '../data/mockSchemes';
import { SchemeCard } from '../components/SchemeCard';
import { SchemeDetailsDrawer } from '../components/SchemeDetailsDrawer';
import { useAuth } from '../hooks/useAuth';
import { useSchemes } from '../hooks/useSchemes';
import { formatIncome } from '../utils/filterSchemes';

// ── Skeleton Card ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="card scheme-card" style={{ overflow: 'hidden' }}>
    <div className="skeleton" style={{ height: '165px', borderRadius: 0 }} />
    <div className="scheme-card-body">
      <div className="skeleton" style={{ height: '1.2rem', width: '40%', marginBottom: '0.5rem', borderRadius: '4px' }} />
      <div className="skeleton" style={{ height: '1.5rem', width: '90%', marginBottom: '0.5rem', borderRadius: '4px' }} />
      <div className="skeleton" style={{ height: '1rem', width: '60%', marginBottom: '1rem', borderRadius: '4px' }} />
      <div className="skeleton" style={{ height: '3rem', borderRadius: '8px', marginBottom: '1rem' }} />
      <div className="skeleton" style={{ height: '0.875rem', width: '80%', marginBottom: '1.5rem', borderRadius: '4px' }} />
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <div className="skeleton" style={{ height: '2.5rem', flex: 1, borderRadius: '8px' }} />
        <div className="skeleton" style={{ height: '2.5rem', flex: 1, borderRadius: '8px' }} />
        <div className="skeleton" style={{ height: '2.5rem', width: '2.5rem', borderRadius: '8px' }} />
      </div>
    </div>
  </div>
);

// ── Age Slider Component ──────────────────────────────────────────────────────
const AgeSlider = ({ value, onChange }) => {
  const handleNumberChange = (e) => {
    const v = e.target.value;
    if (v === '') { onChange(''); return; }
    const n = parseInt(v, 10);
    if (!isNaN(n) && n >= 0 && n <= 120) onChange(n);
  };

  const handleSliderChange = (e) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <label className="form-label" style={{ marginBottom: 0 }}>Age</label>
        <input
          type="number"
          min="0"
          max="120"
          value={value}
          onChange={handleNumberChange}
          placeholder="0–120"
          style={{
            width: '72px',
            padding: '0.3rem 0.5rem',
            fontSize: '0.9rem',
            fontWeight: 700,
            border: '1.5px solid var(--neutral-200)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            backgroundColor: 'var(--white)',
            color: 'var(--primary-900)',
            fontFamily: 'var(--font-heading)'
          }}
          aria-label="Enter your age"
        />
      </div>
      <input
        type="range"
        min="0"
        max="120"
        step="1"
        value={value || 0}
        onChange={handleSliderChange}
        className="range-slider"
        aria-label="Age range slider"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--neutral-500)', marginTop: '0.2rem' }}>
        <span>0</span>
        <span>60</span>
        <span>120</span>
      </div>
    </div>
  );
};

// ── Income Slider Component ──────────────────────────────────────────────────
const IncomeSlider = ({ value, onChange }) => {
  const MAX_INCOME = 1000000;
  const steps = [0, 50000, 100000, 200000, 300000, 500000, 750000, 1000000];

  const getIncomeLabel = (v) => {
    if (v >= 1000000) return '₹10 Lakh+';
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)} Lakh`;
    if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
    return `₹${v}`;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <label className="form-label" style={{ marginBottom: 0 }}>Annual Income</label>
        <span style={{
          fontSize: '0.9rem',
          fontWeight: 800,
          color: 'var(--accent-600)',
          fontFamily: 'var(--font-heading)',
          backgroundColor: 'var(--accent-50)',
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--accent-100)'
        }}>
          {getIncomeLabel(value)}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max={MAX_INCOME}
        step="10000"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="range-slider range-slider--income"
        aria-label="Annual income range slider"
        aria-valuetext={getIncomeLabel(value)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--neutral-500)', marginTop: '0.2rem' }}>
        <span>₹0</span>
        <span>₹5 Lakh</span>
        <span>₹10L+</span>
      </div>
    </div>
  );
};

// ── Main SchemeExplorerPage ──────────────────────────────────────────────────
export const SchemeExplorerPage = () => {
  const { savedSchemeIds, toggleSaveScheme } = useAuth();
  const location = useLocation();

  const [drawerScheme, setDrawerScheme] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);

  const {
    filteredSchemes,
    loading,
    error,
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    totalCount,
    filteredCount
  } = useSchemes();

  // Read URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    const catQuery = params.get('category');
    if (searchQuery) updateFilter('search', searchQuery);
    if (catQuery && SCHEME_CATEGORIES.includes(catQuery)) updateFilter('category', catQuery);
  }, [location.search]);

  const handleViewDetails = (scheme) => {
    setDrawerScheme(scheme);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setDrawerScheme(null), 350); // wait for animation
  };

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
          Discover benefits, scholarships, healthcare support, and financial assistance tailored to you.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div style={{
          backgroundColor: '#fff7ed',
          border: '1px solid #fed7aa',
          color: '#c2410c',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* ── Filter Panel ─────────────────────────────────────────────────────── */}
      <div className="card filter-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: filtersVisible ? '1.5rem' : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={18} color="var(--accent-600)" />
            <span style={{ fontWeight: 700, color: 'var(--primary-900)', fontSize: '1rem' }}>Filter Schemes</span>
            {hasActiveFilters && (
              <span style={{
                backgroundColor: 'var(--accent-600)', color: 'white',
                fontSize: '0.7rem', fontWeight: 800,
                padding: '0.15rem 0.5rem', borderRadius: '999px'
              }}>
                Active
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {hasActiveFilters && (
              <button
                className="btn btn-sm btn-secondary"
                onClick={clearFilters}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <X size={14} /> Clear All
              </button>
            )}
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setFiltersVisible((v) => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Filter size={14} />
              {filtersVisible ? 'Hide' : 'Show'} Filters
            </button>
          </div>
        </div>

        {filtersVisible && (
          <>
            {/* Filter Row 1: Search + Category + State + Gender */}
            <div className="filter-grid-top">
              {/* Search */}
              <div>
                <label className="form-label" htmlFor="explorer-search">Search</label>
                <div style={{ position: 'relative' }}>
                  <Search
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--neutral-500)',
                      pointerEvents: 'none'
                    }}
                  />
                  <input
                    id="explorer-search"
                    type="text"
                    className="form-control"
                    placeholder="Scheme name, benefit, ministry..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    style={{ paddingLeft: '2.4rem', paddingRight: filters.search ? '2.2rem' : '0.85rem' }}
                  />
                  {filters.search && (
                    <button
                      type="button"
                      onClick={() => updateFilter('search', '')}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--neutral-400)',
                        padding: 0
                      }}
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="form-label" htmlFor="explorer-category">Category</label>
                <select
                  id="explorer-category"
                  className="form-control"
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                >
                  {SCHEME_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div>
                <label className="form-label" htmlFor="explorer-state">State / UT</label>
                <select
                  id="explorer-state"
                  className="form-control"
                  value={filters.state}
                  onChange={(e) => updateFilter('state', e.target.value)}
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="form-label" htmlFor="explorer-gender">Gender</label>
                <div className="gender-toggle-group" role="group" aria-label="Gender filter">
                  {['All', 'Male', 'Female', 'Other'].map((g) => (
                    <button
                      key={g}
                      id={`gender-${g}`}
                      className={`gender-toggle-btn ${filters.gender === g ? 'active' : ''}`}
                      onClick={() => updateFilter('gender', g)}
                      type="button"
                    >
                      {g === 'All' ? '👥' : g === 'Male' ? '♂' : g === 'Female' ? '♀' : '⚧'} {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Presets Strip */}
            <div className="quick-presets-strip">
              <span className="preset-label">Quick Presets:</span>
              <button
                type="button"
                className={`preset-chip ${filters.category === 'Agriculture' ? 'active' : ''}`}
                onClick={() => updateFilter('category', filters.category === 'Agriculture' ? 'All Categories' : 'Agriculture')}
              >
                🌾 Farmers (PM-KISAN)
              </button>
              <button
                type="button"
                className={`preset-chip ${filters.category === 'Education' ? 'active' : ''}`}
                onClick={() => updateFilter('category', filters.category === 'Education' ? 'All Categories' : 'Education')}
              >
                🎓 Student Grants
              </button>
              <button
                type="button"
                className={`preset-chip ${filters.gender === 'Female' ? 'active' : ''}`}
                onClick={() => updateFilter('gender', filters.gender === 'Female' ? 'All' : 'Female')}
              >
                👩 Women Initiatives
              </button>
              <button
                type="button"
                className={`preset-chip ${filters.income <= 250000 && filters.income > 0 ? 'active' : ''}`}
                onClick={() => updateFilter('income', filters.income === 250000 ? 1000000 : 250000)}
              >
                🏷️ Low Income (&lt;₹2.5L)
              </button>
            </div>

            {/* Filter Row 2: Age + Income Sliders */}
            <div className="filter-grid-sliders">
              <AgeSlider
                value={filters.age}
                onChange={(v) => updateFilter('age', v)}
              />
              <IncomeSlider
                value={filters.income}
                onChange={(v) => updateFilter('income', v)}
              />
            </div>
          </>
        )}

        {/* Results Summary */}
        <div className="filter-results-bar">
          <span style={{ fontWeight: 700, color: 'var(--primary-900)', fontSize: '0.95rem' }}>
            {loading ? (
              <span style={{ color: 'var(--neutral-500)' }}>Loading schemes...</span>
            ) : (
              <>
                <span style={{ color: 'var(--accent-600)' }}>{filteredCount}</span> {filteredCount === 1 ? 'scheme' : 'schemes'} found
                {hasActiveFilters && <span style={{ color: 'var(--neutral-500)', fontWeight: 400, fontSize: '0.85rem' }}> (of {totalCount} total)</span>}
              </>
            )}
          </span>
          {hasActiveFilters && !loading && (
            <button
              onClick={clearFilters}
              style={{ background: 'none', border: 'none', color: 'var(--accent-600)', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <RefreshCw size={14} /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* ── Scheme Grid ─────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="scheme-grid">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredSchemes.length > 0 ? (
        <div className="scheme-grid">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              isSaved={savedSchemeIds.includes(scheme.id)}
              onToggleSave={toggleSaveScheme}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔎</div>
          <h3 className="empty-title">No Schemes Found</h3>
          <p className="empty-text">
            No schemes match your current criteria. Try adjusting your age, income, or clearing the filters.
          </p>
          <button className="btn btn-primary" onClick={clearFilters}>
            <RefreshCw size={16} /> Reset Filters
          </button>
        </div>
      )}

      {/* Scheme Details Drawer */}
      <SchemeDetailsDrawer
        scheme={drawerScheme}
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};
