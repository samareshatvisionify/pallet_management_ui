'use client';

import React from 'react';
import { Alert } from 'antd';
import { DashboardStats, SystemStatus } from '@/store/slices/dashboardSlice';
import { PerformanceData } from '@/demoData';
import PerformanceOverview from './PerformanceOverview';

// Dashboard sub-components will be imported here as we create them
// import DashboardHeader from './DashboardHeader';
// import DashboardStats from './DashboardStats';
// import DashboardCharts from './DashboardCharts';
// import SystemStatus from './SystemStatus';

interface DashboardProps {
  // Data props
  stats: DashboardStats;
  systemStatus: SystemStatus;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  performanceData: PerformanceData;
  
  // Action props
  onRefresh: () => void;
  onClearError: () => void;
  onUpdateStat: (key: keyof DashboardStats, value: number) => void;
  onUpdateSystemStatus: (status: Partial<SystemStatus>) => void;
  
  // Utility props
  getStatColor: (statKey: keyof DashboardStats) => string;
  getSystemStatusIndicator: (metric: keyof SystemStatus, value: number) => {
    status: string;
    color: string;
  };
  getSystemHealthSummary: () => {
    overallStatus: string;
    healthyCount: number;
    totalCount: number;
    metrics: Array<{
      key: string;
      value: number;
      label: string;
    }>;
  };
  formatLastUpdated: () => string;
  getTrendData: () => any;
}

const Dashboard: React.FC<DashboardProps> = ({
  stats,
  systemStatus,
  loading,
  error,
  lastUpdated,
  performanceData,
  onRefresh,
  onClearError,
  onUpdateStat,
  onUpdateSystemStatus,
  getStatColor,
  getSystemStatusIndicator,
  getSystemHealthSummary,
  formatLastUpdated,
  getTrendData,
}) => {
  return (
    <div className="w-full">
      {/* Error Alert */}
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          closable
          onClose={onClearError}
          className="mb-6"
        />
      )}

      {/* Performance Overview Section */}
      <PerformanceOverview 
        data={performanceData}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard; 