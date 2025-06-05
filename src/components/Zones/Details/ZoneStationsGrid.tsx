'use client';

import React from 'react';
import { Card, Row, Col, Typography, Progress } from 'antd';
import { 
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Zone } from '@/store/slices/zoneSlice';

const { Text } = Typography;

interface ZoneStationsGridProps {
  zone: Zone;
  getEfficiencyColor: (efficiency: number) => string;
}

const ZoneStationsGrid: React.FC<ZoneStationsGridProps> = ({
  zone,
  getEfficiencyColor
}) => {
  const getStationIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'maintenance':
        return <SettingOutlined style={{ color: '#faad14' }} />;
      default:
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
    }
  };

  return (
    <Card title={`Stations (${zone.stations.length})`} className="!mb-6">
      <Row gutter={[16, 16]}>
        {zone.stations.map((station) => (
          <Col xs={24} sm={12} md={8} lg={6} key={station.id}>
            <Card size="small" className="h-full">
              <div className="flex items-center justify-between mb-2">
                <Text strong>{station.name}</Text>
                {getStationIcon(station.status)}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Text type="secondary">Current:</Text>
                  <Text>{station.currentCount}</Text>
                </div>
                <div className="flex justify-between text-sm">
                  <Text type="secondary">Target:</Text>
                  <Text>{station.targetCount}</Text>
                </div>
                <div className="flex justify-between text-sm">
                  <Text type="secondary">Efficiency:</Text>
                  <Text style={{ color: getEfficiencyColor(station.efficiency) }}>
                    {station.efficiency.toFixed(1)}%
                  </Text>
                </div>
                <Progress
                  percent={(station.currentCount / station.targetCount) * 100}
                  size="small"
                  status={station.status === 'active' ? 'active' : 'exception'}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ZoneStationsGrid; 