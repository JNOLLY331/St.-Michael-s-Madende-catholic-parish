import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { resolveMediaUrl } from '../api/client';
import { sacramentsApi } from '../api/endpoints/sacraments';
=======
import { sacramentsApi } from '../api';
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1

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
<<<<<<< HEAD
                        slug: s.slug || '',
                        // sacrament_type is the choice key (e.g. "BAPTISM", "MATRIMONY")
                        sacramentType: s.sacrament_type || '',
                        sacramentTypeDisplay: s.sacrament_type_display || s.name || '',
                        // short_description is the summary; description is the full text
                        shortDescription: s.short_description || '',
                        description: s.description || '',
                        // backend uses `banner` for the image field, `icon` for text icon name
                        image: resolveMediaUrl(s.banner) || null,
                        icon: s.icon || '',
                        // preparation & booking info shown on cards
                        preparationDuration: s.preparation_duration || '',
                        requiresBooking: s.requires_booking ?? true,
                        requiresDocuments: s.requires_documents ?? false,
                        // nested requirements array
                        requirements: Array.isArray(s.requirements) ? s.requirements : [],
=======
                        description: s.description,
                        category: s.category || '', // e.g. "INITIATION"
                        image: s.image,
                        scheduleInfo: s.schedule_info || '',
                        contactInfo: s.contact_info || '',
                        slug: s.slug || s.name.toLowerCase().replace(/\s+/g, '-'),
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
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
