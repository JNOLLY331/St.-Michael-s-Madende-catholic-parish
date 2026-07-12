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
    // List photo albums
    listAlbums: () => apiClient.get(`${BASE}/albums/`),

    // Get a specific album with its media
    getAlbum: (id) => apiClient.get(`${BASE}/albums/${id}/`),

    // List all media items (optionally filtered by album id)
    listMedia: (params) => {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiClient.get(`${BASE}/media/${qs}`);
    },
};
