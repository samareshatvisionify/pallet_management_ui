'use client';

import React from 'react';
import { Button, Tag, Image, Space, Typography } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';

const { Text } = Typography;

export interface Camera {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  zone: string;
  recording: boolean;
  category: 'Pallets' | 'Boards';
  subcategory: 'Making' | 'Dismantling' | 'Repair' | 'Board' | 'Trimsaw';
  rtspUrl: string;
  imagePath: string;
  efficiency: number;
  todaysTotal: number;
  appliedScenarios: string[];
}

interface CameraListItemProps {
  camera: Camera;
  onEdit: (cameraId: number) => void;
  onConfigure: (cameraId: number) => void;
}

const CameraListItem: React.FC<CameraListItemProps> = ({ camera, onEdit, onConfigure }) => {
  const getStatusColor = (status: Camera['status']) => {
    switch (status) {
      case 'online': return '#52c41a';
      case 'offline': return '#ff4d4f';
      case 'maintenance': return '#faad14';
      default: return '#d9d9d9';
    }
  };

  const getStatusConfig = (status: Camera['status']) => {
    switch (status) {
      case 'online': return { color: '#52c41a', bgColor: '#f6ffed', borderColor: '#b7eb8f' };
      case 'offline': return { color: '#ff4d4f', bgColor: '#fff2f0', borderColor: '#ffadd2' };
      case 'maintenance': return { color: '#faad14', bgColor: '#fffbe6', borderColor: '#ffe58f' };
      default: return { color: '#d9d9d9', bgColor: '#fafafa', borderColor: '#d9d9d9' };
    }
  };

  const statusConfig = getStatusConfig(camera.status);

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      {/* Camera Thumbnail */}
      <div className="relative">
        <Image
          src={camera.imagePath}
          alt={`${camera.name} thumbnail`}
          className="rounded-t-lg"
          width={`100%`}
          fallback="https://via.placeholder.com/300x128/gray/white?text=No+Image"
          preview={{
            mask: <div className="text-white text-xs">Preview</div>,
          }}
        />
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <Tag
            style={{
              color: statusConfig.color,
              backgroundColor: statusConfig.bgColor,
              borderColor: statusConfig.borderColor,
              border: `1px solid ${statusConfig.borderColor}`,
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '11px',
              fontWeight: '500'
            }}
          >
            ● {camera.status.charAt(0).toUpperCase() + camera.status.slice(1)}
          </Tag>
        </div>
      </div>

      {/* Camera Info */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">{camera.name}</h4>
          <Text type="secondary" className="text-xs">{camera.zone}</Text>
        </div>
        
        <div className="space-y-2 text-xs text-gray-600 mb-4 flex-1">
          <div className="flex justify-between items-center">
            <Text type="secondary">Recording:</Text>
            <Tag 
              color={camera.recording ? 'green' : 'red'}
              style={{ fontSize: '10px', padding: '1px 4px', margin: 0 }}
            >
              {camera.recording ? 'ON' : 'OFF'}
            </Tag>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => onEdit(camera.id)}
            className="hover:border-blue-400 hover:text-blue-500"
            size="middle"
          >
            Edit
          </Button>
          <Button
            type="primary"
            icon={<SettingOutlined />}
            onClick={() => onConfigure(camera.id)}
            style={{
              background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
              border: 'none',
            }}
            size="middle"
          >
            Configure
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraListItem; 