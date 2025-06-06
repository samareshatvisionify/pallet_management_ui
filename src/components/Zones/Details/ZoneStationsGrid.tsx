'use client';

import React from 'react';
import { Card, Row, Col, Typography, Progress, Button } from 'antd';
import { 
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

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

  const handleLinkToCameraSettings = () => {
    router.push('/settings/cameras');
  };

  return (
    <Card 
      title={`Stations (${zone.stations.length})`} 
      className="!mb-6"
      extra={
        <Button
          icon={<LinkOutlined />}
          onClick={handleLinkToCameraSettings}
          title="Go to Camera Settings"
          style={{
            backgroundColor: '#f3f4f6',
            borderColor: '#d1d5db',
            color: '#374151',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e7eb';
            e.currentTarget.style.borderColor = '#9ca3af';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
        >
        </Button>
      }
    >
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