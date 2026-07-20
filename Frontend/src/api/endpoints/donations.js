import { apiClient } from '../client';

const BASE = '/donations';

/**
 * Donations endpoints — mirrors donations/urls.py:
 *   GET  /api/donations/campaigns/      list active campaigns
 *   GET  /api/donations/campaigns/<id>/ single campaign detail
 *   GET  /api/donations/               list donations (auth required for own)
 *   POST /api/donations/               submit a new donation record
 */
export const donationsApi = {
    // List all active fundraising campaigns
    listCampaigns: (params) => {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiClient.get(`${BASE}/campaigns/${qs}`);
    },

    // Single campaign detail
    getCampaign: (id) => apiClient.get(`${BASE}/campaigns/${id}/`),

    // Submit a donation — payload matches the Donation model:
    // { amount, payment_method, category, campaign (opt), anonymous, message (opt) }
    submit: (data) => apiClient.post(`${BASE}/`, data),

    // List donations made by the authenticated user
    listMine: () => apiClient.get(`${BASE}/`),

    // Admin: list all donations (admin role required on backend)
    listAll: (params) => {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiClient.get(`${BASE}/${qs}`);
    },
};
