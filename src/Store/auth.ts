// auth.tsimport api from '../api';
import { useToast } from 'vue-toastification';
import api from '../api';
const toast = useToast();

interface LoginPayload {
  userName: string;
  password: string;
}

interface RegisterPayload {
  email: string;
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


// -----------------------------
// Register (FIXED)
// -----------------------------
export async function register(payload: RegisterPayload): Promise<boolean> {
  try {

    await api.post('/register', payload, { withCredentials: true });

    toast.success('Registration successful!');
    return true;

  } catch (err: any) {
    // Optional server error message
    console.log(err.response.data.error);
    const msg = err.response.data.error.description;// 'Registration failed.';
    toast.error(msg);

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