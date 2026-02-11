/**
 * Content API — all data fetching logic lives here.
 * Even though the "backend" is just JSON files on GitHub Pages,
 * this isolation makes it trivial to swap to a real API later.
 */

import { fetchJSON, listGitHubDirectory } from './client';
import type {
  HeroContent,
  AboutContent,
  ValuesContent,
  CTAContent,
  SettingsContent,
  GalleryItem,
  TestimonialItem,
} from '../types/content';

// ===== Static content (single JSON files) =====

export const getHeroContent = () =>
  fetchJSON<HeroContent>('content/hero.json');

export const getAboutContent = () =>
  fetchJSON<AboutContent>('content/about.json');

export const getValuesContent = () =>
  fetchJSON<ValuesContent>('content/values.json');

export const getCTAContent = () =>
  fetchJSON<CTAContent>('content/cta.json');

export const getSettingsContent = () =>
  fetchJSON<SettingsContent>('content/settings.json');

// ===== Dynamic collections (directory of JSON files) =====

async function fetchCollection<T>(
  directory: string,
  fallbackFiles: string[],
): Promise<T[]> {
  // Try GitHub API first (auto-discovers new CMS entries)
  let files = await listGitHubDirectory(directory);

  // Fallback to known files if API fails (rate limit, etc.)
  if (files.length === 0) {
    files = fallbackFiles;
  }

  const results = await Promise.all(
    files.map((name) =>
      fetchJSON<T>(`${directory}/${name}`).catch(() => null),
    ),
  );

  return results.filter((item): item is NonNullable<typeof item> => item !== null) as T[];
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  // Generate fallback filenames (foto-1.json to foto-50.json)
  const fallback = Array.from({ length: 50 }, (_, i) => `foto-${i + 1}.json`);
  const items = await fetchCollection<GalleryItem>('content/gallery', fallback);

  return items
    .filter((item) => item.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const fallback = [
    'susana-rocha.json',
    'natalia-navarro.json',
    'thallita-brito.json',
  ];
  const items = await fetchCollection<TestimonialItem>(
    'content/testimonials',
    fallback,
  );

  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}
