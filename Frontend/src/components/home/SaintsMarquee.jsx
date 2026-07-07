import { useState } from 'react';
import { useSaintsData } from '../../hooks/useSaintsData';
import SaintCard from './SaintCard';

/**
 * Scrolling marquee of saints from the Roman Catholic liturgical calendar.
 * Enriches the static seed list with live Wikipedia thumbnails/extracts,
 * and supports filtering by name, date, or rank.
 */
export default function SaintsMarquee() {
  const { saints, loading } = useSaintsData();
  const [query, setQuery] = useState('');
  const [isFilterMode, setIsFilterMode] = useState(false);

  const filtered = query.trim()
    ? saints.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.date.toLowerCase().includes(query.toLowerCase()) ||
      s.rank.toLowerCase().includes(query.toLowerCase())
    )
    : saints;

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setIsFilterMode(e.target.value.trim().length > 0);
  };

  return (
    <section className="saints-section" id="saints-of-the-month">
      <div className="saints-section__header">
        <div className="saints-section__header-inner">
          <p className="saints-section__eyebrow">Communion of Saints</p>
          <h2 className="saints-section__title">Saints of the Liturgical Year</h2>
          <p className="saints-section__subtitle">
            {saints.length > 0
              ? `${saints.length} saints from the Roman Catholic Calendar — photos from Wikipedia`
              : 'Loading saints from the Roman Catholic Liturgical Calendar…'}
          </p>
          <div className="saints-search-wrap">
            <span className="material-symbols-outlined saints-search-icon">search</span>
            <input
              id="saints-search"
              className="saints-search"
              type="text"
              placeholder="Filter by name, date, or rank…"
              value={query}
              onChange={handleSearch}
              aria-label="Search saints"
            />
            {query && (
              <button className="saints-search-clear" onClick={() => { setQuery(''); setIsFilterMode(false); }} aria-label="Clear search">
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
          {isFilterMode && (
            <p className="saints-filter-count">
              {filtered.length === 0 ? 'No saints match your search' : `${filtered.length} saint${filtered.length !== 1 ? 's' : ''} found`}
            </p>
          )}
        </div>
      </div>

      {loading && (
        <div className="saints-loading">
          <div className="saints-loader" />
          <span className="saints-loading-text">Loading Saints…</span>
        </div>
      )}

      {!loading && !isFilterMode && filtered.length > 0 && (
        <div className="saints-track-wrapper">
          {[0, 1].map(pass => (
            <div key={pass} className="saints-track" aria-hidden={pass === 1 ? 'true' : undefined}>
              {filtered.map((saint, i) => <SaintCard key={`${pass}-${i}`} saint={saint} />)}
            </div>
          ))}
        </div>
      )}

      {!loading && isFilterMode && (
        <div className="saints-grid-wrap">
          {filtered.length === 0 ? (
            <div className="saints-no-results">
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#570013' }}>search_off</span>
              <p>No saints match "<strong>{query}</strong>"</p>
            </div>
          ) : (
            <div className="saints-grid">
              {filtered.map((saint, i) => <SaintCard key={i} saint={saint} />)}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
