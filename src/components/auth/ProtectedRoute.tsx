'use client';
import { useAuth } from '../../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const localToken = localStorage.getItem('token');

    if (!localToken && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router, pathname]);

  if (typeof window !== 'undefined' && !localStorage.getItem('token') && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};