'use client';

import React from 'react';
import { Card, Typography, Row, Col, Button, Badge, Tag } from 'antd';
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
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2}>Camera Management</Title>
          <Paragraph>
            Monitor and manage all cameras in your facility. View live feeds, recording status, and camera health.
          </Paragraph>
        </div>
        <Button icon={<ReloadOutlined />}>
          Refresh Status
        </Button>
      </div>

      {/* Camera Grid */}
      <Row gutter={[24, 24]}>
        {cameras.map((camera) => (
          <Col xs={24} sm={12} lg={8} key={camera.id}>
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CameraOutlined />
                  {camera.name}
                </div>
              }
              actions={[
                <Button key="view" type="text" icon={<PlayCircleOutlined />}>
                  View
                </Button>,
                <Button key="settings" type="text" icon={<SettingOutlined />}>
                  Settings
                </Button>,
              ]}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Status:</span>
                  <Badge 
                    status={camera.status === 'online' ? 'success' : camera.status === 'offline' ? 'error' : 'warning'} 
                    text={camera.status.toUpperCase()}
                  />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Zone:</span>
                  <Tag>{camera.zone}</Tag>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Recording:</span>
                  <Badge 
                    status={camera.recording ? 'processing' : 'default'} 
                    text={camera.recording ? 'RECORDING' : 'STOPPED'}
                  />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Camera Button */}
      <Card style={{ marginTop: '24px', textAlign: 'center' }}>
        <div style={{ padding: '40px' }}>
          <CameraOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
          <Title level={4}>Add New Camera</Title>
          <Paragraph>Configure additional cameras to monitor your facility.</Paragraph>
          <Button type="primary" size="large">
            Add Camera
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CamerasContainer; 