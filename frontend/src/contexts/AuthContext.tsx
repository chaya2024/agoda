import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../lib/api';

interface User {
  id: number;
  email: string;
  fullName: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string) => Promise<{ error: any }>;
  signUp: (email: string, fullName: string, phone?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const loading = false;

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signIn = async (email: string) => {
    try {
      const data = await authApi.login({ email });
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, fullName: string, phone?: string) => {
    try {
      const data = await authApi.register({ email, fullName, phone });
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
