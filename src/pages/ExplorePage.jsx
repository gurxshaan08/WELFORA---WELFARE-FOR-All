import { useEffect, useMemo, useState } from 'react';
import PageTitle from '../components/PageTitle';
import SchemeCard from '../components/SchemeCard';
import Empty from '../components/Empty';
import { categories } from '../data/categories';
import { parseDemoDeadline } from '../utils/schemeUtils';
import { useWelfora } from '../context/WelforaContext';

const interestKeywords = {
  'Scholarships & Education': ['education', 'scholarship', 'student', 'learning', 'vidyalakshmi'],
  Healthcare: ['health', 'medical', 'healthcare', 'hospital'],
  'Employment & Skill Development': ['employment', 'skill', 'training', 'job', 'worker'],
  Agriculture: ['agriculture', 'farmer', 'farming', 'crop', 'kisan'],
  Housing: ['housing', 'home', 'house', 'shelter', 'awas'],
  'Pension & Senior Citizen Benefits': ['pension', 'senior', 'elderly', 'old age'],
  'Business & Self-employment': ['business', 'entrepreneur', 'self-employment', 'enterprise', 'mudra'],
  'General Financial Assistance': ['financial', 'assistance', 'income', 'cash', 'benefit'],
};

function matchesInterests(scheme, interests = []) {
  if (!interests.length) return false;
  const searchable = [scheme.name, scheme.category, scheme.description, scheme.eligibility]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return interests.some(interest =>
    (interestKeywords[interest] || []).some(keyword => searchable.includes(keyword))
  );
}

export default function ExplorePage({
  isRecommended = false,
  query,
  setQuery,
  category,
  setCategory,
}) {
  const {
    assessedSchemes,
    saved,
    toggleSave,
    applyScheme,
    setSelectedScheme,
    authSession,
  } = useWelfora();

  const [selectedState, setSelectedState] = useState('All states');
  const [fitFilter, setFitFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const userInterests = authSession?.profile?.interests || [];

  const filtered = useMemo(() => {
    return assessedSchemes
      .filter(s => {
        const matchQuery = `${s.name} ${s.category} ${s.description} ${s.eligibility}`
          .toLowerCase()
          .includes((query || '').toLowerCase());
        const matchCategory = category === 'All categories' || s.category === category;
        const matchState =
          selectedState === 'All states' ||
          ['All India', 'State dependent', 'Participating states', 'Urban areas', selectedState].includes(s.state);
        const matchRecommendation =
          !isRecommended || s.fit?.score >= 55 || matchesInterests(s, userInterests);
        const matchFit = fitFilter === 'all' || s.fit?.score >= 55;

        return matchQuery && matchCategory && matchState && matchRecommendation && matchFit;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'match') return (b.fit?.score || 0) - (a.fit?.score || 0);
        if (sortBy === 'category') return a.category.localeCompare(b.category);
        if (sortBy === 'deadline') {
          const dateA = parseDemoDeadline(a.deadline)?.getTime() ?? Infinity;
          const dateB = parseDemoDeadline(b.deadline)?.getTime() ?? Infinity;
          return dateA - dateB;
        }
        return a.id - b.id;
      });
  }, [assessedSchemes, query, category, selectedState, fitFilter, isRecommended, sortBy, userInterests]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedSchemes = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, category, selectedState, fitFilter, sortBy]);

  function resetFilters() {
    setQuery('');
    setCategory('All categories');
    setSelectedState('All states');
    setFitFilter('all');
    setSortBy('recommended');
  }

  return (
    <section className="page-content">
      <PageTitle
        eyebrow="DISCOVER YOUR OPTIONS"
        title={isRecommended ? 'Recommended for you' : 'Explore schemes'}
        subtitle="Find support that fits your needs. Check details on the relevant official portal before applying."
      />

      <div className="filterbar">
        <label className="searchbox">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label="Search schemes"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search schemes, benefits..."
          />
        </label>

        <select
          aria-label="Filter by category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>All categories</option>
          {categories.map(c => (
            <option key={c[0]}>{c[0]}</option>
          ))}
        </select>

        <select
          aria-label="Filter by state or coverage"
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
        >
          <option>All states</option>
          {['Punjab', 'Haryana', 'Delhi', 'Uttar Pradesh', 'Rajasthan', 'Maharashtra', 'Other'].map(x => (
            <option key={x}>{x}</option>
          ))}
        </select>

        <select
          aria-label="Filter by potential eligibility fit"
          value={fitFilter}
          onChange={e => setFitFilter(e.target.value)}
        >
          <option value="all">All eligibility fits</option>
          <option value="potential">Potential matches only</option>
        </select>

        <select
          aria-label="Sort schemes"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="recommended">Default order</option>
          <option value="name">Name A–Z</option>
          <option value="match">Highest potential fit</option>
          <option value="category">Category</option>
          <option value="deadline">Earliest dated deadline</option>
        </select>

        <button className="outline-btn" onClick={resetFilters}>
          Reset filters
        </button>
      </div>

      <div className="result-count">
        {filtered.length} schemes shown <span>DEMO DATA · VERIFY OFFICIAL DETAILS</span>
      </div>

      <div className="scheme-grid">
        {paginatedSchemes.map(scheme => (
          <SchemeCard
            key={scheme.id}
            scheme={scheme}
            saved={saved.includes(scheme.id)}
            onSave={() => toggleSave(scheme.id)}
            onOpen={() => setSelectedScheme(scheme)}
            onApply={() => applyScheme(scheme.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <Empty
          title="No matching schemes"
          text="Try another keyword or clear your category filter."
          action="Reset filters"
          onAction={resetFilters}
        />
      )}

      {filtered.length > pageSize && (
        <div className="pagination-row">
          <button
            className="outline-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            ← Previous
          </button>
          <span>
            Page {currentPage} of {pageCount}
          </span>
          <button
            className="outline-btn"
            disabled={currentPage === pageCount}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}
