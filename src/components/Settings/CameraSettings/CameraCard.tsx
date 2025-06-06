'use client';

import React from 'react';
import { Card, Typography, Image, Tag, Badge } from 'antd';
import { Camera } from '@/demoData';

const { Text, Title } = Typography;

interface CameraCardProps {
  camera: Camera;
  onClick: (cameraId: number) => void;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, onClick }) => {
  const getStatusText = (status: Camera['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 h-full"  
      onClick={() => onClick(camera.id)}
      hoverable
    >
      <div className="relative mb-4">
        <Image
          src={camera.imagePath}
          alt={`${camera.name} thumbnail`}
          className="w-full h-32 object-cover rounded-lg"
          fallback="https://via.placeholder.com/400x128/gray/white?text=No+Image"
          preview={false}
          width="100%"
          style={{ height: '128px', objectFit: 'cover' }}
        />
        <div className="absolute top-2 right-2">
          <Badge
            status={camera.status === 'online' ? 'success' : camera.status === 'offline' ? 'error' : 'warning'}
            text={
              <span className="text-white text-xs font-medium bg-black bg-opacity-60 px-2 py-1 rounded-md"> 
                {getStatusText(camera.status)}
              </span>
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <Title level={5} className="!mb-1 text-gray-900">
            {camera.name}
          </Title>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Text type="secondary" className="text-xs">Recording:</Text>
            <Tag
              color={camera.recording ? 'green' : 'red'}
              className="text-xs"
            >
              {camera.recording ? 'ON' : 'OFF'}
            </Tag>
          </div>
        </div>

        {camera.status === 'online' && (
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <Text type="secondary" className="text-xs">Efficiency:</Text>
              <Text className="text-xs font-semibold text-green-600">{camera.efficiency}%</Text>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CameraCard; 