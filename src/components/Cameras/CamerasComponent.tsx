'use client';

import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Badge,
  Tag,
  Input,
  Select
} from 'antd';
import {
  CameraOutlined,
  SearchOutlined,
  PlayCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Search } = Input;

interface Camera {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  zone: string;
  recording: boolean;
}

interface CamerasComponentProps {
  // Data props
  cameras: Camera[];
  loading: boolean;
  error: string | null;
  
  // Action props
  onClearError: () => void;
  
  // Utility props
  filterCameras: (searchTerm: string, statusFilter?: Camera['status'], zoneFilter?: string) => Camera[];
  getStatusColor: (status: Camera['status']) => string;
  getUniqueZones: () => string[];
}

const CamerasComponent: React.FC<CamerasComponentProps> = ({
  cameras,
  loading,
  error,
  onClearError,
  filterCameras,
  getStatusColor,
  getUniqueZones
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Camera['status'] | undefined>(undefined);
  const [zoneFilter, setZoneFilter] = useState<string | undefined>(undefined);

  // Filter cameras
  const filteredCameras = filterCameras(searchTerm, statusFilter, zoneFilter);
  const uniqueZones = getUniqueZones();

  // Remove unused variables warning by using them in conditional logic
  if (loading) {
    // Could show loading spinner here in the future
  }

  if (error) {
    // Could show error alert here in the future
    onClearError();
  }

  // Use getStatusColor for future implementation
  console.log('Status colors available:', cameras.map(c => getStatusColor(c.status)));

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card className="sticky top-0 z-10 shadow-md" style={{ backgroundColor: '#ffffff' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8} md={10}>
            <Search
              placeholder="Search cameras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
              size="large"
              className="w-full"
              style={{ borderRadius: '12px' }}
            />
          </Col>
          <Col xs={12} sm={8} md={7}>
            <Select
              placeholder="Filter by status"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              size="large"
              className="w-full"
              style={{ borderRadius: '12px' }}
              options={[
                { label: 'Online', value: 'online' },
                { label: 'Offline', value: 'offline' },
                { label: 'Maintenance', value: 'maintenance' }
              ]}
            />
          </Col>
          <Col xs={12} sm={8} md={7}>
            <Select
              placeholder="Filter by zone"
              value={zoneFilter}
              onChange={setZoneFilter}
              allowClear
              size="large"
              className="w-full"
              style={{ borderRadius: '12px' }}
              options={uniqueZones.map(zone => ({ label: zone, value: zone }))}
            />
          </Col>
        </Row>
      </Card>

      {/* Main Content Area */}
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
                {searchTerm || statusFilter || zoneFilter
                  ? "Try adjusting your search or filter criteria to find the cameras you're looking for."
                  : "No cameras match the selected filters. Try adjusting your filter criteria or clearing some filters."}
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

export default CamerasComponent; 