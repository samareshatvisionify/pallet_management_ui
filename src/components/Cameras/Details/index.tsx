'use client';

import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';
import { Camera } from '@/demoData/cameraData';
import CameraDetailsHeader from './CameraDetailsHeader';
import CameraDetailsStats from './CameraDetailsStats';
import CameraLiveFeed from './CameraLiveFeed';
import CameraStationsOverview from './CameraStationsOverview';
import CameraActivityCharts from './CameraActivityCharts';

interface CameraDetailsProps {
  camera?: Camera;
  loading?: boolean;
  error?: string | null;
  onClearError?: () => void;
  onBack: () => void;
}

const CameraDetails: React.FC<CameraDetailsProps> = ({ 
  camera, 
  loading = false, 
  error = null, 
  onClearError,
  onBack 
}) => {
  const [cameraEnabled, setCameraEnabled] = useState(camera?.status === 'online');

  // Early returns for loading and not found states are handled in the header component
  if (loading) {
    return (
      <div className="w-full p-6">
        <Card loading={true} className="h-96">
          <div className="text-center">Loading camera details...</div>
        </Card>
      </div>
    );
  }

  if (!camera) {
    return (
      <CameraDetailsHeader
        camera={camera}
        loading={loading}
        error={error}
        onClearError={onClearError}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <CameraDetailsHeader
        camera={camera}
        loading={loading}
        error={error}
        onClearError={onClearError}
        onBack={onBack}
      />

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* Left Side - Live Feed */}
        <Col xs={24} lg={12}>
          <CameraLiveFeed
            camera={camera}
            cameraEnabled={cameraEnabled}
            onToggleCamera={setCameraEnabled}
            loading={loading}
          />
        </Col>

        {/* Right Side - Stats and Stations */}
        <Col xs={24} lg={12}>
          <div className="h-full flex flex-col">
            {/* Stats Cards */}
            <CameraDetailsStats
              camera={camera}
              loading={loading}
            />

            {/* Stations Section */}
            <CameraStationsOverview
              camera={camera}
              loading={loading}
            />
          </div>
        </Col>
      </Row>

      {/* Activity Charts Section */}
      <CameraActivityCharts
        camera={camera}
        loading={loading}
      />
    </div>
  );
};

export default CameraDetails; 