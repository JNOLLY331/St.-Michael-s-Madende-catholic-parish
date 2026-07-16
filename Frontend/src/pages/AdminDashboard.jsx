import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import {
    MdArrowBack, MdChurch, MdDelete, MdEdit, MdNotifications, MdPerson,
    MdPersonAdd, MdSearch, MdCheckCircle, MdCancel, MdTrendingUp,
    MdDashboard, MdGroup, MdEvent, MdCampaign, MdVolunteerActivism,
    MdPhotoLibrary, MdSettings, MdLogout, MdChevronRight
} from 'react-icons/md';
import DynamicIcon from '../components/DynamicIcon';
import { useAuth } from '../context/AuthContext';
import Settings from '../components/dashboard/Settings';
import GenericDataView from '../components/dashboard/GenericDataView';

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
    { Icon: MdDashboard, icon: 'dashboard', label: 'Dashboard', id: 'dashboard' },
    { Icon: MdGroup, icon: 'group', label: 'Parishioners', id: 'parishioners' },
    { Icon: MdChurch, icon: 'church', label: 'Mass Schedule', id: 'mass' },
    { Icon: MdEvent, icon: 'event', label: 'Events', id: 'events' },
    { Icon: MdCampaign, icon: 'campaign', label: 'Announcements', id: 'announcements' },
    { Icon: MdVolunteerActivism, icon: 'volunteer_activism', label: 'Donations', id: 'donations' },
    { Icon: MdPhotoLibrary, icon: 'photo_library', label: 'Gallery', id: 'gallery' },
    { Icon: MdPerson, icon: 'person', label: 'Admin Profile', id: 'profile' },
    { Icon: MdSettings, icon: 'settings', label: 'Settings', id: 'settings' },
    { Icon: MdLogout, icon: 'logout', label: 'Logout', id: 'logout' },
];

/* ─── Stat Card ─── */
function StatCard({ gradient, Icon, label, value, change, started }) {
    const count = useCountUp(value, started);
    return (
        <div className={`relative rounded-2xl p-5 overflow-hidden cursor-default group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${gradient} shadow-md`}
            style={{ minHeight: 120 }}>
            {/* Glossy circle overlay */}
            <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute right-4 top-4 w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Icon className="text-white text-[16px]" />
            </div>
            <p className="text-white/80 text-[10px] font-sans font-bold tracking-widest uppercase mb-1 drop-shadow-sm">{label}</p>
            <p className="text-white font-black text-3xl font-mono tracking-tight drop-shadow-sm">{count.toLocaleString()}</p>
            {change !== undefined && (
                <div className="flex items-center gap-1 mt-1.5">
                    <MdTrendingUp className="text-white/80 text-sm drop-shadow-sm" />
                    <span className="text-white/90 text-[11px] font-sans font-medium drop-shadow-sm">{Math.abs(change)}% this month</span>
                </div>
            )}
        </div>
    );
}

const recentActivity = [
    { label: 'New parishioner registered', detail: 'Mary Wanjiku', time: '2 min ago', badge: 'New', badgeColor: 'bg-blue-100 text-blue-700 border-blue-200' },
    { label: 'Donation received', detail: 'KES 5,000', time: '15 min ago', badge: 'Received', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { label: 'New event created', detail: 'Harvest Festival', time: '1 hr ago', badge: 'Published', badgeColor: 'bg-violet-100 text-violet-700 border-violet-200' },
    { label: 'Announcement published', detail: 'Choir Meeting', time: '2 hrs ago', badge: 'Live', badgeColor: 'bg-amber-100 text-amber-700 border-amber-200' },
    { label: 'Mass schedule updated', detail: 'Sunday 9:30 AM', time: '3 hrs ago', badge: 'Updated', badgeColor: 'bg-blue-100 text-blue-700 border-blue-200' },
    { label: 'Gallery photos added', detail: '12 new photos', time: '5 hrs ago', badge: 'Added', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
];

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [started, setStarted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [parishionersData, setParishionersData] = useState([]);
    const [loadingParishioners, setLoadingParishioners] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.1 });
        if (statsRef.current) io.observe(statsRef.current);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (activeTab === 'parishioners' && isAuthenticated && parishionersData.length === 0 && !loadingParishioners) {
            import('../api/endpoints/accounts').then(({ accountsApi }) => {
                setLoadingParishioners(true);
                accountsApi.getUsers()
                    .then((data) => {
                        const items = Array.isArray(data) ? data : (data?.results ?? []);
                        setParishionersData(items.map(u => ({
                            name: `${u.first_name} ${u.last_name || u.username}`,
                            email: u.email || '—',
                            role: u.role === 'SUPER_ADMIN' || u.role?.includes('PRIEST') ? 'Clergy' : 'Laity',
                            status: u.is_verified ? 'Active' : 'Pending',
                            joined: new Date(u.date_joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        })));
                    })
                    .catch(() => { })
                    .finally(() => setLoadingParishioners(false));
            });
        }
    }, [activeTab, isAuthenticated, parishionersData.length, loadingParishioners]);

    const [fetchedStats, setFetchedStats] = useState([]);
    useEffect(() => {
        import('../api/endpoints/church').then(({ churchApi }) => {
            churchApi.getStatistics().then((data) => {
                const items = Array.isArray(data) ? data : (data?.results ?? []);
                const gradients = [
                    'bg-gradient-to-br from-[#570013] to-[#990022]',
                    'bg-gradient-to-br from-indigo-600 to-indigo-800',
                    'bg-gradient-to-br from-emerald-600 to-emerald-800',
                    'bg-gradient-to-br from-amber-500 to-amber-700',
                    'bg-gradient-to-br from-violet-600 to-violet-800',
                    'bg-gradient-to-br from-blue-600 to-blue-800',
                ];
                const icons = [MdGroup, MdChurch, MdVolunteerActivism, MdEvent, MdCheckCircle, MdCampaign];
                if (items.length > 0) {
                    setFetchedStats(items.map((item, idx) => ({
                        gradient: gradients[idx % gradients.length],
                        Icon: icons[idx % icons.length],
                        label: item.title,
                        value: item.value,
                        change: 0,
                    })));
                }
            }).catch(() => { });
        });
    }, []);

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    const fallbackStats = [
        { gradient: 'bg-gradient-to-br from-[#570013] to-[#990022]', Icon: MdGroup, label: 'Total Believers', value: 3200, change: 4.5 },
        { gradient: 'bg-gradient-to-br from-indigo-600 to-indigo-800', Icon: MdChurch, label: 'Clergy Members', value: 12, change: 0 },
        { gradient: 'bg-gradient-to-br from-emerald-600 to-emerald-800', Icon: MdVolunteerActivism, label: 'Laity Members', value: 2800, change: 3.2 },
        { gradient: 'bg-gradient-to-br from-amber-500 to-amber-700', Icon: MdEvent, label: 'Baptized', value: 1450, change: 2.1 },
        { gradient: 'bg-gradient-to-br from-violet-600 to-violet-800', Icon: MdCheckCircle, label: 'Confirmed', value: 890, change: 1.8 },
        { gradient: 'bg-gradient-to-br from-blue-600 to-blue-800', Icon: MdCampaign, label: 'Years Established', value: 65, change: 0 },
    ];

    const stats = fetchedStats.length > 0 ? fetchedStats : fallbackStats;

    const filteredParishioners = parishionersData.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            <p className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">Admin Portal</p>
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

                {/* Top Bar */}
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
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-40"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#570013]">
                            <MdNotifications className="text-[24px]" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#570013] border-2 border-white box-content" />
                        </button>

                        {/* Avatar */}
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                                style={{ background: 'linear-gradient(135deg, #570013, #800020)', border: '2px solid rgba(255,224,136,0.5)' }}>
                                <MdPerson className="text-white text-sm" />
                            </div>
                            <div className="hidden md:block">
                                <p className="text-gray-900 font-bold text-[13px] leading-tight">{user?.first_name || user?.username}</p>
                                <p className="text-gray-500 font-medium text-[10px] uppercase tracking-wider mt-0.5">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Page Content (Only this scrolls) ── */}
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
                                        Welcome, <span className="text-[#570013]">{user?.first_name || 'Admin'}</span> 👋
                                    </h2>
                                    <p className="text-gray-500 font-medium text-sm mt-1">
                                        Here's what's happening at St. Michael's today.
                                    </p>
                                </div>
                                <div className="flex gap-2 flex-wrap z-10">
                                    {['Overview', 'Parishioners', 'Events', 'Finances'].map((t, i) => (
                                        <button key={t}
                                            className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all border ${i === 0
                                                ? 'bg-[#570013] text-[#ffe088] border-[#570013] shadow-md shadow-[#570013]/20'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                }`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Statistics Cards (Colored visually mapped) */}
                            <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                                {stats.map(s => <StatCard key={s.label} {...s} started={started} />)}
                            </div>

                            {/* Middle Summary Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <SummaryList
                                    title="Recent Parishioners"
                                    items={[
                                        { name: 'Mary Wanjiku', badge: 'Active', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                                        { name: 'John Kamau', badge: 'Active', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                                        { name: 'Grace Mwangi', badge: 'Pending', badgeColor: 'bg-amber-100 text-amber-700 border-amber-200' },
                                    ]}
                                />
                                <SummaryList
                                    title="Upcoming Events"
                                    items={[
                                        { name: 'Harvest Festival', badge: 'Active', badgeColor: 'bg-blue-100 text-blue-700 border-blue-200' },
                                        { name: 'Choir Practice', badge: 'Active', badgeColor: 'bg-blue-100 text-blue-700 border-blue-200' },
                                        { name: 'Youth Retreat', badge: 'Soon', badgeColor: 'bg-violet-100 text-violet-700 border-violet-200' },
                                    ]}
                                />
                                <SummaryList
                                    title="Recent Donations"
                                    items={[
                                        { name: 'Building Fund — KES 5,000', badge: 'Received', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                                        { name: 'School Fund — KES 2,500', badge: 'Received', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                                        { name: 'Charity Drive — KES 1,000', badge: 'Pending', badgeColor: 'bg-amber-100 text-amber-700 border-amber-200' },
                                    ]}
                                />
                            </div>

                            {/* Recent Activity Table */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-900 text-[16px]">Recent Activity</h3>
                                    <button className="text-[12px] font-bold uppercase tracking-wide text-[#570013] hover:underline">
                                        View All
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                                {['Activity', 'Detail', 'Time', 'Status', 'Action'].map(h => (
                                                    <th key={h} className="text-left px-6 py-3.5 text-[11px] uppercase tracking-widest font-bold text-gray-500">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentActivity.map((row, i) => (
                                                <tr key={i} className="transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-none group">
                                                    <td className="px-6 py-4 text-gray-900 font-bold text-[13px]">{row.label}</td>
                                                    <td className="px-6 py-4 text-gray-600 font-medium text-[13px]">{row.detail}</td>
                                                    <td className="px-6 py-4 text-gray-400 font-medium text-[13px]">{row.time}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${row.badgeColor}`}>
                                                            {row.badge}
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

                    {/* ══ PARISHIONERS TAB ══ */}
                    {activeTab === 'parishioners' && (
                        <div className="space-y-6 max-w-[1500px] mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <div>
                                    <h2 className="font-black text-gray-900 text-2xl">Parishioners</h2>
                                    <p className="text-gray-500 text-sm font-medium mt-1">Manage parish members, contacts, and sacramental status</p>
                                </div>
                                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:-translate-y-0.5"
                                    style={{ background: '#570013', color: '#ffe088' }}>
                                    <MdPersonAdd className="text-base" />
                                    Add Member
                                </button>
                            </div>

                            {/* Search */}
                            <div className="flex items-center gap-3 rounded-xl px-4 py-3.5 bg-white border border-gray-200 shadow-sm focus-within:border-[#570013]/50 focus-within:ring-2 focus-within:ring-[#570013]/10 transition-all">
                                <MdSearch className="text-gray-400 text-[20px]" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or role..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="bg-transparent text-gray-900 placeholder-gray-400 text-sm font-medium focus:outline-none flex-1"
                                />
                            </div>

                            {/* Table */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50/80 border-b border-gray-200">
                                                {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                                                    <th key={h} className="text-left px-6 py-4 text-[11px] uppercase tracking-widest font-bold text-gray-500">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loadingParishioners ? (
                                                <tr><td colSpan={6} className="text-center py-16 text-gray-500 text-sm font-semibold">Loading membership records...</td></tr>
                                            ) : filteredParishioners.length === 0 ? (
                                                <tr><td colSpan={6} className="text-center py-16 text-gray-500 text-sm font-semibold">No parishioners found matching your query.</td></tr>
                                            ) : filteredParishioners.map(({ name, email, role, status, joined }) => (
                                                <tr key={name} className="transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-none">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[#ffe088] font-black text-sm flex-shrink-0 shadow-inner"
                                                                style={{ background: 'linear-gradient(135deg, #570013, #800020)' }}>
                                                                {name[0]}
                                                            </div>
                                                            <span className="text-gray-900 font-bold text-[14px]">{name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 font-medium text-[13px]">{email}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[11px] font-bold px-3 py-1 rounded-md border ${role === 'Clergy' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                                                            {role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                                                            <span className={`text-[13px] font-bold ${status === 'Active' ? 'text-emerald-700' : 'text-amber-600'}`}>{status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500 font-medium text-[13px]">{joined}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-1.5">
                                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                                <MdEdit className="text-[18px]" />
                                                            </button>
                                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                                <MdDelete className="text-[18px]" />
                                                            </button>
                                                        </div>
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

                    {/* ══ GENERIC DATA TABS ══ */}
                    {!['dashboard', 'parishioners', 'settings', 'profile'].includes(activeTab) && (
                        <div className="max-w-[1500px] mx-auto">
                            <GenericDataView
                                type={activeTab}
                                title={sidebarItems.find(s => s.id === activeTab)?.label}
                                subtitle={`Manage ${sidebarItems.find(s => s.id === activeTab)?.label?.toLowerCase()} entries`}
                                icon={sidebarItems.find(s => s.id === activeTab)?.icon || 'list'}
                            />
                        </div>
                    )}

                    {/* ══ PROFILE TAB ══ */}
                    {activeTab === 'profile' && (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in-up max-w-[1500px] mx-auto">
                            <div className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
                                style={{ background: 'linear-gradient(135deg, #570013, #800020)', border: '4px solid white' }}>
                                <MdPerson className="text-[#ffe088] text-6xl" />
                            </div>
                            <h3 className="font-black text-gray-900 text-3xl mb-4">Admin Profile</h3>
                            <div className="w-full max-w-sm rounded-2xl p-6 text-left space-y-4 bg-white border border-gray-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#570013] to-[#ffe088]" />
                                {[
                                    { label: 'Name', value: `${user?.first_name || ''} ${user?.last_name || user?.username || ''}`.trim() },
                                    { label: 'Email', value: user?.email },
                                    { label: 'Role', value: 'Administrator' },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex items-center gap-4 border-b border-gray-100 last:border-none pb-3 last:pb-0">
                                        <span className="text-gray-400 text-[11px] uppercase tracking-widest font-bold w-16">{label}</span>
                                        <span className="text-gray-900 text-[14px] font-bold">{value}</span>
                                    </div>
                                ))}
                            </div>
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
