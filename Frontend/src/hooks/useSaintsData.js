import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { churchApi } from '../api/endpoints/church';
=======
import { churchApi, resolveMediaUrl } from '../api';
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
import { SAINTS_SEED } from '../data/saintsData';

export function useSaintsData() {
    const [saints, setSaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const backendSaints = await churchApi.getSaints();
                let baseSaints = SAINTS_SEED;

                if (backendSaints && backendSaints.length > 0) {
                    baseSaints = backendSaints.map(s => ({
                        name: s.name,
                        date: s.feast_day,
                        rank: 'Feast',
                        role: '',
                        wikiSlug: s.name.replace(/ /g, '_'),
                        fallbackImg: resolveMediaUrl(s.image) || "https://upload.wikimedia.org/wikipedia/commons/4/41/Placeholder.png"
                    }));
                }

                const enriched = await Promise.all(
                    baseSaints.map(async (s) => {
                        try {
                            let normalizedSlug = s.wikiSlug;
                            try { normalizedSlug = decodeURIComponent(s.wikiSlug); } catch { }
                            const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(normalizedSlug)}`;
                            const res = await fetch(wikiUrl, { signal: AbortSignal.timeout(7000) });
                            if (!res.ok) throw new Error('no wiki');
                            const data = await res.json();
                            const img = data.thumbnail?.source || s.fallbackImg;
                            return { ...s, image: img, extract: data.extract };
                        } catch {
                            return { ...s, image: s.fallbackImg, extract: '' };
                        }
                    })
                );
                if (!cancelled) {
                    setSaints(enriched);
                }
            } catch {
                // Error fetching, just use seed with wiki without backend
                if (!cancelled) setSaints(SAINTS_SEED);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    return { saints, loading };
}
