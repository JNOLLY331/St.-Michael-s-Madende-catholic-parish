const SUNDAY_MASSES = [
  { name: 'Morning Mass', time: '07:30 AM' },
  { name: 'Parish Mass', time: '09:30 AM' },
  { name: 'Youth Mass', time: '11:30 AM' },
];

const DAILY_DEVOTIONS = [
  { label: 'Mon – Fri', time: '6:30 AM', icon: 'wb_sunny' },
  { label: 'Saturday', time: '7:00 AM', icon: 'auto_stories' },
  { label: 'Confession', time: 'Sat 4PM', icon: 'favorite' },
  { label: 'Adoration', time: 'Fri 5PM', icon: 'flare' },
];

/** Quick-access cards for Sunday Mass times and daily devotions. */
export default function MassScheduleSection() {
  return (
    <section className="py-20" style={{ background: 'var(--bg-card)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <p className="font-oswald tracking-[0.3em] text-[#570013]/60 uppercase text-sm mb-2">Join Us</p>
          <h2 className="text-headline-lg text-[#570013] font-oswald">Mass Times &amp; Devotions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sunday Mass Card — animated */}
          <div
            className="mass-card md:col-span-4 bg-[#fbf2ed] p-8 rounded-2xl border border-[#e0bfbf] shadow-sm animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            {/* Shimmer overlay */}
            <div className="mass-card__shimmer" />
            {/* Floating church icon */}
            <div className="mass-card__float-icon">
              <span className="material-symbols-outlined" style={{ fontSize: '7rem', color: '#570013', opacity: 0.04 }}>church</span>
            </div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 bg-[#570013] rounded-xl flex items-center justify-center mass-card__icon-wrap">
                <span className="material-symbols-outlined text-white text-2xl">church</span>
              </div>
              <h3 className="font-oswald font-bold text-2xl text-[#570013]">Sunday Mass</h3>
            </div>
            <div className="space-y-3 relative z-10">
              {SUNDAY_MASSES.map(({ name, time }, idx) => (
                <div
                  key={name}
                  className="mass-time-row-animated flex justify-between items-center border-b border-[#e0bfbf] pb-3 last:border-0"
                  style={{ animationDelay: `${0.3 + idx * 0.12}s` }}
                >
                  <span className="text-body-md text-[#584141]">{name}</span>
                  <span className="font-oswald font-bold text-[#735c00] bg-[#ffe088]/40 px-3 py-1 rounded-full text-sm mass-time-badge">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Devotion Card — animated */}
          <div
            className="devotion-card md:col-span-8 shadow-xl bg-gradient-to-br from-[#570013] to-[#800020] text-white p-8 rounded-2xl flex flex-col justify-between overflow-hidden relative group animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {/* Animated rings */}
            <div className="devotion-card__ring devotion-card__ring--1" />
            <div className="devotion-card__ring devotion-card__ring--2" />
            {/* Glowing top border */}
            <div className="devotion-card__glow-bar" />
            <div className="relative z-10">
              <h3 className="font-oswald font-bold text-3xl mb-3 text-white">Daily Devotion</h3>
              <p className="text-body-md text-white/80 max-w-lg mb-6">
                "For where two or three are gathered in my name, there am I among them." — Matthew 18:20
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DAILY_DEVOTIONS.map(({ label, time, icon }, idx) => (
                  <div
                    key={label}
                    className="devotion-time-tile bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                  >
                    <span className="material-symbols-outlined text-[#ffe088] mb-1" style={{ fontSize: '1.1rem' }}>{icon}</span>
                    <p className="text-label-md text-white/60 font-oswald">{label}</p>
                    <p className="font-oswald font-bold text-xl mt-0.5 text-white">{time}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative cross/church watermark */}
            <span className="material-symbols-outlined absolute -bottom-10 -right-10 opacity-10 text-[200px] pointer-events-none group-hover:scale-110 transition-transform duration-700 text-white">
              church
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
