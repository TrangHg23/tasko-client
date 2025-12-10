//axios.ts
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { authAPI } from 'src/services/auth';
import { handleAuthError } from 'src/utils/auth';

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

const API_BASE_URL = import.meta.env.VITE_BACKEND || 'http://localhost:8080';

interface TypedAxiosInstance extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}


const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}) as TypedAxiosInstance;

apiClient.interceptors.request.use(
  (config) => {
    const skipAuthUrls = ['/auth/log-in', '/auth/sign-up', '/auth/refresh', '/auth/forgot-password'];
    if (skipAuthUrls.some((url) => config.url?.includes(url))) {
      return config;
    }

    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    } else {
      prom.reject(new Error('No token provided'));
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    const outer = response.data;

    if (outer && typeof outer === 'object' && 'data' in outer) {
      return outer.data;
    }

    return outer;
  },
  async (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject(error);
    }

    // Skip refresh handling for refresh endpoint itself to avoid loops
    const isRefreshCall = originalRequest.url?.includes('/auth/refresh');

    if (error.response.status === 401 && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        console.warn("Refresh token doesn't exist");
        handleAuthError();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        const res = await authAPI.refresh(refreshToken);
        if (!res || !res.accessToken) {
          throw new Error('Refresh token invalid or expired');
        }

        const newAccessToken = res.accessToken;
        localStorage.setItem('access_token', newAccessToken);

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.warn('Refresh token failed:', refreshError);
        processQueue(refreshError, null);
        handleAuthError();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
