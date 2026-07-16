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
<<<<<<< HEAD
        return apiClient.get(`${BASE}${qs}`);
=======
        return apiClient.get(`${BASE}/${qs}`);
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
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

    // Cancel a registration by registration id
    cancelRegistration: (registrationId) =>
        apiClient.delete(`${BASE}/registrations/${registrationId}/`),
};
