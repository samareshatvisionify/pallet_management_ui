'use client';

import React from 'react';
import { Card, Typography, Row, Col, Button, Tag, Progress, Statistic } from 'antd';
import { 
  EnvironmentOutlined, 
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ZonesContainer: React.FC = () => {
  // Demo zone data
  const zones = [
    { 
      id: 1, 
      name: 'Loading Dock A', 
      type: 'loading', 
      capacity: 50, 
      currentPallets: 32, 
      cameras: 2,
      status: 'active',
      coordinates: { x: 10, y: 20, width: 100, height: 80 }
    },
    { 
      id: 2, 
      name: 'Storage Area 1', 
      type: 'storage', 
      capacity: 200, 
      currentPallets: 156, 
      cameras: 3,
      status: 'active',
      coordinates: { x: 120, y: 20, width: 150, height: 120 }
    },
    { 
      id: 3, 
      name: 'Quality Control', 
      type: 'inspection', 
      capacity: 20, 
      currentPallets: 8, 
      cameras: 2,
      status: 'active',
      coordinates: { x: 280, y: 60, width: 80, height: 60 }
    },
    { 
      id: 4, 
      name: 'Packaging Zone', 
      type: 'processing', 
      capacity: 30, 
      currentPallets: 0, 
      cameras: 1,
      status: 'maintenance',
      coordinates: { x: 150, y: 160, width: 120, height: 80 }
    },
    { 
      id: 5, 
      name: 'Loading Dock B', 
      type: 'loading', 
      capacity: 45, 
      currentPallets: 28, 
      cameras: 2,
      status: 'active',
      coordinates: { x: 300, y: 180, width: 90, height: 70 }
    },
  ];

  const getZoneTypeColor = (type: string) => {
    switch (type) {
      case 'loading': return 'blue';
      case 'storage': return 'green';
      case 'inspection': return 'orange';
      case 'processing': return 'purple';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'warning';
  };

  const getUtilizationPercent = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Title level={2}>Zone Management</Title>
          <Paragraph>
            Configure and monitor warehouse zones. Define areas for pallet tracking and camera coverage.
          </Paragraph>
        </div>
        <Button icon={<ReloadOutlined />}>
          Refresh Zones
        </Button>
      </div>

      {/* Zone Summary */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Total Zones"
              value={zones.length}
              prefix={<EnvironmentOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Active Zones"
              value={zones.filter(z => z.status === 'active').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Total Capacity"
              value={zones.reduce((sum, zone) => sum + zone.capacity, 0)}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Current Pallets"
              value={zones.reduce((sum, zone) => sum + zone.currentPallets, 0)}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Zone Grid */}
      <Row gutter={[24, 24]}>
        {zones.map((zone) => (
          <Col xs={24} sm={12} lg={8} key={zone.id}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <EnvironmentOutlined />
                  {zone.name}
                </div>
              }
              extra={
                <Tag color={getStatusColor(zone.status)}>
                  {zone.status.toUpperCase()}
                </Tag>
              }
              actions={[
                <Button key="edit" type="text" icon={<EditOutlined />}>
                  Edit
                </Button>,
                <Button key="delete" type="text" icon={<DeleteOutlined />} danger>
                  Delete
                </Button>,
              ]}
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span>Type:</span>
                  <Tag color={getZoneTypeColor(zone.type)}>
                    {zone.type.toUpperCase()}
                  </Tag>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Utilization:</span>
                    <span>{zone.currentPallets}/{zone.capacity}</span>
                  </div>
                  <Progress 
                    percent={getUtilizationPercent(zone.currentPallets, zone.capacity)}
                    status={getUtilizationPercent(zone.currentPallets, zone.capacity) > 80 ? 'exception' : 'active'}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Cameras:</span>
                  <Tag icon={<AppstoreOutlined />}>{zone.cameras}</Tag>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Zone Button */}
      <Card className="mt-6 text-center">
        <div className="py-10">
          <EnvironmentOutlined className="text-5xl text-gray-300 mb-4" />
          <Title level={4}>Create New Zone</Title>
          <Paragraph>Define a new monitoring zone in your warehouse layout.</Paragraph>
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            Create Zone
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ZonesContainer; 