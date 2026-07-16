import { useEventsData } from '../../hooks/useEventsData';
import { MdArrowForward, MdLocationOn, MdCalendarToday } from 'react-icons/md';
import Spinner from '../common/Spinner';
import EmptyState from '../common/EmptyState';

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
          >
            View Calendar <MdArrowForward />
          </button>
        </div>

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
      </div>
    </section>
  );
}
