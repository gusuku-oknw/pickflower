// hooks/useAuth.ts
import React, { useState, useEffect, createContext, useContext } from 'react';
import { login, logout, refreshToken } from '../services/authService';
import { getToken, setToken, removeToken } from '../utils/tokenManager';

interface AuthContextProps {
  isAuthenticated: boolean;
  userToken: string | null;
  login: () => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      setUserToken(token);
    };
    loadToken();
  }, []);

  const handleLogin = async () => {
    try {
      const token = await login(); // Auth0へのログイン処理
      await setToken(token);
      setUserToken(token);
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  const handleLogout = () => {
    logout();
    removeToken();
    setUserToken(null);
  };

  const handleRefreshToken = async () => {
    try {
      const token = await refreshToken();
      await setToken(token);
      setUserToken(token);
    } catch (error) {
      console.error("トークン更新エラー:", error);
    }
  };

  return (
    <AuthContext.Provider value={{
    isAuthenticated: !!userToken,
      userToken,
      login: handleLogin,
      logout: handleLogout,
      refreshToken: handleRefreshToken,
  }}>
  {children}
  </AuthContext.Provider>
);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthはAuthProvider内で使用してください");
  }
  return context;
};
