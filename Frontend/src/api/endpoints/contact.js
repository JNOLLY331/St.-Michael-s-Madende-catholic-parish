import { apiClient } from '../client';

const BASE = '/contact';

/**
 * Contact endpoints — mirrors contact/urls.py:
 *   GET  /api/contact/departments/      list all active departments (AllowAny)
 *   POST /api/contact/messages/         submit a contact message (AllowAny)
 *   GET  /api/contact/faqs/             list published FAQs (AllowAny)
 */
export const contactApi = {
    // List all active contact departments (used to populate department dropdown)
    listDepartments: () => apiClient.get(`${BASE}/departments/`),

    // Submit a contact enquiry (no auth required).
    // Payload matches ContactMessage: full_name, email, phone(opt), subject, message, department(opt)
    sendMessage: (data) => apiClient.post(`${BASE}/messages/`, data),

    // List published FAQs — pass { category: 'General', is_featured: true } to filter
    listFAQs: (params) => {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiClient.get(`${BASE}/faqs/${qs}`);
    },
};
