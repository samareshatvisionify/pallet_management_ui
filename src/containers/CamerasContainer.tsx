'use client';

import React, { useState } from 'react';
import { Card, Typography, Row, Col, Button, Badge, Tag } from 'antd';
import { 
  CameraOutlined, 
  PlayCircleOutlined,
  StopOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { MultiSelectFilter } from '@/components';

const { Title, Paragraph } = Typography;

const CamerasContainer: React.FC = () => {
  // State for filters
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [zoneFilters, setZoneFilters] = useState<string[]>([]);

  // Demo camera data
  const cameras = [
    { id: 1, name: 'Entrance Camera 1', status: 'online', zone: 'Loading Dock A', recording: true },
    { id: 2, name: 'Warehouse Zone 1', status: 'online', zone: 'Storage Area 1', recording: true },
    { id: 3, name: 'Warehouse Zone 2', status: 'offline', zone: 'Storage Area 2', recording: false },
    { id: 4, name: 'Exit Camera 1', status: 'online', zone: 'Loading Dock B', recording: true },
    { id: 5, name: 'Quality Control', status: 'online', zone: 'QC Station', recording: true },
    { id: 6, name: 'Packaging Area', status: 'maintenance', zone: 'Packaging Zone', recording: false },
  ];

  // Filter cameras based on selected filters
  const filteredCameras = cameras.filter(camera => {
    const statusMatch = statusFilters.length === 0 || statusFilters.includes(camera.status);
    const zoneMatch = zoneFilters.length === 0 || zoneFilters.includes(camera.zone);
    return statusMatch && zoneMatch;
  });

  // Status options
  const statusOptions = [
    { label: 'Online', value: 'online' },
    { label: 'Offline', value: 'offline' },
    { label: 'Maintenance', value: 'maintenance' }
  ];

  // Zone options
  const zoneOptions = [...new Set(cameras.map(camera => camera.zone))].map(zone => ({
    label: zone,
    value: zone
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'green';
      case 'offline': return 'red';
      case 'maintenance': return 'orange';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters Section - Completely separate box */}
      <Card 
        className="sticky top-0 z-10 shadow-md"
        style={{ backgroundColor: '#ffffff' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <MultiSelectFilter
              title="Status"
              placeholder="Search by Status"
              options={statusOptions}
              selectedValues={statusFilters}
              onChange={setStatusFilters}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <MultiSelectFilter
              title="Zone"
              placeholder="Search by Zone"
              options={zoneOptions}
              selectedValues={zoneFilters}
              onChange={setZoneFilters}
            />
          </Col>
        </Row>
      </Card>

      {/* Main Content Area - Completely separate box */}
      <Card className="shadow-sm" style={{ backgroundColor: '#ffffff' }}>
        <div className="space-y-4 md:space-y-6">
          {/* Camera Grid */}
          <Row gutter={[12, 12]} className="md:gutter-24">
            {filteredCameras.map((camera) => (
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

          {/* Show message when no cameras match filters */}
          {filteredCameras.length === 0 && (
            <div className="text-center py-8">
              <CameraOutlined className="text-4xl text-gray-300 mb-4" />
              <Title level={4} className="!text-lg text-gray-500">No cameras found</Title>
              <Paragraph className="text-gray-400">
                No cameras match the selected filters. Try adjusting your filter criteria or clearing some filters.
              </Paragraph>
            </div>
          )}

          {/* Add Camera Button */}
          <div className="text-center py-6 md:py-10 border-t border-gray-100">
            <CameraOutlined className="text-3xl md:text-5xl text-gray-300 mb-2 md:mb-4" />
            <Title level={4} className="!text-base md:!text-xl">Add New Camera</Title>
            <Paragraph className="!text-sm md:!text-base">Configure additional cameras to monitor your facility.</Paragraph>
            <Button type="primary" size="middle" className="md:size-large">
              Add Camera
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CamerasContainer; 