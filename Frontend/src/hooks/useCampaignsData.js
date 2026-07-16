import { useEffect, useState } from 'react';
import { resolveMediaUrl } from '../api/client';
import { donationsApi } from '../api/endpoints/donations';

/**
 * Fetches active donation campaigns from GET /api/donations/campaigns/.
 *
 * Returns { campaigns, loading, error }
 */
export function useCampaignsData() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const data = await donationsApi.listCampaigns({ is_active: true });
                if (!cancelled) {
                    const items = Array.isArray(data) ? data : (data?.results ?? []);
                    setCampaigns(
                        items.map((c) => ({
                            id: c.id,
                            title: c.title,
                            slug: c.slug,
                            description: c.description,
                            targetAmount: parseFloat(c.target_amount),
                            amountRaised: parseFloat(c.amount_raised),
                            startDate: c.start_date,
                            endDate: c.end_date,
                            isActive: c.is_active,
                            // Percentage of goal reached (capped at 100)
                            progress: Math.min(
                                100,
                                Math.round((parseFloat(c.amount_raised) / parseFloat(c.target_amount)) * 100)
                            ),
                        }))
                    );
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Failed to load campaigns.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    return { campaigns, loading, error };
}
