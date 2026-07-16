import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL_SELECTORS = [
    '[data-reveal]', '[data-reveal-left]', '[data-reveal-right]',
    '[data-reveal-zoom]', '[data-reveal-flip]', '[data-reveal-bounce]',
    '[data-reveal-spin]', '[data-reveal-text]', '.reveal', '[data-aos]'
];

export default function ScrollReveal() {
    const { pathname } = useLocation();

    useEffect(() => {
        const selectors = REVEAL_SELECTORS.join(',');

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed', 'visible');
                        if (e.target.hasAttribute('data-aos')) {
                            e.target.classList.add('aos-animate');
                        }
                        const delay = e.target.dataset.delay || 0;
                        if (delay) e.target.style.transitionDelay = `${delay}ms`;
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );

        const observeElements = (root) => {
            if (!root || !root.querySelectorAll) return;
            const elementsToCheck = [root, ...Array.from(root.querySelectorAll('*'))];

            elementsToCheck.forEach(el => {
                if (el.matches && el.matches('.card-hover, .mass-card, .devotion-card, .saint-card, .stat-card, [class*="card"]')) {
                    if (!el.hasAttribute('data-aos') && !el.hasAttribute('data-reveal') && !el.closest('[data-aos]') && !el.closest('[data-reveal]')) {
                        el.setAttribute('data-aos', 'fade-up');
                        el.classList.add('smooth-transition');
                    }
                }

                if (el.matches && el.matches('h1:not([data-reveal]), h2:not([data-reveal]), p:not([data-reveal-text]):not([data-reveal])')) {
                    if (!el.hasAttribute('data-aos') && !el.closest('[data-aos]') && !el.closest('[data-reveal]')) {
                        el.setAttribute('data-aos', 'fade-up');
                        el.classList.add('smooth-transition');
                    }
                }

                if (el.matches && el.matches(selectors)) {
                    if (!el.classList.contains('revealed') && !el.classList.contains('aos-animate')) {
                        io.observe(el);
                    }
                }
            });
        };

        // Re-query after route paint settles
        const run = () => {
            observeElements(document);

            // Setup MutationObserver for dynamically added elements (like from APIs)
            const mo = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.addedNodes.length) {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1) {
                                observeElements(node);
                            }
                        });
                    }
                });
            });
            mo.observe(document.body, { childList: true, subtree: true });

            return () => {
                io.disconnect();
                mo.disconnect();
            };
        };

        const id = setTimeout(run, 80);
        return () => {
            clearTimeout(id);
            io.disconnect();
        };
    }, [pathname]);

    return null;
}
