import { apiClient } from '../client';

const BASE = '/church';

/**
 * Church data endpoints — mirrors church/urls.py:
 *   GET /api/church/parish/
 *   GET /api/church/hero/
 *   GET /api/church/leadership/
 *   GET /api/church/mass-schedule/
 *   GET /api/church/statistics/
 *   GET /api/church/saints/
 */
export const churchApi = {
  getParishInformation: (options) => apiClient.get(`${BASE}/parish/`, options),
  getHeroSection: (options) => apiClient.get(`${BASE}/hero/`, options),
  getLeadership: (options) => apiClient.get(`${BASE}/leadership/`, options),
  getMassSchedule: (options) => apiClient.get(`${BASE}/mass-schedule/`, options),
  getStatistics: (options) => apiClient.get(`${BASE}/statistics/`, options),
  getSaints: (options) => apiClient.get(`${BASE}/saints/`, options),

  // Admin CRUD for Mass Schedule
  createMassSchedule: (data) => apiClient.post(`${BASE}/mass-schedule/`, data),
  updateMassSchedule: (id, data) => apiClient.patch(`${BASE}/mass-schedule/${id}/`, data),
  deleteMassSchedule: (id) => apiClient.delete(`${BASE}/mass-schedule/${id}/`),
};
