import axios from "axios";
import { getAccessToken, refreshTokens, clearTokens } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await refreshTokens();
        const token = getAccessToken();
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      } catch {
        clearTokens();
        if (typeof window !== "undefined") window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Auth endpoints ─────────────────────────────────────────────────────────
export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
    return data;
  },
  register: async (name: string, email: string, password: string, niche?: string) => {
    const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password, niche });
    return data;
  },
  logout: async () => {
    await api.post("/auth/logout");
    clearTokens();
  },
  refresh: async (refreshToken: string) => {
    const { data } = await axios.post(`${API_URL}/auth/refresh`, { refresh_token: refreshToken });
    return data;
  },
};

// ── Creator endpoints ──────────────────────────────────────────────────────
export const creatorApi = {
  me: async () => {
    const { data } = await api.get("/me");
    return data;
  },
  update: async (payload: Record<string, unknown>) => {
    const { data } = await api.patch("/me", payload);
    return data;
  },
};

// ── Analytics endpoints ────────────────────────────────────────────────────
export const analyticsApi = {
  overview: async () => {
    const { data } = await api.get("/analytics/overview");
    return data;
  },
  video: async (id: string) => {
    const { data } = await api.get(`/analytics/videos/${id}`);
    return data;
  },
  trends: async () => {
    const { data } = await api.get("/analytics/trends");
    return data;
  },
};

// ── Videos endpoints ───────────────────────────────────────────────────────
export const videosApi = {
  list: async (page = 1) => {
    const { data } = await api.get("/videos", { params: { page } });
    return data;
  },
  show: async (id: string) => {
    const { data } = await api.get(`/videos/${id}`);
    return data;
  },
};

// ── Insights endpoints ─────────────────────────────────────────────────────
export const insightsApi = {
  list: async () => {
    const { data } = await api.get("/insights");
    return data;
  },
};

// ── Social accounts ────────────────────────────────────────────────────────
export const socialApi = {
  list: async () => {
    const { data } = await api.get("/social_accounts");
    return data;
  },
  disconnect: async (id: string) => {
    await api.delete(`/social_accounts/${id}`);
  },
};
