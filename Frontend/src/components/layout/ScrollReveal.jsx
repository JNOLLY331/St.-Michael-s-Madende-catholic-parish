import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL_SELECTORS = [
    '[data-reveal]', '[data-reveal-left]', '[data-reveal-right]',
    '[data-reveal-zoom]', '[data-reveal-flip]', '[data-reveal-bounce]',
    '[data-reveal-spin]', '.reveal',
];

/**
 * Observes ALL reveal-data-attribute elements on the current page.
 * Supports: data-reveal, data-reveal-left, data-reveal-right,
 *           data-reveal-zoom, data-reveal-flip, data-reveal-bounce,
 *           data-reveal-spin, .reveal
 */
export default function ScrollReveal() {
    const { pathname } = useLocation();
    useEffect(() => {
        // Re-query after route paint settles
        const run = () => {
            const els = document.querySelectorAll(REVEAL_SELECTORS.join(','));
            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting) {
                            e.target.classList.add('revealed', 'visible');
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
            );
            els.forEach((el) => io.observe(el));
            return () => els.forEach((el) => io.unobserve(el));
        };

        const id = setTimeout(run, 80);
        return () => clearTimeout(id);
    }, [pathname]);
    return null;
}
