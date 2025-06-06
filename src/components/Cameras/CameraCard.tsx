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

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base truncate">{camera.name}</span>
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0 ml-2"
            style={{ backgroundColor: getStatusDotColor(camera.status) }}
            title={`Status: ${camera.status}`}
          />
        </div>
      }
      className="h-full border-0 shadow-none"
    >
      {/* Image Viewer */}
      <div className="mb-4 px-4">
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

      <div className="flex flex-col gap-2 md:gap-3 px-4 mb-4">
        
        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm font-medium">Zone:</span>
          <Tag className="text-xs md:text-sm max-w-32 truncate" title={camera.zone}>
            {camera.zone}
          </Tag>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm font-medium">RTSP URL:</span>
          <Tag 
            color="purple" 
            className="text-xs md:text-sm font-mono cursor-pointer"
            title={camera.rtspUrl}
            onClick={() => navigator.clipboard.writeText(camera.rtspUrl)}
          >
            {camera.rtspUrl.length > 20 
              ? `${camera.rtspUrl.substring(0, 20)}...` 
              : camera.rtspUrl
            }
          </Tag>
        </div>
      </div>

      {/* View Camera Button - Full Width at Bottom */}
      <div className="border-t border-gray-200">
        <Button 
          type="default"
          icon={<PlayCircleOutlined />} 
          size="large"
          className="w-full h-12 bg-gray-200 text-gray-800 hover:bg-gray-600 hover:text-white border-0 hover:border-0 focus:border-0 active:border-0 rounded-none"
          onClick={() => onViewClick(camera.id)}
          style={{
            margin: 0,
            borderRadius: 0,
            boxShadow: 'none'
          }}
        >
          View Camera
        </Button>
      </div>
    </Card>
  );
};

export default CameraCard; 