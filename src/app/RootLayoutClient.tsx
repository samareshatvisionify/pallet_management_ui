'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MainLayout } from '@/components';
import ProtectedRoute from '@/components/ProtectedRoute';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

const RootLayoutClient: React.FC<RootLayoutClientProps> = ({ children }) => {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith('/auth');

  // For auth routes, render without protection or main layout
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // For all other routes, apply protection and main layout
  return (
    <ProtectedRoute>
      <MainLayout>
        {children}
      </MainLayout>
    </ProtectedRoute>
  );
};

export default RootLayoutClient; 