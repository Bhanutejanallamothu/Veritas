"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'officer' | 'supervisor' | 'admin';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<UserRole, User> = {
  officer: { uid: 'officer-001', email: 'officer@gov.local', displayName: 'OFC. Jane Doe', role: 'officer' },
  supervisor: { uid: 'supervisor-001', email: 'supervisor@gov.local', displayName: 'SUP. John Smith', role: 'supervisor' },
  admin: { uid: 'admin-001', email: 'admin@gov.local', displayName: 'ADM. Alex Ray', role: 'admin' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for saved user in localStorage to persist session for prototype
    const savedUser = localStorage.getItem('veritas-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, role: UserRole) => {
    setLoading(true);
    // In a real app, you'd call Firebase here.
    // For the prototype, we'll find a mock user based on role.
    const userToLogin = Object.values(mockUsers).find(u => u.role === role);
    
    if (userToLogin) {
      const loggedInUser = {...userToLogin, email}; // Use provided email
      localStorage.setItem('veritas-user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const logout = () => {
    // In a real app, you'd call Firebase signOut here.
    localStorage.removeItem('veritas-user');
    setUser(null);
    router.push('/login');
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
