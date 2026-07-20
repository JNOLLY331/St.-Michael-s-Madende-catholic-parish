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
        let io;

        const observeElements = () => {
            const els = document.querySelectorAll(REVEAL_SELECTORS.join(','));
            if (!io) {
                io = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((e) => {
                            if (e.isIntersecting) {
                                e.target.classList.add('revealed', 'visible');
                            }
                        });
                    },
                    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
                );
            }
            els.forEach((el) => {
                // To avoid multiple observations on the same element
                if (!el.dataset.isObserved) {
                    el.dataset.isObserved = 'true';
                    io.observe(el);
                }
            });
        };

        // Initial run
        const id = setTimeout(observeElements, 50);

        // Listen for new elements dynamically added (e.g. from async API requests)
        const mo = new MutationObserver(() => {
            observeElements();
        });
        mo.observe(document.body, { childList: true, subtree: true });

        return () => {
            clearTimeout(id);
            if (io) io.disconnect();
            mo.disconnect();
        };
    }, [pathname]);
    return null;
}
