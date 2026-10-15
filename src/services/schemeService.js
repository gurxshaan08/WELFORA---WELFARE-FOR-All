import { schemes } from '../data/schemes';

// Local demo service. Replace this adapter with a verified API endpoint when a backend is approved.
export async function getSchemesFromMockApi() {
  await new Promise(resolve => window.setTimeout(resolve, 350));
  return schemes.map(item => ({ ...item }));
}
