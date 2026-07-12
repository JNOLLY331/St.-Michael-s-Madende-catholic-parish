// ─── API Client ───────────────────────────────────────────────────────────────
// Base URL for the Django REST API. Configure per-environment via Vite env vars
// (e.g. .env.local: VITE_API_BASE_URL=https://api.stmichaelmadende.org/api).
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Django serves uploaded media (images, etc.) from the API host, not under /api —
// Derived from BASE_URL unless overridden explicitly.
const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL || BASE_URL.replace(/\/api\/?$/, '');

/** Turns a relative Django MEDIA path into an absolute URL. Leaves absolute URLs untouched. */
export function resolveMediaUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${MEDIA_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

// ─── Error class ──────────────────────────────────────────────────────────────
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data; // raw response body for field-level validation errors
  }
}

// ─── Parse server error responses ────────────────────────────────────────────
async function parseErrorMessage(res) {
  try {
    const data = await res.clone().json();
    // Return both the human-readable message AND raw data so callers can surface field errors
    const message = data?.detail || data?.message || data?.non_field_errors?.[0]
      || `Request failed with status ${res.status}`;
    return { message, data };
  } catch {
    return { message: `Request failed with status ${res.status}`, data: null };
  }
}

// ─── JWT Token helpers ────────────────────────────────────────────────────────
// Tokens are stored in localStorage so they survive page refreshes.
// The AuthContext manages putting/removing them; the client reads them per-request.
export const tokenStore = {
  getAccess: () => localStorage.getItem('parish_access_token'),
  getRefresh: () => localStorage.getItem('parish_refresh_token'),
  setAccess: (t) => localStorage.setItem('parish_access_token', t),
  setTokens: (access, refresh) => {
    localStorage.setItem('parish_access_token', access);
    if (refresh) localStorage.setItem('parish_refresh_token', refresh);
  },
  clear: () => {
    localStorage.removeItem('parish_access_token');
    localStorage.removeItem('parish_refresh_token');
    localStorage.removeItem('parish_user');
  },
};

// ─── Core fetch wrapper ───────────────────────────────────────────────────────
async function request(path, { method = 'GET', body, headers, isFormData = false, ...rest } = {}) {
  // Attach JWT access token if available (Bearer scheme as configured in SimpleJWT)
  const accessToken = tokenStore.getAccess();
  const authHeader = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  // For FormData uploads we must NOT set Content-Type (browser sets multipart boundary)
  const contentType = isFormData ? {} : (body ? { 'Content-Type': 'application/json' } : {});

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...contentType,
      ...authHeader,
      ...headers,
    },
    body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
    ...rest,
  });

  if (!res.ok) {
    const { message, data } = await parseErrorMessage(res);
    throw new ApiError(message, res.status, data);
  }
  if (res.status === 204) return null; // No Content
  return res.json();
}

// ─── Exported HTTP helpers ────────────────────────────────────────────────────
/** Thin, promise-based client. Every endpoint module builds on this. */
export const apiClient = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
  /** Use this for file-upload payloads (passes raw FormData, skips JSON serialisation) */
  postForm: (path, formData, options) => request(path, { ...options, method: 'POST', body: formData, isFormData: true }),
  putForm: (path, formData, options) => request(path, { ...options, method: 'PUT', body: formData, isFormData: true }),
};
