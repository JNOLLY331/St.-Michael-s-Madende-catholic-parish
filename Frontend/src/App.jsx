import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

import Home from './pages/Home';
import About from './pages/About';
import MassSchedule from './pages/MassSchedule';
import Sacraments from './pages/Sacraments';
import Ministries from './pages/Ministries';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

/**
 * ScrollToTop – scrolls to top on every route change
 */
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);
    return null;
}

/**
 * ScrollReveal – observes ALL reveal-data-attribute elements
 * Supports: data-reveal, data-reveal-left, data-reveal-right,
 *           data-reveal-zoom, data-reveal-flip, data-reveal-bounce,
 *           data-reveal-spin, .reveal
 */
function ScrollReveal() {
    const { pathname } = useLocation();
    useEffect(() => {
        const selectors = [
            '[data-reveal]', '[data-reveal-left]', '[data-reveal-right]',
            '[data-reveal-zoom]', '[data-reveal-flip]', '[data-reveal-bounce]',
            '[data-reveal-spin]', '.reveal',
        ];

        // Re-query after route paint settles
        const run = () => {
            const els = document.querySelectorAll(selectors.join(','));
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

/**
 * Layout wraps every page except Login and Dashboard
 */
function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-page)' }}>
            <Navbar />
            <main className="flex-grow pb-16 md:pb-0 page-enter">
                {children}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}

/**
 * Plain shell for auth/portal pages
 */
function PortalLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-page)' }}>
            {children}
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <ScrollToTop />
                <ScrollReveal />
                <Routes>
                    {/* Main public pages */}
                    <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                    <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                    <Route path="/mass-schedule" element={<MainLayout><MassSchedule /></MainLayout>} />
                    <Route path="/sacraments" element={<MainLayout><Sacraments /></MainLayout>} />
                    <Route path="/ministries" element={<MainLayout><Ministries /></MainLayout>} />
                    <Route path="/events" element={<MainLayout><Events /></MainLayout>} />
                    <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
                    <Route path="/donate" element={<MainLayout><Donate /></MainLayout>} />
                    <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                    {/* Auth & Dashboard */}
                    <Route path="/login" element={<PortalLayout><Login /></PortalLayout>} />
                    <Route path="/register" element={<PortalLayout><Register /></PortalLayout>} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
