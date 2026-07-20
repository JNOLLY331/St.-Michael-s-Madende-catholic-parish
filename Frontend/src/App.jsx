import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

import ScrollToTop from './components/layout/ScrollToTop';
import ScrollReveal from './components/layout/ScrollReveal';
import MainLayout from './components/layout/MainLayout';
import PortalLayout from './components/layout/PortalLayout';

// ── Lazily-loaded routes (each becomes its own JS chunk) ──────────────────────
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const MassSchedule = lazy(() => import('./pages/MassSchedule'));
const Sacraments = lazy(() => import('./pages/Sacraments'));
const Ministries = lazy(() => import('./pages/Ministries'));
const Events = lazy(() => import('./pages/Events'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Donate = lazy(() => import('./pages/Donate'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

import { MdChurch } from 'react-icons/md';

// ── Minimal page-level loading fallback ──────────────────────────────────────
function PageLoader() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-[#1e1b18]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-14 h-14 rounded-full border-4 border-[#ffe088]/20 border-t-[#ffe088] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <MdChurch className="text-[#ffe088] text-lg" />
                    </div>
                </div>
                <p className="font-oswald tracking-[0.3em] text-[#ffe088]/70 text-xs uppercase animate-pulse">Loading…</p>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
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
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            {/* ── Public pages ── */}
                            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                            <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                            <Route path="/mass-schedule" element={<MainLayout><MassSchedule /></MainLayout>} />
                            <Route path="/sacraments" element={<MainLayout><Sacraments /></MainLayout>} />
                            <Route path="/ministries" element={<MainLayout><Ministries /></MainLayout>} />
                            <Route path="/events" element={<MainLayout><Events /></MainLayout>} />
                            <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
                            <Route path="/donate" element={<MainLayout><Donate /></MainLayout>} />
                            <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

                            {/* ── Auth & dashboard ── */}
                            <Route path="/login" element={<PortalLayout><Login /></PortalLayout>} />
                            <Route path="/register" element={<PortalLayout><Register /></PortalLayout>} />
                            <Route path="/forgot-password" element={<PortalLayout><ForgotPassword /></PortalLayout>} />
                            <Route path="/reset-password/:uidb64/:token" element={<PortalLayout><ResetPassword /></PortalLayout>} />
                            <Route path="/verify-email/:uidb64/:token" element={<PortalLayout><VerifyEmail /></PortalLayout>} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </Suspense>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}
