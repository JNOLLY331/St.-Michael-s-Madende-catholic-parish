import { useEventsData } from '../../hooks/useEventsData';
import { MdArrowForward, MdLocationOn, MdCalendarToday } from 'react-icons/md';
import Spinner from '../common/Spinner';
import EmptyState from '../common/EmptyState';

<<<<<<< HEAD
/** Formats "2026-07-15" → { month: "JUL", day: "15" } */
function formatDateParts(dateStr) {
  if (!dateStr) return { month: '—', day: '—' };
  const d = new Date(dateStr);
  const month = d.toLocaleString('en', { month: 'short' }).toUpperCase();
  const day = String(d.getDate()).padStart(2, '0');
  return { month, day };
}

/** Upcoming Events — design-folder card style, data from backend API. */
export default function EventsSection({ onNavigate }) {
  const { events, loading, error } = useEventsData({ is_published: true });
  const topEvents = events.slice(0, 3);

  return (
    <section className="py-20 w-full" style={{ background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

        {/* Section header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-oswald" style={{ fontSize: '2rem', fontWeight: 700, color: '#570013', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.2 }}>
              Upcoming Events
            </h2>
            <p className="font-oswald" style={{ color: '#584141', marginTop: '4px', fontSize: '1rem', fontWeight: 400 }}>
              Stay connected with our parish life
            </p>
          </div>
          <button
            onClick={() => onNavigate('/events')}
            className="hidden md:flex items-center gap-2 font-oswald"
            style={{ color: '#570013', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}
=======

const REVEAL_ATTR_BY_INDEX = ['data-reveal-left', 'data-reveal-zoom', 'data-reveal-right'];

/** Full-width image cards previewing upcoming parish events. */
export default function EventsSection({ onNavigate }) {
  const { events, loading, error } = useEventsData({ is_published: true });
  const topEvents = events.slice(0, 3); // Get max 3 for the home page

  // Helper date formatter
  const formatBadgeDate = (dateStr) => {
    if (!dateStr) return 'TBA';
    const d = new Date(dateStr);
    const month = d.toLocaleString('en', { month: 'short' }).toUpperCase();
    const day = String(d.getDate()).padStart(2, '0');
    return `${month} ${day}`;
  };

  return (
    <section className="py-20 w-full" style={{ background: 'var(--bg-card)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="font-oswald tracking-[0.3em] text-[#570013]/60 uppercase text-sm mb-2">Stay Connected</p>
            <h2 className="font-oswald font-bold text-4xl text-[#570013]">Upcoming Events</h2>
            <p className="text-body-md text-[#584141] mt-1">Stay connected with our parish life</p>
          </div>
          <button
            onClick={() => onNavigate('/events')}
            className="hidden md:flex items-center gap-2 text-[#570013] font-oswald font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all link-slide"
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
          >
            View Calendar <MdArrowForward />
          </button>
        </div>

<<<<<<< HEAD
        {/* Loading / Error / Empty states */}
        {loading && <Spinner message="Loading upcoming events..." />}
        {!loading && error && (
          <div style={{ textAlign: 'center', color: '#ba1a1a', padding: '2.5rem 0' }}>
            <p className="font-oswald">⚠ Failed to load events.</p>
          </div>
        )}
        {!loading && !error && topEvents.length === 0 && (
          <EmptyState title="No Events Listed" message="Stay tuned for upcoming gatherings." icon={MdCalendarToday} />
        )}

        {/* Event Cards */}
        {!loading && !error && topEvents.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {topEvents.map((event, i) => {
              const { month, day } = formatDateParts(event.startDate);
              return (
                <div
                  key={event.id}
                  onClick={() => onNavigate('/events')}
                  data-reveal-zoom
                  data-delay={i * 100}
                  className="group cursor-pointer"
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 2px 8px rgba(87,0,19,0.06)',
                    transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(87,0,19,0.14)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(87,0,19,0.06)';
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden', background: '#f5ece7' }}>
                    {(event.thumbnail || event.banner) ? (
                      <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                        className="group-hover:scale-105"
                        src={event.thumbnail || event.banner}
                        alt={event.title}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5ece7 0%, #efe6e2 100%)' }}>
                        <MdCalendarToday style={{ fontSize: '3rem', color: '#e0bfbf' }} />
                      </div>
                    )}

                    {/* Date badge */}
                    <div style={{
                      position: 'absolute', top: '12px', left: '12px',
                      background: 'var(--bg-card)', borderRadius: '10px',
                      overflow: 'hidden', textAlign: 'center', width: '48px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                    }}>
                      <div style={{ background: '#570013', color: '#fff', fontSize: '9px', fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 0' }}>
                        {month}
                      </div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: '#570013', lineHeight: 1.1, padding: '3px 0' }}>
                        {day}
                      </div>
                    </div>

                    {/* Category badge */}
                    {event.category && (
                      <div style={{
                        position: 'absolute', top: '12px', right: '12px',
                        background: '#ffe088', color: '#241a00',
                        fontSize: '10px', fontFamily: 'var(--font-serif)',
                        fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        padding: '3px 10px', borderRadius: '9999px',
                      }}>
                        {event.category}
                      </div>
                    )}
                  </div>

                  {/* Card content */}
                  <div style={{ padding: '1.25rem' }}>
                    <h3 className="font-oswald" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e1b18', marginBottom: '6px', letterSpacing: '0.02em', lineHeight: 1.25, transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#570013'}
                      onMouseLeave={e => e.currentTarget.style.color = '#1e1b18'}
                    >
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="font-oswald" style={{ fontSize: '0.9rem', fontWeight: 400, color: '#584141', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '10px' }}>
                        {event.description}
                      </p>
                    )}
                    {event.venue && (
                      <div className="font-oswald" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#735c00', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        <MdLocationOn style={{ fontSize: '1rem' }} />
                        {event.venue}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View all button */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => onNavigate('/events')}
            className="font-oswald"
            style={{
              background: 'none', border: '2px solid #570013', color: '#570013',
              borderRadius: '9999px', padding: '10px 32px',
              fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#570013'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#570013'; }}
          >
            View All Events
          </button>
        </div>
=======
        {/* Error/Loading States */}
        {loading && <Spinner message="Loading upcoming events..." />}

        {!loading && error && (
          <div className="text-center text-red-600 py-10"><p>⚠ Failed to load events.</p></div>
        )}

        {!loading && !error && topEvents.length === 0 && (
          <EmptyState
            title="No Events Listed"
            message="Stay tuned for upcoming gatherings."
            icon={MdCalendarToday}
          />
        )}

        {/* Full-width to screen edges grid */}
        {!loading && !error && topEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-2xl">
            {topEvents.map((event, idx) => (
              <div
                key={event.id}
                onClick={() => onNavigate('/events')}
                {...{ [REVEAL_ATTR_BY_INDEX[idx % 3]]: '' }}
                data-delay={idx * 120}
                className="group cursor-pointer relative overflow-hidden"
                style={{ minHeight: '420px' }}
              >
                {/* Image fills full card */}
                {event.thumbnail || event.banner ? (
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={event.thumbnail || event.banner}
                    alt={event.title}
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#570013]/50 to-[#2b271e]/80 flex items-center justify-center">
                    <MdCalendarToday className="text-white/40 text-6xl" />
                  </div>
                )}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Date badge */}
                <div className="absolute top-4 left-4 bg-[#570013] px-3 py-1.5 rounded-full text-white font-oswald font-bold text-sm tracking-wide shadow-lg z-10">
                  {formatBadgeDate(event.startDate)}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="font-oswald font-bold text-2xl text-white mb-2 group-hover:text-[#ffe088] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-2 mb-3">{event.description}</p>
                  <div className="flex items-center gap-2 text-[#ffe088]">
                    <MdLocationOn className="text-lg" />
                    <span className="font-oswald text-sm tracking-wide">{event.venue}</span>
                  </div>
                  {/* Read more hover line */}
                  <div className="mt-3 flex items-center gap-2 text-white/60 group-hover:text-[#ffe088] transition-colors">
                    <span className="font-oswald text-xs uppercase tracking-widest">Learn More</span>
                    <MdArrowForward className="text-sm" />
                  </div>
                </div>

                {/* Border between cards */}
                {idx < topEvents.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/20 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        )}
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
      </div>
    </section>
  );
}
