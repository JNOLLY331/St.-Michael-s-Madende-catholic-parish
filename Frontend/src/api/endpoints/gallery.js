import { apiClient } from '../client';

const BASE = '/gallery';

/**
 * Gallery endpoints — mirrors gallery/urls.py:
 *   GET /api/gallery/albums/        list all albums
 *   GET /api/gallery/albums/<id>/   single album
 *   GET /api/gallery/media/         list all media items
 *   GET /api/gallery/media/?album=<id>  filter by album
 */
export const galleryApi = {
    list: () => apiClient.get(`${BASE}/albums/`),
    getAlbum: (id) => apiClient.get(`${BASE}/albums/${id}/`),
    listMedia: (params) => {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiClient.get(`${BASE}/media/${qs}`);
    },
    // Admin CRUD (auto-switches to FormData if attachments exist)
    createAlbum: (data) => data instanceof FormData ? apiClient.postForm(`${BASE}/albums/`, data) : apiClient.post(`${BASE}/albums/`, data),
    updateAlbum: (id, data) => data instanceof FormData ? apiClient.patchForm(`${BASE}/albums/${id}/`, data) : apiClient.patch(`${BASE}/albums/${id}/`, data),
    deleteAlbum: (id) => apiClient.delete(`${BASE}/albums/${id}/`),
    uploadMedia: (data) => data instanceof FormData ? apiClient.postForm(`${BASE}/media/`, data) : apiClient.post(`${BASE}/media/`, data),
    updateMedia: (id, data) => data instanceof FormData ? apiClient.patchForm(`${BASE}/media/${id}/`, data) : apiClient.patch(`${BASE}/media/${id}/`, data),
    deleteMedia: (id) => apiClient.delete(`${BASE}/media/${id}/`),
};
