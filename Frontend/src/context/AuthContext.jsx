import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { accountsApi, tokenStore } from '../api';

// ─── Auth Context ─────────────────────────────────────────────────────────────
// Provides the authenticated user, login/register/logout helpers, and loading
// state to the entire component tree. Wrap the app root with <AuthProvider>.
const AuthContext = createContext(null);

// ── Helper: load cached user from localStorage ────────────────────────────────
function loadCachedUser() {
    try {
        const raw = localStorage.getItem('parish_user');
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

// ── Helper: persist user to localStorage ─────────────────────────────────────
function cacheUser(user) {
    if (user) {
        localStorage.setItem('parish_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('parish_user');
    }
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
    const [user, setUser] = useState(loadCachedUser);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    // On mount, if we have a token but no user, try fetching the profile
    // (handles the case where the page is refreshed mid-session)
    useEffect(() => {
        const token = tokenStore.getAccess();
        if (token && !user) {
            accountsApi.getProfile()
                .then((data) => {
                    setUser(data);
                    cacheUser(data);
                })
                .catch(() => {
                    // Token probably expired — clear storage defensively
                    tokenStore.clear();
                    setUser(null);
                });
        }
    }, []); // Run once on mount only

    // ── Login ────────────────────────────────────────────────────────────────
    /**
     * Authenticate with the backend.
     * @param {{ email: string, password: string }} credentials
     * @returns {Promise<{ success: boolean, user: object }>}
     */
    const login = useCallback(async (credentials) => {
        setAuthLoading(true);
        setAuthError(null);
        try {
            const data = await accountsApi.login(credentials);
            // Store JWT tokens and persist the user object
            tokenStore.setTokens(data.access, data.refresh);
            setUser(data.user);
            cacheUser(data.user);
            return { success: true, user: data.user };
        } catch (err) {
            const message = err.message || 'Login failed. Please try again.';
            setAuthError(message);
            return { success: false, message };
        } finally {
            setAuthLoading(false);
        }
    }, []);

    // ── Register ─────────────────────────────────────────────────────────────
    /**
     * Register a new parishioner.
     * @param {{ first_name, last_name, username, email, phone_number, password, password2 }} data
     * @returns {Promise<{ success: boolean, message: string }>}
     */
    const register = useCallback(async (formData) => {
        setAuthLoading(true);
        setAuthError(null);
        try {
            const data = await accountsApi.register(formData);
            // Registration does NOT log in automatically — the user must verify their email first.
            return { success: true, message: data.message };
        } catch (err) {
            const message = err.message || 'Registration failed. Please try again.';
            setAuthError(message);
<<<<<<< HEAD
            // Pass raw DRF field errors (err.data) back so Register.jsx can surface them per-field
            return { success: false, message, fieldErrors: err.data || null };
=======
            return { success: false, message };
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
        } finally {
            setAuthLoading(false);
        }
    }, []);

    // ── Logout ───────────────────────────────────────────────────────────────
    /**
     * Blacklist the refresh token on the server, then wipe local state.
     */
    const logout = useCallback(async () => {
        setAuthLoading(true);
        try {
            const refresh = tokenStore.getRefresh();
            if (refresh) {
                await accountsApi.logout(refresh).catch(() => { }); // best-effort
            }
        } finally {
            tokenStore.clear();
            setUser(null);
<<<<<<< HEAD
=======
            setUser(null);
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
            cacheUser(null);
            setAuthLoading(false);
        }
    }, []);

    // ── Update profile in state after a profile PUT ───────────────────────────
    const refreshProfile = useCallback(async () => {
        try {
            const data = await accountsApi.getProfile();
            setUser(data);
            cacheUser(data);
            return data;
        } catch {
            return null;
        }
    }, []);

    const value = {
        user,           // The authenticated user object (or null)
        isAuthenticated: !!user,
        authLoading,    // true while a login/register/logout request is in-flight
        authError,      // Last auth error string (or null)
        login,
        register,
        logout,
        refreshProfile,
        clearAuthError: () => setAuthError(null),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────
/** Access the auth context from any component in the tree. */
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
