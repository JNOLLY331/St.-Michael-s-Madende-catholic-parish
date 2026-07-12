// Central barrel — import all API modules from a single location
// e.g. import { churchApi, accountsApi, eventsApi } from '../api';

export { apiClient, ApiError, resolveMediaUrl, tokenStore } from './client';

// ── Domain endpoint modules ──────────────────────────────────────────────────
export { churchApi } from './endpoints/church';
export { accountsApi } from './endpoints/accounts';
export { eventsApi } from './endpoints/events';
export { donationsApi } from './endpoints/donations';
export { contactApi } from './endpoints/contact';
export { ministriesApi } from './endpoints/ministries';
export { galleryApi } from './endpoints/gallery';
export { newsApi } from './endpoints/news';
export { sacramentsApi } from './endpoints/sacraments';
