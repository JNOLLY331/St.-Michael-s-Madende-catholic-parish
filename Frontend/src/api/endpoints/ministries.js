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

    // Admin CRUD (auto-switches to FormData if attachments exist)
    create: (data) => data instanceof FormData ? apiClient.postForm(`${BASE}/`, data) : apiClient.post(`${BASE}/`, data),
    update: (id, data) => data instanceof FormData ? apiClient.patchForm(`${BASE}/${id}/`, data) : apiClient.patch(`${BASE}/${id}/`, data),
    delete: (id) => apiClient.delete(`${BASE}/${id}/`),
};
