import { useEffect, useState } from 'react';
import { churchApi, resolveMediaUrl } from '../api';

const FALLBACK_PARISH = {
    parish_name: 'St. Michael Madende Catholic Parish',
    address: '123 Parish Way, Madende Village\nSt. Michael Heights, Region 404',
    phone: '+1 (555) 123-4567',
    email: 'office@stmichaelmadende.org',
    history: '',
    mission: '',
    vision: '',
    facebook: '',
    twitter: '',
    youtube: '',
    instagram: ''
};

export function useParishData() {
    const [parish, setParish] = useState(FALLBACK_PARISH);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const data = await churchApi.getParishInformation();
                if (!cancelled) {
                    if (data && data.parish_name) {
                        setParish(data);
                    } else {
                        setParish(FALLBACK_PARISH);
                    }
                }
            } catch {
                if (!cancelled) setParish(FALLBACK_PARISH);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    return { parish, loading };
}
