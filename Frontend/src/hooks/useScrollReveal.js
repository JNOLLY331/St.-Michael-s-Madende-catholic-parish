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
            '.reveal',
        ];

        const els = document.querySelectorAll(selectors.join(','));

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed');
                        // stagger children
                        const delay = e.target.dataset.delay || 0;
                        e.target.style.transitionDelay = `${delay}ms`;
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        els.forEach((el) => io.observe(el));
        return () => els.forEach((el) => io.unobserve(el));
    }, [pathname]);
}
