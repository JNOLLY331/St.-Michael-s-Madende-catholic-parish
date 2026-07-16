import { apiClient } from '../client';

const BASE = '/sacraments';

/**
 * Sacraments endpoints — mirrors sacraments/urls.py:
 *   GET  /api/sacraments/sacraments/          list all sacraments
 *   GET  /api/sacraments/sacraments/<id>/     single sacrament detail
 *   GET  /api/sacraments/requirements/        list requirements
 *   GET  /api/sacraments/requirements/?sacrament=<id>
 *   POST /api/sacraments/applications/        submit an application (auth)
 *   GET  /api/sacraments/applications/        list own applications (auth)
 */
export const sacramentsApi = {
    // List all sacraments
    list: () => apiClient.get(`${BASE}/sacraments/`),

    // Single sacrament detail
    get: (id) => apiClient.get(`${BASE}/sacraments/${id}/`),

    // List requirements, optionally filtered by sacrament id
    listRequirements: (params) => {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiClient.get(`${BASE}/requirements/${qs}`);
    },

    // Submit a sacrament application (requires authentication)
    submitApplication: (data) => apiClient.post(`${BASE}/applications/`, data),

    // List the authenticated user's own applications
    listMyApplications: () => apiClient.get(`${BASE}/applications/`),
};
