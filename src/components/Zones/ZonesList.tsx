'use client';

import React from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Zone } from '@/store/slices/zoneSlice';
import ZoneCard from './ZoneCard';

const { Title, Paragraph } = Typography;

interface ZonesListProps {
  zones: Zone[];
  loading: boolean;
  searchTerm: string;
  statusFilter: Zone['status'] | undefined;
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
  getStatusColor: (status: Zone['status']) => string;
  onUpdateZoneStatus: (zoneId: string, status: Zone['status']) => void;
}

const ZonesList: React.FC<ZonesListProps> = ({
  zones,
  loading,
  searchTerm,
  statusFilter,
  calculateZoneProgress,
  getPerformanceIndicator,
  getStatusColor,
  onUpdateZoneStatus
}) => {
  // Color scheme
  const colors = {
    light: '#F8FAFC',
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        {zones.map((zone) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={zone.id}>
            <ZoneCard
              zone={zone}
              calculateZoneProgress={calculateZoneProgress}
              getPerformanceIndicator={getPerformanceIndicator}
              getStatusColor={getStatusColor}
              onUpdateZoneStatus={onUpdateZoneStatus}
            />
          </Col>
        ))}
      </Row>

      {/* Empty State */}
      {zones.length === 0 && !loading && (
        <div className="text-center py-16">
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: colors.light }}
          >
            <EnvironmentOutlined className="text-3xl text-gray-400" />
          </div>
          <Title level={4} className="text-gray-500 mb-2">No zones found</Title>
          <Paragraph className="text-gray-400 max-w-md mx-auto">
            {searchTerm || statusFilter 
              ? "Try adjusting your search or filter criteria to find the zones you're looking for." 
              : "No zones are currently available in the system. Contact your administrator for assistance."}
          </Paragraph>
        </div>
      )}
    </Spin>
  );
};

export default ZonesList; 