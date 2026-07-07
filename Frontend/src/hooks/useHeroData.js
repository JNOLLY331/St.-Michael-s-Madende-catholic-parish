import { useEffect, useState } from 'react';
import { churchApi, resolveMediaUrl } from '../api';
import { HERO_IMAGE_URL } from '../data/homeData';

// Used whenever the API is unreachable, the record is inactive, or fields are
// missing — the hero section should never render blank.
export const FALLBACK_HERO = {
  eyebrow: 'Welcome to Our Parish',
  headingLine1: 'Welcome Home to',
  headingLine2: 'St. Michael Madende',
  image: HERO_IMAGE_URL,
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
 * `title` is the small eyebrow line; `subtitle` is the two-line headline,
 * with the second line (after \r\n or \n) rendered as the highlighted line.
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
    image: resolveMediaUrl(data.background_image) || FALLBACK_HERO.image,
    primaryButtonText: data.primary_button_text || FALLBACK_HERO.primaryButtonText,
    primaryButtonLink: data.primary_button_link || FALLBACK_HERO.primaryButtonLink,
    secondaryButtonText: data.secondary_button_text || FALLBACK_HERO.secondaryButtonText,
    secondaryButtonLink: data.secondary_button_link || FALLBACK_HERO.secondaryButtonLink,
  };
}

export function useHeroData() {
  const [hero, setHero] = useState(FALLBACK_HERO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await churchApi.getHeroSection();
        // The endpoint may return a single object or a list with one active entry
        const record = Array.isArray(data) ? data[0] : data;
        if (!cancelled) {
          setHero(normalizeHero(record));
          setError(false);
        }
      } catch {
        if (!cancelled) {
          setHero(FALLBACK_HERO);
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
