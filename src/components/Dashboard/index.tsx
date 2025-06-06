'use client';

import React from 'react';
import { Alert, Row, Col } from 'antd';
import { PerformanceData, CalendarData } from '@/demoData';
import { democameras } from '@/demoData/cameraData';
import PerformanceOverview from './PerformanceOverview';
import ProductionCalendar from './ProductionCalendar/index';
import CameraStatusCard from './CameraStatusCard';
import EdgeDevicesCard from './EdgeDevicesCard';
import ActivityByShiftCard from './ActivityByShiftCard';

interface DashboardProps {
  loading?: boolean;
  error?: string | null;
  performanceData: PerformanceData;
  calendarData: CalendarData;
  onClearError?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  loading = false,
  error,
  performanceData,
  calendarData,
  onClearError,
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

      {/* Production Calendar Section - Hidden on Mobile */}
      <div className="mt-8 hidden md:block">
        <ProductionCalendar 
          data={calendarData}
        />
      </div>

      {/* Additional Dashboard Cards */}
      <div className="mt-6 md:mt-8">
        <Row gutter={[12, 12]} className="md:gutter-16 lg:gutter-24">
          {/* Camera Status Card */}
          <Col xs={24} lg={12}>
            <CameraStatusCard 
              cameras={democameras}
              loading={loading}
            />
          </Col>

          {/* Edge Devices Card */}
          <Col xs={24} lg={12}>
            <EdgeDevicesCard 
              loading={loading}
            />
          </Col>

          {/* Activity by Shift Card - Full Width, Hidden on Mobile */}
          <Col xs={0} md={24}>
            <ActivityByShiftCard 
              loading={loading}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard; 