import React from 'react';
import { Link } from 'react-router-dom';

const events = [
    {
        month: 'OCT', day: '24',
        title: 'Parish Harvest Festival',
        desc: 'Join us for a day of gratitude, food, and community celebration as we mark the harvest season together.',
        location: 'Parish Hall', time: '2:00 PM', category: 'Community',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqdwKrLrJbKdJX6g0v6Cd67Pcwht541jm4DJigESqG_cdQX2soQVYn8FWpU5WxB47WyE_ItYNq3wTF2ERlS7KrFIDjWBPCbQhCvP7QYKyxH077AWcgfxit2n2Gnv4OUnXgKe3I2Mc_kJzkLScdmaC4ad0rxR8aNmRoNkJ0-tdRV9MGJNg2TSQip8Q8oRnMwi_22Ob99gXczvfUiaxa_kQrUMId5wIxJbQPY4jwBYictXX6Nxgh4WJ8XIPE-RZNpMMEcmIZMN2xp7aZ',
        reveal: 'data-reveal-zoom',
    },
    {
        month: 'NOV', day: '02',
        title: 'All Souls Day Requiem Mass',
        desc: 'A solemn Mass of remembrance for our departed loved ones with special choral accompaniment.',
        location: 'Main Sanctuary', time: '7:00 PM', category: 'Liturgy',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqNxB8bmlMVxBZ-nHePaICMZpqCvxqLOTU0Ok3DAa-eOnxd3DIn6DYfsR898ejBoI3sXE118hFJDlUcx95kpkCatEF-ZfTiH9D-VclFIM1Qb4X_C9vj8T15nnnGoOUxro5OVIOG2NxELvgJObRxqioZmFkuAHuiicQKMVO_8fKjnhbgabmmDYkiP1EW11y3mAMysIzFaWWtPbJdiYqkbi7ySm9qnft63n8TQttlCWn7Pvc1sRWIQZaCuw5zbCCBWZGqdpoUpoCLh9g',
        reveal: 'data-reveal-left',
    },
    {
        month: 'NOV', day: '15',
        title: "St. Vincent de Paul Drive",
        desc: 'Our monthly food and clothing drive to support families in our local community.',
        location: 'East Parking Lot', time: '9:00 AM', category: 'Outreach',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbdPPfqhzIftwZ5xzd3kCYqiBUA6zYNL1tXC5nkmwjyxrtWVJV9HJEGGCq4imBQtHYWW-ZpICnK-oXVOVryMmDYC5fhxsrFRRKd5GG3Y-TclCnIm8FUUfYAge7eVi4pXJ74hDa99uDe0RCPH0ZJsL9JhhDhM9N1EkSHqCW4vaOWtXBostt6cIxOCOemF13uyCiG6-gB1MnLwRpT0fRYCSTGvN3MTueDOg50wSWt_WuSvIs_sJBZzHYUF7fIW6fP0i8aXmxBPxBrzd4',
        reveal: 'data-reveal-right',
    },
    {
        month: 'NOV', day: '17',
        title: 'Youth Ministry Retreat',
        desc: 'A weekend of prayer, reflection, and fellowship for all high school parishioners.',
        location: 'Diocesan Retreat Center', time: 'All Day', category: 'Youth',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3GQ2UBaFy7nHJQ5sy6DQu-auBkfG6SPo2uAu8IxMb1tRP2njm1eW-eBQl7rdjdTNGiy-C745NwVN177n-3scQhvBFf-c1hvC8upw22sMzwNYdmzBL0jLbuhUVCUx6RnQB9Kam8IklWKft94Pz685fy2JvIKJPWuCiCR4QsvkUSKpEK3VVEzB5ek6Fnbo5j7l2mY3AfZbm3FKpMI0j-CkE2xmjVBdccvhhE4eemxLwpIVtT2--UFT3wUZBi6WAFD_ql4MQMTNseQk',
        reveal: 'data-reveal-flip',
    },
    {
        month: 'DEC', day: '01',
        title: 'Advent Parish Retreat',
        desc: 'Join us for a weekend of prayer and reflection as we prepare our hearts for the birth of our Lord.',
        location: 'Parish Hall', time: '9:00 AM', category: 'Spiritual',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGVd0iV-RZgVmzOZwnIj3L9glmDuGttj5GA3qtM57aflDYs3I0-uHWzv_XkFeYrETG2_oLwQcQY68GeCX_oIhZf-5xQck-ptG5u-iYjR6u-AJ8dzWuu6jRbvrAKj1EqjHD310fIwSuN8uBYsBwihS_eQkbvnP31vNMozzcyuz-P-q2hevcrRjpmjTMjUoGC_Szf9HwIW_auhMWMzE3mnV6gRnhftEw6ocaSszrNmwZ4IDsso7bVzefxTmZQuJZUIz2gjpQ-v4FFoK_',
        reveal: 'data-reveal-bounce',
    },
    {
        month: 'DEC', day: '08',
        title: 'Feast of the Immaculate Conception',
        desc: 'Holy Day of Obligation. We celebrate the Blessed Virgin Mary, Patroness of our Diocese, with a Solemn High Mass.',
        location: 'Main Sanctuary', time: '10:00 AM', category: 'Liturgy',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlZlArr5P9AqDFUUJCJosFkNayO2gKe5Em3JjSxeG5IczCTc0ejXDldY1xmVedbbPOh1wTmavAoLuR9CEtLo2MV7nPBmzSqyv0QfsDJ7CP-23MaexLkV9yYcZlo9qCk0XYMapRikDjx3KGCV5P4rSR-qqzp5ukaprXdp2buIko1oUMNK1tMVLhJz58PmGPPAc9JDsGu1jdCwtw6QW83KO08mcBzkcVs3rIb_KtyGi2AAq1vv90qBoNf3KRESO2xugowzksj2OKcfba',
        reveal: 'data-reveal-spin',
    },
];

export default function Events() {
    return (
        <>
            {/* Hero */}
            <section className="py-16 text-center max-w-[1200px] mx-auto px-5 md:px-16">
                <div data-reveal>
                    <h1 className="text-display-lg mb-4" style={{ color: 'var(--accent-maroon)' }}>
                        Parish Calendar
                    </h1>
                    <p className="text-body-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Stay connected with parish life. Come as you are, and leave enriched by faith,
                        fellowship, and the love of community.
                    </p>
                    <div className="w-16 h-1 bg-[#ffe088] mx-auto mt-6 rounded-full" />
                </div>
            </section>

            {/* Events Grid */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(({ month, day, title, desc, location, time, category, img, reveal }, i) => (
                        <div
                            key={title}
                            {...{ [reveal]: '' }}
                            data-delay={i * 100}
                            className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm card-hover card-glow border"
                            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    src={img} alt={title}
                                />
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-3 left-3 rounded-xl overflow-hidden shadow-md text-center w-12"
                                    style={{ background: 'var(--bg-card)' }}>
                                    <div className="bg-[#570013] text-white text-[10px] font-bold py-0.5 tracking-wider">{month}</div>
                                    <div className="font-serif text-xl font-bold py-0.5" style={{ color: 'var(--accent-maroon)' }}>{day}</div>
                                </div>
                                <div className="absolute top-3 right-3 bg-[#ffe088] text-[#241a00] text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                                    {category}
                                </div>
                            </div>
                            <div className="p-5 relative z-10">
                                <h3 className="text-headline-md group-hover:text-[#570013] transition-colors mb-2">
                                    {title}
                                </h3>
                                <p className="text-body-md line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>
                                    {desc}
                                </p>
                                <div className="flex items-center gap-4 text-label-md" style={{ color: '#735c00' }}>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-lg">location_on</span>
                                        {location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-lg">schedule</span>
                                        {time}
                                    </div>
                                </div>
                                <button className="mt-4 w-full border-2 rounded-full py-2 text-label-md transition-all duration-300 hover:bg-[#570013] hover:text-white hover:border-[#570013] hover:scale-[1.02]"
                                    style={{ borderColor: 'var(--accent-maroon)', color: 'var(--accent-maroon)' }}>
                                    RSVP / Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20" style={{ background: 'var(--section-alt)' }}>
                <div className="max-w-[1200px] mx-auto px-5 md:px-16 text-center" data-reveal-zoom>
                    <h2 className="text-headline-lg mb-4" style={{ color: 'var(--accent-maroon)' }}>
                        Submit Your Event
                    </h2>
                    <p className="text-body-lg max-w-xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
                        Ministry leaders and parishioners can submit parish events for review.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-[#570013] text-white px-10 py-4 rounded-full text-label-md btn-primary hover:opacity-90 transition-all"
                    >
                        Contact the Office
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </section>
        </>
    );
}
