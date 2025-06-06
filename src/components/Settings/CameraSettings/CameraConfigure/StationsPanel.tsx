'use client';

import React, { useState } from 'react';
import { Card, Typography, Button, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import StationForm, { StationFormData } from './StationForm';
import StationCard, { Station } from './StationCard';
import type { Polygon } from './CanvasDrawing';

const { Title, Text } = Typography;

interface StationsPanelProps {
  onDrawingModeChange: (isDrawing: boolean) => void;
  onPolygonChange: (polygon: Polygon | null) => void;
  currentPolygon: Polygon | null;
}

const StationsPanel: React.FC<StationsPanelProps> = ({ 
  onDrawingModeChange, 
  onPolygonChange,
  currentPolygon 
}) => {
  // State for stations and form management
  const [stations, setStations] = useState<Station[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [formData, setFormData] = useState<StationFormData | null>(null);

  /**
   * Handle Add Station Click
   * - Starts the add station flow
   * - Activates drawing mode for polygon creation
   */
  const handleAddStation = () => {
    setIsAdding(true);
    setEditingStation(null);
    setFormData(null);
    onDrawingModeChange(true);
    onPolygonChange(null);
  };

  /**
   * Handle Station Form Save
   * - Validates form data and polygon
   * - Creates new station or updates existing
   * - Exits drawing mode
   */
  const handleStationSave = (data: StationFormData) => {
    if (!currentPolygon || !currentPolygon.completed) {
      alert('Please draw and complete the station area on the camera image.');
      return;
    }

    if (editingStation) {
      // Update existing station
      setStations(prev => prev.map(station => 
        station.id === editingStation.id 
          ? { 
              ...station, 
              ...data, 
              polygon: currentPolygon 
            }
          : station
      ));
    } else {
      // Create new station
      const newStation: Station = {
        id: Date.now(), // Simple ID generation
        ...data,
        polygon: currentPolygon,
        status: 'active',
        createdAt: new Date()
      };
      setStations(prev => [...prev, newStation]);
    }

    // Reset form state
    setIsAdding(false);
    setEditingStation(null);
    setFormData(null);
    onDrawingModeChange(false);
    onPolygonChange(null);
  };

  /**
   * Handle Station Form Cancel
   * - Exits form without saving
   * - Clears drawing mode
   */
  const handleStationCancel = () => {
    setIsAdding(false);
    setEditingStation(null);
    setFormData(null);
    onDrawingModeChange(false);
    onPolygonChange(null);
  };

  /**
   * Handle Edit Station
   * - Loads station data into form
   * - Activates drawing mode with existing polygon
   */
  const handleEditStation = (station: Station) => {
    setEditingStation(station);
    setFormData({
      name: station.name,
      scenario: station.scenario,
      targetCount: station.targetCount,
      zoneName: station.zoneName
    });
    onDrawingModeChange(true);
    onPolygonChange(station.polygon);
  };

  /**
   * Handle Delete Station
   * - Removes station from list
   * - Confirms deletion with user
   */
  const handleDeleteStation = (stationId: number) => {
    if (confirm('Are you sure you want to delete this station?')) {
      setStations(stations.filter(station => station.id !== stationId));
    }
  };

  /**
   * Handle View Station Area
   * - Shows station polygon on camera without editing
   */
  const handleViewArea = (station: Station) => {
    onPolygonChange(station.polygon);
    // Optionally could highlight the specific station
  };

  return (
    <Card className="h-full shadow-sm border border-gray-200">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <Title level={5} className="mb-0 text-gray-900">
            Station Configuration
          </Title>
          <Text type="secondary" className="text-xs">
            {stations.length} station{stations.length !== 1 ? 's' : ''}
          </Text>
        </div>
      </div>

      {/* Stations Content */}
      <div className="flex-1 max-h-full overflow-y-auto">
        {/* Add/Edit Station Form */}
        {(isAdding || editingStation) && (
          <div className="mb-4">
            <StationForm
              onSave={handleStationSave}
              onCancel={handleStationCancel}
              initialData={formData || undefined}
              loading={false}
            />
          </div>
        )}

        {/* Existing Stations */}
        {stations.map(station => (
          <StationCard
            key={station.id}
            station={station}
            onEdit={handleEditStation}
            onDelete={handleDeleteStation}
            onViewArea={handleViewArea}
          />
        ))}

        {/* Empty State or Add Button */}
        {stations.length === 0 && !isAdding && !editingStation && (
          <div className="h-full flex flex-col items-center justify-center py-8">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="text-center">
                  <Text type="secondary" className="text-sm">
                    No stations configured
                  </Text>
                  <br />
                  <Text type="secondary" className="text-xs">
                    Add stations to monitor specific areas
                  </Text>
                </div>
              }
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddStation}
              className="mt-4"
              style={{
                background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
                border: 'none',
              }}
            >
              Add First Station
            </Button>
          </div>
        )}

        {/* Add More Button (when stations exist and not in add/edit mode) */}
        {stations.length > 0 && !isAdding && !editingStation && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleAddStation}
              block
              className="border-blue-200 text-blue-500 hover:border-blue-400 hover:text-blue-600"
            >
              Add Another Station
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StationsPanel; 