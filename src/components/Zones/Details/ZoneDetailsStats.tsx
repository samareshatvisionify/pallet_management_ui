'use client';

import React from 'react';
import { Row, Col } from 'antd';
import { 
  EnvironmentOutlined, 
  CheckCircleOutlined,
  TrophyOutlined,
  RiseOutlined
} from '@ant-design/icons';
import { Zone } from '@/store/slices/zoneSlice';
import { StatCard } from '@/components';

interface ZoneDetailsStatsProps {
  zone: Zone;
  loading: boolean;
  getEfficiencyColor: (efficiency: number) => string;
  getPerformanceIndicator: (performanceChange: number) => {
    type: 'positive' | 'negative' | 'neutral';
    icon: string;
    color: string;
    text: string;
  };
}

const ZoneDetailsStats: React.FC<ZoneDetailsStatsProps> = ({
  zone,
  loading,
  getEfficiencyColor,
  getPerformanceIndicator
}) => {
  const performance = getPerformanceIndicator(zone.performanceChange);

  return (
    <Row gutter={[24, 24]} className="mb-6">
      <Col xs={24} sm={12} md={6}>
        <StatCard
          title="Current Count"
          value={zone.currentCount}
          subtitle="Pallets processed"
          icon={<EnvironmentOutlined />}
          iconColor="#1890ff"
          loading={loading}
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          title="Target Count"
          value={zone.targetCount}
          subtitle="Goal for this zone"
          icon={<CheckCircleOutlined />}
          iconColor="#52c41a"
          loading={loading}
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          title="Efficiency"
          value={zone.efficiency.toFixed(1)}
          suffix="%"
          subtitle="Performance metric"
          icon={<TrophyOutlined />}
          iconColor={getEfficiencyColor(zone.efficiency)}
          loading={loading}
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCard
          title="Performance"
          value={Math.abs(zone.performanceChange)}
          suffix="%"
          subtitle={performance.text}
          icon={<RiseOutlined />}
          iconColor={performance.color}
          loading={loading}
        />
      </Col>
    </Row>
  );
};

export default ZoneDetailsStats; 