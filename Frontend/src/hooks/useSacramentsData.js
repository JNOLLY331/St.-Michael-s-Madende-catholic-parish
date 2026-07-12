import { useEffect, useState } from 'react';
import { sacramentsApi } from '../api';

export function useSacramentsData() {
    const [sacraments, setSacraments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await sacramentsApi.list();
                if (!cancelled) {
                    const items = Array.isArray(data) ? data : (data?.results ?? []);
                    setSacraments(items.map(s => ({
                        id: s.id,
                        name: s.name,
                        description: s.description,
                        category: s.category || '', // e.g. "INITIATION"
                        image: s.image,
                        scheduleInfo: s.schedule_info || '',
                        contactInfo: s.contact_info || '',
                        slug: s.slug || s.name.toLowerCase().replace(/\s+/g, '-'),
                    })));
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Failed to load sacraments.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    return { sacraments, loading, error };
}
