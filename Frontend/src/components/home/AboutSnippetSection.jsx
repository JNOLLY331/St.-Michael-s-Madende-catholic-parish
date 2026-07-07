import { ABOUT_SNIPPET_IMAGE_URL } from '../../data/homeData';

/** "Our Heritage" teaser section linking through to the full About page. */
export default function AboutSnippetSection({ onNavigate }) {
  return (
    <section className="py-20 overflow-hidden" style={{ background: 'var(--section-alt)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div data-reveal-left className="relative">
          {/* Image stretches close to edges */}
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <img
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              src={ABOUT_SNIPPET_IMAGE_URL}
              alt="Parishioners outside church"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-[#ffe088] text-[#241a00] p-6 rounded-2xl shadow-xl hidden md:block max-w-[220px] border-4 border-white">
            <p className="font-serif text-xl italic leading-snug">"A Sanctuary for All Souls"</p>
          </div>
        </div>
        <div data-reveal-right data-delay="200" className="space-y-5">
          <div className="inline-flex items-center gap-3 text-[#570013]">
            <div className="w-16 h-[2px] bg-[#570013]" />
            <span className="font-oswald tracking-[0.3em] uppercase text-sm font-bold">Our Heritage</span>
          </div>
          <h2 className="text-headline-lg text-[#570013] font-oswald font-bold">
            Steeped in Faith,<br />Driven by Service
          </h2>
          <p className="text-body-lg text-[#584141]">
            Founded over half a century ago, St. Michael Madende has been the spiritual home for generations.
            We are more than just a building; we are a vibrant community committed to the Eucharist,
            spiritual growth, and outreach to those in need.
          </p>
          <p className="text-body-md text-[#584141]">
            Whether you are a lifelong Catholic or searching for a spiritual home, you are welcome here.
            We invite you to explore our ministries, participate in our liturgy, and find your place in our family.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/about')}
              className="btn-primary bg-[#570013] text-white px-8 py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide shadow-lg inline-flex items-center gap-2"
            >
              Read Our Full History
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
