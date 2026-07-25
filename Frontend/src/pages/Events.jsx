import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MdArrowForward, MdLocationOn, MdSchedule, MdPeople,
    MdLiveHelp, MdCalendarToday, MdChurch, MdEvent,
    MdFilterList, MdAutoAwesome
} from 'react-icons/md';
import { useEventsData } from '../hooks/useEventsData';
import { eventsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

// ── Helper: format a date string to "OCT 24" style ────────────────────────────
function formatDateParts(dateStr) {
    if (!dateStr) return { month: '—', day: '—' };
    const d = new Date(dateStr);
    const month = d.toLocaleString('en', { month: 'short' }).toUpperCase();
    const day = String(d.getDate()).padStart(2, '0');
    return { month, day };
}

// ── Helper: format time "08:30:00" → "8:30 AM" ────────────────────────────────
function formatTime(timeStr) {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${displayH}:${String(m).padStart(2, '0')} ${period}`;
}

// ── Skeleton card for loading state ───────────────────────────────────────────
function EventCardSkeleton() {
    return (
        <div className="rounded-none overflow-hidden border border-[#e0bfbf] bg-white">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
            <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-100 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-100 animate-pulse rounded w-full" />
                <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3" />
                <div className="flex gap-3 pt-1">
                    <div className="h-4 bg-gray-100 animate-pulse rounded w-24" />
                    <div className="h-4 bg-gray-100 animate-pulse rounded w-20" />
                </div>
                <div className="h-10 bg-gray-100 animate-pulse rounded-full mt-2" />
            </div>
        </div>
    );
}

// ── Individual Event Card ─────────────────────────────────────────────────────
function EventCard({ event, idx, rsvp, onRsvp }) {
    const { month, day } = formatDateParts(event.startDate);
    const [imgErr, setImgErr] = useState(false);

    const categoryColors = {
        LITURGY: { bg: '#570013', text: '#ffe088' },
        COMMUNITY: { bg: '#1d4ed8', text: '#fff' },
        YOUTH: { bg: '#7c3aed', text: '#fff' },
        CHARITY: { bg: '#16a34a', text: '#fff' },
        FORMATION: { bg: '#c2410c', text: '#fff' },
    };
    const catColor = categoryColors[event.category] || { bg: '#735c00', text: '#fff' };

    return (
        <article
            className="group flex flex-col overflow-hidden border border-[#e0bfbf] bg-white hover:border-[#570013]/40 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(87,0,19,0.18)]"
            style={{
                opacity: 0,
                animation: `fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) ${idx * 80}ms forwards`
            }}
        >
            {/* Image area */}
            <div className="aspect-video relative overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#570013]/20 to-[#2b0009]/60">
                {(event.thumbnail || event.banner) && !imgErr ? (
                    <img
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={event.thumbnail || event.banner}
                        alt={event.title}
                        onError={() => setImgErr(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <MdEvent className="text-white/20 text-7xl" />
                    </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Date badge */}
                <div className="absolute top-3 left-3 shadow-lg text-center w-12 overflow-hidden border border-white/20">
                    <div className="bg-[#570013] text-white text-[9px] font-bold py-0.5 tracking-wider">{month}</div>
                    <div className="bg-white font-serif text-xl font-bold py-0.5 text-[#570013]">{day}</div>
                </div>

                {/* Category badge — circular pill */}
                {event.category && (
                    <div
                        className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase"
                        style={{ background: catColor.bg, color: catColor.text }}
                    >
                        {event.category}
                    </div>
                )}

                {/* Registration status */}
                {event.capacity > 0 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 flex items-center gap-1">
                        <MdPeople className="text-xs" />
                        {event.registeredCount}/{event.capacity}
                    </div>
                )}
            </div>

            {/* Card body */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-serif font-bold text-lg text-[#1e1b18] group-hover:text-[#570013] transition-colors duration-200 leading-tight mb-2 line-clamp-2">
                    {event.title}
                </h3>
                <p className="text-[#584141] text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {event.description}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#735c00] text-xs font-semibold mb-4">
                    {event.venue && (
                        <div className="flex items-center gap-1">
                            <MdLocationOn className="text-base flex-shrink-0" />
                            <span className="truncate max-w-[120px]">{event.venue}</span>
                        </div>
                    )}
                    {event.startTime && (
                        <div className="flex items-center gap-1">
                            <MdSchedule className="text-base flex-shrink-0" />
                            {formatTime(event.startTime)}
                        </div>
                    )}
                    {event.livestreamUrl && (
                        <a
                            href={event.livestreamUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[#570013] hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MdLiveHelp className="text-base" />
                            Livestream
                        </a>
                    )}
                </div>

                {/* RSVP button */}
                <button
                    onClick={() => onRsvp(event.id)}
                    disabled={rsvp === 'loading' || rsvp === 'done'}
                    className={`w-full py-2.5 text-[13px] font-bold tracking-wider uppercase transition-all duration-300 border-2 ${rsvp === 'done'
                            ? 'bg-emerald-600 border-emerald-600 text-white cursor-default'
                            : rsvp === 'error'
                                ? 'border-red-500 text-red-600 hover:bg-red-600 hover:text-white'
                                : rsvp === 'loading'
                                    ? 'border-[#570013]/40 text-[#570013]/60 cursor-wait'
                                    : event.isRegistrationRequired
                                        ? 'border-[#570013] text-[#570013] hover:bg-[#570013] hover:text-[#ffe088]'
                                        : 'border-[#735c00] text-[#735c00] hover:bg-[#735c00] hover:text-[#ffe088]'
                        }`}
                >
                    {rsvp === 'loading' ? 'Registering…'
                        : rsvp === 'done' ? '✓ Registered'
                            : rsvp === 'error' ? 'Try Again'
                                : event.isRegistrationRequired ? 'Register / RSVP'
                                    : 'Learn More'}
                </button>
            </div>
        </article>
    );
}

export default function Events() {
    const { events, loading, error } = useEventsData({ is_published: true });
    const { isAuthenticated } = useAuth();
    const [rsvpState, setRsvpState] = useState({});
    const [activeFilter, setActiveFilter] = useState('ALL');

    const CATEGORIES = ['ALL', 'LITURGY', 'COMMUNITY', 'YOUTH', 'CHARITY', 'FORMATION'];

    const handleRsvp = async (eventId) => {
        if (!isAuthenticated) {
            toast.error('Please log in to RSVP for events.');
            window.location.href = '/login';
            return;
        }
        const promise = eventsApi.register(eventId);
        toast.promise(promise, {
            loading: 'Registering...',
            success: 'Successfully registered for event!',
            error: (err) => {
                const msg = err.message?.toLowerCase() || '';
                return (msg.includes('already') || err.status === 400) ? 'You are already registered!' : 'Failed to register.';
            }
        });
        setRsvpState((prev) => ({ ...prev, [eventId]: 'loading' }));
        try {
            await promise;
            setRsvpState((prev) => ({ ...prev, [eventId]: 'done' }));
        } catch (err) {
            const msg = err.message?.toLowerCase() || '';
            setRsvpState((prev) => ({
                ...prev,
                [eventId]: (msg.includes('already') || err.status === 400) ? 'done' : 'error'
            }));
        }
    };

    const filteredEvents = activeFilter === 'ALL'
        ? events
        : events.filter(e => e.category === activeFilter);

    return (
        <>
            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="relative bg-gradient-to-b from-[#fff8f5] to-white py-16 md:py-24 overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(87,0,19,0.04) 1px, transparent 0)',
                        backgroundSize: '28px 28px'
                    }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#570013]/8 blur-[80px] rounded-full pointer-events-none" />

                <div className="max-w-[1200px] mx-auto px-5 md:px-16 text-center relative z-10">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-8 h-px bg-[#570013]/30" />
                        <div className="w-9 h-9 rounded-full bg-[#570013] flex items-center justify-center shadow-lg">
                            <MdChurch className="text-[#ffe088] text-lg" />
                        </div>
                        <div className="w-8 h-px bg-[#570013]/30" />
                    </div>

                    <h1
                        className="mb-5 text-[#570013]"
                        style={{
                            fontFamily: 'EB Garamond, Georgia, serif',
                            fontWeight: 700,
                            fontSize: 'clamp(32px, 6vw, 60px)',
                            lineHeight: 1.15
                        }}
                    >
                        Parish Calendar
                    </h1>
                    <p className="text-[#584141] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-light">
                        Stay connected with parish life. Come as you are, and leave enriched by faith,
                        fellowship, and the love of community.
                    </p>

                    {/* Accent */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-px bg-[#e0bfbf]" />
                        <div className="w-2 h-2 rotate-45 bg-[#735c00]" />
                        <div className="w-6 h-2 bg-[#ffe088]" />
                        <div className="w-2 h-2 rotate-45 bg-[#735c00]" />
                        <div className="w-12 h-px bg-[#e0bfbf]" />
                    </div>
                </div>
            </section>

            {/* ── Filter Bar ───────────────────────────────────────────────── */}
            {!loading && !error && events.length > 0 && (
                <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e0bfbf] shadow-sm">
                    <div className="max-w-[1200px] mx-auto px-5 md:px-16 py-3 flex items-center gap-2 overflow-x-auto">
                        <MdFilterList className="text-[#570013] text-lg flex-shrink-0" />
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-1.5 text-[11px] font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 flex-shrink-0 ${activeFilter === cat
                                        ? 'bg-[#570013] text-[#ffe088]'
                                        : 'bg-gray-100 text-[#584141] hover:bg-[#570013]/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                        <span className="ml-auto text-[#8c7071] text-xs font-medium whitespace-nowrap flex-shrink-0">
                            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </section>
            )}

            {/* ── Events Grid ──────────────────────────────────────────────── */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 py-12 md:py-16">

                {/* Loading skeletons — hierarchical, immediate feedback */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(n => <EventCardSkeleton key={n} />)}
                    </div>
                )}

                {/* Error state */}
                {!loading && error && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                            <span className="text-2xl">⚠</span>
                        </div>
                        <p className="text-[#584141] font-semibold">Could not load events. Please try again later.</p>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && events.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 rounded-full bg-[#fff8f5] border-2 border-[#e0bfbf] flex items-center justify-center mb-6 shadow-sm">
                            <MdCalendarToday className="text-3xl text-[#570013]/40" />
                        </div>
                        <h3 className="font-serif font-bold text-2xl text-[#570013] mb-2">No Upcoming Events</h3>
                        <p className="text-[#584141] max-w-sm">Please check back soon for our latest gatherings, meetings, and blessings.</p>
                    </div>
                )}

                {/* Filter empty state */}
                {!loading && !error && events.length > 0 && filteredEvents.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 rounded-full bg-[#fff8f5] border border-[#e0bfbf] flex items-center justify-center mb-4">
                            <MdFilterList className="text-[#570013]/40 text-2xl" />
                        </div>
                        <p className="text-[#584141] font-semibold">No <strong>{activeFilter}</strong> events found.</p>
                        <button onClick={() => setActiveFilter('ALL')} className="mt-3 text-[#570013] text-sm font-bold hover:underline">
                            Show all events
                        </button>
                    </div>
                )}

                {/* Event cards */}
                {!loading && !error && filteredEvents.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event, i) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                idx={i}
                                rsvp={rsvpState[event.id]}
                                onRsvp={handleRsvp}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* ── CTA ──────────────────────────────────────────────────────── */}
            <section className="py-14 md:py-24 bg-[#f5ece7] border-t border-[#e0bfbf] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(87,0,19,0.04) 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                    }}
                />
                <div className="max-w-[1200px] mx-auto px-5 md:px-16 text-center relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#570013] mb-6 shadow-lg">
                        <MdAutoAwesome className="text-[#ffe088] text-xl" />
                    </div>
                    <h2
                        className="mb-4 text-[#570013]"
                        style={{ fontFamily: 'EB Garamond, Georgia, serif', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 40px)' }}
                    >
                        Submit Your Event
                    </h2>
                    <p className="text-[#584141] max-w-xl mx-auto mb-8 leading-relaxed">
                        Ministry leaders and parishioners can submit parish events for review.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-[#570013] text-[#ffe088] px-10 py-4 text-sm font-bold tracking-wider uppercase hover:bg-[#800020] transition-colors shadow-lg"
                    >
                        Contact the Office
                        <MdArrowForward />
                    </Link>
                </div>
            </section>
        </>
    );
}
