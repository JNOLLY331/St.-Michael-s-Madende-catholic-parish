import { useEffect, useState } from 'react';
import { eventsApi, resolveMediaUrl } from '../api';

// ─── Fallback data shown while the API is loading or unavailable ──────────────
const FALLBACK_EVENTS = [];

/**
 * Fetches published parish events from GET /api/events/.
 * Accepts optional filter params (e.g. { is_featured: true, category: 'LITURGY' }).
 *
 * Returns { events, loading, error }
 */
export function useEventsData(params) {
    const [events, setEvents] = useState(FALLBACK_EVENTS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);
            try {
                const data = await eventsApi.list(params);
                if (!cancelled) {
                    // DRF pagination wraps results in { count, results: [...] }
                    const items = Array.isArray(data) ? data : (data?.results ?? []);
                    setEvents(
                        items.map((e) => ({
                            id: e.id,
                            slug: e.slug,
                            title: e.title,
                            description: e.description,
                            venue: e.venue,
                            category: e.category,
                            startDate: e.start_date,
                            endDate: e.end_date,
                            startTime: e.start_time,
                            endTime: e.end_time,
                            banner: resolveMediaUrl(e.banner),
                            thumbnail: resolveMediaUrl(e.thumbnail),
                            isFeatured: e.is_featured,
                            isRegistrationRequired: e.is_registration_required,
                            capacity: e.capacity,
                            registeredCount: e.registered_count,
                            registrationDeadline: e.registration_deadline,
                            livestreamUrl: e.livestream_url,
                            status: e.status,
                        }))
                    );
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Failed to load events.');
                    setEvents(FALLBACK_EVENTS);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
        // Re-fetch whenever params change (stable reference via JSON string)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(params)]);

    return { events, loading, error };
}
