import { useEffect, useState } from 'react';
import { resolveMediaUrl } from '../api/client';
import { churchApi } from '../api/endpoints/church';

export function useMassScheduleData() {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const data = await churchApi.getMassSchedule();
                if (!cancelled) {
                    const items = Array.isArray(data) ? data : (data?.results ?? []);
                    setSchedule(
                        items.map((item) => ({
                            id: item.id,
                            day: item.day,
                            serviceName: item.service_name,
                            language: item.language,
                            startTime: item.start_time,
                            endTime: item.end_time,
                            notes: item.notes,
                            displayOrder: item.display_order,
                            isActive: item.is_active,
                        }))
                    );
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Failed to load Mass schedule.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    return { schedule, loading, error };
}
