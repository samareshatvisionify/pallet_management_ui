'use client';

import React from 'react';
import { Card, Typography, Button, Space, Row, Col } from 'antd';
import { EnvironmentOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import StationCard, { Station } from './StationCard';

const { Title, Text } = Typography;

export interface Zone {
  id: string;
  name: string;
  description: string;
  color: string;
  stations: Station[];
}

interface ZoneCardProps {
  zone: Zone;
  isEditMode: boolean;
  isDragOver?: boolean;
  draggingStation?: Station | null;
  onEditClick?: (zoneId: string) => void;
  onAddStationClick?: (zoneId: string) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, targetZoneId: string) => void;
  onStationDragStart?: (e: React.DragEvent, station: Station) => void;
  onStationDragEnd?: () => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({
  zone,
  isEditMode,
  isDragOver = false,
  draggingStation,
  onEditClick,
  onAddStationClick,
  onDragOver,
  onDragLeave,
  onDrop,
  onStationDragStart,
  onStationDragEnd
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (onDragOver) {
      onDragOver(e);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (onDragLeave) {
      onDragLeave(e);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (onDrop) {
      onDrop(e, zone.id);
    }
  };

  return (
    <Card 
      className={`
        zone-card transition-all duration-200 border-2 !h-full shadow-sm
        ${isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}
        ${isEditMode ? 'hover:border-blue-300' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Zone Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: zone.color }}
          />
          <div>
            <Title level={5} className="!mb-0">
              {zone.name}
            </Title>
            <Text type="secondary" className="text-xs">
              {zone.description}
            </Text>
          </div>
        </div>

        <Space size="small">
          {isEditMode && (
            <Button
              type="text"
              icon={<PlusOutlined />}
              size="small"
              onClick={() => onAddStationClick?.(zone.id)}
              className="hover:bg-blue-100"
            >
              Add Station
            </Button>
          )}
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => onEditClick?.(zone.id)}
            className="hover:bg-gray-100"
          >
            Edit
          </Button>
        </Space>
      </div>

      {/* Zone Stats */}
      <div className="mb-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <Text strong className="block text-sm">
              {zone.stations.length}
            </Text>
            <Text type="secondary" className="text-xs">
              Stations
            </Text>
          </div>
          <div>
            <Text strong className="block text-sm text-green-600">
              {zone.stations.filter(s => s.status === 'Active').length}
            </Text>
            <Text type="secondary" className="text-xs">
              Active
            </Text>
          </div>
          <div>
            <Text strong className="block text-sm text-blue-600">
              {zone.stations.reduce((sum, s) => sum + s.target, 0)}
            </Text>
            <Text type="secondary" className="text-xs">
              Target
            </Text>
          </div>
        </div>
      </div>

      {/* Stations Grid */}
      <div className="stations-container">
        {zone.stations.length > 0 ? (
          <Row gutter={[12, 12]}>
            {zone.stations.map(station => (
              <Col xs={24} sm={12} key={station.id}>
                <StationCard
                  station={station}
                  isEditMode={isEditMode}
                  isDragging={draggingStation?.id === station.id}
                  onDragStart={onStationDragStart}
                  onDragEnd={onStationDragEnd}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-8">
            <EnvironmentOutlined className="text-2xl text-gray-300 mb-2" />
            <Text type="secondary" className="text-sm">
              No stations in this zone
            </Text>
            {isEditMode && (
              <div className="mt-2">
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  size="small"
                  onClick={() => onAddStationClick?.(zone.id)}
                >
                  Add First Station
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Drop Zone Indicator */}
      {isEditMode && isDragOver && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-400 bg-blue-50 bg-opacity-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl text-blue-500 mb-2">📦</div>
            <Text className="text-blue-600 font-medium">
              Drop station here
            </Text>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ZoneCard; 