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
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <Title level={2} className="!mb-2 !text-xl md:!text-2xl">Zone Management</Title>
          <Paragraph className="!mb-0 text-sm md:text-base">
            Configure and monitor warehouse zones. Define areas for pallet tracking and camera coverage.
          </Paragraph>
        </div>
        <div className="flex-shrink-0">
          <Button icon={<ReloadOutlined />} size="small" className="md:size-default">
            <span className="hidden sm:inline">Refresh Zones</span>
          </Button>
        </div>
      </div>

      {/* Zone Summary */}
      <Row gutter={[12, 12]} className="mb-4 md:mb-6 md:gutter-24">
        <Col xs={12} sm={6}>
          <Card className="h-full">
            <Statistic
              title="Total Zones"
              value={zones.length}
              prefix={<EnvironmentOutlined />}
              valueStyle={{ color: '#3f8600', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
              className="text-center sm:text-left"
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="h-full">
            <Statistic
              title="Active Zones"
              value={zones.filter(z => z.status === 'active').length}
              valueStyle={{ color: '#1890ff', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
              className="text-center sm:text-left"
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="h-full">
            <Statistic
              title="Total Capacity"
              value={zones.reduce((sum, zone) => sum + zone.capacity, 0)}
              valueStyle={{ color: '#722ed1', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
              className="text-center sm:text-left"
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="h-full">
            <Statistic
              title="Current Pallets"
              value={zones.reduce((sum, zone) => sum + zone.currentPallets, 0)}
              valueStyle={{ color: '#cf1322', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
              className="text-center sm:text-left"
            />
          </Card>
        </Col>
      </Row>

      {/* Zone Grid */}
      <Row gutter={[12, 12]} className="md:gutter-24">
        {zones.map((zone) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={zone.id}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <EnvironmentOutlined className="text-sm md:text-base" />
                  <span className="text-sm md:text-base truncate">{zone.name}</span>
                </div>
              }
              extra={
                <Tag color={getStatusColor(zone.status)} className="text-xs">
                  {zone.status.toUpperCase()}
                </Tag>
              }
              actions={[
                <Button key="edit" type="text" icon={<EditOutlined />} size="small" className="md:size-default">
                  <span className="hidden sm:inline">Edit</span>
                </Button>,
                <Button key="delete" type="text" icon={<DeleteOutlined />} danger size="small" className="md:size-default">
                  <span className="hidden sm:inline">Delete</span>
                </Button>,
              ]}
              className="h-full"
            >
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-medium">Type:</span>
                  <Tag color={getZoneTypeColor(zone.type)} className="text-xs">
                    {zone.type.toUpperCase()}
                  </Tag>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 md:mb-2">
                    <span className="text-xs md:text-sm font-medium">Utilization:</span>
                    <span className="text-xs md:text-sm">{zone.currentPallets}/{zone.capacity}</span>
                  </div>
                  <Progress 
                    percent={getUtilizationPercent(zone.currentPallets, zone.capacity)}
                    status={getUtilizationPercent(zone.currentPallets, zone.capacity) > 80 ? 'exception' : 'active'}
                    size="small"
                    className="md:size-default"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-medium">Cameras:</span>
                  <Tag icon={<AppstoreOutlined />} className="text-xs">
                    {zone.cameras}
                  </Tag>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Zone Button */}
      <Card className="mt-4 md:mt-6 text-center">
        <div className="py-6 md:py-10">
          <EnvironmentOutlined className="text-3xl md:text-5xl text-gray-300 mb-2 md:mb-4" />
          <Title level={4} className="!text-base md:!text-xl">Create New Zone</Title>
          <Paragraph className="!text-sm md:!text-base">Define a new monitoring zone in your warehouse layout.</Paragraph>
          <Button type="primary" size="middle" icon={<PlusOutlined />} className="md:size-large">
            Create Zone
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ZonesContainer; 