import { authApi } from "./api";

const ACCESS_KEY  = "ci_access_token";
const REFRESH_KEY = "ci_refresh_token";

function setCookie(name: string, value: string, days = 1) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${expires}; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  // Also set a cookie so Next.js middleware can check authentication
  setCookie(ACCESS_KEY, accessToken);
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  deleteCookie(ACCESS_KEY);
}

export async function refreshTokens(): Promise<void> {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token");

  const res = await authApi.refresh(refresh);
  setTokens(res.access_token, res.refresh_token);
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
