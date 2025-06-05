'use client';

import React from 'react';
import { Dashboard } from '@/components';
import { useDashboard } from '@/hooks';

const DashboardContainer: React.FC = () => {
  const {
    // Data
    stats,
    systemStatus,
    loading,
    error,
    lastUpdated,
    performanceData,
    
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
  } = useDashboard();

  return (
    <Dashboard
      // Data props
      stats={stats}
      systemStatus={systemStatus}
      loading={loading}
      error={error}
      lastUpdated={lastUpdated}
      performanceData={performanceData}
      
      // Action props
      onRefresh={handleRefresh}
      onClearError={handleClearError}
      onUpdateStat={handleUpdateStat}
      onUpdateSystemStatus={handleUpdateSystemStatus}
      
      // Utility props
      getStatColor={getStatColor}
      getSystemStatusIndicator={getSystemStatusIndicator}
      getSystemHealthSummary={getSystemHealthSummary}
      formatLastUpdated={formatLastUpdated}
      getTrendData={getTrendData}
    />
  );
};

export default DashboardContainer; 