// auth.ts
import api from '../api';
import { useToast } from 'vue-toastification';

const toast = useToast();

interface LoginPayload {
  userName: string;
  password: string;
}

// Login function — router passed from component
export async function login(payload: LoginPayload, router: any): Promise<boolean> {
  try {
    await api.post('/login', payload, { withCredentials: true });

    toast.success('Welcome! Login successful!');

    await router.push('/dashboard'); // use router passed in
    return true;

  } catch (err) {
    toast.error('Login failed. Please check your credentials.');
    return false;
  }
}
// Logout function
export async function logout(): Promise<void> {
  try {
    await api.post('/logout', {}, { withCredentials: true });
  } catch {
    console.warn('Logout request failed.');
  }

  // Hard redirect
  window.location.href = '/login';
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    await api.get('/auth-check', { withCredentials: true });
    return true;
  } catch {
    return false;
  }
}

// Google OAuth redirect
export function redirectToGoogleLogin(): void {
  const clientId = '736585582721-npdl4qui93h2q8o5l2cacar09g8nr5h3.apps.googleusercontent.com';
  const redirectUri = encodeURIComponent('http://localhost:5173/google-callback');
  const scope = encodeURIComponent('openid email profile');
  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
  window.location.href = googleUrl;
}