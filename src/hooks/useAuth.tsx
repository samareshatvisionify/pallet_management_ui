'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  loginUser,
  logout,
  checkAuth,
  clearError,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
} from '@/store/slices/authSlice';

// Global flag to ensure checkAuth only runs once
let globalAuthCheckStarted = false;

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectAuthError);
  const hasInitialized = useRef(false);

  // Check authentication only once globally
  useEffect(() => {
    if (!hasInitialized.current && !globalAuthCheckStarted) {
      hasInitialized.current = true;
      globalAuthCheckStarted = true;
      dispatch(checkAuth());
    }
  }, [dispatch]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const result = await dispatch(loginUser({ username, password }));
      return loginUser.fulfilled.match(result);
    } catch (error) {
      return false;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    // Reset the global flag so checkAuth can run again after logout
    globalAuthCheckStarted = false;
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    logout: handleLogout,
    clearError: handleClearError,
  };
}; 