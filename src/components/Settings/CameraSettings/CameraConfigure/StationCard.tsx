'use client';

import React from 'react';
import { Card, Tag, Button, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { StationFormData } from './StationForm';
import type { Polygon } from './CanvasDrawing';

const { Text } = Typography;

// Complete station interface combining form data and polygon
export interface Station extends StationFormData {
  id: number;
  polygon: Polygon;
  status: 'active' | 'inactive';
  createdAt: Date;
}

interface StationCardProps {
  station: Station;
  onEdit: (station: Station) => void;
  onDelete: (stationId: number) => void;
  onViewArea: (station: Station) => void;
}

/**
 * StationCard Component
 * 
 * Displays a completed station with all its details:
 * - Station name and zone
 * - Scenario type with color coding
 * - Target count
 * - Status indicator
 * - Action buttons (edit, delete, view area)
 * 
 * Used in the stations panel to show saved stations
 */
const StationCard: React.FC<StationCardProps> = ({
  station,
  onEdit,
  onDelete,
  onViewArea
}) => {
  // Get scenario color for visual distinction
  const getScenarioColor = (scenario: Station['scenario']) => {
    switch (scenario) {
      case 'pallet making': return 'blue';
      case 'dismantle': return 'orange';
      case 'repair': return 'red';
      case 'board': return 'green';
      case 'trimsaw': return 'purple';
      default: return 'default';
    }
  };

  // Format scenario label
  const formatScenario = (scenario: Station['scenario']) => {
    return scenario.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card
      size="small"
      className="mb-3 border border-gray-200 hover:shadow-sm transition-shadow"
    >
      {/* Station Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Text strong className="text-sm text-gray-900">
              {station.name}
            </Text>
            <div className="flex items-center gap-2 mt-1">
              <Tag 
                color={station.status === 'active' ? 'green' : 'default'}
                className="text-xs"
              >
                {station.status.toUpperCase()}
              </Tag>
            </div>
          </div>
        </div>
      </div>

      {/* Station Details */}
      <div className="space-y-2 mb-3">
        {/* Zone */}
        <div className="flex items-center justify-between">
          <Text type="secondary" className="text-xs">Zone:</Text>
          <Text className="text-xs font-medium text-gray-700">
            {station.zoneName}
          </Text>
        </div>

        {/* Scenario */}
        <div className="flex items-center justify-between">
          <Text type="secondary" className="text-xs">Scenario:</Text>
          <Tag 
            color={getScenarioColor(station.scenario)}
            className="text-xs"
          >
            {formatScenario(station.scenario)}
          </Tag>
        </div>

        {/* Target Count */}
        <div className="flex items-center justify-between">
          <Text type="secondary" className="text-xs">Target:</Text>
          <Text className="text-xs font-semibold text-blue-600">
            {station.targetCount}
          </Text>
        </div>

        {/* Polygon Status */}
        <div className="flex items-center justify-between">
          <Text type="secondary" className="text-xs">Area:</Text>
          <Text className="text-xs font-medium text-green-600">
            {station.polygon.points.length} points
          </Text>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-1 pt-2 border-t border-gray-100">
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => onViewArea(station)}
          className="flex-1 text-xs text-blue-500 hover:text-blue-600 hover:bg-blue-50"
        >
          View Area
        </Button>
        
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          onClick={() => onEdit(station)}
          className="flex-1 text-xs text-orange-500 hover:text-orange-600 hover:bg-orange-50"
        >
          Edit
        </Button>
        
        <Button
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => onDelete(station.id)}
          className="flex-1 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default StationCard; 