import React from 'react';
import { Link } from 'react-router-dom';
import { MdAutoStories, MdChurch, MdDirections, MdEvent, MdInfo, MdSchedule, MdVolunteerActivism } from 'react-icons/md';
import DynamicIcon from '../components/DynamicIcon';
import { useMassScheduleData } from '../hooks/useMassScheduleData';


// Helper to split schedule items conceptually (if backend returns generic days vs exact groupings, we might need to filter)
// The hardcoded page had groupings for "Sunday Liturgy", "Saturday Vigil", "Weekday Mass".
function formatTime(timeStr) {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
}

export default function MassSchedule() {
    const { schedule, loading } = useMassScheduleData();

    // Grouping the fetched schedule assuming standard DAY categories.
    // If schedule is empty or loading, fallback groups will be rendered 
    // to preserve design (until fetched or if fetch fails).

    // Sort items by start time first, just in case
    const sorted = [...schedule].sort((a, b) => a.startTime.localeCompare(b.startTime));

    const sundays = sorted.filter(s => s.day === 'Sunday' && s.isActive);
    const saturdays = sorted.filter(s => s.day === 'Saturday' && s.isActive);
    const weekdays = sorted.filter(s => !['Sunday', 'Saturday'].includes(s.day) && s.isActive);

    return (
        <>
            {/* Hero */}
            <section className="py-4 md:py-16 text-center max-w-[1200px] mx-auto px-5 md:px-16">
                <div>
                    <h1 className="text-display-lg mb-4" style={{ color: 'var(--accent-maroon)' }}>Sacred Times</h1>
                    <p className="text-body-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Join our community in prayer and worship. Whether you are a regular parishioner or visiting for the first time, you are welcome at the Lord's table.
                    </p>
                    <div className="w-16 h-1 bg-[#ffe088] mx-auto mt-4 rounded-full" />
                </div>
            </section>

            {/* Schedule Bento Grid */}
            <div className="max-w-[1200px] mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-20">
                {/* Sunday Liturgy */}
                <div data-reveal-left className="md:col-span-8 border p-8 rounded-2xl shadow-sm card-hover flex flex-col h-full" style={{ background: 'var(--bg-card-alt)', borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center gap-2 mb-8">
                        <MdAutoStories className="text-[#735c00]" />
                        <h2 className="text-headline-lg text-[#1e1b18]">Sunday Liturgy</h2>
                    </div>

                    <div className="space-y-6 flex-grow">
                        {loading && (
                            <div className="h-32 bg-gray-200 animate-pulse rounded-xl" />
                        )}
                        {!loading && sundays.length === 0 && (
                            <p className="text-[#584141]">No Sunday services listed.</p>
                        )}
                        {!loading && sundays.map((srv) => (
                            <div key={srv.id} className="flex justify-between items-center border-b border-[#e0bfbf] pb-6 last:border-0 last:pb-0">
                                <div>
                                    <p className="text-headline-md">{srv.serviceName}</p>
                                    <p className="text-body-md text-[#584141]">{srv.language} {srv.notes ? `• ${srv.notes}` : ''}</p>
                                </div>
                                <p className="text-headline-md text-[#735c00] whitespace-nowrap">{formatTime(srv.startTime)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-[#fed65b]/20 rounded-lg flex items-start gap-2 border border-[#735c00]/10">
                        <MdInfo className="text-[#735c00]" />
                        <p className="text-body-md text-[#745c00]">Children's Liturgy is available during the 10:30 AM High Mass in the Parish Hall.</p>
                    </div>
                </div>

                {/* Side Cards */}
                <div className="md:col-span-4 flex flex-col gap-6 h-full">
                    {/* Saturday Vigil */}
                    <div data-reveal-right className="border p-6 rounded-2xl card-hover flex-1" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center gap-2 mb-6">
                            <MdEvent className="text-[#735c00]" />
                            <h3 className="text-headline-md">Saturday Vigil</h3>
                        </div>
                        {loading ? (
                            <div className="h-10 bg-gray-200 animate-pulse rounded-xl" />
                        ) : saturdays.length === 0 ? (
                            <p className="text-[#584141] text-sm">No Saturday services.</p>
                        ) : (
                            saturdays.map(srv => (
                                <div key={srv.id} className="flex justify-between items-center mb-4 last:mb-0">
                                    <div>
                                        <p className="text-body-lg">{srv.serviceName}</p>
                                        {srv.language && <p className="text-xs text-[#584141]">{srv.language}</p>}
                                    </div>
                                    <p className="text-headline-md text-[#735c00]">{formatTime(srv.startTime)}</p>
                                </div>
                            ))
                        )}
                    </div>
                    {/* Weekday Mass */}
                    <div data-reveal-right data-delay="150" className="border p-6 rounded-2xl card-hover flex-1" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <MdSchedule className="text-[#735c00]" />
                            <h3 className="text-headline-md">Weekday Mass</h3>
                        </div>
                        {loading ? (
                            <div className="h-20 bg-gray-200 animate-pulse rounded-xl" />
                        ) : weekdays.length === 0 ? (
                            <p className="text-[#584141] text-sm">No weekday services.</p>
                        ) : (
                            <ul className="space-y-4">
                                {weekdays.map(srv => (
                                    <li key={srv.id} className="flex justify-between items-center border-b border-[#e0bfbf]/30 pb-3 last:border-0 last:pb-0">
                                        <span className="text-body-md">
                                            {srv.day}
                                            {srv.serviceName !== 'Mass' ? <span className="block text-xs opacity-70">{srv.serviceName}</span> : null}
                                        </span>
                                        <span className="font-serif text-[#735c00]">{formatTime(srv.startTime)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* Decorative Divider */}
            <div className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div className="relative w-full h-[1px] bg-[#e0bfbf] flex items-center justify-center">
                    <span className="absolute bg-[#fff8f5] px-4 text-[#735c00] text-sm">♦</span>
                </div>
            </div>

            {/* Confession & Adoration */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                <div data-reveal-left className="flex gap-8 items-start p-8 border-l-4 border-[#570013] shadow-sm rounded-2xl card-hover" style={{ background: 'var(--bg-card)' }}>
                    <div className="bg-[#ffdada] p-4 rounded-full shrink-0 hidden sm:block">
                        <MdVolunteerActivism className="text-[#570013]" />
                    </div>
                    <div>
                        <h3 className="text-headline-lg mb-2">Reconciliation</h3>
                        <p className="text-body-md text-[#584141] mb-4 italic">
                            "The Lord never tires of forgiving. It is we who tire of asking for forgiveness." — Pope Francis
                        </p>
                        <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b border-[#e0bfbf] pb-3">
                                <span className="text-label-md bg-[#fed65b] px-2 py-0.5 rounded w-fit">Saturdays</span>
                                <span className="text-body-lg">04:30 PM — 05:30 PM</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                <span className="text-label-md bg-[#fed65b] px-2 py-0.5 rounded w-fit">Weekdays</span>
                                <span className="text-body-lg">15 mins before Morning Mass</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-reveal-right data-delay="150" className="flex gap-8 items-start p-8 border-l-4 border-[#735c00] shadow-sm rounded-2xl card-hover" style={{ background: 'var(--bg-card)' }}>
                    <div className="bg-[#ffe088] p-4 rounded-full shrink-0 hidden sm:block">
                        <MdChurch className="text-[#735c00]" />
                    </div>
                    <div>
                        <h3 className="text-headline-lg mb-2">Eucharistic Adoration</h3>
                        <p className="text-body-md text-[#584141] mb-4">
                            A quiet time for personal prayer and meditation in the presence of the Blessed Sacrament.
                        </p>
                        <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b border-[#e0bfbf] pb-3">
                                <span className="text-label-md bg-[#f5ece7] px-2 py-0.5 rounded w-fit text-[#413d33]">Thursdays</span>
                                <span className="text-body-lg">08:00 AM — 08:00 PM</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                <span className="text-label-md bg-[#f5ece7] px-2 py-0.5 rounded w-fit text-[#413d33]">1st Fridays</span>
                                <span className="text-body-lg">Overnight Vigil (Starts 07 PM)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div data-reveal-zoom className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card-alt)' }}>
                    <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-headline-lg text-[#570013] mb-4">Find Your Sanctuary</h3>
                        <p className="text-body-lg text-[#584141] mb-8">
                            St. Michael Madende is located in the heart of our community. Ample parking is available in the north lot.
                        </p>
                        <div className="space-y-4 mb-8">
                            {[
                                { icon: 'location_on', text: '123 Parish Road, Madende District, 56789' },
                                { icon: 'phone', text: '+1 (234) 567-8901' },
                            ].map(({ icon, text }) => (
                                <div key={icon} className="flex items-center gap-2">
                                    <DynamicIcon name={icon} className="text-[#570013]" />
                                    <span className="text-body-md">{text}</span>
                                </div>
                            ))}
                        </div>
                        <a
                            href="#"
                            className="inline-flex items-center justify-center gap-2 bg-[#570013] text-white px-8 py-4 rounded-full text-label-md hover:opacity-90 transition-all w-fit"
                        >
                            <MdDirections />
                            Get Directions
                        </a>
                    </div>
                    <div
                        className="min-h-[300px] bg-cover bg-center"
                        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7cxZKDrRbPgouyinwftnZyfvn74qplFJBAgVzrueekgxMQOiAHnniVKHx4C4t3HRjqkAkUmP7qj5jxPDsk_6tRBrMUzzJQ6Ojb5I3XqSAwY3lPK8jHpLzSN9AJfIkJ3f6XVOQwVZ_qxDUmE0TRBUXqtjjBHFOoaiu7Qj-HvMGlaX6i1TgSQKSEZ04c09I1Horuz_AmFGT_bqWO8ZFTE3qIHq8ErlgTS-Ltt7FaQV9qOVnjY8whzNYGnJCeLZpMthLdN7rBAF2Zclc')` }}
                    />
                </div>
            </section>
        </>
    );
}
