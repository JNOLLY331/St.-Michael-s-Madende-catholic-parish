import { apiClient } from '../client';

const BASE = '/accounts';

/**
 * Accounts / authentication endpoints — mirrors accounts/urls.py:
 *   POST /api/accounts/register/
 *   POST /api/accounts/login/
 *   POST /api/accounts/logout/
 *   POST /api/accounts/token/refresh/
 *   GET  /api/accounts/profile/
 *   PUT  /api/accounts/profile/
 *   POST /api/accounts/change-password/
 *   POST /api/accounts/forgot-password/
 *   POST /api/accounts/reset-password/<uidb64>/<token>/
 *   GET  /api/accounts/verify-email/<uidb64>/<token>/
 *   GET  /api/accounts/users/            (admin only)
 */
export const accountsApi = {
    // Register a new parishioner (AllowAny — no token needed)
    register: (data) => apiClient.post(`${BASE}/register/`, data),

    // Login with email + password → returns { access, refresh, user }
    login: (data) => apiClient.post(`${BASE}/login/`, data),

    // Blacklist the refresh token on the server (requires IsAuthenticated)
    logout: (refresh) => apiClient.post(`${BASE}/logout/`, { refresh }),

    // Silently refresh the access token using a stored refresh token
    refreshToken: (refresh) => apiClient.post(`${BASE}/token/refresh/`, { refresh }),

    // Get or update the currently authenticated user's profile
    getProfile: () => apiClient.get(`${BASE}/profile/`),
    updateProfile: (formData) => apiClient.putForm(`${BASE}/profile/`, formData),
    // PATCH update for simple profile fields (no file upload)
    updateProfileData: (data) => apiClient.patch(`${BASE}/profile/`, data),

    // Change password (must supply old_password, new_password, confirm_password)
    changePassword: (data) => apiClient.post(`${BASE}/change-password/`, data),

    // Send a password-reset email
    forgotPassword: (email) => apiClient.post(`${BASE}/forgot-password/`, { email }),

    // Submit the new password with the token from the reset link
    resetPassword: (uidb64, token, data) =>
        apiClient.post(`${BASE}/reset-password/${uidb64}/${token}/`, data),

    // Verify email address via the link sent after registration
    verifyEmail: (uidb64, token) =>
        apiClient.get(`${BASE}/verify-email/${uidb64}/${token}/`),

    // Admin: list all registered users
    getUsers: (params) => {
        const qs = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiClient.get(`${BASE}/users/${qs}`);
    },

    // Admin: update a specific user record
    updateUser: (id, data) => apiClient.patch(`${BASE}/users/${id}/`, data),
};
