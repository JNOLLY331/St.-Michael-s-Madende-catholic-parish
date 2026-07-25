import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL_SELECTORS = [
    '[data-reveal]', '[data-reveal-left]', '[data-reveal-right]',
    '[data-reveal-zoom]', '[data-reveal-flip]', '[data-reveal-bounce]',
    '[data-reveal-spin]', '[data-reveal-text]', '.reveal',
];

/**
 * Observes ALL reveal-data-attribute elements on the current page.
 * Uses a generous rootMargin so sections reveal BEFORE they enter the
 * viewport — preventing blank gaps as the user scrolls.
 */
export default function ScrollReveal() {
    const { pathname } = useLocation();

    useEffect(() => {
        let io;

        const revealEl = (el) => {
            el.classList.add('revealed', 'visible');
        };

        const observeElements = () => {
            const els = document.querySelectorAll(REVEAL_SELECTORS.join(','));

            if (!io) {
                io = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((e) => {
                            if (e.isIntersecting) {
                                // Small delay equal to data-delay attr (natural stagger)
                                const delay = parseInt(e.target.dataset.delay || '0', 10);
                                if (delay > 0) {
                                    setTimeout(() => revealEl(e.target), delay);
                                } else {
                                    revealEl(e.target);
                                }
                                io.unobserve(e.target); // once revealed, stop watching
                            }
                        });
                    },
                    {
                        // Start animating before element fully enters viewport
                        // → eliminates blank white sections while scrolling
                        threshold: 0.05,
                        rootMargin: '0px 0px -60px 0px',
                    }
                );
            }

            els.forEach((el) => {
                if (!el.dataset.isObserved) {
                    el.dataset.isObserved = 'true';

                    // If element is already visible (above fold), reveal immediately
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        revealEl(el);
                    } else {
                        io.observe(el);
                    }
                }
            });
        };

        // Short timeout to let React render the DOM
        const id = setTimeout(observeElements, 30);

        // Watch for dynamically added elements (API-loaded content)
        const mo = new MutationObserver(() => observeElements());
        mo.observe(document.body, { childList: true, subtree: true });

        return () => {
            clearTimeout(id);
            if (io) io.disconnect();
            mo.disconnect();
        };
    }, [pathname]);

    return null;
}
