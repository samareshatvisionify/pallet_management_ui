'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchDashboardStats,
  fetchSystemStatus,
  refreshDashboard,
  clearError,
  updateStat,
  updateSystemStatus,
  selectDashboardStats,
  selectSystemStatus,
  selectDashboardLoading,
  selectDashboardError,
  selectLastUpdated,
  type DashboardStats,
  type SystemStatus
} from '@/store/slices/dashboardSlice';
import { performanceOverviewData, productionCalendarData, type PerformanceData, type CalendarData } from '@/demoData';

export const useDashboard = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectDashboardStats);
  const systemStatus = useAppSelector(selectSystemStatus);
  const loading = useAppSelector(selectDashboardLoading);
  const error = useAppSelector(selectDashboardError);
  const lastUpdated = useAppSelector(selectLastUpdated);

  // Fetch data on hook initialization
  useEffect(() => {
    // Only fetch if we don't have data or it's been more than 5 minutes
    const shouldFetch = !lastUpdated || 
      (new Date().getTime() - new Date(lastUpdated).getTime()) > 5 * 60 * 1000;

    if (shouldFetch) {
      dispatch(fetchDashboardStats());
      dispatch(fetchSystemStatus());
    }
  }, [dispatch, lastUpdated]);

  // Business logic functions
  const handleRefresh = () => {
    dispatch(refreshDashboard());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleUpdateStat = (key: keyof DashboardStats, value: number) => {
    dispatch(updateStat({ key, value }));
  };

  const handleUpdateSystemStatus = (status: Partial<SystemStatus>) => {
    dispatch(updateSystemStatus(status));
  };

  // Utility functions
  const getStatColor = (statKey: keyof DashboardStats) => {
    switch (statKey) {
      case 'totalPallets':
        return '#3f8600';
      case 'activeScans':
        return '#1890ff';
      case 'processedToday':
        return '#cf1322';
      case 'aiAccuracy':
        return '#722ed1';
      default:
        return '#8c8c8c';
    }
  };

  const getSystemStatusIndicator = (metric: keyof SystemStatus, value: number) => {
    const thresholds = {
      visionAI: { good: 95, warning: 90 },
      databaseConnection: { good: 95, warning: 90 },
      apiServices: { good: 90, warning: 80 },
      storageUsage: { good: 70, warning: 85 } // Reversed for storage (lower is better)
    };

    const threshold = thresholds[metric];
    if (!threshold) return { status: 'normal', color: '#8c8c8c' };

    if (metric === 'storageUsage') {
      // For storage, lower is better
      if (value <= threshold.good) return { status: 'success', color: '#52c41a' };
      if (value <= threshold.warning) return { status: 'warning', color: '#faad14' };
      return { status: 'error', color: '#ff4d4f' };
    } else {
      // For other metrics, higher is better
      if (value >= threshold.good) return { status: 'success', color: '#52c41a' };
      if (value >= threshold.warning) return { status: 'warning', color: '#faad14' };
      return { status: 'error', color: '#ff4d4f' };
    }
  };

  const getSystemHealthSummary = () => {
    const metrics = [
      { key: 'visionAI', value: systemStatus.visionAI, label: 'Vision AI' },
      { key: 'databaseConnection', value: systemStatus.databaseConnection, label: 'Database' },
      { key: 'apiServices', value: systemStatus.apiServices, label: 'API Services' },
      { key: 'storageUsage', value: systemStatus.storageUsage, label: 'Storage' }
    ];

    const healthyCount = metrics.filter(metric => {
      const indicator = getSystemStatusIndicator(metric.key as keyof SystemStatus, metric.value);
      return indicator.status === 'success';
    }).length;

    const overallStatus = healthyCount === metrics.length ? 'healthy' :
                         healthyCount >= metrics.length / 2 ? 'warning' : 'critical';

    return {
      overallStatus,
      healthyCount,
      totalCount: metrics.length,
      metrics
    };
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never';
    
    const date = new Date(lastUpdated);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  const getTrendData = () => {
    // Mock trend data - in real app this would come from API
    return {
      pallets: {
        current: stats.totalPallets,
        previous: Math.floor(stats.totalPallets * 0.9),
        change: 10.5,
        trend: 'up' as const
      },
      scans: {
        current: stats.activeScans,
        previous: Math.floor(stats.activeScans * 1.1),
        change: -9.1,
        trend: 'down' as const
      },
      processed: {
        current: stats.processedToday,
        previous: Math.floor(stats.processedToday * 0.85),
        change: 15.3,
        trend: 'up' as const
      },
      accuracy: {
        current: stats.aiAccuracy,
        previous: stats.aiAccuracy - 0.8,
        change: 0.8,
        trend: 'up' as const
      }
    };
  };

  return {
    // Data
    stats,
    systemStatus,
    loading,
    error,
    lastUpdated,
    performanceData: performanceOverviewData,
    calendarData: productionCalendarData,
    
    // Actions
    handleRefresh,
    handleClearError,
    handleUpdateStat,
    handleUpdateSystemStatus,
    
    // Utility functions
    getStatColor,
    getSystemStatusIndicator,
    getSystemHealthSummary,
    formatLastUpdated,
    getTrendData,
  };
}; 