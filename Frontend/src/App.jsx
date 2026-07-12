import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from './context/ThemeContext';
// AuthProvider wraps the whole app so every component can call useAuth()
import { AuthProvider } from './context/AuthContext';

import ScrollToTop from './components/layout/ScrollToTop';
import ScrollReveal from './components/layout/ScrollReveal';
import MainLayout from './components/layout/MainLayout';
import PortalLayout from './components/layout/PortalLayout';

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

export default function App() {
    return (
        <ThemeProvider>
            {/* AuthProvider must be inside BrowserRouter so internal navigation
                (e.g. redirect after login) can use React Router hooks */}
            <BrowserRouter>
                <AuthProvider>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        gutter={12}
                        toastOptions={{
                            duration: 4000,
                            style: {
                                fontFamily: 'var(--font-family-sans)',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                borderRadius: '14px',
                                padding: '14px 20px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)',
                                letterSpacing: '0.01em',
                                maxWidth: '420px',
                                minWidth: '300px',
                            },
                            success: {
                                duration: 4000,
                                iconTheme: { primary: '#fff', secondary: '#16a34a' },
                                style: {
                                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                                    color: '#fff',
                                    border: '2px solid rgba(255,255,255,0.25)',
                                    boxShadow: '0 8px 32px rgba(22,163,74,0.45), 0 2px 8px rgba(0,0,0,0.15)',
                                },
                            },
                            error: {
                                duration: 5000,
                                iconTheme: { primary: '#fff', secondary: '#dc2626' },
                                style: {
                                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                    color: '#fff',
                                    border: '2px solid rgba(255,255,255,0.25)',
                                    boxShadow: '0 8px 32px rgba(220,38,38,0.45), 0 2px 8px rgba(0,0,0,0.15)',
                                },
                            },
                            loading: {
                                iconTheme: { primary: '#ffe088', secondary: '#570013' },
                                style: {
                                    background: 'linear-gradient(135deg, #570013 0%, #800020 100%)',
                                    color: '#ffe088',
                                    border: '2px solid rgba(255,224,136,0.3)',
                                    boxShadow: '0 8px 32px rgba(87,0,19,0.45), 0 2px 8px rgba(0,0,0,0.15)',
                                },
                            },
                        }}
                    />
                    <ScrollToTop />
                    <ScrollReveal />
                    <Routes>
                        {/* ── Public pages (main nav layout) ── */}
                        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                        <Route path="/mass-schedule" element={<MainLayout><MassSchedule /></MainLayout>} />
                        <Route path="/sacraments" element={<MainLayout><Sacraments /></MainLayout>} />
                        <Route path="/ministries" element={<MainLayout><Ministries /></MainLayout>} />
                        <Route path="/events" element={<MainLayout><Events /></MainLayout>} />
                        <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
                        <Route path="/donate" element={<MainLayout><Donate /></MainLayout>} />
                        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

                        {/* ── Auth & dashboard (portal layout) ── */}
                        <Route path="/login" element={<PortalLayout><Login /></PortalLayout>} />
                        <Route path="/register" element={<PortalLayout><Register /></PortalLayout>} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}
