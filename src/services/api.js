// ============================================================================
// services/api.js — API Service Layer
//
// Architecture:
//   React UI → useSchemes hook → fetchSchemes() → [Backend API or Mock Data]
//
// For production, replace BASE_URL and connect to a Node.js/FastAPI backend
// that normalises MyScheme API / API Setu / Open Government Data responses.
//
// NEVER expose API keys in this file — use server-side proxying.
// ============================================================================

import { mockSchemes } from '../data/mockSchemes';

// In production: const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// We keep it undefined to force mock-data fallback for this demo.
const BASE_URL = undefined;

/**
 * Simulated network delay for realistic loading experience.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all schemes, optionally with server-side filters.
 * Falls back to mock data on any error or if no backend is configured.
 *
 * @param {Object} filters - Optional filter params to pass as query string
 * @returns {Promise<Array>} Array of normalized scheme objects
 */
export async function fetchSchemes(filters = {}) {
  // ── Path A: Real Backend (configure BASE_URL when backend is ready) ──────
  if (BASE_URL) {
    try {
      const params = new URLSearchParams();
      if (filters.age) params.set('age', filters.age);
      if (filters.gender && filters.gender !== 'All') params.set('gender', filters.gender);
      if (filters.category && filters.category !== 'All Categories') params.set('category', filters.category);
      if (filters.income) params.set('income', filters.income);
      if (filters.state && filters.state !== 'All States') params.set('state', filters.state);
      if (filters.search) params.set('search', filters.search);

      const response = await fetch(`${BASE_URL}/api/schemes?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${getToken()}` — add auth header when needed
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.schemes || data;
    } catch (err) {
      console.warn('[Welfora] Backend fetch failed, falling back to mock data:', err.message);
      // Fall through to mock data
    }
  }

  // ── Path B: Mock Data Fallback (simulated 600ms network delay) ───────────
  await delay(600);

  // Simulate a random error 0% of the time in demo (set to 0.1 to test error UI)
  const SIMULATE_ERROR_RATE = 0;
  if (Math.random() < SIMULATE_ERROR_RATE) {
    throw new Error('Simulated network error — demo error state');
  }

  return mockSchemes;
}

/**
 * Fetch a single scheme by ID.
 * @param {string} schemeId
 * @returns {Promise<Object|null>}
 */
export async function fetchSchemeById(schemeId) {
  if (BASE_URL) {
    try {
      const response = await fetch(`${BASE_URL}/api/schemes/${schemeId}`);
      if (!response.ok) throw new Error('Not found');
      return await response.json();
    } catch {
      // Fall through
    }
  }

  await delay(200);
  return mockSchemes.find((s) => s.id === schemeId) || null;
}

// ============================================================================
// INTEGRATION GUIDE — How to connect to real Government APIs
//
// Recommended Backend Architecture:
//
//   React (Vite) → Node.js/Express or FastAPI Backend → Government APIs
//
// 1. MyScheme API (myscheme.gov.in)
//    - Endpoint: https://api.myscheme.gov.in/search/v4/schemes
//    - Auth: API key via header (get from MyScheme developer portal)
//    - Your backend normalises the response → our scheme JSON format
//
// 2. API Setu (apisetu.gov.in)
//    - Aggregates various government datasets
//    - Requires registration at apisetu.gov.in
//
// 3. data.gov.in — Open Government Data Platform
//    - Free open datasets for schemes, subsidies, statistics
//    - No auth required for most datasets
//    - URL: https://data.gov.in/catalog
//
// NEVER put API keys, OAuth secrets, or tokens in this React file.
// Always proxy through your own backend server.
// ============================================================================
