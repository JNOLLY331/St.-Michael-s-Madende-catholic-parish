import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';

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
