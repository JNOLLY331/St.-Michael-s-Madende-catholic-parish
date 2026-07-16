import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowForward, MdLocationOn, MdSchedule, MdPeople, MdLiveHelp, MdCalendarToday } from 'react-icons/md';
// ── Integration: useEventsData fetches from GET /api/events/ ─────────────────
import { useEventsData } from '../hooks/useEventsData';
// ── Integration: eventsApi.register() hits POST /api/events/registrations/ ───
import { eventsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';
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

// ── Reveal attributes cycling (maintains visual variety from the static version)
const REVEAL_ATTRS = [
<<<<<<< HEAD
    'scale-in', 'fade-left', 'fade-right',
    'fade-up', 'fade-up', 'fade-up',
=======
    'data-reveal-zoom', 'data-reveal-left', 'data-reveal-right',
    'data-reveal-flip', 'data-reveal-bounce', 'data-reveal-spin',
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
];

export default function Events() {
    // ── Integration: pull published events from the backend ───────────────────
    const { events, loading, error } = useEventsData({ is_published: true });
    const { isAuthenticated } = useAuth();

    // Track per-event RSVP state
    const [rsvpState, setRsvpState] = useState({}); // { [eventId]: 'loading' | 'done' | 'error' }

    // ── Integration: RSVP by posting to /api/events/registrations/ ────────────
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
                if (msg.includes('already') || err.status === 400) {
                    return 'You are already registered!';
                }
                return 'Failed to register, try again.';
            }
        });

        setRsvpState((prev) => ({ ...prev, [eventId]: 'loading' }));
        try {
            await promise;
            setRsvpState((prev) => ({ ...prev, [eventId]: 'done' }));
        } catch (err) {
            const msg = err.message?.toLowerCase() || '';
            if (msg.includes('already') || err.status === 400) {
                setRsvpState((prev) => ({ ...prev, [eventId]: 'done' }));
            } else {
                setRsvpState((prev) => ({ ...prev, [eventId]: 'error' }));
            }
        }
    };

    return (
        <>
            {/* Hero */}
            <section className="py-16 text-center max-w-[1200px] mx-auto px-5 md:px-16">
                <div data-reveal>
                    <h1 className="text-display-lg mb-4" style={{ color: 'var(--accent-maroon)' }}>
                        Parish Calendar
                    </h1>
                    <p data-reveal-text className="text-body-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Stay connected with parish life. Come as you are, and leave enriched by faith,
                        fellowship, and the love of community.
                    </p>
                    <div className="w-16 h-1 bg-[#ffe088] mx-auto mt-6 rounded-full" />
                </div>
            </section>

            {/* Events Grid */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 pb-20">
                {/* ── Integration: loading skeleton ───────────────────────────── */}
                {loading && (
                    <Spinner message="Loading parish events..." />
                )}

                {/* ── Integration: API error fallback ─────────────────────────── */}
                {!loading && error && (
                    <div className="text-center text-red-600 py-10">
                        <p className="text-body-lg">⚠ Could not load events. Please try again later.</p>
                    </div>
                )}

                {/* ── Integration: empty state (no events returned) ────────────── */}
                {!loading && !error && events.length === 0 && (
                    <EmptyState
                        title="No Upcoming Events"
                        message="Please check back soon for our latest gatherings, meetings, and blessings."
                        icon={MdCalendarToday}
                    />
                )}

                {/* ── Integration: render real events from the API ─────────────── */}
                {!loading && !error && events.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event, i) => {
                            const { month, day } = formatDateParts(event.startDate);
                            const reveal = REVEAL_ATTRS[i % REVEAL_ATTRS.length];
                            const rsvp = rsvpState[event.id];

                            return (
                                <div
                                    key={event.id}
<<<<<<< HEAD
                                    data-aos={reveal}
                                    data-delay={i * 100}
                                    className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm card-hover card-glow border smooth-transition"
=======
                                    {...{ [reveal]: '' }}
                                    data-delay={i * 100}
                                    className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm card-hover card-glow border"
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        {/* Banner image — uses thumbnail if available, else banner, else gradient placeholder */}
                                        {(event.thumbnail || event.banner) ? (
                                            <img
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                src={event.thumbnail || event.banner}
                                                alt={event.title}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#570013]/30 to-[#2b271e]/60 flex items-center justify-center">
                                                <MdCalendarToday className="text-white/40 text-6xl" />
                                            </div>
                                        )}

                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Date badge */}
                                        <div className="absolute top-3 left-3 rounded-xl overflow-hidden shadow-md text-center w-12"
                                            style={{ background: 'var(--bg-card)' }}>
                                            <div className="bg-[#570013] text-white text-[10px] font-bold py-0.5 tracking-wider">{month}</div>
                                            <div className="font-serif text-xl font-bold py-0.5" style={{ color: 'var(--accent-maroon)' }}>{day}</div>
                                        </div>

                                        {/* Category badge */}
                                        <div className="absolute top-3 right-3 bg-[#ffe088] text-[#241a00] text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                                            {event.category}
                                        </div>
                                    </div>

                                    <div className="p-5 relative z-10">
                                        <h3 className="text-headline-md group-hover:text-[#570013] transition-colors mb-2">
                                            {event.title}
                                        </h3>
                                        <p className="text-body-md line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>
                                            {event.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-label-md mb-3" style={{ color: '#735c00' }}>
                                            <div className="flex items-center gap-1">
                                                <MdLocationOn className="text-lg" />
                                                {event.venue}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MdSchedule className="text-lg" />
                                                {formatTime(event.startTime)}
                                            </div>
                                        </div>

                                        {/* ── Integration: shows capacity and livestream if available ── */}
                                        <div className="flex items-center gap-4 text-caption mb-3" style={{ color: 'var(--text-secondary)' }}>
                                            {event.capacity > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <MdPeople />
                                                    {event.registeredCount}/{event.capacity} registered
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
                                                    <MdLiveHelp />
                                                    Live Stream
                                                </a>
                                            )}
                                        </div>

                                        {/* ── Integration: RSVP button — calls the real registration API ── */}
                                        <button
                                            onClick={() => handleRsvp(event.id)}
                                            disabled={rsvp === 'loading' || rsvp === 'done'}
                                            className={`w-full border-2 rounded-full py-2 text-label-md transition-all duration-300 ${rsvp === 'done'
                                                ? 'bg-green-600 border-green-600 text-white'
                                                : rsvp === 'error'
                                                    ? 'border-red-400 text-red-600 hover:bg-red-600 hover:text-white'
                                                    : 'hover:bg-[#570013] hover:text-white hover:border-[#570013] hover:scale-[1.02]'
                                                }`}
                                            style={rsvp === 'done' || rsvp === 'error' ? {} : {
                                                borderColor: 'var(--accent-maroon)',
                                                color: 'var(--accent-maroon)'
                                            }}
                                        >
                                            {rsvp === 'loading' ? 'Registering…'
                                                : rsvp === 'done' ? '✓ Registered'
                                                    : rsvp === 'error' ? 'Try Again'
                                                        : event.isRegistrationRequired ? 'Register / RSVP'
                                                            : 'Learn More'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="py-20" style={{ background: 'var(--section-alt)' }}>
                <div className="max-w-[1200px] mx-auto px-5 md:px-16 text-center" data-reveal-zoom>
                    <h2 className="text-headline-lg mb-4" style={{ color: 'var(--accent-maroon)' }}>
                        Submit Your Event
                    </h2>
                    <p data-reveal-text className="text-body-lg max-w-xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
                        Ministry leaders and parishioners can submit parish events for review.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-[#570013] text-white px-10 py-4 rounded-full text-label-md btn-primary hover:opacity-90 transition-all"
                    >
                        Contact the Office
                        <MdArrowForward />
                    </Link>
                </div>
            </section>
        </>
    );
}
