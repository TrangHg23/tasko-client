import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND || 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
