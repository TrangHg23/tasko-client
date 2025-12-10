export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LogoutRequest {
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export type ForgotPasswordResponse = {
  status: number;
  message: string;
};

export interface RefreshResponse {
  authenticated: boolean;
  accessToken: string;
  tokenType: string;
  expiresAt: number;
}
