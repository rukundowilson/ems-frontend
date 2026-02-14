import axios from 'axios';

const baseURL = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE_URL
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : 'https://ems-backend-2-jl41.onrender.com/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export function setAuthToken(token?: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

// Attach token from localStorage for every request when available.
// This handles cases where components trigger requests before a mount-time
// call to `setAuthToken` (e.g., page-level useEffect runs before Header).
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = config.headers || {};
        // Preserve existing headers while setting Authorization
        (config.headers as any)['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }
  return config;
});

export default api;
