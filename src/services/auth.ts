import type {
  AuthResponse,
  LoginRequest,
  LogoutRequest,
  RefreshResponse,
  RegisterRequest,
  User,
} from '@app-types/auth';
import apiClient from '@lib/axios';

export const authAPI = {
  register: (data: RegisterRequest) => apiClient.post<User>('/auth/sign-up', data),

  login: (data: LoginRequest) => apiClient.post<AuthResponse>('/auth/log-in', data),

  logout: (data: LogoutRequest) => apiClient.post('/auth/log-out', data),

  fetchUser: () => apiClient.get<User>('/auth/me'),

  refresh: (refreshToken: string) =>
    apiClient.post<RefreshResponse>('/auth/refresh', { refreshToken }),

  forgotPassword: (data: { email: string }) => apiClient.post('/auth/forgot-password', data),
};
