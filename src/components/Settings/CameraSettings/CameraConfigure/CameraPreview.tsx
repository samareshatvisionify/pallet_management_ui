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


    </Card>
  );
};

export default CameraPreview; 