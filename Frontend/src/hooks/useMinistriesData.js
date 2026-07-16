import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { ministriesApi } from '../api/endpoints/ministries';
import { resolveMediaUrl } from '../api/client';
=======
import { ministriesApi, resolveMediaUrl } from '../api';
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1

/**
 * Fetches parish ministries from GET /api/ministries/.
 * Optionally filtered by category (e.g. 'LITURGICAL', 'YOUTH').
 *
 * Returns { ministries, loading, error }
 */
export function useMinistriesData(category) {
    const [ministries, setMinistries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const params = category ? { category } : undefined;
                const data = await ministriesApi.list(params);
                if (!cancelled) {
                    const items = Array.isArray(data) ? data : (data?.results ?? []);
                    setMinistries(
                        items.map((m) => ({
                            id: m.id,
                            title: m.name,
                            description: m.description,
                            category: m.category,
                            leaderName: m.leader_name || '',
<<<<<<< HEAD
                            leaderEmail: m.email || '',
                            meetingSchedule: m.meeting_day && m.meeting_time ? `${m.meeting_day} at ${m.meeting_time} - ${m.meeting_location}` : '',
                            image: resolveMediaUrl(m.banner || m.logo),
=======
                            leaderEmail: m.leader_email || '',
                            meetingSchedule: m.meeting_schedule || '',
                            image: resolveMediaUrl(m.image),
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                            isActive: m.is_active,
                        }))
                    );
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Failed to load ministries.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, [category]);

    return { ministries, loading, error };
}
