'use client';

import React from 'react';
import { Card, Button, Tag, Image } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Camera } from '@/demoData/cameraData';

interface CameraCardProps {
  camera: Camera;
  onViewClick: (cameraId: number) => void;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, onViewClick }) => {
  // Get status dot color
  const getStatusDotColor = (status: Camera['status']) => {
    switch (status) {
      case 'online':
        return '#52c41a'; // green
      case 'offline':
        return '#ff4d4f'; // red
      case 'maintenance':
        return '#faad14'; // orange
      default:
        return '#d9d9d9'; // gray
    }
  };

  // Get current count color based on target achievement
  const getCurrentCountColor = (current: number, target: number) => {
    return current >= target ? '#10b981' : '#f59e0b'; // green if met/exceeded, orange if below
  };

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: getStatusDotColor(camera.status) }}
              title={`Status: ${camera.status}`}
            />
            <span className="text-sm md:text-base truncate">{camera.name}</span>
          </div>
          <div className="text-xs flex-shrink-0">
            <span 
              className="font-bold text-sm"
              style={{ color: getCurrentCountColor(camera.todaysTotal, camera.todaysTarget) }}
            >
              {camera.todaysTotal}
            </span>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-gray-500">{camera.todaysTarget}</span>
          </div>
        </div>
      }
      className="h-full border-0 shadow-none"
    >
      {/* Image Viewer */}
      <div className="mb-4">
        <Image
          src={camera.imagePath}
          alt={`${camera.name} feed`}
          className="w-full object-cover rounded-md !p-0 !block"
          fallback="https://via.placeholder.com/400x300/gray/white?text=No+Image"
          preview={{
            mask: <div className="text-white">View Feed</div>,
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mb-3 md:mb-4">
        
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium">Zone:</span>
          <Tag className="text-xs max-w-24 md:max-w-32 truncate" title={camera.zone}>
            {camera.zone}
          </Tag>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs font-medium">RTSP URL:</span>
          <Tag 
            color="purple" 
            className="text-xs font-mono cursor-pointer"
            title={camera.rtspUrl}
            onClick={() => navigator.clipboard.writeText(camera.rtspUrl)}
          >
            <span className="block sm:hidden">
              {camera.rtspUrl.length > 12 
                ? `${camera.rtspUrl.substring(0, 12)}...` 
                : camera.rtspUrl
              }
            </span>
            <span className="hidden sm:block">
              {camera.rtspUrl.length > 20 
                ? `${camera.rtspUrl.substring(0, 20)}...` 
                : camera.rtspUrl
              }
            </span>
          </Tag>
        </div>
      </div>

      {/* View Camera Button - Rounded Rectangle */}
      <div>
        <Button 
          type="default"
          icon={<PlayCircleOutlined />} 
          size="large"
          className="w-full h-10 md:h-12 rounded-lg font-medium border-0 focus:outline-none focus:ring-0 focus:border-transparent"
          onClick={() => onViewClick(camera.id)}
          style={{
            backgroundColor: '#4b5563',
            color: 'white',
            border: 'none !important',
            outline: '0 !important',
            boxShadow: 'none !important',
            borderRadius: '0.5rem !important'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#424242';
            e.currentTarget.style.borderColor = 'transparent';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4b5563';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          View Camera
        </Button>
      </div>
    </Card>
  );
};

export default CameraCard; 