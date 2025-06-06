'use client';

import React, { useState } from 'react';
import { Card, Typography, Button, Space, Input, Row, Col } from 'antd';
import { CameraOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CameraListItem, { Camera } from './CameraListItem';

const { Title, Text } = Typography;
const { Search } = Input;

// Mock camera data - this would come from the existing camera data
const mockCameras: Camera[] = [
  { 
    id: 1, 
    name: 'Entrance Camera 1', 
    status: 'online', 
    zone: 'Loading Dock A', 
    recording: true, 
    category: 'Pallets', 
    subcategory: 'Making',
    rtspUrl: 'rtsp://192.168.1.1:554/stream1',
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrI-upRnloLyCOInfzs6pxQl1ZT2z5hnrcg&s',
    efficiency: 96,
    todaysTotal: 158,
    appliedScenarios: ['Pallet Build', 'Conveyor Board']
  },
  { 
    id: 2, 
    name: 'Warehouse Zone 1', 
    status: 'online', 
    zone: 'Storage Area 1', 
    recording: true, 
    category: 'Pallets', 
    subcategory: 'Dismantling',
    rtspUrl: 'rtsp://192.168.1.2:554/stream1',
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrI-upRnloLyCOInfzs6pxQl1ZT2z5hnrcg&s',
    efficiency: 87,
    todaysTotal: 142,
    appliedScenarios: ['Pallet Dismantling', 'Quality Check']
  },
  { 
    id: 3, 
    name: 'Warehouse Zone 2', 
    status: 'offline', 
    zone: 'Storage Area 2', 
    recording: false, 
    category: 'Boards', 
    subcategory: 'Board',
    rtspUrl: 'rtsp://192.168.1.3:554/stream1',
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrI-upRnloLyCOInfzs6pxQl1ZT2z5hnrcg&s',
    efficiency: 0,
    todaysTotal: 0,
    appliedScenarios: ['Board Processing']
  },
  { 
    id: 4, 
    name: 'Exit Camera 1', 
    status: 'online', 
    zone: 'Loading Dock B', 
    recording: true, 
    category: 'Pallets', 
    subcategory: 'Repair',
    rtspUrl: 'rtsp://192.168.1.4:554/stream1',
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrI-upRnloLyCOInfzs6pxQl1ZT2z5hnrcg&s',
    efficiency: 92,
    todaysTotal: 134,
    appliedScenarios: ['Pallet Repair', 'Damage Assessment']
  },
];

interface CameraConfigProps {
  onClick?: () => void;
}

const CameraConfig: React.FC<CameraConfigProps> = ({ onClick }) => {
  const [searchText, setSearchText] = useState('');
  const [cameras] = useState<Camera[]>(mockCameras);

  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchText.toLowerCase()) ||
    camera.zone.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (cameraId: number) => {
    console.log('Edit camera:', cameraId);
    // TODO: Implement edit functionality
  };

  const handleConfigure = (cameraId: number) => {
    console.log('Configure camera:', cameraId);
    // TODO: Implement configure functionality
  };

  const handleAddCamera = () => {
    console.log('Add new camera');
    // TODO: Implement add camera functionality
  };

  return (
    <Card className="shadow-sm !mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CameraOutlined className="text-2xl text-blue-500" />
          <div>
            <Title level={4} className="!mb-1">Camera Configuration</Title>
            <Text className="text-gray-500">
              Manage camera settings, resolution, and recording parameters
            </Text>
          </div>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddCamera}
          style={{
            background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
            border: 'none',
          }}
        >
          Add Camera
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Search
          placeholder="Search cameras by name or zone..."
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 400 }}
          prefix={<SearchOutlined />}
        />
      </div>

      {/* Camera Grid */}
      {filteredCameras.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredCameras.map(camera => (
            <Col xs={24} sm={12} lg={8} xl={6} key={camera.id}>
              <CameraListItem
                camera={camera}
                onEdit={handleEdit}
                onConfigure={handleConfigure}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-8">
          <CameraOutlined className="text-4xl text-gray-300 mb-4" />
          <Title level={5} className="!text-gray-500">No cameras found</Title>
          <Text className="text-gray-400">
            {searchText ? 'Try adjusting your search criteria.' : 'No cameras available.'}
          </Text>
        </div>
      )}
    </Card>
  );
};

export default CameraConfig; 