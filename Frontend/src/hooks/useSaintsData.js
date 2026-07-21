import { useEffect, useState } from 'react';
import { churchApi, resolveMediaUrl } from '../api';
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

                // Limit concurrency to 5 at a time
                const limitConcurrency = async (items, concurrency = 5) => {
                    const results = [];
                    const executing = [];
                    for (const item of items) {
                        const p = Promise.resolve().then(async () => {
                            const cacheKey = `saint_wiki_${item.wikiSlug}`;
                            const cached = sessionStorage.getItem(cacheKey);
                            if (cached) {
                                return { ...item, ...JSON.parse(cached) };
                            }
                            try {
                                let normalizedSlug = item.wikiSlug;
                                try { normalizedSlug = decodeURIComponent(item.wikiSlug); } catch { }
                                const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(normalizedSlug)}`;
                                const res = await fetch(wikiUrl, { signal: AbortSignal.timeout(5000) });
                                if (!res.ok) throw new Error('no wiki');
                                const data = await res.json();
                                const img = data.thumbnail?.source || item.fallbackImg;
                                const wikiData = { image: img, extract: data.extract };
                                sessionStorage.setItem(cacheKey, JSON.stringify(wikiData));
                                return { ...item, ...wikiData };
                            } catch {
                                return { ...item, image: item.fallbackImg, extract: '' };
                            }
                        });
                        results.push(p);
                        if (executing.length >= concurrency) {
                            await Promise.race(executing);
                        }
                        const e = p.finally(() => executing.splice(executing.indexOf(e), 1));
                        executing.push(e);
                    }
                    return Promise.all(results);
                };

                const enriched = await limitConcurrency(baseSaints, 5);
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
