import React from 'react';
import { Link } from 'react-router-dom';
import { MdAutoStories, MdMail, MdPerson, MdVolunteerActivism } from 'react-icons/md';

import { useMinistriesData } from '../hooks/useMinistriesData';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';

export default function Ministries() {
    // ── Integration: Fetch all ministries from API ─────────────────────────────
    const { ministries, loading, error } = useMinistriesData();

    // Grouping ministries by their category mapping on the frontend
    const liturgical = ministries.filter(m => m.category === 'LITURGICAL');
    const outreach = ministries.filter(m => m.category === 'OUTREACH');
    const youthAndPrayer = ministries.filter(m => ['YOUTH', 'PRAYER', 'OTHER'].includes(m.category));

    // Fallbacks to generic placeholders if images/values are missing
    const placeholderImg = "data:image/svg+xml;charset=UTF-8,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23ececec' width='400' height='300'/%3E%3Ctext fill='%23909090' font-family='sans-serif' font-size='30' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EIMAGE%3C/text%3E%3C/svg%3E";

    // Re-usable loading state template
    const LoaderSection = () => (
        <Spinner message="Loading ministries..." />
    );

    return (
        <>
            {/* Hero Section */}
            <section className="py-7 md:py-20 text-center max-w-[1200px] mx-auto px-5 md:px-16">
                <h1 className="text-display-lg text-[#570013] mb-4">Parish Ministries</h1>
                <p className="text-body-lg text-[#584141] max-w-3xl mx-auto italic">
                    "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many." — Mark 10:45
                </p>
            </section>

            {error && (
                <div className="max-w-[1200px] mx-auto px-5 text-center text-red-600 mb-10">
                    <p>Failed to load ministries. Please try again later.</p>
                </div>
            )}

            {/* ── Liturgical ──────────────────────────────────────────────────────── */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#e0bfbf]" />
                    <MdAutoStories className="text-[#735c00] text-2xl" />
                    <h2 className="text-headline-lg text-[#2b271e] uppercase tracking-widest">Liturgical</h2>
                    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#e0bfbf]" />
                </div>

                {loading ? <LoaderSection /> : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {liturgical.map(m => (
                            <div key={m.id} className="bg-white border border-[#e0bfbf] p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(87,0,19,0.1)] group">
                                <div className="h-48 mb-6 overflow-hidden rounded-lg relative">
                                    <img src={m.image || placeholderImg} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-headline-md text-[#570013] mb-2">{m.title}</h3>
                                <p className="text-[#584141] mb-6 text-body-md line-clamp-3">{m.description}</p>
                                <div className="flex items-center gap-3 pt-4 border-t border-[#e0bfbf]">
                                    <div className="w-10 h-10 rounded-full bg-[#fed65b] flex items-center justify-center text-[#745c00] font-bold">
                                        {m.leaderName ? m.leaderName.charAt(0) : '—'}
                                    </div>
                                    <div className="text-caption">
                                        <p className="font-bold">{m.leaderName || 'To Be Announced'}</p>
                                        <p className="opacity-70">Coordinator</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {liturgical.length === 0 && (
                            <div className="col-span-full">
                                <EmptyState title="Liturgical Ministries" message="We are currently organizing our liturgical leaders." icon={MdAutoStories} />
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* ── Community Outreach ──────────────────────────────────────────────── */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#e0bfbf]" />
                    <MdVolunteerActivism className="text-[#735c00] text-2xl" />
                    <h2 className="text-headline-lg text-[#2b271e] uppercase tracking-widest">Community Outreach</h2>
                    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#e0bfbf]" />
                </div>

                {loading ? <LoaderSection /> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {outreach.map(m => (
                            <div key={m.id} className="group flex flex-col md:flex-row bg-[#f5ece7] border border-[#e0bfbf] rounded-xl overflow-hidden hover:shadow-lg transition-all">
                                <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                                    <img src={m.image || placeholderImg} alt={m.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-8 flex-1">
                                    <h3 className="text-headline-md text-[#570013] mb-2">{m.title}</h3>
                                    <p className="text-[#584141] mb-6 text-body-md line-clamp-3">{m.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <MdPerson className="text-[#570013]" />
                                            <span className="font-bold text-sm">{m.leaderName || 'TBA'}</span>
                                        </div>
                                        {m.leaderEmail && (
                                            <a href={`mailto:${m.leaderEmail}`} className="text-[#570013] hover:text-[#800020]">
                                                <MdMail size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {outreach.length === 0 && (
                            <div className="col-span-full">
                                <EmptyState title="Community Outreach" message="We are arranging outreach programs to serve the community." icon={MdVolunteerActivism} />
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* ── Youth & Prayer ──────────────────────────────────────────────────── */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-6">
                    <div>
                        <h2 className="text-headline-lg text-[#2b271e]">Youth &amp; Other Ministries</h2>
                        <p className="text-[#584141] text-body-md">Building faith for the next generation and sustaining it through communal prayer.</p>
                    </div>
                    <div className="h-px flex-grow bg-[#e0bfbf] mx-8 hidden md:block mb-4" />
                </div>

                {loading ? <LoaderSection /> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {youthAndPrayer.map(m => (
                            <div key={m.id} className="bg-[#efe6e2] p-8 rounded-xl border border-[#e0bfbf] flex flex-col h-full hover:shadow-md transition">
                                <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-4 inline-block w-max ${m.category === 'YOUTH' ? 'bg-[#735c00] text-white' : 'bg-[#570013] text-white'
                                    }`}>
                                    {m.category}
                                </span>
                                <h3 className="text-headline-md text-[#570013] mb-2">{m.title}</h3>
                                <p className="text-[#584141] mb-6 text-body-md flex-grow">{m.description}</p>

                                <div className="mt-auto border-t border-[#e0bfbf] pt-4">
                                    {m.meetingSchedule && (
                                        <p className="text-sm font-medium mb-3 text-[#570013]">🕒 {m.meetingSchedule}</p>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-[#413d33] font-bold">
                                            <MdPerson className="text-lg opacity-80" /> {m.leaderName || 'Leadership TBA'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {youthAndPrayer.length === 0 && (
                            <div className="col-span-full">
                                <EmptyState title="Youth & Prayer" message="Gatherings for youth and prayer are being scheduled." />
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="bg-[#e9e1dc] py-20 px-5 text-center mt-20 max-w-[1200px] mx-auto md:rounded-3xl mb-10">
                <h2 className="text-display-lg text-[#570013] mb-4">Called to Serve?</h2>
                <p className="text-[#584141] max-w-2xl mx-auto mb-8 text-body-lg">
                    Every parishioner is invited to share their unique talents and time. Join a ministry today and help us grow our vibrant community of faith.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link to="/contact" className="bg-[#570013] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-md">
                        Register to Volunteer
                    </Link>
                    <Link to="/contact" className="border border-[#570013] text-[#570013] px-10 py-4 rounded-full font-bold hover:bg-[#570013]/5 transition-colors">
                        Inquiry Form
                    </Link>
                </div>
            </section>
        </>
    );
}
