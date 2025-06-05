'use client';

import React from 'react';
import { Row, Col } from 'antd';
import {
  EnvironmentOutlined,
  TrophyOutlined,
  AimOutlined
} from '@ant-design/icons';
import { ZoneStats as ZoneStatsType } from '@/store/slices/zoneSlice';
import { StatCard } from '@/components';

interface ZoneStatsProps {
  stats: ZoneStatsType;
  loading: boolean;
}

const ZoneStats: React.FC<ZoneStatsProps> = ({ stats, loading }) => {
  // Color scheme
  const colors = {
    primary: '#484848',
    secondary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
  };

  return (
    <Row gutter={[16, 16]} className="mb-8">
      <Col xs={12} sm={6}>
        <StatCard
          title="Total Zones"
          value={stats.totalZones}
          subtitle="Active monitoring"
          icon={<EnvironmentOutlined />}
          iconColor={colors.primary}
          loading={loading}
        />
      </Col>
      <Col xs={12} sm={6}>
        <StatCard
          title="Avg Efficiency"
          value={stats.avgEfficiency}
          suffix="%"
          subtitle="System performance"
          icon={<TrophyOutlined />}
          iconColor={colors.secondary}
          loading={loading}
        />
      </Col>
      <Col xs={12} sm={6}>
        <StatCard
          title="Target Progress"
          value={stats.targetAchieved}
          suffix="%"
          subtitle="Overall completion"
          icon={<AimOutlined />}
          iconColor={colors.warning}
          loading={loading}
        />
      </Col>
      <Col xs={12} sm={6}>
        <StatCard
          title="Zones Met Target"
          value={stats.zonesMetTarget}
          subtitle="Goals achieved"
          icon={<TrophyOutlined />}
          iconColor={colors.success}
          loading={loading}
        />
      </Col>
    </Row>
  );
};

export default ZoneStats; 