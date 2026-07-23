import { apiClient } from '../client';

const BASE = '/news';

/**
 * News endpoints — mirrors news/urls.py:
 *   GET /api/news/categories/      list all active categories
 *   GET /api/news/                 list all published news
 *   GET /api/news/?is_featured=true  featured articles
 *   GET /api/news/<slug>/          single article detail
 */
export const newsApi = {
    // List news categories
    listCategories: () => apiClient.get(`${BASE}/categories/`),

    // List news articles — pass { is_featured: true, category: 1, page: 2 } to filter/page
    list: (params) => {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiClient.get(`${BASE}/${qs}`);
    },

    // Single news article by slug
    get: (slug) => apiClient.get(`${BASE}/${slug}/`),

    // Admin CRUD (auto-switches to FormData if attachments exist)
    create: (data) => data instanceof FormData ? apiClient.postForm(`${BASE}/`, data) : apiClient.post(`${BASE}/`, data),
    update: (id, data) => data instanceof FormData ? apiClient.patchForm(`${BASE}/${id}/`, data) : apiClient.patch(`${BASE}/${id}/`, data),
    delete: (id) => apiClient.delete(`${BASE}/${id}/`),
};
