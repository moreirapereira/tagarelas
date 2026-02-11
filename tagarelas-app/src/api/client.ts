/**
 * Base HTTP client for all content fetching.
 * Centralises error handling, caching, and base URL resolution.
 */

const GITHUB_REPO = 'moreirapereira/tagarelas';
const GITHUB_BRANCH = 'github-pages';
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_REPO}/contents`;

/**
 * Fetch JSON from a local content path (relative to the public folder).
 * Prepends Vite BASE_URL so paths resolve correctly with the /tagarelas/ subpath.
 */
export async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // e.g. '/tagarelas'
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `${base}${cleanPath}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * List files in a GitHub repo directory via the Contents API.
 * Used to auto-discover gallery/testimonial JSON files.
 */
export async function listGitHubDirectory(directoryPath: string): Promise<string[]> {
  try {
    const url = `${GITHUB_API_BASE}/${directoryPath}?ref=${GITHUB_BRANCH}`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const listing: Array<{ name: string }> = await response.json();
    return listing
      .filter((f) => f.name.endsWith('.json'))
      .map((f) => f.name);
  } catch {
    return [];
  }
}

/**
 * Normalize image paths from CMS JSON (handles both /img/... and /tagarelas/img/... formats).
 * Returns a path prefixed with BASE_URL so it resolves correctly.
 */
export function normalizePath(path: string): string {
  if (!path) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // e.g. '/tagarelas'
  // If path already has /tagarelas/ prefix, just return it
  if (path.startsWith(`${base}/`)) return path;
  // Ensure leading slash then prepend base
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
