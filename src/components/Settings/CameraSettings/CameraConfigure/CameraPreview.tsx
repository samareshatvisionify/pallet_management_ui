'use client';

import React from 'react';
import { Card, Typography, Image } from 'antd';
import { Camera } from '@/demoData';

const { Title, Text } = Typography;

interface CameraPreviewProps {
  camera: Camera;
}

const CameraPreview: React.FC<CameraPreviewProps> = ({ camera }) => {
  return (
    <Card className="h-full shadow-sm border border-gray-200">
      {/* Camera Title */}
      <div className="mb-4">
        <Title level={4} className="text-gray-900 mb-1">
          {camera.name}
        </Title>
        <Text type="secondary" className="text-sm">
          {camera.zone}
        </Text>
      </div>

      {/* Camera Preview */}
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={camera.imagePath}
          alt={`${camera.name} preview`}
          className="w-full h-full object-cover"
          fallback="https://via.placeholder.com/800x450/gray/white?text=Camera+Preview"
          preview={false}
          width={`100%`}
        />
      </div>

      {/* Camera Info */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div>
            <Text type="secondary">Status:</Text>
            <Text className={`ml-2 font-medium ${
              camera.status === 'online' ? 'text-green-600' : 
              camera.status === 'offline' ? 'text-red-600' : 
              'text-yellow-600'
            }`}>
              {camera.status.charAt(0).toUpperCase() + camera.status.slice(1)}
            </Text>
          </div>
          <div>
            <Text type="secondary">Recording:</Text>
            <Text className={`ml-2 font-medium ${camera.recording ? 'text-green-600' : 'text-red-600'}`}>
              {camera.recording ? 'ON' : 'OFF'}
            </Text>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <Text type="secondary">Category:</Text>
            <Text className="ml-2 font-medium">{camera.category}</Text>
          </div>
          <div>
            <Text type="secondary">Efficiency:</Text>
            <Text className="ml-2 font-medium text-blue-600">{camera.efficiency}%</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CameraPreview; 