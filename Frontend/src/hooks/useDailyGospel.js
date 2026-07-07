import { useEffect, useState } from 'react';

const formatDate = (d) => d.toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
});

/**
 * Pulls today's Gospel citation from the General Roman Calendar lectionary
 * cycle (the same Scripture passages Catholics hear worldwide each day,
 * regardless of local translation), then fetches the public-domain verse
 * text for that exact passage. Falls back to a fixed passage if either
 * service is unreachable, so the hero section never breaks.
 */
export function useDailyGospel() {
  const [reading, setReading] = useState({
    loading: true,
    error: false,
    date: formatDate(new Date()),
    book: 'Gospel of Matthew',
    citation: 'Matthew 9:32–38',
    text: 'The harvest is plentiful, but the laborers are few; pray therefore the Lord of the harvest to send out laborers.',
  });

  useEffect(() => {
    let cancelled = false;

    async function loadTodaysGospel() {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');

        // Universal Roman lectionary citation for today (same cycle used in every diocese)
        const calRes = await fetch(`https://cpbjr.github.io/catholic-readings-api/readings/${year}/${mm}-${dd}.json`);
        if (!calRes.ok) throw new Error('lectionary lookup failed');
        const calData = await calRes.json();
        const citation = calData?.readings?.gospel;
        if (!citation) throw new Error('no gospel citation for today');

        const bookName = citation.split(' ')[0];

        // Public-domain scripture text for that exact passage
        const verseRef = citation.replace(/\s+/g, '+');
        const textRes = await fetch(`https://bible-api.com/${verseRef}?translation=web`);
        if (!textRes.ok) throw new Error('verse lookup failed');
        const textData = await textRes.json();
        const passageText = textData?.text?.trim().replace(/\s+/g, ' ');

        if (!cancelled) {
          setReading((prev) => ({
            loading: false,
            error: false,
            date: formatDate(now),
            book: `Gospel of ${bookName}`,
            citation,
            text: passageText || prev.text,
          }));
        }
      } catch {
        if (!cancelled) {
          setReading((prev) => ({ ...prev, loading: false, error: true }));
        }
      }
    }

    loadTodaysGospel();
    return () => { cancelled = true; };
  }, []);

  return reading;
}
