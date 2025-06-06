'use client';

import React from 'react';
import { Row, Col } from 'antd';
import { Zone } from '@/store/slices/zoneSlice';
import ZoneDetailsHeader from './ZoneDetailsHeader';
import ZoneDetailsStats from './ZoneDetailsStats';
import ZoneProgressInfo from './ZoneProgressInfo';
import ZoneStationsChart from './ZoneStationsChart';
import ZoneStationsGrid from './ZoneStationsGrid';
import ZoneActivityTimeline from './ZoneActivityTimeline';

interface ZoneDetailsProps {
  zone: Zone | undefined;
  loading: boolean;
  error: string | null;
  onClearError: () => void;
  calculateZoneProgress: (zone: Zone) => {
    percentage: number;
    isOnTarget: boolean;
    remaining: number;
  };
  getPerformanceIndicator: (performanceChange: number) => {
    type: 'positive' | 'negative' | 'neutral';
    icon: string;
    color: string;
    text: string;
  };
  getEfficiencyColor: (efficiency: number) => string;
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({
  zone,
  loading,
  error,
  onClearError,
  calculateZoneProgress,
  getPerformanceIndicator,
  getEfficiencyColor
}) => {
  // Handle loading and error states in header component
  if (loading || !zone) {
    return (
      <ZoneDetailsHeader
        zone={zone}
        loading={loading}
        error={error}
        onClearError={onClearError}
      />
    );
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <ZoneDetailsHeader
        zone={zone}
        loading={loading}
        error={error}
        onClearError={onClearError}
      />

      {/* Main Stats Section */}
      <ZoneDetailsStats
        zone={zone}
        loading={loading}
        getEfficiencyColor={getEfficiencyColor}
        getPerformanceIndicator={getPerformanceIndicator}
      />

      {/* Chart and Progress/Details Row */}
      <Row gutter={[24, 24]} className="mb-6">
        {/* Combined Progress and Zone Information */}
        <Col xs={24} lg={10}>
          <ZoneProgressInfo
            zone={zone}
            calculateZoneProgress={calculateZoneProgress}
          />
        </Col>

        {/* Stations Performance Chart */}
        <Col xs={24} lg={14}>
          <ZoneStationsChart
            zone={zone}
            loading={loading}
          />
        </Col>
      </Row>

      {/* Stations Grid Section */}
      <ZoneStationsGrid
        zone={zone}
        getEfficiencyColor={getEfficiencyColor}
      />

      {/* Activity Timeline Section */}
      <ZoneActivityTimeline />
    </div>
  );
};

export default ZoneDetails; 