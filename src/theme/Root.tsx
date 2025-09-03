import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';

// Wrapper para aplicar o AuthProvider globalmente
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}