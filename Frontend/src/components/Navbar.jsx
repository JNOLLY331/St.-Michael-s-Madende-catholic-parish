import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { MdChurch, MdExpandMore, MdPerson, MdArrowForward } from 'react-icons/md';
import DynamicIcon from './DynamicIcon';
import { motion, AnimatePresence } from 'framer-motion';

// Removed inline typical stylesheet as we are using Framer Motion now

const navLinks = [
    { label: 'Home', to: '/' },
    {
        label: 'About', to: '/about',
        dropdown: [
            { label: 'Our History', to: '/about#history', icon: 'auto_stories' },
            { label: 'Parish Priests', to: '/about#priests', icon: 'person_4' },
            { label: 'Parish Council', to: '/about#council', icon: 'groups' },
        ],
    },
    {
        label: 'Mass Schedule', to: '/mass-schedule',
        dropdown: [
            { label: 'Sunday Mass', to: '/mass-schedule#sunday', icon: 'wb_sunny' },
            { label: 'Daily Mass', to: '/mass-schedule#daily', icon: 'calendar_month' },
            { label: 'Holy Days', to: '/mass-schedule#holydays', icon: 'stars' },
        ],
    },
    {
        label: 'Sacraments', to: '/sacraments',
        dropdown: [
            { label: 'Baptism', to: '/sacraments#baptism', icon: 'water_drop' },
            { label: 'First Communion', to: '/sacraments#communion', icon: 'bakery_dining' },
            { label: 'Confirmation', to: '/sacraments#confirmation', icon: 'local_fire_department' },
            { label: 'Marriage', to: '/sacraments#marriage', icon: 'favorite' },
        ],
    },
    {
        label: 'Ministries', to: '/ministries',
        dropdown: [
            { label: 'Youth Ministry', to: '/ministries#youth', icon: 'diversity_3' },
            { label: "Women's Guild", to: '/ministries#women', icon: 'face_3' },
            { label: "Men's Fellowship", to: '/ministries#men', icon: 'face_6' },
            { label: 'Choir', to: '/ministries#choir', icon: 'queue_music' },
        ],
    },
    { label: 'Events', to: '/events' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
];

const sortedNavLinks = [...navLinks]
    .map((link) => {
        if (link.dropdown) {
            return {
                ...link,
                dropdown: [...link.dropdown].sort((a, b) => a.label.length - b.label.length),
            };
        }
        return link;
    })
    .sort((a, b) => a.label.length - b.label.length);

export default function Navbar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated } = useAuth();

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState(null);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(null); // the 'to' of the currently open dropdown

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        setMobileDropdown(null);
        setIsDropdownOpen(null);
        setHoveredLink(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    const handleNavClick = (to) => {
        navigate(to);
    };

    // Advanced dynamic styles using modern glassmorphism
    const navbarBgClasses = scrolled
        ? 'bg-[#40000b]/80 backdrop-blur-2xl shadow-xl shadow-black/10 border-b border-white/10'
        : 'bg-transparent border-b border-transparent';

    const getPadding = () => scrolled ? 'py-3' : 'py-5';

    return (
        <header className="w-full fixed top-0 z-[100] flex justify-center pointer-events-none">
            {/* The transparent / frosted outer container wrapper to make the navbar act like an edge-to-edge floating header */}
            <motion.div
                initial={false}
                animate={{
                    backgroundColor: scrolled ? 'rgba(58, 0, 13, 0.95)' : 'rgba(87, 0, 19, 1)',
                    y: 0,
                    width: '100%',
                }}
                className={`w-full relative pointer-events-auto transition-all duration-700 ease-out flex flex-col justify-center items-center ${scrolled ? 'backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'shadow-none'
                    }`}
            >
                {/* Slim info top bar - fade out nicely when scrolling */}
                <motion.div
                    initial={{ height: 'auto', opacity: 1 }}
                    animate={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1 }}
                    className="w-full bg-[#300008] text-[#ffe088]/80 text-[10.5px] px-4 font-oswald tracking-[0.2em] font-medium uppercase overflow-hidden hidden md:block"
                >
                    <div className="flex justify-center items-center gap-10 py-1.5 min-h-[26px]">
                        <span>St. Michael Madende Catholic Parish</span>
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2"><DynamicIcon name="phone" className="text-sm text-[#ffe088]" /> (123) 456-7890</span>
                            <span className="flex items-center gap-2"><DynamicIcon name="mail" className="text-sm text-[#ffe088]" /> info@stmichaelmadende.org</span>
                        </div>
                    </div>
                </motion.div>

                {/* Animated colored glow bar */}
                <div className="w-full h-[1px] opacity-60" style={{ background: 'linear-gradient(90deg, transparent, #ffe088, #ff6b35, #ffe088, transparent)', backgroundSize: '200% 100%', animation: 'footerGlowSweep 4s linear infinite' }} />

                <div className={`w-full px-4 lg:px-6 transition-all duration-700 flex justify-between items-center ease-out flex items-center gap-4 ${getPadding()}`}>

                    {/* Brand / Logo — pinned far left, never grows */}
                    <button onClick={() => handleNavClick('/')} className="flex items-center gap-3 cursor-pointer group shrink-0 outline-none mr-4">
                        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-2xl bg-[#ffe088] flex items-center justify-center shadow-lg shadow-[#ffe088]/20 group-hover:scale-105 group-hover:rotate-[8deg] transition-all duration-500 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#ffae00] to-[#ffe088] opacity-80" />
                            <MdChurch className="text-[#570013] text-xl lg:text-2xl relative z-10 drop-shadow-sm" />
                        </div>
                        
                        <div className="text-left lg:flex flex flex-col justify-center">
                            <span className="font-oswald font-black text-white text-[16px] xl:text-[18px] leading-tight tracking-[0.04em] drop-shadow-md">
                                ST. MICHAEL'S
                            </span>
                            <span className="relative inline-block text-[9px] font-oswald tracking-[0.25em] font-medium uppercase mt-0.5" style={{ color: '#c5832b', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                <span className="opacity-0">Catholic Church</span>
                                <motion.span
                                    className="absolute left-0 top-0 bottom-0 whitespace-nowrap overflow-hidden border-r-[2px] border-[#c5832b]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: ["0%", "100%", "100%", "0%"] }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "linear",
                                        times: [0, 0.4, 0.6, 1]
                                    }}
                                >
                                    Catholic Church
                                </motion.span>
                            </span>
                        </div>
                    </button>

                    {/* Desktop Navigation Links — flex-1 so it fills remaining space */}
                    <nav className="hidden lg:flex flex-1 items-center justify-center gap-0 relative h-full overflow-hidden">
                        {navLinks.map((link) => {
                            const isPathActive = pathname === link.to || (link.to !== '/' && pathname.startsWith(link.to));
                            const isHovered = hoveredLink === link.label;
                            const isMegaMenuOpen = isDropdownOpen === link.label;

                            return (
                                <div
                                    key={link.to}
                                    className="relative px-1 py-2"
                                    onMouseEnter={() => {
                                        setHoveredLink(link.label);
                                        if (link.dropdown) setIsDropdownOpen(link.label);
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredLink(null);
                                        if (link.dropdown) setIsDropdownOpen(null);
                                    }}
                                >
                                    <button
                                        onClick={() => handleNavClick(link.to)}
                                        className="relative flex items-center whitespace-nowrap gap-0.5 px-2 py-1.5 outline-none font-sans font-light text-[13px] xl:text-[14px] uppercase tracking-widest transition-colors duration-200"
                                        style={{ color: isPathActive || isHovered ? '#fff' : 'rgba(255,255,255,0.65)' }}
                                    >
                                        {link.label}
                                        {link.dropdown && (
                                            <MdExpandMore className={`text-base transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMegaMenuOpen ? '-rotate-180 text-[#ffe088]' : ''}`} />
                                        )}

                                        {/* Hover Indicator Background */}
                                        {isHovered && (
                                            <motion.div
                                                layoutId="desktopNavHoverIndicator"
                                                className="absolute inset-0 bg-white/8 rounded-none border-b border-[#ffe088]/60"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                            />
                                        )}

                                        {/* Active page indicator */}
                                        {isPathActive && !isHovered && (
                                            <motion.div layoutId="desktopNavActiveIndicator" className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ffe088] shadow-[0_0_8px_#ffe088]" />
                                        )}
                                    </button>

                                    {/* ── Desktop Dropdown Mega-Menu ── */}
                                    <AnimatePresence>
                                        {link.dropdown && isMegaMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                                exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.1 } }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[260px]"
                                            >
                                                {/* Hidden hover bridge so mouse doesn't fall off */}
                                                <div className="absolute top-0 left-0 w-full h-8" />

                                                <div className="relative p-2 rounded-2xl overflow-hidden shadow-2xl bg-[#000000]/60 backdrop-blur-2xl border border-white/10 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none">
                                                    <div className="flex flex-col gap-1 relative z-10">
                                                        {link.dropdown.map((subLink, idx) => (
                                                            <button
                                                                key={subLink.to}
                                                                onClick={() => {
                                                                    handleNavClick(subLink.to);
                                                                    setIsDropdownOpen(null);
                                                                }}
                                                                className="group/dl flex items-center justify-between text-left px-3 py-2.5 rounded-xl transition-all duration-300 hover:bg-white/10 outline-none w-full"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    {subLink.icon && (
                                                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover/dl:bg-[#ffe088]/20 group-hover/dl:border-[#ffe088]/40 transition-colors">
                                                                            <DynamicIcon name={subLink.icon} className="text-[17px] text-white/70 group-hover/dl:text-[#ffe088] transition-colors" />
                                                                        </div>
                                                                    )}
                                                                    <span className="font-sans font-bold text-[15px] text-white/90 group-hover/dl:text-white transition-colors">
                                                                        {subLink.label}
                                                                    </span>
                                                                </div>
                                                                <MdArrowForward className="text-white/30 text-sm opacity-0 -translate-x-2 group-hover/dl:opacity-100 group-hover/dl:translate-x-0 transition-all duration-300" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </nav>

                    {/* Right Hand Actions */}
                    <div className="flex items-center gap-3 lg:gap-4 shrink-0">
                        <button
                            onClick={toggleTheme}
                            title="Toggle Theme"
                            className="theme-toggle hidden md:block" // Utilizing your existing fancy css toggle
                            aria-label="Toggle theme"
                        />

                        {/* Portal/Dashboard Auth Button */}
                        <button
                            onClick={() => handleNavClick(isAuthenticated ? '/dashboard' : '/login')}
                            className={`group hidden xl:flex flex-row items-center justify-center h-10 rounded-none border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 backdrop-blur-md transition-all duration-300 shadow-sm ${isAuthenticated ? 'w-auto px-4 gap-2' : 'w-10'}`}
                            title={isAuthenticated ? "Dashboard" : "Parishioner Portal"}
                        >
                            <MdPerson className="text-xl text-white/90 group-hover:text-white transition-colors" />
                            {isAuthenticated && <span className="font-oswald text-xs uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">Dashboard</span>}
                        </button>

                        <div className="h-6 w-px bg-white/10 hidden md:block ml-1 mr-1" />

                        {/* Beautiful Glow Primary Button */}
                        <button
                            onClick={() => handleNavClick('/donate')}
                            className="hidden md:flex relative group items-center justify-center px-6 py-2.5 rounded-none overflow-hidden outline-none"
                        >
                            <span className="absolute inset-0 bg-[#ffe088]" />
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                            <span className="relative z-10 font-oswald font-extrabold text-[13px] tracking-[0.1em] text-[#40000b] uppercase mt-0.5">
                                Donate
                            </span>
                            <div className="absolute inset-0 rounded-none ring-2 ring-[#ffe088]/40 ring-offset-2 ring-offset-[#570013] group-hover:ring-[#ffe088] transition-all opacity-0 group-hover:opacity-100" />
                        </button>

                        {/* Mobile Menu Hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden relative w-10 h-10 rounded-none border border-white/20 bg-white/5 flex items-center justify-center overflow-hidden hover:bg-white/10 transition-colors"
                        >
                            <div className="relative w-4 h-4 flex flex-col justify-between items-center group">
                                <span className={`block w-full h-[1.5px] bg-white rounded-full transition-transform duration-500 ease-in-out origin-center ${menuOpen ? 'translate-y-[7.25px] rotate-45 bg-[#ffe088]' : ''}`} />
                                <span className={`block w-full h-[1.5px] bg-white rounded-full transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                                <span className={`block w-full h-[1.5px] bg-white rounded-full transition-transform duration-500 ease-in-out origin-center ${menuOpen ? '-translate-y-[7.25px] -rotate-45 bg-[#ffe088]' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* ── Stunning Framer Motion Mobile Drawer ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-15%', filter: 'blur(15px)' }}
                        animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: '-10%', filter: 'blur(15px)' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 top-0 left-0 w-full h-[100dvh] z-[-1] pt-[90px] pointer-events-auto overflow-y-auto flex flex-col hide-scrollbar"
                        style={{
                            background: 'linear-gradient(160deg, rgba(121, 2, 31, 0.95) 0%, rgba(143, 0, 0, 0.98) 100%)',
                            backdropFilter: 'blur(50px)',
                            WebkitBackdropFilter: 'blur(50px)',
                        }}
                    >
                        {/* Decorative background glow */}
                        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[50%] bg-[#ffe088] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-[#ff6b35] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10 px-6 pb-24 flex-1 w-full max-w-[600px] mx-auto flex flex-col pt-6">
                            <motion.div
                                initial="hidden" animate="visible" exit="hidden"
                                variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
                                className="flex flex-col gap-1"
                            >
                                {sortedNavLinks.map((link) => {
                                    const isPathActive = pathname === link.to || (link.to !== '/' && pathname.startsWith(link.to));
                                    const hasOpenDropdown = mobileDropdown === link.to;

                                    return (
                                        <motion.div
                                            key={link.to}
                                            variants={{
                                                hidden: { opacity: 0, x: -30, rotateX: 30 },
                                                visible: { opacity: 1, x: 0, rotateX: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } }
                                            }}
                                            style={{ transformPerspective: 800 }}
                                            className="w-full flex-col flex"
                                        >
                                            <button
                                                onClick={() => link.dropdown ? setMobileDropdown(hasOpenDropdown ? null : link.to) : (handleNavClick(link.to) || setMenuOpen(false))}
                                                className="w-full flex items-center justify-between py-3 sm:py-4 border-b border-white/5 hover:border-white/20 transition-all outline-none"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isPathActive ? 'bg-[#ffe088] shadow-[0_0_10px_#ffe088]' : 'bg-transparent'}`} />
                                                    <span
                                                        className={`font-oswald font-medium text-sm sm:text-base uppercase tracking-wider transition-colors duration-300 ${isPathActive ? 'text-[#ffe088] drop-shadow-md' : 'text-white/80'}`}
                                                    >
                                                        {link.label}
                                                    </span>
                                                </div>
                                                {link.dropdown && (
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border transition-all duration-500 ${hasOpenDropdown ? 'border-[#ffe088]/40 bg-[#ffe088]/10 text-[#ffe088] rotate-180' : 'border-white/10 text-white/50'}`}>
                                                        <MdExpandMore className="text-2xl" />
                                                    </div>
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {hasOpenDropdown && link.dropdown && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0, scale: 0.98 }}
                                                        animate={{ height: 'auto', opacity: 1, scale: 1 }}
                                                        exit={{ height: 0, opacity: 0, scale: 0.98 }}
                                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                        className="overflow-hidden origin-top"
                                                    >
                                                        <div className="pt-3 pb-2 pl-6 pr-2 flex flex-col gap-2">
                                                            {link.dropdown.map(sl => (
                                                                <button
                                                                    key={sl.to}
                                                                    onClick={() => { handleNavClick(sl.to); setMenuOpen(false); }}
                                                                    className="group flex items-center justify-between py-2 px-4 rounded-xl hover:bg-white/5 transition-colors text-left outline-none border border-transparent hover:border-white/10"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        {sl.icon && (
                                                                            <div className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center border border-white/5 group-hover:border-[#ffe088]/30 group-hover:bg-[#ffe088]/10 transition-colors">
                                                                                <DynamicIcon name={sl.icon} className="text-[18px] text-white/50 group-hover:text-[#ffe088] transition-colors" />
                                                                            </div>
                                                                        )}
                                                                        <span className="font-sans font-semibold text-[14px] text-white/70 group-hover:text-white transition-colors">{sl.label}</span>
                                                                    </div>
                                                                    <MdArrowForward className="text-[#ffe088] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm" />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="mt-6 flex flex-col gap-4"
                            >
                                <button onClick={() => { handleNavClick('/donate'); setMenuOpen(false); }} className="w-full bg-gradient-to-r from-[#f5c842] to-[#ffe088] text-[#40000b] shadow-[0_10px_30px_rgba(255,224,136,0.25)] min-h-[64px] rounded-none font-oswald font-extrabold text-[17px] uppercase tracking-[0.15em] relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        Donate Now <MdArrowForward className="text-xl" />
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                </button>

                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <button onClick={() => { handleNavClick(isAuthenticated ? '/dashboard' : '/login'); setMenuOpen(false); }} className="w-full min-h-[56px] border border-white/15 rounded-none flex items-center justify-center gap-3 text-white/90 font-oswald font-medium tracking-wide uppercase hover:bg-white/10 hover:border-white/30 transition-colors">
                                        <MdPerson className="text-2xl text-[#ffe088]" /> {isAuthenticated ? 'Dashboard' : 'Portal'}
                                    </button>
                                    <button onClick={toggleTheme} className="w-full min-h-[56px] border border-white/15 rounded-none flex items-center justify-center gap-3 text-white/90 font-oswald font-medium tracking-wide uppercase hover:bg-white/10 hover:border-white/30 transition-colors">
                                        <DynamicIcon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} className="text-2xl text-[#ffe088]" /> {theme === 'dark' ? 'Light' : 'Dark'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
