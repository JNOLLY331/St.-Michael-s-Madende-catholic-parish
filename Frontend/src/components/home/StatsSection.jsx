import { STATS, HERO_IMAGE_URL } from '../../data/homeData';
import StatCard from './StatCard';

/** "Our Parish By the Numbers" section with animated count-up stats. */
export default function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#40000b] via-[#570013] to-[#800020]" />
      <div className="absolute inset-0"
        style={{
          backgroundImage: `url('${HERO_IMAGE_URL}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="text-center mb-14">
          <p className="font-oswald tracking-[0.3em] text-[#ffe088]/70 uppercase text-sm mb-3">God's Work Through Us</p>
          <h2 className="font-oswald font-bold text-4xl md:text-5xl text-white mb-4">
            Our Parish <span className="text-[#ffe088]">By the Numbers</span>
          </h2>
          <p className="text-white/70 text-body-md max-w-2xl mx-auto">
            For over six decades, St. Michael Madende has been a beacon of faith, service,
            and community. These numbers reflect the grace of God working through our parish family.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, i) => (
            <div key={stat.label}
              data-reveal-bounce
              data-delay={i * 80}>
              <StatCard
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                icon={stat.icon}
                delay={i * 100}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
