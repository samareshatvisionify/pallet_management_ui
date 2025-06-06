'use client';

import React from 'react';
import { Typography } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import { Station, getStationStatusColor } from '@/demoData';

const { Text } = Typography;

interface StationCardProps {
  station: Station;
  isDragging?: boolean;
  isEditMode: boolean;
  onDragStart?: (e: React.DragEvent, station: Station) => void;
  onDragEnd?: () => void;
}

const StationCard: React.FC<StationCardProps> = ({
  station,
  isDragging = false,
  isEditMode,
  onDragStart,
  onDragEnd
}) => {


  const handleDragStart = (e: React.DragEvent) => {
    if (onDragStart) {
      onDragStart(e, station);
    }
  };

  return (
    <div
      className={`
        station-card relative p-3 border rounded-lg transition-all duration-200 bg-gray-100
        ${isDragging ? 'opacity-50' : 'hover:shadow-sm'}
        ${isEditMode ? 'cursor-move hover:border-blue-300' : 'cursor-default'}
        border-gray-200
      `}
      draggable={isEditMode}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      {isEditMode && (
        <div className="absolute top-2 right-2">
          <DragOutlined className="text-gray-400 text-sm" />
        </div>
      )}
      
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <Text strong className="text-sm leading-tight pr-2 flex-1">
            {station.name}
          </Text>
          <div 
            className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: getStationStatusColor(station.status) }}
            title={station.status}
          />
        </div>
        
        <div className="space-y-1.5">
          <div className="text-xs text-gray-600 font-medium">
            {station.type}
          </div>
          
          <div className="text-xs text-gray-500">
            Target: {station.target}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationCard; 