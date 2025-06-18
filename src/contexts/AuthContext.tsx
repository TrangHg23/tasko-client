import type { User } from '@app-types/auth';
import React, { createContext, useState, useEffect } from 'react';
interface AuthContextType {
  user: User | undefined; 
  loading: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const exp = payload.exp * 1000;
        if (Date.now() < exp) {
          setUser(payload);
        } else {
          localStorage.removeItem("access_token");
        }
      } catch {
        localStorage.removeItem("access_token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      setUser(payload);
    } catch {
      console.error("Invalid token");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(undefined);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
