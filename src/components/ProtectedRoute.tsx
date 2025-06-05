'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're definitely not loading and definitely not authenticated
    // Add a small delay to allow for auth state to settle after login
    if (!isLoading && !isAuthenticated) {
      const timer = setTimeout(() => {
        router.push('/auth');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto">
              VP
            </div>
          </div>
          <Spin size="large" />
          <div className="mt-4 text-gray-600">Loading VisionAI...</div>
        </div>
      </div>
    );
  }

  // Don't render anything while redirecting - but only if we're sure about the auth state
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 