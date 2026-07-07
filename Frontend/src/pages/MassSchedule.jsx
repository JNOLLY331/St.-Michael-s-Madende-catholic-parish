import React from 'react';
import { Link } from 'react-router-dom';
import { MdAutoStories, MdChurch, MdDirections, MdEvent, MdInfo, MdSchedule, MdVolunteerActivism } from 'react-icons/md';
import DynamicIcon from '../components/DynamicIcon';



export default function MassSchedule() {
    return (
        <>
            {/* Hero */}
            <section className="py-16 md:py-20 text-center max-w-[1200px] mx-auto px-5 md:px-16">
                <div data-reveal>
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
                <div data-reveal-left className="md:col-span-8 border p-8 rounded-2xl shadow-sm card-hover" style={{ background: 'var(--bg-card-alt)', borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center gap-2 mb-8">
                        <MdAutoStories className="text-[#735c00]" />
                        <h2 className="text-headline-lg text-[#1e1b18]">Sunday Liturgy</h2>
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Morning Mass', sub: 'English Language Service', time: '08:00 AM' },
                            { name: 'High Mass', sub: 'Solemn Liturgy with Choir', time: '10:30 AM' },
                            { name: 'Youth & Family Mass', sub: 'Contemporary Music', time: '05:00 PM' },
                        ].map(({ name, sub, time }) => (
                            <div key={name} className="flex justify-between items-center border-b border-[#e0bfbf] pb-6 last:border-0">
                                <div>
                                    <p className="text-headline-md">{name}</p>
                                    <p className="text-body-md text-[#584141]">{sub}</p>
                                </div>
                                <p className="text-headline-md text-[#735c00] whitespace-nowrap">{time}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-4 bg-[#fed65b]/20 rounded-lg flex items-start gap-2 border border-[#735c00]/10">
                        <MdInfo className="text-[#735c00]" />
                        <p className="text-body-md text-[#745c00]">Children's Liturgy is available during the 10:30 AM High Mass in the Parish Hall.</p>
                    </div>
                </div>

                {/* Side Cards */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <div data-reveal-right className="border p-6 rounded-2xl card-hover" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <MdEvent className="text-[#735c00]" />
                            <h3 className="text-headline-md">Saturday Vigil</h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-body-lg">Evening Mass</p>
                            <p className="text-headline-md text-[#735c00]">06:00 PM</p>
                        </div>
                    </div>
                    <div data-reveal-right data-delay="150" className="border p-6 rounded-2xl card-hover" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <MdSchedule className="text-[#735c00]" />
                            <h3 className="text-headline-md">Weekday Mass</h3>
                        </div>
                        <ul className="space-y-2">
                            {[
                                { day: 'Mon – Fri', time: '06:30 AM' },
                                { day: 'Wednesday (Solemn)', time: '12:15 PM' },
                            ].map(({ day, time }) => (
                                <li key={day} className="flex justify-between items-center">
                                    <span className="text-body-md">{day}</span>
                                    <span className="font-serif text-[#735c00]">{time}</span>
                                </li>
                            ))}
                        </ul>
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
                    <div className="bg-[#ffdada] p-4 rounded-full shrink-0">
                        <MdVolunteerActivism className="text-[#570013]" />
                    </div>
                    <div>
                        <h3 className="text-headline-lg mb-2">Reconciliation</h3>
                        <p className="text-body-md text-[#584141] mb-4 italic">
                            "The Lord never tires of forgiving. It is we who tire of asking for forgiveness." — Pope Francis
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-4">
                                <span className="text-label-md bg-[#fed65b] px-2 py-0.5 rounded">Saturdays</span>
                                <span className="text-body-lg">04:30 PM — 05:30 PM</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-label-md bg-[#fed65b] px-2 py-0.5 rounded">Weekdays</span>
                                <span className="text-body-lg">15 mins before Morning Mass</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-reveal-right data-delay="150" className="flex gap-8 items-start p-8 border-l-4 border-[#735c00] shadow-sm rounded-2xl card-hover" style={{ background: 'var(--bg-card)' }}>
                    <div className="bg-[#ffe088] p-4 rounded-full shrink-0">
                        <MdChurch className="text-[#735c00]" />
                    </div>
                    <div>
                        <h3 className="text-headline-lg mb-2">Eucharistic Adoration</h3>
                        <p className="text-body-md text-[#584141] mb-4">
                            A quiet time for personal prayer and meditation in the presence of the Blessed Sacrament.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-4">
                                <span className="text-label-md bg-[#f5ece7] px-2 py-0.5 rounded">Thursdays</span>
                                <span className="text-body-lg">08:00 AM — 08:00 PM</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-label-md bg-[#f5ece7] px-2 py-0.5 rounded">1st Fridays</span>
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
                            <MdDirections  />
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
