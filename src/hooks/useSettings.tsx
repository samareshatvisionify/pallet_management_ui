'use client';

import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchSettings,
  saveSettings,
  resetSettings,
  updateAISettings,
  updateCameraSettings,
  updateNotificationSettings,
  updateSystemSettings,
  updatePerformanceSettings,
  updateSecuritySettings,
  clearError,
  markAsClean,
  selectSettings,
  selectAISettings,
  selectCameraSettings,
  selectNotificationSettings,
  selectSystemSettings,
  selectPerformanceSettings,
  selectSecuritySettings,
  selectSettingsLoading,
  selectSettingsSaving,
  selectSettingsError,
  selectSettingsLastSaved,
  selectSettingsIsDirty,
  type AISettings,
  type CameraSettings,
  type NotificationSettings,
  type SystemSettings,
  type PerformanceSettings,
  type SecuritySettings,
} from '@/store/slices/settingsSlice';

export const useSettings = () => {
  const dispatch = useAppDispatch();
  
  // Selectors
  const settings = useAppSelector(selectSettings);
  const aiSettings = useAppSelector(selectAISettings);
  const cameraSettings = useAppSelector(selectCameraSettings);
  const notificationSettings = useAppSelector(selectNotificationSettings);
  const systemSettings = useAppSelector(selectSystemSettings);
  const performanceSettings = useAppSelector(selectPerformanceSettings);
  const securitySettings = useAppSelector(selectSecuritySettings);
  const loading = useAppSelector(selectSettingsLoading);
  const saving = useAppSelector(selectSettingsSaving);
  const error = useAppSelector(selectSettingsError);
  const lastSaved = useAppSelector(selectSettingsLastSaved);
  const isDirty = useAppSelector(selectSettingsIsDirty);

  // Load settings on mount
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  // Update functions
  const updateAI = useCallback((updates: Partial<AISettings>) => {
    dispatch(updateAISettings(updates));
  }, [dispatch]);

  const updateCamera = useCallback((updates: Partial<CameraSettings>) => {
    dispatch(updateCameraSettings(updates));
  }, [dispatch]);

  const updateNotifications = useCallback((updates: Partial<NotificationSettings>) => {
    dispatch(updateNotificationSettings(updates));
  }, [dispatch]);

  const updateSystem = useCallback((updates: Partial<SystemSettings>) => {
    dispatch(updateSystemSettings(updates));
  }, [dispatch]);

  const updatePerformance = useCallback((updates: Partial<PerformanceSettings>) => {
    dispatch(updatePerformanceSettings(updates));
  }, [dispatch]);

  const updateSecurity = useCallback((updates: Partial<SecuritySettings>) => {
    dispatch(updateSecuritySettings(updates));
  }, [dispatch]);

  // Save settings
  const saveAllSettings = useCallback(async (): Promise<boolean> => {
    try {
      const result = await dispatch(saveSettings(settings));
      return saveSettings.fulfilled.match(result);
    } catch (error) {
      return false;
    }
  }, [dispatch, settings]);

  // Reset settings
  const resetAllSettings = useCallback(async (): Promise<boolean> => {
    try {
      const result = await dispatch(resetSettings());
      return resetSettings.fulfilled.match(result);
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  // Utility functions
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleMarkAsClean = useCallback(() => {
    dispatch(markAsClean());
  }, [dispatch]);

  // Refresh settings
  const refreshSettings = useCallback(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  // Check if specific setting category is valid
  const validateAISettings = useCallback((settings: AISettings): string[] => {
    const errors: string[] = [];
    
    if (settings.confidenceThreshold < 50 || settings.confidenceThreshold > 100) {
      errors.push('Confidence threshold must be between 50% and 100%');
    }
    
    if (settings.detectionSensitivity < 25 || settings.detectionSensitivity > 100) {
      errors.push('Detection sensitivity must be between 25% and 100%');
    }
    
    if (settings.qualityThreshold < 70 || settings.qualityThreshold > 100) {
      errors.push('Quality threshold must be between 70% and 100%');
    }
    
    return errors;
  }, []);

  const validateCameraSettings = useCallback((settings: CameraSettings): string[] => {
    const errors: string[] = [];
    
    if (settings.fps <= 0 || settings.fps > 120) {
      errors.push('FPS must be between 1 and 120');
    }
    
    if (settings.storageRetentionDays < 1 || settings.storageRetentionDays > 365) {
      errors.push('Storage retention must be between 1 and 365 days');
    }
    
    if (settings.compressionLevel < 1 || settings.compressionLevel > 100) {
      errors.push('Compression level must be between 1% and 100%');
    }
    
    return errors;
  }, []);

  const validateNotificationSettings = useCallback((settings: NotificationSettings): string[] => {
    const errors: string[] = [];
    
    if (settings.emailEnabled && !settings.emailAddress) {
      errors.push('Email address is required when email notifications are enabled');
    }
    
    if (settings.emailEnabled && !isValidEmail(settings.emailAddress)) {
      errors.push('Please enter a valid email address');
    }
    
    if (settings.smsEnabled && !settings.smsNumber) {
      errors.push('SMS number is required when SMS notifications are enabled');
    }
    
    if (settings.alertThreshold < 1 || settings.alertThreshold > 100) {
      errors.push('Alert threshold must be between 1% and 100%');
    }
    
    return errors;
  }, []);

  // Helper function for email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate all settings
  const validateAllSettings = useCallback(() => {
    const allErrors: string[] = [
      ...validateAISettings(aiSettings),
      ...validateCameraSettings(cameraSettings),
      ...validateNotificationSettings(notificationSettings),
    ];
    
    return allErrors;
  }, [aiSettings, cameraSettings, notificationSettings, validateAISettings, validateCameraSettings, validateNotificationSettings]);

  // Get formatted last saved time
  const getLastSavedFormatted = useCallback(() => {
    if (!lastSaved) return null;
    
    try {
      const date = new Date(lastSaved);
      return date.toLocaleString();
    } catch (error) {
      return null;
    }
  }, [lastSaved]);

  return {
    // State
    settings,
    aiSettings,
    cameraSettings,
    notificationSettings,
    systemSettings,
    performanceSettings,
    securitySettings,
    loading,
    saving,
    error,
    lastSaved,
    isDirty,
    
    // Update functions
    updateAI,
    updateCamera,
    updateNotifications,
    updateSystem,
    updatePerformance,
    updateSecurity,
    
    // Actions
    saveAllSettings,
    resetAllSettings,
    refreshSettings,
    clearError: handleClearError,
    markAsClean: handleMarkAsClean,
    
    // Validation
    validateAISettings,
    validateCameraSettings,
    validateNotificationSettings,
    validateAllSettings,
    
    // Utilities
    getLastSavedFormatted,
    isValidEmail,
  };
}; 