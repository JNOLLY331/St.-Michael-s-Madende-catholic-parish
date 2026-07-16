import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
<<<<<<< HEAD
import { MdChurch, MdExpandMore, MdPerson, MdDashboard, MdLogout } from 'react-icons/md';
import DynamicIcon from './DynamicIcon';
import { useAuth } from '../context/AuthContext';
=======
import { MdChurch, MdExpandMore, MdPerson } from 'react-icons/md';
import DynamicIcon from './DynamicIcon';
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1



const navLinks = [
    { label: 'Home', to: '/' },
    {
        label: 'About', to: '/about',
        dropdown: [
            { label: 'Our History', to: '/about#history' },
            { label: 'Parish Priests', to: '/about#priests' },
            { label: 'Parish Council', to: '/about#council' },
        ],
    },
    {
        label: 'Mass Schedule', to: '/mass-schedule',
        dropdown: [
            { label: 'Sunday Mass', to: '/mass-schedule#sunday' },
            { label: 'Daily Mass', to: '/mass-schedule#daily' },
            { label: 'Holy Days', to: '/mass-schedule#holydays' },
        ],
    },
    {
        label: 'Sacraments', to: '/sacraments',
        dropdown: [
            { label: 'Baptism', to: '/sacraments#baptism' },
            { label: 'First Communion', to: '/sacraments#communion' },
            { label: 'Confirmation', to: '/sacraments#confirmation' },
            { label: 'Marriage', to: '/sacraments#marriage' },
        ],
    },
    {
        label: 'Ministries', to: '/ministries',
        dropdown: [
            { label: 'Youth Ministry', to: '/ministries#youth' },
            { label: "Women's Guild", to: '/ministries#women' },
            { label: "Men's Fellowship", to: '/ministries#men' },
            { label: 'Choir', to: '/ministries#choir' },
        ],
    },
    { label: 'Events', to: '/events' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
<<<<<<< HEAD
    const { isAuthenticated, user, logout } = useAuth();
=======
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        setMobileDropdown(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    const handleNavClick = (to) => {
        navigate(to);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

<<<<<<< HEAD
    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const navbarBg = scrolled
        ? 'bg-[#2d0009]/95 backdrop-blur-xl shadow-2xl shadow-black/50'
        : 'bg-gradient-to-r from-[#570013] via-[#6b0017] to-[#570013]';
=======
    const navbarBg = scrolled
        ? 'bg-[#3a000d]/98 backdrop-blur-md shadow-2xl shadow-black/40'
        : 'bg-[#570013]';
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1

    return (
        <header
            className={`w-full top-0 fixed z-50 transition-all duration-500 ${navbarBg}`}
        >
<<<<<<< HEAD
            {/* Animated accent bar */}
            <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, #ffe088 30%, #ff9f4a 60%, #ffe088 80%, transparent 100%)' }} />

            {/* Top info strip */}
            <div className="bg-[#40000b]/80 text-[#ffe088]/90 text-[11px] px-4 py-1 text-center hidden md:block font-oswald tracking-widest border-b border-white/5">
                <span>📍 123 Parish Road, Madende &nbsp;|&nbsp; ☎ (123) 456-7890 &nbsp;|&nbsp; ✉ info@stmichaelmadende.org</span>
=======
            {/* Animated top glow bar */}
            <div className="footer-glow-bar" style={{ background: 'linear-gradient(90deg, transparent, #ffe088aa, #ff6b3566, #ffe088aa, transparent)', backgroundSize: '200% 100%' }} />

            {/* Top info strip */}
            <div className="bg-[#40000b] text-[#ffe088] text-xs px-4 py-1.5 text-center hidden md:block font-oswald tracking-widest">
                <span>123 Parish Road, Madende &nbsp;|&nbsp; ☎ (123) 456-7890 &nbsp;|&nbsp; ✉ info@stmichaelmadende.org</span>
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
            </div>

            {/* Main navbar */}
            <div className="w-full px-0">
                <div className="flex justify-between items-center px-4 md:px-6 py-2 w-full">

                    {/* Brand */}
                    <button
                        onClick={() => handleNavClick('/')}
                        className="flex items-center gap-3 cursor-pointer group shrink-0"
                    >
<<<<<<< HEAD
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ffe088] to-[#f0c040] flex items-center justify-center shadow-lg shadow-black/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-2 border-white/20">
                            <MdChurch className="text-[#570013] text-2xl" />
                        </div>
                        <div className="text-left">
                            <span className="font-oswald font-bold text-white text-[18px] tracking-wide block leading-tight drop-shadow-lg">
                                ST. MICHAEL'S
                                <br /><span className="text-[#ffe088]">MADENDE</span>
                            </span>
                            <span className="text-white/60 text-[9px] font-oswald tracking-[0.25em] uppercase">
=======
                        <div className="w-12 h-12 rounded-full bg-[#ffe088] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <MdChurch className="text-[#570013] text-3xl" />
                        </div>
                        <div className="text-left">
                            <span className="font-oswald font-bold text-white text-xl tracking-wide block leading-none drop-shadow-lg">
                                ST. MICHAEL'S
                                <br /><span>MADENDE</span>
                            </span>
                            <span className="text-[#ffe088] text-[10px] font-oswald tracking-[0.2em] uppercase">
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                                Catholic Parish
                            </span>
                        </div>
                    </button>

<<<<<<< HEAD
                    {/* Desktop Nav */}
=======
                    {/* Desktop Nav — full edge-to-edge spread */}
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                    <nav className="hidden lg:flex items-center flex-1">
                        <div className="flex items-center w-full justify-between px-4">
                            {navLinks.map(({ label, to, dropdown }) => {
                                const active = pathname === to || (to !== '/' && pathname.startsWith(to));
                                return (
                                    <div key={to} className="nav-item relative group">
                                        <button
                                            onClick={() => handleNavClick(to)}
                                            className={`
<<<<<<< HEAD
                                                nav-link-text relative flex items-center gap-1 px-2 py-1
                                                font-oswald font-bold text-sm tracking-wide
                                                border-b-2 transition-all duration-300
                                                ${active
                                                    ? 'text-[#ffe088] border-[#ffe088]'
                                                    : 'text-white/85 border-transparent hover:text-[#ffe088] hover:border-[#ffe088]/50'
                                                }
                                            `}
                                        >
=======
                                                nav-link-text relative flex items-center gap-1 px-2
                                                border-b-2 transition-all duration-300
                                                ${active
                                                    ? 'text-[#ffe088] border-[#ffe088]'
                                                    : 'text-white/90 border-transparent hover:text-[#ffe088] hover:border-[#ffe088]/60'
                                                }
                                            `}
                                        >
                                            {/* Active indicator dot */}
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                                            {active && (
                                                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ffe088]" />
                                            )}
                                            {label}
                                            {dropdown && (
                                                <MdExpandMore className="text-sm transition-transform duration-300 group-hover:rotate-180" />
                                            )}
                                        </button>

                                        {/* Dropdown */}
                                        {dropdown && (
<<<<<<< HEAD
                                            <div className="nav-dropdown absolute top-full left-0 mt-3 shadow-2xl shadow-black/40 border py-2 min-w-[210px] z-50 rounded-lg overflow-hidden"
=======
                                            <div className="nav-dropdown absolute top-full left-0 mt-2 rounded-none shadow-2xl shadow-black/30 border py-2 min-w-[210px] z-50"
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                                                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                                                <div className="absolute -top-2 left-6 w-4 h-4 rotate-45 border-t border-l"
                                                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }} />
                                                {dropdown.map(({ label: dLabel, to: dTo }, i) => (
                                                    <button
                                                        key={dTo}
                                                        onClick={() => handleNavClick(dTo)}
<<<<<<< HEAD
                                                        className="w-full text-left px-5 py-2.5 font-oswald text-sm tracking-wide flex items-center gap-2.5 transition-all duration-200 hover:pl-7 group/item"
=======
                                                        className="w-full text-left px-5 py-2.5 font-oswald font-bold text-sm tracking-wide flex items-center gap-2 transition-all duration-200 hover:pl-7"
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                                                        style={{
                                                            color: 'var(--text-primary)',
                                                            animationDelay: `${i * 40}ms`
                                                        }}
                                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                    >
<<<<<<< HEAD
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#570013] opacity-50 group-hover/item:opacity-100 transition-opacity" />
=======
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#570013] opacity-60" />
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                                                        {dLabel}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            className={`theme-toggle ${theme === 'dark' ? 'dark' : ''}`}
                            aria-label="Toggle theme"
                        />

                        {/* Donate button */}
                        <button
                            onClick={() => handleNavClick('/donate')}
<<<<<<< HEAD
                            className="btn-primary bg-gradient-to-r from-[#ffe088] to-[#f0c040] text-[#40000b] px-4 py-2 rounded-full font-oswald font-bold text-sm tracking-wide uppercase shadow-lg hover:shadow-[#ffe088]/30 hover:scale-105 transition-all hidden md:block"
=======
                            className="btn-primary bg-[#ffe088] text-[#40000b] px-5 py-2 rounded-full font-oswald font-bold text-sm tracking-wide uppercase shadow-lg hover:bg-[#feed9a] transition-all hidden md:block"
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                        >
                            Donate
                        </button>

<<<<<<< HEAD
                        {/* Auth buttons */}
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center gap-2">
                                {/* Dashboard button */}
                                <button
                                    onClick={() => handleNavClick('/dashboard')}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-oswald font-bold text-sm tracking-wide uppercase transition-all duration-300 ${pathname === '/dashboard'
                                            ? 'bg-[#ffe088] text-[#40000b] shadow-lg'
                                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                        }`}
                                >
                                    <MdDashboard className="text-base" />
                                    <span>Dashboard</span>
                                </button>
                                {/* Logout button */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1 border border-white/20 bg-white/5 text-white/80 px-3 py-2 rounded-full font-oswald font-bold text-sm tracking-wide uppercase hover:bg-red-900/40 hover:text-white hover:border-red-400/40 transition-all duration-300"
                                    title={`Logout (${user?.first_name || user?.username})`}
                                >
                                    <MdLogout className="text-base" />
                                    <span className="hidden xl:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleNavClick('/login')}
                                className="hidden md:flex items-center gap-1.5 border border-white/25 bg-white/8 text-white px-4 py-2 rounded-full font-oswald font-bold text-sm tracking-wide uppercase hover:bg-white/15 hover:border-white/40 transition-all duration-300"
                            >
                                <MdPerson className="text-base" />
                                <span>Portal</span>
                            </button>
                        )}
=======
                        {/* Member Portal */}
                        <button
                            onClick={() => handleNavClick('/login')}
                            className="hidden md:flex items-center gap-1 border border-white/30 text-white px-4 py-2 rounded-full font-oswald font-bold text-sm tracking-wide uppercase hover:bg-white/10 transition-colors"
                        >
                            <MdPerson className="text-base" />
                            <span>Portal</span>
                        </button>
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1

                        {/* Hamburger */}
                        <button
                            onClick={() => setMenuOpen(v => !v)}
                            className="lg:hidden p-2 text-white hover:text-[#ffe088] transition-colors"
                            aria-label="Toggle menu"
                        >
                            <DynamicIcon name={menuOpen ? 'close' : 'menu'} className="text-3xl transition-transform duration-300"
                                style={{ transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
<<<<<<< HEAD
            <div className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="border-t border-white/10 bg-[#3a000d]/98 backdrop-blur-xl py-4 px-4">
=======
            <div className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="border-t border-white/20 bg-[#40000b] py-4 px-4">
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                    <nav className="flex flex-col gap-1">
                        {navLinks.map(({ label, to, dropdown }) => {
                            const active = pathname === to || (to !== '/' && pathname.startsWith(to));
                            return (
                                <div key={to}>
                                    <button
                                        onClick={() => dropdown ? setMobileDropdown(mobileDropdown === to ? null : to) : handleNavClick(to)}
                                        className={`w-full text-left font-oswald font-bold text-base py-3 px-4 rounded-xl tracking-widest uppercase flex justify-between items-center transition-all duration-300 ${active
                                            ? 'bg-[#570013] text-[#ffe088] shadow-inner'
<<<<<<< HEAD
                                            : 'text-white/90 hover:bg-[#570013]/50 hover:text-[#ffe088] hover:translate-x-1'
=======
                                            : 'text-white hover:bg-[#570013]/50 hover:text-[#ffe088] hover:translate-x-1'
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                                            }`}
                                        style={{ lineHeight: '2' }}
                                    >
                                        {label}
                                        {dropdown && (
                                            <MdExpandMore className={`text-base transition-transform duration-300 ${mobileDropdown === to ? 'rotate-180' : ''}`} />
                                        )}
                                    </button>
                                    {dropdown && mobileDropdown === to && (
                                        <div className="pl-4 pb-2 flex flex-col gap-1 mt-1">
                                            {dropdown.map(({ label: dLabel, to: dTo }, i) => (
                                                <button
                                                    key={dTo}
                                                    onClick={() => handleNavClick(dTo)}
                                                    className="w-full text-left font-oswald text-sm py-2 px-4 rounded-lg text-[#ffe088]/80 hover:text-[#ffe088] hover:bg-[#570013]/50 hover:translate-x-2 transition-all tracking-wide"
                                                    style={{ transitionDelay: `${i * 40}ms` }}
                                                >
                                                    › {dLabel}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
<<<<<<< HEAD

                        {/* Mobile auth / dashboard section */}
                        <div className="mt-3 pt-3 border-t border-white/10">
                            {isAuthenticated ? (
                                <div className="flex flex-col gap-2">
                                    <div className="px-4 py-2 text-[#ffe088]/60 font-oswald text-xs tracking-widest uppercase">
                                        Signed in as {user?.first_name || user?.username}
                                    </div>
                                    <button
                                        onClick={() => handleNavClick('/dashboard')}
                                        className={`w-full flex items-center gap-2 font-oswald font-bold text-base py-3 px-4 rounded-xl tracking-wide uppercase transition-all duration-300 ${pathname === '/dashboard'
                                                ? 'bg-[#ffe088] text-[#40000b]'
                                                : 'bg-[#570013]/60 text-[#ffe088] hover:bg-[#570013]'
                                            }`}
                                    >
                                        <MdDashboard className="text-base" />
                                        Dashboard
                                    </button>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={toggleTheme}
                                            className="flex items-center justify-center gap-2 border border-white/20 text-white py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-colors px-4"
                                        >
                                            <DynamicIcon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} className="text-base" />
                                            {theme === 'dark' ? 'Light' : 'Dark'}
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex-1 flex items-center justify-center gap-2 border border-red-400/30 bg-red-900/30 text-white py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide hover:bg-red-900/50 transition-colors"
                                        >
                                            <MdLogout className="text-base" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={toggleTheme}
                                        className="flex items-center justify-center gap-2 border border-white/30 text-white py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-colors px-4"
                                    >
                                        <DynamicIcon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} className="text-base" />
                                        {theme === 'dark' ? 'Light' : 'Dark'}
                                    </button>
                                    <button
                                        onClick={() => handleNavClick('/donate')}
                                        className="flex-1 bg-gradient-to-r from-[#ffe088] to-[#f0c040] text-[#40000b] py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide text-center btn-primary"
                                    >
                                        Donate
                                    </button>
                                    <button
                                        onClick={() => handleNavClick('/login')}
                                        className="flex items-center justify-center gap-1 border border-white/30 text-white py-3 px-4 rounded-full font-oswald font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-colors"
                                    >
                                        <MdPerson className="text-base" />
                                        Login
                                    </button>
                                </div>
                            )}
=======
                        <div className="flex gap-2 mt-3">
                            {/* Mobile Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="flex items-center justify-center gap-2 border border-white/30 text-white py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-colors px-4"
                            >
                                <DynamicIcon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} className="text-base" />
                                {theme === 'dark' ? 'Light' : 'Dark'}
                            </button>
                            <button
                                onClick={() => handleNavClick('/donate')}
                                className="flex-1 bg-[#ffe088] text-[#40000b] py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide text-center btn-primary"
                            >
                                Donate
                            </button>
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
