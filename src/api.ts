import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

const api = axios.create({
  baseURL: 'https://localhost:7078',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Separate instance for refresh requests
const refreshApi = axios.create({
  baseURL: 'https://localhost:7078',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: { resolve: (value?: any) => void; reject: (err: any) => void }[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async (error: any) => {
    
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry && originalRequest.url !== '/refresh-token') {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
            reject: (err) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {

        await refreshApi.post('/refresh-token'); // HttpOnly cookie sent automatically
        processQueue(null);
        return api(originalRequest); // retry original request
      } catch (err) {
        processQueue(err);

        // Optional: logout
        try {
          await refreshApi.post('/logout');
        } catch {}

        toast.error('Session expired. Please login again.');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 403) {
      toast.error('You do not have permission to access this resource.');
      window.location.href = '/unauthorized';
    }

    return Promise.reject(error);
  }
);

export default api;
