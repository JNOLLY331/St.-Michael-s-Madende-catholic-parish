import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import {
    MdArrowBack, MdChurch, MdDelete, MdEdit, MdNotifications, MdPerson,
    MdPersonAdd, MdSearch, MdCheckCircle, MdCancel, MdTrendingUp,
    MdDashboard, MdGroup, MdEvent, MdCampaign, MdVolunteerActivism,
    MdPhotoLibrary, MdSettings, MdLogout, MdChevronRight, MdMessage,
    MdEmail, MdPhone, MdSave, MdClose, MdRefresh, MdWaterDrop, MdVerified,
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
    { Icon: MdMessage, icon: 'message', label: 'Messages', id: 'messages' },
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

/* ─── Profile Edit Modal ─── */
function ProfileEditModal({ user, onClose, onSave }) {
    const [form, setForm] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            const { accountsApi } = await import('../api/endpoints/accounts');
            await accountsApi.updateProfileData(form);
            onSave(form);
            onClose();
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative" onClick={e => e.stopPropagation()}>
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-[#570013] to-[#ffe088]" />
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-black text-gray-900 text-xl">Edit Profile</h2>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                        <MdClose className="text-xl" />
                    </button>
                </div>
                {error && <p className="text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-xl border border-red-100">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">First Name</label>
                            <input
                                value={form.first_name}
                                onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#570013]/20 focus:border-[#570013]/40"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Last Name</label>
                            <input
                                value={form.last_name}
                                onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#570013]/20 focus:border-[#570013]/40"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#570013]/20 focus:border-[#570013]/40"
                        />
                    </div>
                    <div>
                        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Phone</label>
                        <input
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#570013]/20 focus:border-[#570013]/40"
                            placeholder="Optional"
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 py-2.5 rounded-xl font-bold text-sm text-[#ffe088] flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60"
                            style={{ background: 'linear-gradient(135deg, #570013, #800020)' }}
                        >
                            {saving ? 'Saving…' : <><MdSave className="text-base" /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [started, setStarted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [parishionersData, setParishionersData] = useState([]);
    const [loadingParishioners, setLoadingParishioners] = useState(false);
    const [messagesData, setMessagesData] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [fetchedStats, setFetchedStats] = useState([]);
    const [adminStats, setAdminStats] = useState({ totalDonations: 0, baptized: 0, confirmed: 0, messages: 0 });
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const statsRef = useRef(null);

    // ── Intersection observer for count-up ──
    useEffect(() => {
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.1 });
        if (statsRef.current) io.observe(statsRef.current);
        return () => io.disconnect();
    }, []);

    // ── Fetch church statistics ──
    const fetchStats = useCallback(() => {
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
                const icons = [MdGroup, MdChurch, MdVolunteerActivism, MdWaterDrop, MdVerified, MdCampaign];
                if (items.length > 0) {
                    setFetchedStats(items.map((item, idx) => ({
                        gradient: gradients[idx % gradients.length],
                        Icon: icons[idx % icons.length],
                        label: item.title,
                        value: item.value,
                        change: 0,
                    })));
                    // extract baptized / confirmed from stats if present
                    const ba = items.find(i => /bapti/i.test(i.title));
                    const co = items.find(i => /confirm/i.test(i.title));
                    setAdminStats(p => ({
                        ...p,
                        baptized: ba ? Number(ba.value) : p.baptized,
                        confirmed: co ? Number(co.value) : p.confirmed,
                    }));
                }
            }).catch(() => { });
        });
    }, []);

    // ── Fetch donations total ──
    const fetchDonations = useCallback(() => {
        import('../api/endpoints/donations').then(({ donationsApi }) => {
            donationsApi.listAll().then(data => {
                const items = Array.isArray(data) ? data : (data?.results ?? []);
                const total = items.reduce((s, d) => s + (parseFloat(d.amount) || 0), 0);
                setAdminStats(p => ({ ...p, totalDonations: total }));
            }).catch(() => { });
        });
    }, []);

    // ── Fetch messages ──
    const fetchMessages = useCallback(() => {
        setLoadingMessages(true);
        import('../api/endpoints/contact').then(({ contactApi }) => {
            contactApi.listMessages().then(data => {
                const items = Array.isArray(data) ? data : (data?.results ?? []);
                setMessagesData(items);
                setAdminStats(p => ({ ...p, messages: items.length }));
            }).catch(() => { }).finally(() => setLoadingMessages(false));
        });
    }, []);

    // ── Fetch parishioners ──
    const fetchParishioners = useCallback(() => {
        if (!isAuthenticated) return;
        setLoadingParishioners(true);
        import('../api/endpoints/accounts').then(({ accountsApi }) => {
            accountsApi.getUsers()
                .then((data) => {
                    const items = Array.isArray(data) ? data : (data?.results ?? []);
                    setParishionersData(items.map(u => ({
                        id: u.id,
                        name: `${u.first_name || ''} ${u.last_name || u.username || ''}`.trim() || u.username,
                        email: u.email || '—',
                        role: u.role === 'SUPER_ADMIN' || u.role?.includes('PRIEST') ? 'Clergy' : 'Laity',
                        status: u.is_verified ? 'Active' : 'Pending',
                        joined: new Date(u.date_joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                    })));
                })
                .catch(() => { })
                .finally(() => setLoadingParishioners(false));
        });
    }, [isAuthenticated]);
    // ── Initial fetch + real-time polling every 30 seconds ──
    useEffect(() => {
        if (!isAuthenticated) return;
        fetchStats();
        fetchDonations();
        fetchMessages();
        fetchParishioners();
        const interval = setInterval(() => {
            fetchStats();
            fetchDonations();
            fetchMessages();
            fetchParishioners();
            setLastRefresh(new Date());
        }, 30000);
        return () => clearInterval(interval);
    }, [isAuthenticated, fetchStats, fetchDonations, fetchMessages, fetchParishioners]);

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    const fallbackStats = [
        { gradient: 'bg-gradient-to-br from-[#570013] to-[#990022]', Icon: MdGroup, label: 'Total Believers', value: 3200, change: 4.5 },
        { gradient: 'bg-gradient-to-br from-indigo-600 to-indigo-800', Icon: MdChurch, label: 'Clergy Members', value: 12, change: 0 },
        { gradient: 'bg-gradient-to-br from-emerald-600 to-emerald-800', Icon: MdVolunteerActivism, label: 'Laity Members', value: 2800, change: 3.2 },
        { gradient: 'bg-gradient-to-br from-amber-500 to-amber-700', Icon: MdWaterDrop, label: 'Baptized', value: 1450, change: 2.1 },
        { gradient: 'bg-gradient-to-br from-violet-600 to-violet-800', Icon: MdVerified, label: 'Confirmed', value: 890, change: 1.8 },
        { gradient: 'bg-gradient-to-br from-blue-600 to-blue-800', Icon: MdCampaign, label: 'Years Established', value: 65, change: 0 },
    ];

    const stats = fetchedStats.length > 0 ? fetchedStats : fallbackStats;

    const filteredParishioners = parishionersData.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredMessages = messagesData.filter(m =>
        (m.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        /* ─── Layout Wrapper ─── */
        <div className="flex bg-gray-50 text-gray-800 font-sans min-h-screen relative w-full">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-[260px]' : 'w-[80px]'} bg-white border-r border-gray-100 flex flex-col transition-all duration-300 z-50 shadow-sm shrink-0 fixed top-0 left-0 h-screen pointer-events-auto`}>
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
                                        <MdChevronRight className="text-gray-400 text-sm ml-auto opacity-90" />
                                    )}
                                    {/* Messages badge */}
                                    {id === 'messages' && adminStats.messages > 0 && sidebarOpen && (
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#570013] text-white' : 'bg-[#570013]/10 text-[#570013]'}`}>
                                            {adminStats.messages}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </nav>

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

            {/* ══════════ MAIN CONTENT ══════════ */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-[260px]' : 'ml-[80px]'}`}>

                {/* Top Bar */}
                <header className="flex items-center justify-between px-6 md:px-8 py-5 flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(v => !v)}
                            className="text-gray-400 hover:text-[#570013] transition-colors p-1.5 rounded-lg hover:bg-gray-100/50"
                        >
                            <DynamicIcon name={sidebarOpen ? 'menu_open' : 'menu'} className="text-[24px]" />
                        </button>
                        <div>
                            <h1 className="font-bold text-gray-900 text-[20px] leading-tight flex items-center gap-2">
                                {sidebarItems.find(s => s.id === activeTab)?.label || 'Dashboard'}
                            </h1>
                            <p className="text-gray-500 text-[11.5px] font-semibold tracking-wider uppercase mt-1">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Real-time refresh indicator */}
                        <button
                            onClick={() => { fetchStats(); fetchDonations(); fetchMessages(); fetchParishioners(); setLastRefresh(new Date()); }}
                            className="hidden md:flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-[#570013] transition-colors p-1.5 rounded-lg hover:bg-gray-50 border border-gray-200"
                            title="Refresh data"
                        >
                            <MdRefresh className="text-base" />
                            <span className="hidden lg:flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                Live · {lastRefresh.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </button>

                        {/* Search */}
                        <div className="hidden md:flex items-center gap-2 rounded-xl px-4 py-2 bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-[#570013]/20 focus-within:border-[#570013]/30 transition-all">
                            <MdSearch className="text-gray-400 text-[18px]" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-36"
                            />
                        </div>

                        {/* Notifications */}
                        <button
                            onClick={() => setActiveTab('messages')}
                            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#570013]"
                        >
                            <MdNotifications className="text-[24px]" />
                            {adminStats.messages > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#570013] border-2 border-white box-content" />
                            )}
                        </button>

                        {/* Avatar */}
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm hover:ring-2 hover:ring-[#570013]/40 transition-all"
                                style={{ background: 'linear-gradient(135deg, #570013, #800020)', border: '2px solid rgba(255,224,136,0.5)' }}>
                                <MdPerson className="text-white text-sm" />
                            </button>
                            <div className="hidden md:block">
                                <p className="text-gray-900 font-bold text-[13px] leading-tight">{user?.first_name || user?.username}</p>
                                <p className="text-gray-500 font-medium text-[10px] uppercase tracking-wider mt-0.5">Administrator</p>
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
                                <div className="absolute right-0 top-0 w-32 h-32 bg-[#570013]/5 rounded-full transform translate-x-10 -translate-y-10" />
                                <div className="absolute right-20 bottom-0 w-16 h-16 bg-[#ffe088]/20 rounded-full transform translate-y-8" />
                                <div className="z-10">
                                    <h2 className="font-black text-gray-900 text-3xl leading-tight">
                                        Welcome, <span className="text-[#570013]">{user?.first_name || 'Admin'}</span>
                                    </h2>
                                    <p className="text-gray-500 font-medium text-sm mt-1">
                                        Here's what's happening at St. Michael's today.
                                    </p>
                                </div>
                                <div className="flex gap-2 flex-wrap z-10">
                                    {[
                                        { label: `${adminStats.messages} Messages`, color: true },
                                        { label: `KES ${adminStats.totalDonations.toLocaleString()}`, color: false },
                                        { label: `${adminStats.baptized} Baptized`, color: false },
                                        { label: `${adminStats.confirmed} Confirmed`, color: false },
                                    ].map((t, i) => (
                                        <span key={i}
                                            className={`px-4 py-1.5 rounded-full text-[12px] font-bold border ${i === 0
                                                ? 'bg-[#570013] text-[#ffe088] border-[#570013] shadow-md shadow-[#570013]/20'
                                                : 'bg-white text-gray-600 border-gray-200'
                                                }`}>
                                            {t.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Key Insight Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'User Messages', value: adminStats.messages, gradient: 'bg-gradient-to-br from-[#570013] to-[#990022]', Icon: MdMessage },
                                    { label: 'Total Donations (KES)', value: adminStats.totalDonations, gradient: 'bg-gradient-to-br from-emerald-600 to-emerald-800', Icon: MdVolunteerActivism },
                                    { label: 'Baptized Christians', value: adminStats.baptized, gradient: 'bg-gradient-to-br from-blue-600 to-blue-800', Icon: MdWaterDrop },
                                    { label: 'Confirmed Christians', value: adminStats.confirmed, gradient: 'bg-gradient-to-br from-violet-600 to-violet-800', Icon: MdVerified },
                                ].map(s => <StatCard key={s.label} {...s} started={true} />)}
                            </div>

                            {/* Statistics Cards */}
                            <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                                {stats.map(s => <StatCard key={s.label} {...s} started={started} />)}
                            </div>

                            {/* Middle Summary Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <SummaryList
                                    title="Recent Parishioners"
                                    items={parishionersData.slice(0, 3).map(p => ({
                                        name: p.name,
                                        badge: p.status,
                                        badgeColor: p.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200',
                                    }))}
                                />
                                <SummaryList
                                    title="Recent Messages"
                                    items={messagesData.slice(0, 3).map(m => ({
                                        name: m.full_name || m.email || 'Anonymous',
                                        badge: m.subject ? m.subject.slice(0, 10) : 'Msg',
                                        badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
                                    }))}
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
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                                        <MdClose className="text-base" />
                                    </button>
                                )}
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

                    {/* ══ MESSAGES TAB ══ */}
                    {activeTab === 'messages' && (
                        <div className="space-y-6 max-w-[1500px] mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <div>
                                    <h2 className="font-black text-gray-900 text-2xl flex items-center gap-2">
                                        <MdMessage className="text-[#570013]" /> User Messages
                                    </h2>
                                    <p className="text-gray-500 text-sm font-medium mt-1">
                                        {messagesData.length} contact message{messagesData.length !== 1 ? 's' : ''} received
                                    </p>
                                </div>
                                <button
                                    onClick={() => { fetchMessages(); setLastRefresh(new Date()); }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
                                >
                                    <MdRefresh className="text-base" /> Refresh
                                </button>
                            </div>

                            {/* Search */}
                            <div className="flex items-center gap-3 rounded-xl px-4 py-3.5 bg-white border border-gray-200 shadow-sm focus-within:border-[#570013]/50 focus-within:ring-2 focus-within:ring-[#570013]/10 transition-all">
                                <MdSearch className="text-gray-400 text-[20px]" />
                                <input
                                    type="text"
                                    placeholder="Search by name, subject, or email..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="bg-transparent text-gray-900 placeholder-gray-400 text-sm font-medium focus:outline-none flex-1"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                                        <MdClose className="text-base" />
                                    </button>
                                )}
                            </div>

                            {/* Messages grid */}
                            {loadingMessages ? (
                                <div className="text-center py-16 text-gray-400 text-sm font-medium">Loading messages...</div>
                            ) : filteredMessages.length === 0 ? (
                                <div className="text-center py-20 text-gray-400">
                                    <MdMessage className="text-5xl mx-auto mb-3 opacity-30" />
                                    <p className="font-medium text-sm">No messages found.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {filteredMessages.map((msg, i) => (
                                        <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#570013] to-[#ffe088] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                                                        style={{ background: 'linear-gradient(135deg, #570013, #800020)' }}>
                                                        {(msg.full_name || msg.email || 'A')[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-[14px]">{msg.full_name || 'Anonymous'}</p>
                                                        <p className="text-gray-400 text-[11px] font-medium">{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : '—'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="font-bold text-gray-700 text-[13px] mb-2">{msg.subject || 'No Subject'}</p>
                                            <p className="text-gray-500 text-[12px] leading-relaxed line-clamp-3">{msg.message || '—'}</p>
                                            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                                                {msg.email && (
                                                    <a href={`mailto:${msg.email}`} className="flex items-center gap-1 text-[11px] text-[#570013] hover:underline font-bold">
                                                        <MdEmail className="text-sm" /> {msg.email}
                                                    </a>
                                                )}
                                                {msg.phone && (
                                                    <a href={`tel:${msg.phone}`} className="flex items-center gap-1 text-[11px] text-gray-500 hover:underline">
                                                        <MdPhone className="text-sm" /> {msg.phone}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ══ SETTINGS TAB ══ */}
                    {activeTab === 'settings' && (
                        <div className="animate-fade-in-up max-w-[1500px] mx-auto">
                            <Settings />
                        </div>
                    )}

                    {/* ══ GENERIC DATA TABS ══ */}
                    {!['dashboard', 'parishioners', 'messages', 'settings', 'profile'].includes(activeTab) && (
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
                        <div className="max-w-[1500px] mx-auto">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                {/* Profile header */}
                                <div className="relative p-8 text-center"
                                    style={{ background: 'linear-gradient(135deg, #570013, #800020)' }}>
                                    <div className="w-28 h-28 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl"
                                        style={{ background: 'rgba(255,224,136,0.2)', border: '3px solid rgba(255,224,136,0.4)' }}>
                                        <MdPerson className="text-[#ffe088] text-6xl" />
                                    </div>
                                    <h2 className="font-black text-white text-2xl">{user?.first_name || ''} {user?.last_name || ''}</h2>
                                    <p className="text-white/70 text-sm mt-1 font-medium">Administrator • St. Michael Madende</p>
                                    <button
                                        onClick={() => setShowProfileEdit(true)}
                                        className="mt-4 px-6 py-2.5 rounded-full text-sm font-bold inline-flex items-center gap-2 transition-all hover:scale-105"
                                        style={{ background: 'rgba(255,224,136,0.2)', color: '#ffe088', border: '1px solid rgba(255,224,136,0.4)' }}
                                    >
                                        <MdEdit className="text-base" /> Edit Profile
                                    </button>
                                </div>

                                {/* Profile details */}
                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                        {[
                                            { label: 'First Name', value: user?.first_name || '—', Icon: MdPerson },
                                            { label: 'Last Name', value: user?.last_name || '—', Icon: MdPerson },
                                            { label: 'Email Address', value: user?.email || '—', Icon: MdEmail },
                                            { label: 'Role', value: 'Administrator', Icon: MdVerified },
                                            { label: 'Username', value: user?.username || '—', Icon: MdPerson },
                                            { label: 'Status', value: 'Active', Icon: MdCheckCircle },
                                        ].map(({ label, value, Icon: FieldIcon }) => (
                                            <div key={label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1 flex items-center gap-1">
                                                    <FieldIcon className="text-[#570013] text-sm" /> {label}
                                                </p>
                                                <p className="text-gray-900 text-[15px] font-bold">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>

            {/* Profile Edit Modal */}
            {showProfileEdit && (
                <ProfileEditModal
                    user={user}
                    onClose={() => setShowProfileEdit(false)}
                    onSave={(updated) => console.log('Profile updated', updated)}
                />
            )}
        </div>
    );
}
