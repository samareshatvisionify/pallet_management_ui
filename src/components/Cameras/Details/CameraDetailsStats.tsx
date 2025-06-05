'use client';

import React from 'react';
import { Row, Col } from 'antd';
import { CheckCircleOutlined, BarChartOutlined } from '@ant-design/icons';
import { Camera } from '@/demoData/cameraData';
import { StatCard } from '@/components';

interface CameraDetailsStatsProps {
  camera?: Camera;
  loading?: boolean;
}

const CameraDetailsStats: React.FC<CameraDetailsStatsProps> = ({
  camera,
  loading = false
}) => {
  if (!camera && !loading) {
    return null;
  }

  return (
    <Row gutter={[16, 16]} className="flex-shrink-0 mb-6">
      <Col xs={24} sm={12}>
        <StatCard
          title="Today's Total"
          value={camera?.todaysTotal || 0}
          subtitle="Objects processed"
          icon={<BarChartOutlined />}
          iconColor="#3B82F6"
          loading={loading}
        />
      </Col>

      <Col xs={24} sm={12}>
        <StatCard
          title="Efficiency"
          value={camera?.efficiency || 0}
          suffix="%"
          subtitle="Performance rate"
          icon={<CheckCircleOutlined />}
          iconColor="#10B981"
          loading={loading}
        />
      </Col>
    </Row>
  );
};

export default CameraDetailsStats; 