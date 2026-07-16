import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import {
    MdArrowBack, MdChurch, MdNotifications, MdPerson,
    MdVolunteerActivism, MdEvent, MdMenuBook, MdSettings,
    MdLogout, MdDashboard, MdChevronRight, MdSearch,
    MdTrendingUp, MdFavorite, MdStar, MdCalendarMonth
} from 'react-icons/md';
import DynamicIcon from '../components/DynamicIcon';
import { useAuth } from '../context/AuthContext';
import { eventsApi } from '../api/endpoints/events';
import { donationsApi } from '../api/endpoints/donations';
import { sacramentsApi } from '../api/endpoints/sacraments';
import Settings from '../components/dashboard/Settings';

/* ─── CountUp Hook ─── */
function useCountUp(target, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const duration = 1800;
        const step = (ts) => {
            if (!startTime) startTime = ts;
            const p = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(2, -10 * p);
            setCount(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(step);
            else setCount(target);
        };
        requestAnimationFrame(step);
    }, [target, start]);
    return count;
}

/* ─── Sidebar Items ─── */
const sidebarItems = [
    { Icon: MdDashboard, label: 'Dashboard', id: 'dashboard' },
    { Icon: MdMenuBook, label: 'Sacraments', id: 'sacraments' },
    { Icon: MdCalendarMonth, label: 'Events', id: 'events' },
    { Icon: MdVolunteerActivism, label: 'Donations', id: 'donations' },
    { Icon: MdPerson, label: 'My Profile', id: 'profile' },
    { Icon: MdSettings, label: 'Settings', id: 'settings' },
    { Icon: MdLogout, label: 'Logout', id: 'logout' },
];

/* ─── Stat Card ─── */
function StatCard({ gradient, Icon, label, value, unit = '', change, started }) {
    const num = typeof value === 'number' ? Math.round(value) : 0;
    const count = useCountUp(num, started);
    return (
        <div className={`relative rounded-2xl p-5 overflow-hidden cursor-default group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${gradient} shadow-md`}
            style={{ minHeight: 130 }}>
            {/* Glossy circle */}
            <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute right-4 top-4 w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Icon className="text-white text-[18px]" />
            </div>
            <p className="text-white/90 text-[11px] font-sans font-bold tracking-widest uppercase mb-1 drop-shadow-sm">{label}</p>
            <p className="text-white font-black text-4xl font-mono tracking-tight drop-shadow-sm">{unit}{count.toLocaleString()}</p>
            {change !== undefined && (
                <div className="flex items-center gap-1 mt-2">
                    <MdTrendingUp className="text-white/90 text-sm drop-shadow-sm" />
                    <span className="text-white/90 text-[11px] font-sans font-medium drop-shadow-sm">{change}</span>
                </div>
            )}
        </div>
    );
}

const recentActivity = [
    { type: 'Donation', detail: 'KES 2,000 processed', date: '12 Jul 2026', status: 'Completed', statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { type: 'Event', detail: 'Choir Practice registered', date: '5 Jul 2026', status: 'Confirmed', statusColor: 'bg-blue-100 text-blue-700 border-blue-200' },
    { type: 'Sacrament', detail: 'Baptism application', date: '28 Jun 2026', status: 'Pending', statusColor: 'bg-amber-100 text-amber-700 border-amber-200' },
    { type: 'Donation', detail: 'KES 1,500 processed', date: '20 Jun 2026', status: 'Completed', statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
];

export default function ParishionerDashboard() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [started, setStarted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [userStats, setUserStats] = useState({ donated: 0, events: 0, sacraments: 0 });
    const statsRef = useRef(null);

    const filteredActivity = recentActivity.filter(a =>
        a.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.detail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (!isAuthenticated) return;
        let mounted = true;
        Promise.all([
            donationsApi.listMine().catch(() => []),
            eventsApi.list().catch(() => []),
            sacramentsApi.listMyApplications().catch(() => [])
        ]).then(([donationsRes, eventsRes, sacramentsRes]) => {
            if (!mounted) return;
            const donations = Array.isArray(donationsRes) ? donationsRes : (donationsRes?.results || []);
            const totalDonated = donations.reduce((acc, p) => acc + (parseFloat(p.amount) || 0), 0);
            const myEvents = Array.isArray(eventsRes) ? eventsRes : (eventsRes?.results || []);
            const mySacraments = Array.isArray(sacramentsRes) ? sacramentsRes : (sacramentsRes?.results || []);
            setUserStats({ donated: totalDonated, events: myEvents.length, sacraments: mySacraments.length });
        });
        return () => { mounted = false; };
    }, [isAuthenticated]);

    useEffect(() => {
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.1 });
        if (statsRef.current) io.observe(statsRef.current);
        return () => io.disconnect();
    }, []);

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    const stats = [
        {
            gradient: 'bg-gradient-to-br from-[#570013] to-[#990022]',
            Icon: MdVolunteerActivism,
            label: 'Total Donated',
            value: userStats.donated,
            unit: 'KES ',
            change: 'Track generosity'
        },
        {
            gradient: 'bg-gradient-to-br from-violet-600 to-violet-800',
            Icon: MdCalendarMonth,
            label: 'Events Joined',
            value: userStats.events,
            change: 'Parish events'
        },
        {
            gradient: 'bg-gradient-to-br from-blue-600 to-blue-800',
            Icon: MdMenuBook,
            label: 'Sacrament Applications',
            value: userStats.sacraments,
            change: 'Spiritual journey'
        },
        {
            gradient: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
            Icon: MdFavorite,
            label: 'Faith Commitment',
            value: 100,
            unit: '',
            change: 'Stay blessed'
        },
    ];

    return (
        /* FIXED LAYOUT WRAPPER */
        <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900" style={{ fontFamily: 'var(--font-sans)' }}>

            {/* ══════════ SIDEBAR (FIXED height h-full) ══════════ */}
            <aside
                className={`${sidebarOpen ? 'w-64' : 'w-[72px]'} flex flex-col transition-all duration-300 h-full z-40 flex-shrink-0 bg-white border-r border-gray-200 shadow-sm`}
            >
                {/* Logo */}
                <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-100 ${sidebarOpen ? '' : 'justify-center'}`}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{ background: 'linear-gradient(135deg, #570013, #800020)' }}>
                        <MdChurch className="text-[#ffe088] text-xl" />
                    </div>
                    {sidebarOpen && (
                        <div>
                            <p className="font-black text-gray-900 text-[14px] leading-tight tracking-wide">ST. MICHAEL</p>
                            <p className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">My Portal</p>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 overflow-y-auto">
                    <div className={`space-y-1 ${sidebarOpen ? 'px-3' : 'px-2'}`}>
                        {sidebarItems.map(({ Icon, label, id }) => {
                            const isActive = activeTab === id;
                            const isLogout = id === 'logout';
                            return (
                                <button
                                    key={id}
                                    title={!sidebarOpen ? label : undefined}
                                    onClick={() => {
                                        if (isLogout) { logout(); navigate('/login'); }
                                        else setActiveTab(id);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left group border border-transparent ${isActive
                                            ? 'bg-gradient-to-r from-[#570013] to-[#800020] text-white shadow-md'
                                            : isLogout
                                                ? 'text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-100'
                                                : 'text-gray-600 hover:text-[#570013] hover:bg-[#570013]/5 hover:border-[#570013]/10'
                                        }`}
                                >
                                    <Icon className={`text-[20px] flex-shrink-0 ${isActive ? 'text-[#ffe088]' : ''}`} />
                                    {sidebarOpen && (
                                        <span className="text-[13px] font-bold whitespace-nowrap flex-1 tracking-wide">{label}</span>
                                    )}
                                    {sidebarOpen && isActive && (
                                        <MdChevronRight className="text-[#ffe088] text-sm ml-auto opacity-90" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Back to site */}
                <div className={`p-4 border-t border-gray-100`}>
                    <Link
                        to="/"
                        title={!sidebarOpen ? 'Back to Site' : undefined}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group ${sidebarOpen ? 'bg-gray-50 hover:bg-gray-100 text-gray-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`}
                    >
                        <MdArrowBack className="text-[20px] flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                        {sidebarOpen && <span className="text-[13px] font-bold tracking-wide">Back to Site</span>}
                    </Link>
                </div>
            </aside>

            {/* ══════════ MAIN CONTENT (SCROLLABLE COLUMN) ══════════ */}
            <div className="flex-1 flex flex-col overflow-hidden h-full">

                {/* ── Top Bar ── */}
                <header className="flex items-center justify-between px-8 py-4 flex-shrink-0 bg-white border-b border-gray-200 z-10 shadow-sm">

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(v => !v)}
                            className="text-gray-400 hover:text-[#570013] transition-colors p-1.5 rounded-lg hover:bg-gray-100"
                        >
                            <DynamicIcon name={sidebarOpen ? 'menu_open' : 'menu'} className="text-[24px]" />
                        </button>
                        <div>
                            <h1 className="font-bold text-gray-900 text-[18px] leading-tight flex items-center gap-2">
                                {sidebarItems.find(s => s.id === activeTab)?.label || 'Dashboard'}
                            </h1>
                            <p className="text-gray-400 text-[11.5px] font-semibold tracking-wider uppercase mt-0.5">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="hidden md:flex items-center gap-2 rounded-xl px-4 py-2 bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-[#570013]/20 focus-within:border-[#570013]/30 transition-all">
                            <MdSearch className="text-gray-400 text-[18px]" />
                            <input
                                type="text"
                                placeholder="Search activity..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-40"
                            />
                        </div>

                        {/* Bell */}
                        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#570013]">
                            <MdNotifications className="text-[24px]" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#570013] border-2 border-white box-content" />
                        </button>

                        {/* User Avatar */}
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                                style={{ background: 'linear-gradient(135deg, #570013, #800020)', border: '2px solid rgba(255,224,136,0.5)' }}>
                                <MdPerson className="text-white text-sm" />
                            </div>
                            <div className="hidden md:block">
                                <p className="text-gray-900 font-bold text-[13px] leading-tight">{user?.first_name || user?.username}</p>
                                <p className="text-gray-500 font-medium text-[10px] uppercase tracking-wider mt-0.5">Parishioner</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Page Content ── */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">

                    {/* ══ DASHBOARD TAB ══ */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6 max-w-[1500px] mx-auto">

                            {/* Welcome Banner */}
                            <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                                {/* Decor */}
                                <div className="absolute right-0 top-0 w-32 h-32 bg-[#570013]/5 rounded-full transform translate-x-10 -translate-y-10" />
                                <div className="absolute right-20 bottom-0 w-16 h-16 bg-[#ffe088]/20 rounded-full transform translate-y-8" />

                                <div className="z-10">
                                    <h2 className="font-black text-gray-900 text-3xl leading-tight">
                                        Welcome, <span className="text-[#570013]">{user?.first_name || 'Parishioner'}</span> 👋
                                    </h2>
                                    <p className="text-gray-500 font-medium text-sm mt-1">
                                        "I can do all things through Christ who strengthens me." — Phil 4:13
                                    </p>
                                </div>
                                <div className="flex gap-2 flex-wrap z-10">
                                    <button
                                        onClick={() => setActiveTab('donations')}
                                        className="px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all"
                                        style={{ background: 'linear-gradient(135deg, #570013, #800020)', color: '#ffe088' }}
                                    >
                                        + Donate
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('sacraments')}
                                        className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
                                    >
                                        Sacraments
                                    </button>
                                </div>
                            </div>

                            {/* Stat Cards */}
                            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                {stats.map(s => <StatCard key={s.label} {...s} started={started} />)}
                            </div>

                            {/* Middle row: recent summary lists */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <SummaryList
                                    title="Recent Donations"
                                    items={[
                                        { name: 'Sunday Offering', badge: 'Completed', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                                        { name: 'Building Fund', badge: 'Completed', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                                        { name: 'Charity Drive', badge: 'Pending', badgeColor: 'bg-amber-100 text-amber-700 border-amber-200' },
                                    ]}
                                />
                                <SummaryList
                                    title="Upcoming Events"
                                    items={[
                                        { name: 'Choir Practice', badge: 'Active', badgeColor: 'bg-blue-100 text-blue-700 border-blue-200' },
                                        { name: 'Youth Retreat', badge: 'Active', badgeColor: 'bg-blue-100 text-blue-700 border-blue-200' },
                                        { name: 'Harvest Festival', badge: 'Soon', badgeColor: 'bg-violet-100 text-violet-700 border-violet-200' },
                                    ]}
                                />
                                <SummaryList
                                    title="Sacrament Records"
                                    items={[
                                        { name: 'Baptism Application', badge: 'Approved', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                                        { name: 'First Communion', badge: 'Approved', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                                        { name: 'Confirmation', badge: 'Pending', badgeColor: 'bg-amber-100 text-amber-700 border-amber-200' },
                                    ]}
                                />
                            </div>

                            {/* Activity Table */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-900 text-[16px]">Activity History</h3>
                                    <span className="text-gray-500 font-bold text-[12px]">{filteredActivity.length} records</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                                {['Type', 'Detail', 'Date', 'Status', 'Action'].map(h => (
                                                    <th key={h} className="text-left px-6 py-3.5 text-[11px] uppercase tracking-widest font-bold text-gray-500">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredActivity.map((row, i) => (
                                                <tr key={i} className="transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-none group">
                                                    <td className="px-6 py-4 text-gray-900 font-bold text-[13px]">{row.type}</td>
                                                    <td className="px-6 py-4 text-gray-600 font-medium text-[13px]">{row.detail}</td>
                                                    <td className="px-6 py-4 text-gray-400 font-medium text-[13px]">{row.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${row.statusColor}`}>
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button className="text-gray-400 hover:text-[#570013] transition-colors text-lg opacity-0 group-hover:opacity-100">
                                                            ···
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══ SETTINGS TAB ══ */}
                    {activeTab === 'settings' && (
                        <div className="animate-fade-in-up max-w-[1500px] mx-auto">
                            <Settings />
                        </div>
                    )}

                    {/* ══ OTHER TABS ══ */}
                    {!['dashboard', 'settings'].includes(activeTab) && (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                            <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
                                style={{ background: 'linear-gradient(135deg, #570013, #800020)', border: '4px solid white' }}>
                                {(() => {
                                    const item = sidebarItems.find(s => s.id === activeTab);
                                    const Icon = item?.Icon || MdDashboard;
                                    return <Icon className="text-[#ffe088] text-5xl" />;
                                })()}
                            </div>
                            <h3 className="font-black text-gray-900 text-3xl mb-3">
                                {sidebarItems.find(s => s.id === activeTab)?.label}
                            </h3>
                            <p className="text-gray-500 font-medium text-sm max-w-sm leading-relaxed mb-6">
                                This section is coming soon. We're actively developing new features.
                            </p>
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className="px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all"
                                style={{ background: '#570013', color: '#ffe088' }}
                            >
                                ← Back to Dashboard
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

/* ─── Summary List Card ─── */
function SummaryList({ title, items }) {
    return (
        <div className="bg-white rounded-2xl py-2 px-5 border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between py-3 mb-2 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-[15px]">{title}</h3>
                <button className="text-[11px] font-bold uppercase tracking-wide text-[#570013] hover:underline">View All</button>
            </div>
            <div className="space-y-1 pb-3">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-none">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full flex-shrink-0 bg-[#570013]/20" />
                            <span className="text-gray-700 text-[13px] font-bold">{item.name}</span>
                        </div>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${item.badgeColor}`}>
                            {item.badge}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
