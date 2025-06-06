'use client';

import React from 'react';
import { Dashboard } from '@/components';
import { useDashboard } from '@/hooks';

const DashboardContainer: React.FC = () => {
  const {
    loading,
    error,
    performanceData,
    calendarData,
    handleClearError,
  } = useDashboard();

  return (
    <Dashboard
      loading={loading}
      error={error}
      performanceData={performanceData}
      calendarData={calendarData}
      onClearError={handleClearError}
    />
  );
};

export default DashboardContainer; 