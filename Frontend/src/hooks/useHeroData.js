import { useEffect, useState } from 'react';
import { resolveMediaUrl } from '../api/client';
import { churchApi } from '../api/endpoints/church';
  
// Fallback copy for when the backend is unreachable or the record is inactive.
// NOTE: image is intentionally null — the HeroSection will show a loading
// spinner while fetching; only the backend-provided image is displayed.
export const FALLBACK_HERO = {
  eyebrow: 'Welcome to Our Parish',
  headingLine1: 'Welcome Home to',
  headingLine2: 'St. Michael Madende',
  image: null,           // No default/placeholder image — backend only
  primaryButtonText: "Today's Readings",
  primaryButtonLink: '#',
  secondaryButtonText: 'Learn More',
  secondaryButtonLink: '/about',
};

/**
 * Normalizes a HeroSectionView record — e.g.
 *   {
 *     id: 1,
 *     title: "Welcome to Our Parish",
 *     subtitle: "Welcome Home to\r\nSt. Michael Madende",
 *     background_image: "/media/church/hero/church.jpeg",
 *     primary_button_text: "TODAY'S READINGS",
 *     primary_button_link: "#",
 *     secondary_button_text: "LEARN MORE",
 *     secondary_button_link: "/about",
 *     is_active: true
 *   }
 */
function normalizeHero(data) {
  if (!data || data.is_active === false) return FALLBACK_HERO;

  const [line1, line2] = (data.subtitle || '')
    .split(/\r?\n/)
    .map((line) => line.trim());

  return {
    eyebrow: data.title || FALLBACK_HERO.eyebrow,
    headingLine1: line1 || FALLBACK_HERO.headingLine1,
    headingLine2: line2 || '',
    // Only use the backend image — no hardcoded fallback URL
    image: resolveMediaUrl(data.background_image) || null,
    primaryButtonText: data.primary_button_text || FALLBACK_HERO.primaryButtonText,
    primaryButtonLink: data.primary_button_link || FALLBACK_HERO.primaryButtonLink,
    secondaryButtonText: data.secondary_button_text || FALLBACK_HERO.secondaryButtonText,
    secondaryButtonLink: data.secondary_button_link || FALLBACK_HERO.secondaryButtonLink,
  };
}

export function useHeroData() {
  const [hero, setHero] = useState(null);      // null = still loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await churchApi.getHeroSection();
        const record = Array.isArray(data) ? data[0] : data;
        if (!cancelled) {
          setHero(normalizeHero(record));
          setError(false);
        }
      } catch {
        if (!cancelled) {
          setHero(FALLBACK_HERO);   // show text copy even without an image
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { hero, loading, error };
}
