'use client';

import React, { useState } from 'react';
import { Card, Typography, Button, Input, Row, Col } from 'antd';
import { CameraOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CameraListItem from './CameraListItem';
import { Camera, democameras } from '@/demoData';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;
const { Search } = Input;

interface CameraConfigProps {
  [key: string]: unknown;
}

const CameraConfig: React.FC<CameraConfigProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [cameras] = useState<Camera[]>(democameras);
  const router = useRouter();
  
  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchText.toLowerCase()) ||
    camera.zone.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (cameraId: number) => {
    console.log('Edit camera:', cameraId);
  };

  const handleConfigure = (cameraId: number) => {
    console.log('Configure camera:', cameraId);
    router.push(`/settings/cameras/${cameraId}`);
  };

  const handleAddCamera = () => {
    console.log('Add new camera');
  };

  return (
    <Card className="shadow-sm !mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CameraOutlined className="text-2xl text-blue-500" />
          <div>
            <Title level={4} className="!mb-1">Camera Configuration</Title>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
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