import axios from 'axios';
import { authAPI } from 'src/services/auth';
import { handleAuthError } from 'src/utils/auth';

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

const API_BASE_URL = import.meta.env.VITE_BACKEND || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const skipAuthUrls = ["/auth/login", "/auth/signup", "auth/refresh"];
    if (skipAuthUrls.some((url) => config.url?.includes(url))) {
      return config; 
    }
    
    const token = localStorage.getItem("access_token")
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    } else {
      prom.reject(new Error("No token provided"));
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
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
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;

      try {
        const res = await authAPI.refresh(refreshToken); 

        let newAccessToken = res.accessToken;
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


export default apiClient