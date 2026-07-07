import { RANK_COLOURS, GUARANTEED_FALLBACKS } from '../../data/saintsData';
import { MdCalendarToday } from 'react-icons/md';


/** A single saint tile used inside the marquee/grid in SaintsMarquee. */
export default function SaintCard({ saint }) {
  const badgeBg = RANK_COLOURS[saint.rank] || '#2b271e';

  // Predictably pick a gorgeous Unsplash fallback based on string length if all else fails
  const guaranteedImg = GUARANTEED_FALLBACKS[saint.name.length % GUARANTEED_FALLBACKS.length];
  const initialImage = saint.image || guaranteedImg;

  return (
    <div className="saint-card">
      <div className="saint-card__img-wrap">
        <img
          src={initialImage}
          alt={saint.name}
          className="saint-card__img"
          onError={(e) => {
            if (e.target.src !== guaranteedImg) e.target.src = guaranteedImg;
          }}
          loading="lazy"
        />
        <div className="saint-card__overlay" />
        <span className="saint-card__rank-badge" style={{ background: badgeBg }}>{saint.rank}</span>
      </div>
      <div className="saint-card__body">
        <p className="saint-card__date">
          <MdCalendarToday  style={{ fontSize: '0.8rem' }} />{' '}{saint.date}
        </p>
        <h3 className="saint-card__name">{saint.name}</h3>
      </div>
    </div>
  );
}
