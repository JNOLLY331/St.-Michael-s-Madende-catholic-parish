import { apiClient } from '../client';

const BASE = '/events';

/**
 * Events endpoints — mirrors events/urls.py:
 *   GET    /api/events/                    list all published events
 *   GET    /api/events/?is_featured=true   featured events only
 *   GET    /api/events/<id>/               single event detail
 *   GET    /api/events/calendar/           calendar view (grouped by date)
 *   POST   /api/events/registrations/      register for an event (auth)
 *   DELETE /api/events/registrations/<id>/ cancel a registration (auth)
 */
export const eventsApi = {
    // Public listing — pass params like { is_featured: true, category: 'LITURGY', page: 2 }
    list: (params) => {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiClient.get(`${BASE}/${qs}`);
    },

    // Single event detail by id or slug
    get: (idOrSlug) => apiClient.get(`${BASE}/${idOrSlug}/`),

    // Month-grouped calendar view
    getCalendar: (params) => {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiClient.get(`${BASE}/calendar/${qs}`);
    },

    // Register the authenticated user for an event
    register: (eventId) => apiClient.post(`${BASE}/registrations/`, { event: eventId }),

    // Admin: create a new event (auto-switches to FormData if attachments exist)
    create: (data) => data instanceof FormData ? apiClient.postForm(`${BASE}/`, data) : apiClient.post(`${BASE}/`, data),

    // Admin: update an event by id
    update: (id, data) => data instanceof FormData ? apiClient.patchForm(`${BASE}/${id}/`, data) : apiClient.patch(`${BASE}/${id}/`, data),

    // Admin: delete an event by id
    delete: (id) => apiClient.delete(`${BASE}/${id}/`),
};
