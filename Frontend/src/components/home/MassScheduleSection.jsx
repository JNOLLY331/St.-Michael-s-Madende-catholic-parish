import { MdChurch, MdWatchLater, MdMenuBook, MdFavorite, MdStars } from 'react-icons/md';

const SUNDAY_MASSES = [
  { name: 'Morning Mass', time: '07:30 AM' },
  { name: 'Parish Mass', time: '09:30 AM' },
  { name: 'Youth Mass', time: '11:30 AM' },
];

const DAILY_DEVOTIONS = [
  { label: 'Mon – Fri', time: '6:30 AM', icon: MdWatchLater },
  { label: 'Saturday', time: '7:00 AM', icon: MdMenuBook },
  { label: 'Confession', time: 'Sat 4 PM', icon: MdFavorite },
  { label: 'Adoration', time: 'Fri 5 PM', icon: MdStars },
];

/** Quick-access cards for Sunday Mass times and daily devotions. */
export default function MassScheduleSection() {
  return (
    <section className="py-24 md:py-32 bg-white relative border-y border-[#e0bfbf]">
      {/* Decorative background subtle pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#735c00] uppercase mb-4 block">Join Our Community</span>
          <h2 className="text-4xl md:text-6xl text-[#570013] mb-4" style={{ fontFamily: 'EB Garamond, Georgia, serif', fontWeight: 700 }}>
            Mass Times &amp; Devotions
          </h2>
          <div className="w-24 h-1 bg-[#570013] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 border-x border-[#e0bfbf] shadow-2xl">

          {/* Sunday Mass Card */}
          <div
            data-reveal-left
            className="lg:col-span-5 bg-[#fff8f5] p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-[#e0bfbf] relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#735c00]" />
            <MdChurch className="absolute -top-10 -right-10 text-[180px] text-[#570013] opacity-[0.03] transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-1000" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 bg-[#570013] flex items-center justify-center shadow-md">
                  <MdChurch className="text-white text-3xl" />
                </div>
                <h3 className="font-serif font-bold text-3xl md:text-4xl text-[#570013]">Sunday Mass</h3>
              </div>

              <div className="space-y-6">
                {SUNDAY_MASSES.map(({ name, time }, idx) => (
                  <div
                    key={name}
                    className="flex justify-between items-center border-b border-[#e0bfbf]/60 pb-5 last:border-0"
                  >
                    <span className="text-lg text-[#584141] font-medium tracking-wide">{name}</span>
                    <span className="font-bold text-[#570013] bg-[#ffe088] px-4 py-1.5 text-sm md:text-base tracking-widest shadow-sm border border-[#735c00]/20">
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Devotion Card */}
          <div
            data-reveal-right
            className="lg:col-span-7 bg-[#570013] text-white p-10 md:p-14 relative overflow-hidden group"
          >
            {/* Dark premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#570013] to-[#2b0009]" />
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffe088]" />
            <MdChurch className="absolute -bottom-16 -right-16 text-[250px] text-white opacity-5 transform group-hover:scale-110 transition-transform duration-1000" />

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="mb-12">
                <h3 className="font-serif font-bold text-3xl md:text-4xl mb-4 text-[#ffe088]">Daily Devotion</h3>
                <p className="text-lg text-white/80 max-w-xl italic font-light leading-relaxed border-l-2 border-[#ffe088] pl-4">
                  "For where two or three are gathered in my name, there am I among them." <br />— Matthew 18:20
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {DAILY_DEVOTIONS.map(({ label, time, icon: Icon }, idx) => (
                  <div
                    key={label}
                    data-reveal-zoom
                    data-delay={`${(idx + 1) * 100}`}
                    className="bg-white/5 border border-[#ffe088]/20 p-5 hover:bg-[#ffe088]/10 transition-colors duration-300 cursor-default"
                  >
                    <Icon className="text-[#ffe088] text-2xl mb-3" />
                    <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-1">{label}</p>
                    <p className="font-serif font-bold text-xl md:text-2xl text-white tracking-wide">{time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
