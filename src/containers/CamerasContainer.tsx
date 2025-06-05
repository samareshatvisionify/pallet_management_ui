'use client';

import React from 'react';
import { Card, Typography, Row, Col, Button, Badge, Tag, Space } from 'antd';
import { 
  CameraOutlined, 
  PlayCircleOutlined,
  StopOutlined,
  SettingOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const CamerasContainer: React.FC = () => {
  // Demo camera data
  const cameras = [
    { id: 1, name: 'Entrance Camera 1', status: 'online', zone: 'Loading Dock A', recording: true },
    { id: 2, name: 'Warehouse Zone 1', status: 'online', zone: 'Storage Area 1', recording: true },
    { id: 3, name: 'Warehouse Zone 2', status: 'offline', zone: 'Storage Area 2', recording: false },
    { id: 4, name: 'Exit Camera 1', status: 'online', zone: 'Loading Dock B', recording: true },
    { id: 5, name: 'Quality Control', status: 'online', zone: 'QC Station', recording: true },
    { id: 6, name: 'Packaging Area', status: 'maintenance', zone: 'Packaging Zone', recording: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'green';
      case 'offline': return 'red';
      case 'maintenance': return 'orange';
      default: return 'default';
    }
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <Title level={2} className="!mb-2 !text-xl md:!text-2xl">Camera Management</Title>
          <Paragraph className="!mb-0 text-sm md:text-base">
            Monitor and manage all cameras in your facility. View live feeds, recording status, and camera health.
          </Paragraph>
        </div>
        <div className="flex-shrink-0">
          <Button icon={<ReloadOutlined />} size="small" className="md:size-default">
            <span className="hidden sm:inline">Refresh Status</span>
          </Button>
        </div>
      </div>

      {/* Camera Grid */}
      <Row gutter={[12, 12]} className="md:gutter-24">
        {cameras.map((camera) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={camera.id}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <CameraOutlined className="text-sm md:text-base" />
                  <span className="text-sm md:text-base truncate">{camera.name}</span>
                </div>
              }
              actions={[
                <Button key="view" type="text" icon={<PlayCircleOutlined />} size="small" className="md:size-default">
                  <span className="hidden sm:inline">View</span>
                </Button>,
                <Button key="settings" type="text" icon={<SettingOutlined />} size="small" className="md:size-default">
                  <span className="hidden sm:inline">Settings</span>
                </Button>,
              ]}
              className="h-full"
            >
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-medium">Status:</span>
                  <Badge 
                    status={camera.status === 'online' ? 'success' : camera.status === 'offline' ? 'error' : 'warning'} 
                    text={
                      <span className="text-xs md:text-sm">
                        {camera.status.toUpperCase()}
                      </span>
                    }
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-medium">Zone:</span>
                  <Tag className="text-xs md:text-sm max-w-32 truncate" title={camera.zone}>
                    {camera.zone}
                  </Tag>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-medium">Recording:</span>
                  <Badge 
                    status={camera.recording ? 'processing' : 'default'} 
                    text={
                      <span className="text-xs md:text-sm">
                        {camera.recording ? 'RECORDING' : 'STOPPED'}
                      </span>
                    }
                  />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Camera Button */}
      <Card className="mt-4 md:mt-6 text-center">
        <div className="py-6 md:py-10">
          <CameraOutlined className="text-3xl md:text-5xl text-gray-300 mb-2 md:mb-4" />
          <Title level={4} className="!text-base md:!text-xl">Add New Camera</Title>
          <Paragraph className="!text-sm md:!text-base">Configure additional cameras to monitor your facility.</Paragraph>
          <Button type="primary" size="middle" className="md:size-large">
            Add Camera
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CamerasContainer; 