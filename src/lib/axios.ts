import axios from 'axios';

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
    const skipAuthUrls = ["/auth/login", "/auth/signup"];
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

apiClient.interceptors.response.use(
  (response) => {
    if (response?.data !== undefined) {
      return response.data;
    }
  }, (error) => {
    return Promise.reject(error)
  }
)

export default apiClient