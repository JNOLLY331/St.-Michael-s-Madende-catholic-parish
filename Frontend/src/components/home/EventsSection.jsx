import { UPCOMING_EVENTS } from '../../data/homeData';

const REVEAL_ATTR_BY_INDEX = ['data-reveal-left', 'data-reveal-zoom', 'data-reveal-right'];

/** Full-width image cards previewing upcoming parish events. */
export default function EventsSection({ onNavigate }) {
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
            View Calendar <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        {/* Full-width to screen edges grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-2xl">
          {UPCOMING_EVENTS.map(({ date, title, desc, location, img }, idx) => (
            <div
              key={title}
              {...{ [REVEAL_ATTR_BY_INDEX[idx]]: '' }}
              data-delay={idx * 120}
              className="group cursor-pointer relative overflow-hidden"
              style={{ minHeight: '420px' }}
            >
              {/* Image fills full card */}
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={img}
                alt={title}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Date badge */}
              <div className="absolute top-4 left-4 bg-[#570013] px-3 py-1.5 rounded-full text-white font-oswald font-bold text-sm tracking-wide shadow-lg z-10">
                {date}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="font-oswald font-bold text-2xl text-white mb-2 group-hover:text-[#ffe088] transition-colors">
                  {title}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 mb-3">{desc}</p>
                <div className="flex items-center gap-2 text-[#ffe088]">
                  <span className="material-symbols-outlined text-lg">location_on</span>
                  <span className="font-oswald text-sm tracking-wide">{location}</span>
                </div>
                {/* Read more hover line */}
                <div className="mt-3 flex items-center gap-2 text-white/60 group-hover:text-[#ffe088] transition-colors">
                  <span className="font-oswald text-xs uppercase tracking-widest">Learn More</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              {/* Border between cards */}
              {idx < UPCOMING_EVENTS.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/20 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
