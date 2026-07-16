import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollReveal() {
    const { pathname } = useLocation();

    useEffect(() => {
        const selectors = [
            '[data-reveal]',
            '[data-reveal-left]',
            '[data-reveal-right]',
            '[data-reveal-zoom]',
            '[data-reveal-flip]',
            '[data-reveal-bounce]',
            '[data-reveal-spin]',
            '[data-reveal-text]',
            '.reveal',
<<<<<<< HEAD
            '[data-aos]',
        ].join(',');
=======
        ];

        const els = document.querySelectorAll(selectors.join(','));
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed');
<<<<<<< HEAD
                        // Also add 'visible' for legacy support
                        e.target.classList.add('visible');
                        // Add aos-animate for new animations
                        if (e.target.hasAttribute('data-aos')) {
                            e.target.classList.add('aos-animate');
                        }
                        const delay = e.target.dataset.delay || 0;
                        if (delay) e.target.style.transitionDelay = `${delay}ms`;
                        io.unobserve(e.target);
=======
                        // stagger children
                        const delay = e.target.dataset.delay || 0;
                        e.target.style.transitionDelay = `${delay}ms`;
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

<<<<<<< HEAD
        // function to observe new elements
        const observeElements = (root) => {
            if (!root || !root.querySelectorAll) return;
            const elementsToCheck = [root, ...Array.from(root.querySelectorAll('*'))];

            elementsToCheck.forEach(el => {
                // Check if element is a card
                if (el.matches && el.matches('.card-hover, .mass-card, .devotion-card, .saint-card, .stat-card, [class*="card"]')) {
                    if (!el.hasAttribute('data-aos') && !el.hasAttribute('data-reveal') && !el.closest('[data-aos]') && !el.closest('[data-reveal]')) {
                        el.setAttribute('data-aos', 'fade-up');
                        el.classList.add('smooth-transition');
                    }
                }

                // Check if element is a text element
                if (el.matches && el.matches('h1:not([data-reveal]), h2:not([data-reveal]), p:not([data-reveal-text]):not([data-reveal])')) {
                    if (!el.hasAttribute('data-aos') && !el.closest('[data-aos]') && !el.closest('[data-reveal]')) {
                        el.setAttribute('data-aos', 'fade-up');
                        el.classList.add('smooth-transition');
                    }
                }

                // Observe if it matches selectors
                if (el.matches && el.matches(selectors)) {
                    if (!el.classList.contains('revealed') && !el.classList.contains('aos-animate')) {
                        io.observe(el);
                    }
                }
            });
        };

        // Observe initial DOM
        observeElements(document);

        // Setup MutationObserver to watch for async components (like Events, gallery, etc)
        const mo = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            // Check the node itself
                            if (node.matches(selectors) && !node.classList.contains('revealed')) {
                                io.observe(node);
                            }
                            // Check its children
                            observeElements(node);
                        }
                    });
                }
            }
        });

        mo.observe(document.body, { childList: true, subtree: true });

        return () => {
            io.disconnect();
            mo.disconnect();
        };
=======
        els.forEach((el) => io.observe(el));
        return () => els.forEach((el) => io.unobserve(el));
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
    }, [pathname]);
}
