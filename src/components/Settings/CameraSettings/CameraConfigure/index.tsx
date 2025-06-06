'use client';

import React from 'react';
import { Row, Col, Typography } from 'antd';
import { democameras, Camera } from '@/demoData';
import CameraPreview from './CameraPreview';
import StationsPanel from './StationsPanel';

const { Title } = Typography;

interface CameraConfigureProps {
  cameraId: string;
}

const CameraConfigure: React.FC<CameraConfigureProps> = ({ cameraId }) => {
  // Find the camera by ID
  const camera = democameras.find(cam => cam.id === parseInt(cameraId));

  if (!camera) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Title level={4} className="text-gray-500">
            Camera not found
          </Title>
          <Typography.Text type="secondary">
            The camera with ID {cameraId} could not be found.
          </Typography.Text>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="mb-6">
        <Title level={3} className="text-gray-900 font-semibold mb-2">
          Configure Camera
        </Title>
        <Typography.Text type="secondary" className="text-base">
          Set up stations and configure settings for this camera
        </Typography.Text>
      </div>

      {/* Two Column Layout */}
      <Row gutter={24} className="h-full">
        {/* Camera Preview - 2/3 width */}
        <Col xs={24} lg={16} className="mb-6 lg:mb-0">
          <CameraPreview camera={camera} />
        </Col>

        {/* Stations Panel - 1/3 width */}
        <Col xs={24} lg={8}>
          <StationsPanel cameraId={cameraId} />
        </Col>
      </Row>
    </div>
  );
};

export default CameraConfigure; 