'use client';

import React from 'react';
import { Button, Typography, Tooltip, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Camera } from '@/demoData/cameraData';

const { Title } = Typography;

interface CameraDetailsHeaderProps {
  camera?: Camera;
  loading?: boolean;
  error?: string | null;
  onClearError?: () => void;
  onBack: () => void;
}

const CameraDetailsHeader: React.FC<CameraDetailsHeaderProps> = ({
  camera,
  loading = false,
  error = null,
  onClearError,
  onBack
}) => {
  // Get status tooltip text
  const getStatusTooltip = (status: Camera['status']) => {
    switch (status) {
      case 'online':
        return 'This camera is online';
      case 'offline':
        return 'This camera is offline';
      case 'maintenance':
        return 'This camera is under maintenance';
      default:
        return 'Camera status unknown';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-4 mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
          size="large"
          className="flex items-center"
        >
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gray-300 animate-pulse" />
          <div className="h-8 w-48 bg-gray-300 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!camera) {
    return (
      <div className="w-full">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
          className="mb-4"
        >
          Back to Cameras
        </Button>
        <Alert
          message="Camera Not Found"
          description="The requested camera could not be found."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Error Alert */}
      {error && onClearError && (
        <Alert
          message="Error"
          description={error}
          type="error"
          closable
          onClose={onClearError}
          className="mb-6"
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
          size="large"
          className="flex items-center"
        >
          Back
        </Button>
        <div className="flex items-center gap-3">
          <Tooltip title={getStatusTooltip(camera.status)} placement="top">
            <div 
              className="w-3 h-3 rounded-full cursor-help"
              style={{ backgroundColor: camera.status === 'online' ? '#52c41a' : camera.status === 'offline' ? '#ff4d4f' : '#faad14' }}
            />
          </Tooltip>
          <Title level={2} className="!mb-0">
            {camera.name}
          </Title>
        </div>
      </div>
    </div>
  );
};

export default CameraDetailsHeader; 