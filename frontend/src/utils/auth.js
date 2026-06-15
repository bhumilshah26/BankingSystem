// Auth helpers. The backend signs a JWT with a 1h expiry; we decode the
// payload client-side to know whether the session is still valid.

export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // exp is in seconds; if it has passed, the session is over.
    if (payload.exp && payload.exp * 1000 <= Date.now()) {
      localStorage.clear();
      return false;
    }
    return true;
  } catch {
    // Malformed token -> treat as logged out.
    localStorage.removeItem('token');
    return false;
  }
};
