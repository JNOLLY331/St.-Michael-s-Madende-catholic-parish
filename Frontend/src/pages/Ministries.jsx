import React from 'react';
import { Link } from 'react-router-dom';
import {
    MdAutoStories, MdMail, MdPerson, MdVolunteerActivism, MdMusicNote,
    MdChildCare, MdPeople, MdFamilyRestroom, MdFavorite, MdSchool,
    MdEmojiPeople, MdHandshake, MdLocalHospital, MdPublic, MdGroups,
} from 'react-icons/md';

import { useMinistriesData } from '../hooks/useMinistriesData';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';

// All ministry categories matching the backend MINISTRY_CATEGORIES settings
const CATEGORIES = [
    {
        key: 'LITURGICAL',
        label: 'Liturgical',
        description: 'Leading the community in worship, prayer, and sacred rites.',
        icon: <MdAutoStories className="text-[#735c00] text-2xl" />,
        layout: 'grid-3',
    },
    {
        key: 'CHOIR',
        label: 'Choir',
        description: 'Lifting hearts to God through sacred music and song.',
        icon: <MdMusicNote className="text-[#735c00] text-2xl" />,
        layout: 'grid-2',
    },
    {
        key: 'YOUTH',
        label: 'Youth',
        description: 'Building faith and fellowship among the next generation.',
        icon: <MdEmojiPeople className="text-[#735c00] text-2xl" />,
        layout: 'grid-3',
    },
    {
        key: 'CHILDREN',
        label: 'Children',
        description: 'Nurturing the faith of the youngest members of our parish.',
        icon: <MdChildCare className="text-[#735c00] text-2xl" />,
        layout: 'grid-2',
    },
    {
        key: 'MEN',
        label: 'Men',
        description: 'Empowering men to live their Catholic faith with integrity.',
        icon: <MdPeople className="text-[#735c00] text-2xl" />,
        layout: 'grid-2',
    },
    {
        key: 'WOMEN',
        label: 'Women',
        description: 'Celebrating the gifts and vocation of women in the Church.',
        icon: <MdFavorite className="text-[#735c00] text-2xl" />,
        layout: 'grid-2',
    },
    {
        key: 'FAMILY',
        label: 'Family',
        description: 'Supporting families as the domestic church at the heart of our community.',
        icon: <MdFamilyRestroom className="text-[#735c00] text-2xl" />,
        layout: 'grid-2',
    },
    {
        key: 'CHARITY',
        label: 'Charity',
        description: 'Serving those in need through works of mercy and compassion.',
        icon: <MdHandshake className="text-[#735c00] text-2xl" />,
        layout: 'grid-2',
    },
    {
        key: 'SMALL_COMMUNITIES',
        label: 'Small Christian Communities',
        description: 'Connecting parishioners through vibrant small groups and neighborhood faith sharing.',
        icon: <MdGroups className="text-[#735c00] text-2xl" />,
        layout: 'grid-3',
    },
    {
        key: 'EVANGELIZATION',
        label: 'Evangelization',
        description: 'Sharing the Good News of Jesus Christ with the world.',
        icon: <MdPublic className="text-[#735c00] text-2xl" />,
        layout: 'grid-2',
    },
    {
        key: 'JUSTICE_AND_PEACE',
        label: 'Justice and Peace',
        description: 'Advocating for human dignity, justice, and reconciliation.',
        icon: <MdVolunteerActivism className="text-[#735c00] text-2xl" />,
        layout: 'grid-2',
    },
    {
        key: 'HEALTH',
        label: 'Health',
        description: 'Caring for the physical, mental, and spiritual health of our parish family.',
        icon: <MdLocalHospital className="text-[#735c00] text-2xl" />,
        layout: 'grid-2',
    },
    {
        key: 'EDUCATION',
        label: 'Education',
        description: 'Forming minds and hearts through Catholic education and catechesis.',
        icon: <MdSchool className="text-[#735c00] text-2xl" />,
        layout: 'grid-2',
    },
    {
        key: 'GENERAL',
        label: 'General',
        description: 'Various parish ministries serving our community in many ways.',
        icon: <MdPeople className="text-[#735c00] text-2xl" />,
        layout: 'grid-3',
    },
    {
        key: 'OTHER',
        label: 'Other Ministries',
        description: 'Additional ministries enriching our parish life.',
        icon: <MdPeople className="text-[#735c00] text-2xl" />,
        layout: 'grid-3',
    },
];

const placeholderImg = "data:image/svg+xml;charset=UTF-8,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23f5ece7' width='400' height='300'/%3E%3Ctext fill='%23e0bfbf' font-family='Georgia,serif' font-size='24' font-weight='bold' x='50%25' y='50%25' text-anchor='middle' dy='0.35em'%3ESt. Michael%3C/text%3E%3C/svg%3E";

function MinistryCard({ m, variant = 'standard' }) {
    const imgSrc = m.image || placeholderImg;

    if (variant === 'horizontal') {
        return (
            <div className="group flex flex-col sm:flex-row bg-[#f5ece7] border border-[#e0bfbf] overflow-hidden hover:shadow-lg transition-all">
                <div className="w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                    <img
                        src={imgSrc}
                        alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={e => { e.target.src = placeholderImg; }}
                    />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center">
                    <h3 className="text-headline-md text-[#570013] mb-2">{m.title}</h3>
                    <p className="text-[#584141] mb-4 text-body-md line-clamp-3">{m.description}</p>
                    {m.meetingSchedule && (
                        <p className="text-sm text-[#570013] font-medium mb-3">🕒 {m.meetingSchedule}</p>
                    )}
                    <div className="flex items-center justify-between mt-auto border-t border-[#e0bfbf] pt-3">
                        <div className="flex items-center gap-2">
                            <MdPerson className="text-[#570013]" />
                            <span className="font-bold text-sm text-[#413d33]">{m.leaderName || 'TBA'}</span>
                        </div>
                        {m.leaderEmail && (
                            <a href={`mailto:${m.leaderEmail}`} className="text-[#570013] hover:text-[#800020] transition-colors">
                                <MdMail size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Standard card (with image top)
    return (
        <div className="bg-white border border-[#e0bfbf] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(87,0,19,0.1)] group flex flex-col">
            <div className="h-44 sm:h-48 overflow-hidden relative">
                <img
                    src={imgSrc}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={e => { e.target.src = placeholderImg; }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(87,0,19,0.15), transparent 60%)' }} />
            </div>
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-headline-md text-[#570013] mb-2">{m.title}</h3>
                <p className="text-[#584141] mb-4 text-body-md line-clamp-3 flex-grow">{m.description}</p>
                {m.meetingSchedule && (
                    <p className="text-sm text-[#570013] font-medium mb-3">🕒 {m.meetingSchedule}</p>
                )}
                <div className="flex items-center gap-3 pt-4 border-t border-[#e0bfbf]">
                    <div className="w-10 h-10 bg-[#fed65b] flex items-center justify-center text-[#745c00] font-bold flex-shrink-0">
                        {m.leaderName ? m.leaderName.charAt(0).toUpperCase() : '—'}
                    </div>
                    <div className="text-caption overflow-hidden">
                        <p className="font-bold truncate">{m.leaderName || 'To Be Announced'}</p>
                        <p className="opacity-70 text-xs">Coordinator</p>
                    </div>
                    {m.leaderEmail && (
                        <a href={`mailto:${m.leaderEmail}`} className="ml-auto text-[#570013] hover:text-[#800020] transition-colors">
                            <MdMail size={18} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

function CategorySection({ category, ministries }) {
    if (ministries.length === 0) return null;

    const isHorizontal = category.layout === 'grid-2' && ministries.length <= 2;
    const gridClass = category.layout === 'grid-3'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1 sm:grid-cols-2';

    return (
        <section className="max-w-[1200px] mx-auto px-4 md:px-16 mb-12 md:mb-20">
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8 md:mb-12">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#e0bfbf]" />
                {category.icon}
                <h2 className="text-headline-lg text-[#2b271e] uppercase tracking-widest whitespace-nowrap">
                    {category.label}
                </h2>
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#e0bfbf]" />
            </div>

            {isHorizontal ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {ministries.map(m => (
                        <MinistryCard key={m.id} m={m} variant="horizontal" />
                    ))}
                </div>
            ) : (
                <div className={`grid ${gridClass} gap-5 md:gap-6`}>
                    {ministries.map(m => (
                        <MinistryCard key={m.id} m={m} variant="standard" />
                    ))}
                </div>
            )}
        </section>
    );
}

export default function Ministries() {
    const { ministries, loading, error } = useMinistriesData();

    // Group ministries by all possible categories
    const grouped = CATEGORIES.reduce((acc, cat) => {
        acc[cat.key] = ministries.filter(m => m.category === cat.key);
        return acc;
    }, {});

    // Check if any data is present
    const hasData = ministries.length > 0;

    return (
        <>
            {/* Hero Section */}
            <section className="py-10 md:py-20 text-center max-w-[1200px] mx-auto px-4 md:px-16">
                <span className="inline-block text-[#735c00] text-xs font-bold tracking-[0.3em] uppercase mb-3">
                    Called to Serve
                </span>
                <h1 className="text-display-lg text-[#570013] mb-4">Parish Ministries</h1>
                <p className="text-body-lg text-[#584141] max-w-3xl mx-auto italic">
                    "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many." — Mark 10:45
                </p>
            </section>

            {error && (
                <div className="max-w-[1200px] mx-auto px-4 text-center text-red-600 mb-10">
                    <p>Failed to load ministries. Please try again later.</p>
                </div>
            )}

            {loading && (
                <div className="max-w-[1200px] mx-auto px-4 md:px-16 mb-20">
                    <Spinner message="Loading ministries..." />
                </div>
            )}

            {!loading && !error && !hasData && (
                <div className="max-w-[1200px] mx-auto px-4 md:px-16 mb-20">
                    <EmptyState
                        title="Ministries"
                        message="Our parish ministries information is being compiled. Please check back soon."
                        icon={MdVolunteerActivism}
                    />
                </div>
            )}

            {/* Render each category that has ministries */}
            {!loading && !error && hasData && CATEGORIES.map(cat => (
                <CategorySection
                    key={cat.key}
                    category={cat}
                    ministries={grouped[cat.key] || []}
                />
            ))}

            {/* CTA */}
            <section className="bg-[#e9e1dc] py-12 md:py-20 px-4 text-center mt-4 md:mt-10 max-w-[1200px] mx-auto mb-10 md:rounded-none">
                <h2 className="text-display-lg text-[#570013] mb-4">Called to Serve?</h2>
                <p className="text-[#584141] max-w-2xl mx-auto mb-8 text-body-lg">
                    Every parishioner is invited to share their unique talents and time. Join a ministry today and help us grow our vibrant community of faith.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/contact"
                        className="bg-[#570013] text-white px-8 md:px-10 py-3 md:py-4 font-bold hover:brightness-110 transition-all shadow-md text-sm md:text-base"
                        style={{ borderRadius: 0 }}>
                        Register to Volunteer
                    </Link>
                    <Link to="/contact"
                        className="border border-[#570013] text-[#570013] px-8 md:px-10 py-3 md:py-4 font-bold hover:bg-[#570013]/5 transition-colors text-sm md:text-base"
                        style={{ borderRadius: 0 }}>
                        Inquiry Form
                    </Link>
                </div>
            </section>
        </>
    );
}
