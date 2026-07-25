import { useEffect, useState } from 'react';
import { sacramentsApi, resolveMediaUrl } from '../api';

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
                        name: s.name || s.sacrament_type_display || s.sacrament_type,
                        description: s.description || s.short_description || '',
                        category: s.category || s.sacrament_type || '',
                        // banner is served directly as an absolute Cloudinary URL from the serializer
                        // Fall back to resolveMediaUrl in case a relative path is returned
                        image: s.banner ? (s.banner.startsWith('http') ? s.banner : resolveMediaUrl(s.banner)) : null,
                        scheduleInfo: s.schedule_info || '',
                        contactInfo: s.contact_info || '',
                        slug: s.slug || (s.name || '').toLowerCase().replace(/\s+/g, '-'),
                        displayOrder: s.display_order || 0,
                        isActive: s.is_active !== false,
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
