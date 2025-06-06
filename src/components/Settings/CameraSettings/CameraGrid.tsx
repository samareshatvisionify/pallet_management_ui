'use client';

import React from 'react';
import { Col, Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import CameraCard from './CameraCard';
import { Camera } from '@/demoData';

const { Title } = Typography;

interface CameraGridProps {
  cameras: Camera[];
}

const CameraGrid: React.FC<CameraGridProps> = ({ cameras }) => {
  const router = useRouter();

  const handleCameraClick = (cameraId: number) => {
    router.push(`/settings/cameras/${cameraId}`);
  };

  return (
    <div className="p-6">
      {/* Title */}
      <div className="mb-6">
        <Title level={3} className="text-gray-900 font-semibold mb-0">
          Choose a camera for adding station
        </Title>
      </div>

      {/* Camera Grid */}
      <Row gutter={[24, 24]}>
        {cameras.map((camera) => (
          <Col key={camera.id} xs={24} sm={12} md={8} lg={6}>
            <CameraCard 
              camera={camera}
              onClick={handleCameraClick}
            />
          </Col>
        ))}
      </Row>

      {/* Empty State */}
      {cameras.length === 0 && (
        <div className="text-center py-12">
          <Typography.Text type="secondary">
            No cameras available
          </Typography.Text>
        </div>
      )}
    </div>
  );
};

export default CameraGrid; 