// Base URL for the Django REST API. Configure per-environment via Vite env vars
// (e.g. .env.local: VITE_API_BASE_URL=https://api.stmichaelmadende.org/api).
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Django serves uploaded media (images, etc.) from the API host, not under /api —
// e.g. background_image: "/media/church/hero/church.jpeg" needs the backend's
// origin prepended. Derived from BASE_URL unless overridden explicitly.
const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL || BASE_URL.replace(/\/api\/?$/, '');

/** Turns a relative Django MEDIA path into an absolute URL. Leaves absolute URLs untouched. */
export function resolveMediaUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${MEDIA_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function parseErrorMessage(res) {
  try {
    const data = await res.clone().json();
    return data?.detail || data?.message || `Request failed with status ${res.status}`;
  } catch {
    return `Request failed with status ${res.status}`;
  }
}

async function request(path, { method = 'GET', body, headers, ...rest } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!res.ok) {
    throw new ApiError(await parseErrorMessage(res), res.status);
  }
  if (res.status === 204) return null;
  return res.json();
}

/** Thin, promise-based client. Every endpoint module builds on this. */
export const apiClient = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};
