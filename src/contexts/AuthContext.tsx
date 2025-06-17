import type { User } from '@app-types/auth';
import React, { createContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | undefined; 
  loading: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
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
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (accessToken: string) => {
    localStorage.setItem("token", accessToken);
    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      setUser(payload);
    } catch {
      console.error("Invalid token");
    }
  };

  const logout = () => {
    
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
