import { apiClient } from '../client';

const BASE = '/ministries';

/**
 * Ministries endpoints — mirrors ministries/urls.py:
 *   GET /api/ministries/           list all ministries
 *   GET /api/ministries/<id>/      single ministry detail
 *   GET /api/ministries/?category=LITURGICAL  filter by category
 */
export const ministriesApi = {
    // List ministries, optionally filtered by category string
    list: (params) => {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiClient.get(`${BASE}/${qs}`);
    },

    // Single ministry detail
    get: (id) => apiClient.get(`${BASE}/${id}/`),
};
