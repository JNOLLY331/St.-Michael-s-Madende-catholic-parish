import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdChurch, MdDelete, MdEdit, MdNotifications, MdPerson, MdPersonAdd, MdSearch, MdCheckCircle, MdCancel } from 'react-icons/md';
import DynamicIcon from '../components/DynamicIcon';



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

/* ─── Sidebar Navigation Items ─── */
const sidebarItems = [
    { icon: 'dashboard', label: 'Dashboard', id: 'dashboard' },
    { icon: 'group', label: 'Parishioners', id: 'parishioners' },
    { icon: 'church', label: 'Mass Schedule', id: 'mass' },
    { icon: 'event', label: 'Events', id: 'events' },
    { icon: 'campaign', label: 'Announcements', id: 'announcements' },
    { icon: 'volunteer_activism', label: 'Donations', id: 'donations' },
    { icon: 'photo_library', label: 'Gallery', id: 'gallery' },
    { icon: 'person', label: 'Admin Profile', id: 'profile' },
    { icon: 'settings', label: 'Settings', id: 'settings' },
];

/* ─── Stat Card ─── */
function DashStatCard({ icon, label, value, change, color, bgColor, started }) {
    const count = useCountUp(value, started);
    return (
        <div className={`${bgColor} rounded-2xl p-6 flex flex-col gap-3 shadow-lg card-hover border border-white/10 relative overflow-hidden group`}>
            <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-white/5 group-hover:scale-150 transition-transform duration-500" />
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-md`}>
                <DynamicIcon name={icon} className="text-white text-2xl" />
            </div>
            <div>
                <p className="text-white/60 text-xs font-oswald tracking-widest uppercase">{label}</p>
                <p className="text-white font-oswald font-bold text-3xl mt-1">{count.toLocaleString()}</p>
            </div>
            <div className={`flex items-center gap-1 text-xs font-oswald ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <DynamicIcon name={change >= 0 ? 'trending_up' : 'trending_down'} className="text-sm" />
                {Math.abs(change)}% this month
            </div>
        </div>
    );
}

const recentActivity = [
    { icon: 'person_add', color: 'text-green-400', text: 'New parishioner registered', time: '2 min ago', user: 'Mary Wanjiku' },
    { icon: 'volunteer_activism', color: 'text-yellow-400', text: 'Donation received', time: '15 min ago', user: 'KES 5,000' },
    { icon: 'event', color: 'text-blue-400', text: 'New event created', time: '1 hr ago', user: 'Harvest Festival' },
    { icon: 'campaign', color: 'text-purple-400', text: 'Announcement published', time: '2 hrs ago', user: 'Choir Meeting' },
    { icon: 'church', color: 'text-red-400', text: 'Mass schedule updated', time: '3 hrs ago', user: 'Sunday 9:30 AM' },
    { icon: 'photo_library', color: 'text-pink-400', text: 'Gallery photos added', time: '5 hrs ago', user: '12 new photos' },
];

const parishioners = [
    { name: 'Mary Wanjiku', role: 'Laity', status: 'Active', baptized: true, confirmed: true, joined: 'Jan 2020' },
    { name: 'John Kamau', role: 'Laity', status: 'Active', baptized: true, confirmed: false, joined: 'Mar 2021' },
    { name: 'Fr. Emmanuel', role: 'Clergy', status: 'Active', baptized: true, confirmed: true, joined: 'Jun 2018' },
    { name: 'Rose Achieng', role: 'Laity', status: 'Inactive', baptized: true, confirmed: true, joined: 'Dec 2019' },
    { name: 'Peter Otieno', role: 'Laity', status: 'Active', baptized: false, confirmed: false, joined: 'Feb 2024' },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [started, setStarted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const statsRef = useRef(null);

    useEffect(() => {
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setStarted(true); },
            { threshold: 0.2 }
        );
        if (statsRef.current) io.observe(statsRef.current);
        return () => io.disconnect();
    }, []);

    const stats = [
        { icon: 'groups', label: 'Total Believers', value: 3200, change: 4.5, color: 'bg-[#570013]', bgColor: 'bg-[#40000b]' },
        { icon: 'church', label: 'Clergy Members', value: 12, change: 0, color: 'bg-[#735c00]', bgColor: 'bg-[#2b271e]' },
        { icon: 'volunteer_activism', label: 'Laity Members', value: 2800, change: 3.2, color: 'bg-[#800020]', bgColor: 'bg-[#3a000d]' },
        { icon: 'water_drop', label: 'Baptized', value: 1450, change: 2.1, color: 'bg-blue-700', bgColor: 'bg-blue-950' },
        { icon: 'verified', label: 'Confirmed', value: 890, change: 1.8, color: 'bg-purple-700', bgColor: 'bg-purple-950' },
        { icon: 'history_edu', label: 'Years Established', value: 65, change: 0, color: 'bg-green-700', bgColor: 'bg-green-950' },
    ];

    const filteredParishioners = parishioners.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[#0d0a07] text-white font-sans">

            {/* ── Sidebar ── */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#1a1208] border-r border-white/10 flex flex-col transition-all duration-300 sticky top-0 h-screen z-40`}>
                {/* Logo */}
                <div className="p-4 border-b border-white/10 flex items-center gap-3 min-h-[72px]">
                    <div className="w-10 h-10 rounded-full bg-[#ffe088] flex items-center justify-center flex-shrink-0">
                        <MdChurch className="text-[#570013] text-xl" />
                    </div>
                    {sidebarOpen && (
                        <div className="overflow-hidden">
                            <p className="font-oswald font-bold text-[#ffe088] text-sm leading-tight">ST. MICHAEL</p>
                            <p className="font-oswald text-white/40 text-xs tracking-widest">Admin Portal</p>
                        </div>
                    )}
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-4 overflow-y-auto">
                    {sidebarItems.map(({ icon, label, id }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${activeTab === id
                                ? 'bg-[#570013] text-white border-r-4 border-[#ffe088]'
                                : 'text-white/50 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <DynamicIcon name={icon} className="text-xl flex-shrink-0" />
                            {sidebarOpen && <span className="font-oswald font-bold text-sm tracking-wide whitespace-nowrap">{label}</span>}
                        </button>
                    ))}
                </nav>

                {/* Go to Site */}
                <div className="p-4 border-t border-white/10">
                    <Link
                        to="/"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className={`flex items-center gap-3 text-white/40 hover:text-white transition-colors`}
                    >
                        <MdArrowBack className="text-xl flex-shrink-0" />
                        {sidebarOpen && <span className="font-oswald text-sm tracking-wide">Back to Site</span>}
                    </Link>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Top Bar */}
                <header className="bg-[#1a1208] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(v => !v)}
                            className="text-white/50 hover:text-white transition-colors"
                        >
                            <DynamicIcon name={sidebarOpen ? 'menu_open' : 'menu'} className="text-2xl" />
                        </button>
                        <div>
                            <p className="font-oswald font-bold text-white text-lg">{sidebarItems.find(s => s.id === activeTab)?.label || 'Dashboard'}</p>
                            <p className="font-oswald text-white/40 text-xs tracking-wide">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                            <MdSearch className="text-white/40 text-base" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="bg-transparent text-white placeholder:text-white/30 text-sm focus:outline-none w-40"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative text-white/50 hover:text-white transition-colors">
                            <MdNotifications className="text-2xl" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ffe088] rounded-full text-[#40000b] text-[9px] font-bold flex items-center justify-center">3</span>
                        </button>

                        {/* Avatar */}
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="w-9 h-9 rounded-full bg-[#570013] border-2 border-[#ffe088] flex items-center justify-center">
                                <MdPerson className="text-white text-base" />
                            </div>
                            <div className="hidden md:block">
                                <p className="font-oswald font-bold text-sm text-white">Fr. Emmanuel</p>
                                <p className="font-oswald text-white/40 text-xs">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">

                    {/* ── Dashboard Home ── */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8">
                            {/* Welcome */}
                            <div className="bg-gradient-to-r from-[#40000b] to-[#570013] rounded-2xl p-8 relative overflow-hidden">
                                <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
                                    <MdChurch className="absolute right-8 top-1/2 -translate-y-1/2 text-[200px] text-white" />
                                </div>
                                <p className="font-oswald text-[#ffe088]/80 tracking-[0.3em] uppercase text-xs mb-2">Welcome Back</p>
                                <h2 className="font-oswald font-bold text-3xl text-white mb-2">
                                    Peace be with you, <span className="text-[#ffe088]">Fr. Emmanuel</span>
                                </h2>
                                <p className="text-white/60 text-sm max-w-xl">
                                    "The Lord is my shepherd; I shall not want." — Psalm 23:1
                                </p>
                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={() => setActiveTab('announcements')}
                                        className="btn-primary bg-[#ffe088] text-[#40000b] px-5 py-2 rounded-full font-oswald font-bold text-xs uppercase tracking-wide"
                                    >
                                        + New Announcement
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('events')}
                                        className="border border-white/30 text-white px-5 py-2 rounded-full font-oswald font-bold text-xs uppercase tracking-wide hover:bg-white/10 transition"
                                    >
                                        + Add Event
                                    </button>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {stats.map((s) => (
                                    <DashStatCard key={s.label} {...s} started={started} />
                                ))}
                            </div>

                            {/* Content Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Recent Activity */}
                                <div className="lg:col-span-2 bg-[#1a1208] border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-oswald font-bold text-lg text-white">Recent Activity</h3>
                                        <button className="text-[#ffe088] font-oswald text-xs uppercase tracking-wide hover:underline">View All</button>
                                    </div>
                                    <div className="space-y-4">
                                        {recentActivity.map(({ icon, color, text, time, user }, i) => (
                                            <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                                                <div className={`w-9 h-9 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ${color}`}>
                                                    <DynamicIcon name={icon} className="text-base" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white/80 text-sm">{text}</p>
                                                    <p className="text-[#ffe088] text-xs font-oswald font-bold">{user}</p>
                                                </div>
                                                <span className="text-white/30 text-xs font-oswald whitespace-nowrap">{time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-[#1a1208] border border-white/10 rounded-2xl p-6">
                                    <h3 className="font-oswald font-bold text-lg text-white mb-6">Quick Actions</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { icon: 'person_add', label: 'Add Member', color: 'bg-[#570013]/30 text-red-400', tab: 'parishioners' },
                                            { icon: 'event', label: 'Add Event', color: 'bg-blue-900/30 text-blue-400', tab: 'events' },
                                            { icon: 'campaign', label: 'Announce', color: 'bg-purple-900/30 text-purple-400', tab: 'announcements' },
                                            { icon: 'photo_library', label: 'Gallery', color: 'bg-pink-900/30 text-pink-400', tab: 'gallery' },
                                            { icon: 'volunteer_activism', label: 'Donation', color: 'bg-yellow-900/30 text-yellow-400', tab: 'donations' },
                                            { icon: 'settings', label: 'Settings', color: 'bg-green-900/30 text-green-400', tab: 'settings' },
                                        ].map(({ icon, label, color, tab }) => (
                                            <button
                                                key={label}
                                                onClick={() => setActiveTab(tab)}
                                                className={`${color} p-4 rounded-xl flex flex-col items-center gap-2 hover:scale-105 transition-transform text-center group`}
                                            >
                                                <DynamicIcon name={icon} className="text-xl" />
                                                <span className="font-oswald font-bold text-xs tracking-wide">{label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Parishioners ── */}
                    {activeTab === 'parishioners' && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h2 className="font-oswald font-bold text-2xl text-white">Parishioners</h2>
                                    <p className="text-white/40 text-sm font-oswald">Manage parish members and their sacramental records</p>
                                </div>
                                <button className="btn-primary bg-[#ffe088] text-[#40000b] px-5 py-2 rounded-full font-oswald font-bold text-xs uppercase tracking-wide flex items-center gap-2">
                                    <MdPersonAdd className="text-base" />
                                    Add Parishioner
                                </button>
                            </div>

                            {/* Search bar */}
                            <div className="flex items-center gap-3 bg-[#1a1208] border border-white/10 rounded-xl px-4 py-3">
                                <MdSearch className="text-white/40" />
                                <input
                                    type="text"
                                    placeholder="Search parishioners..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="bg-transparent text-white placeholder:text-white/30 text-sm focus:outline-none flex-1"
                                />
                            </div>

                            {/* Table */}
                            <div className="bg-[#1a1208] border border-white/10 rounded-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/5">
                                                {['Name', 'Role', 'Status', 'Baptized', 'Confirmed', 'Joined', 'Actions'].map(h => (
                                                    <th key={h} className="py-4 px-5 text-left font-oswald font-bold text-xs uppercase tracking-widest text-white/50">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredParishioners.map(({ name, role, status, baptized, confirmed, joined }) => (
                                                <tr key={name} className="hover:bg-white/5 transition-colors">
                                                    <td className="py-4 px-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-[#570013] flex items-center justify-center text-white font-oswald font-bold text-sm">
                                                                {name[0]}
                                                            </div>
                                                            <span className="text-white font-oswald font-bold text-sm">{name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-5">
                                                        <span className={`font-oswald text-xs px-2 py-1 rounded-full ${role === 'Clergy' ? 'bg-[#ffe088]/20 text-[#ffe088]' : 'bg-white/10 text-white/60'}`}>
                                                            {role}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-5">
                                                        <span className={`flex items-center gap-1 font-oswald text-xs ${status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                                                            <span className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`} />
                                                            {status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-5">
                                                        {baptized ? <MdCheckCircle className={`text-base text-green-400`} /> : <MdCancel className={`text-base text-white/20`} />}
                                                    </td>
                                                    <td className="py-4 px-5">
                                                        {confirmed ? <MdCheckCircle className={`text-base text-green-400`} /> : <MdCancel className={`text-base text-white/20`} />}
                                                    </td>
                                                    <td className="py-4 px-5 text-white/50 text-sm font-oswald">{joined}</td>
                                                    <td className="py-4 px-5">
                                                        <div className="flex gap-2">
                                                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                                                <MdEdit className="text-base" />
                                                            </button>
                                                            <button className="text-red-400 hover:text-red-300 transition-colors">
                                                                <MdDelete className="text-base" />
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

                    {/* ── Other Tabs Placeholder ── */}
                    {!['dashboard', 'parishioners'].includes(activeTab) && (
                        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                            <div className="w-24 h-24 rounded-full bg-[#570013]/20 flex items-center justify-center mb-6">
                                <DynamicIcon name={sidebarItems.find(s => s.id === activeTab)?.icon || 'construction'} className="text-[#ffe088] text-5xl" />
                            </div>
                            <h3 className="font-oswald font-bold text-2xl text-white mb-2">
                                {sidebarItems.find(s => s.id === activeTab)?.label}
                            </h3>
                            <p className="text-white/40 font-oswald tracking-wide">This module is being built</p>
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className="mt-6 btn-primary bg-[#ffe088] text-[#40000b] px-6 py-2 rounded-full font-oswald font-bold text-xs uppercase tracking-wide"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}
