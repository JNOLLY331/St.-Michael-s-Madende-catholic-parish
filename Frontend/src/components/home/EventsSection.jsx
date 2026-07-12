import { useEventsData } from '../../hooks/useEventsData';
import { MdArrowForward, MdLocationOn, MdCalendarToday } from 'react-icons/md';
import Spinner from '../common/Spinner';
import EmptyState from '../common/EmptyState';


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
          >
            View Calendar <MdArrowForward />
          </button>
        </div>

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
      </div>
    </section>
  );
}
