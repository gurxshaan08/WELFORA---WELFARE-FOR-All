// ============================================================================
// useSchemes.js — Custom React Hook for Scheme Data + Filtering
//
// Handles: loading, error, data, filtering, refetching
// Separates data concerns completely from the UI layer.
// ============================================================================

import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchSchemes } from '../services/api';
import { filterSchemes, DEFAULT_FILTERS } from '../utils/filterSchemes';

/**
 * Custom hook that manages scheme data fetching and client-side filtering.
 *
 * @param {Object} initialFilters - Optional initial filter state
 * @returns {Object} { schemes, filteredSchemes, loading, error, filters, setFilters, clearFilters, refetch }
 */
export function useSchemes(initialFilters = {}) {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, ...initialFilters });

  // ── Data Fetching ──────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // fetchSchemes() returns mock data (or real API data in production)
      const data = await fetchSchemes();
      setSchemes(data);
    } catch (err) {
      console.error('[useSchemes] Failed to load schemes:', err);
      setError('Unable to load schemes. Showing available demo data.');
      // Auto-import mock data as fallback even on error
      const { mockSchemes } = await import('../data/mockSchemes');
      setSchemes(mockSchemes);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Client-Side Filtering (memoized for performance) ──────────────────────
  const filteredSchemes = useMemo(() => {
    return filterSchemes(schemes, filters);
  }, [schemes, filters]);

  // ── Filter Helpers ─────────────────────────────────────────────────────────
  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS });
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.age !== '' ||
      filters.gender !== 'All' ||
      filters.category !== 'All Categories' ||
      filters.income !== DEFAULT_FILTERS.income ||
      filters.state !== 'All States' ||
      filters.search !== ''
    );
  }, [filters]);

  return {
    schemes,
    filteredSchemes,
    loading,
    error,
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    refetch: fetchData,
    totalCount: schemes.length,
    filteredCount: filteredSchemes.length
  };
}
