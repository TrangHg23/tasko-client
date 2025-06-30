export interface User {
  id: string;
  email: string;
  name: string;
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

export interface Category {
  id: string;
  name: string;
}

export type CategoryRequest = Pick<Category, 'name'>;
