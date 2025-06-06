'use client';

import React from 'react';
import { Typography, Tag } from 'antd';
import { useRouter } from 'next/navigation';
import { Camera } from '@/demoData/cameraData';

const { Text } = Typography;

interface DashboardCameraCardProps {
  camera: Camera;
}

const DashboardCameraCard: React.FC<DashboardCameraCardProps> = ({ camera }) => {
  const router = useRouter();

  const getStatusDotColor = (status: Camera['status']) => {
    switch (status) {
      case 'online':
        return '#52c41a';
      case 'offline':
        return '#ff4d4f';
      case 'maintenance':
        return '#faad14';
      default:
        return '#d9d9d9';
    }
  };

  const getStatusTagColor = (status: Camera['status']) => {
    switch (status) {
      case 'online':
        return 'green';
      case 'offline':
        return 'red';
      case 'maintenance':
        return 'orange';
      default:
        return 'default';
    }
  };

  const handleCameraClick = () => {
    router.push(`/cameras/${camera.id}`);
  };

  return (
    <div 
      className="relative cursor-pointer bg-gray-50 rounded-lg p-2 shadow-sm border border-gray-200 hover:bg-gray-100 hover:shadow-md hover:border-gray-300 transition-all duration-200"
      onClick={handleCameraClick}
    >
      {/* Camera Image */}
      <div className="aspect-video bg-gray-200 rounded mb-3 overflow-hidden">
        <img
          src={camera.imagePath}
          alt={camera.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/400x300/gray/white?text=No+Image";
          }}
        />
      </div>
      
      {/* Camera details */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {/* Status indicator dot */}
            <div 
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: getStatusDotColor(camera.status) }}
            />
            <Text 
              strong 
              className="text-xs truncate whitespace-nowrap overflow-hidden text-ellipsis" 
              title={camera.name}
            >
              {camera.name}
            </Text>
          </div>
        </div>
        <Text 
          type="secondary" 
          className="block text-xs truncate whitespace-nowrap overflow-hidden text-ellipsis" 
          title={camera.zone}
        >
          {camera.zone}
        </Text>
      </div>
    </div>
  );
};

export default DashboardCameraCard; 