// lib/api/auth.ts
import { parseCookies, setCookie } from 'nookies';

// Example function to handle authentication token
export const setAuthToken = (token: string) => {
  setCookie(null, 'auth_token', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  });
};

export const getAuthToken = () => {
  const cookies = parseCookies();
  return cookies.auth_token;
};

export const clearAuthToken = () => {
  setCookie(null, 'auth_token', '', {
    maxAge: 0,
    path: '/',
  });
};
