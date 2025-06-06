'use client';

import React, { useState } from 'react';
import { Card, Typography, Button, Row, Col, App } from 'antd';
import { EnvironmentOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import ZoneCard, { Zone } from './ZoneCard';
import { Station } from './StationCard';
import AddZoneCard from './AddZoneCard';

const { Title, Text } = Typography;

// Mock zone and station data
const initialZones: Zone[] = [
  {
    id: '1',
    name: 'Loading Dock A',
    description: 'Primary loading and unloading area',
    color: '#1890ff',
    stations: [
      {
        id: 's1',
        name: 'Loading Station 1',
        type: 'Loading',
        status: 'Active',
        target: 50
      },
      {
        id: 's2',
        name: 'Loading Station 2',
        type: 'Loading',
        status: 'Active',
        target: 50
      },
      {
        id: 's3',
        name: 'QC Station A1',
        type: 'Quality Control',
        status: 'Active',
        target: 25
      }
    ]
  },
  {
    id: '2',
    name: 'Storage Area 1',
    description: 'Main warehouse storage facility',
    color: '#52c41a',
    stations: [
      {
        id: 's4',
        name: 'Storage Unit 1',
        type: 'Storage',
        status: 'Active',
        target: 100
      },
      {
        id: 's5',
        name: 'Storage Unit 2',
        type: 'Storage',
        status: 'Maintenance',
        target: 100
      }
    ]
  },
  {
    id: '3',
    name: 'Processing Zone',
    description: 'Manufacturing and processing area',
    color: '#faad14',
    stations: [
      {
        id: 's6',
        name: 'Processing Line 1',
        type: 'Processing',
        status: 'Active',
        target: 75
      }
    ]
  },
  {
    id: '4',
    name: 'Unloading Dock B',
    description: 'Secondary unloading area',
    color: '#722ed1',
    stations: []
  }
];

interface ZoneConfigProps {
  onClick?: () => void;
}

const ZoneConfig: React.FC<ZoneConfigProps> = ({ onClick }) => {
  const { message } = App.useApp();
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [isEditMode, setIsEditMode] = useState(false);
  const [draggingStation, setDraggingStation] = useState<Station | null>(null);
  const [dragOverZoneId, setDragOverZoneId] = useState<string | null>(null);

  const generateZoneId = () => {
    return Date.now().toString();
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      // Reset drag states when exiting edit mode
      setDraggingStation(null);
      setDragOverZoneId(null);
    }
  };

  const handleAddZone = (newZone: Omit<Zone, 'id' | 'stations'>) => {
    const zoneWithId: Zone = {
      ...newZone,
      id: generateZoneId(),
      stations: []
    };
    setZones(prev => [...prev, zoneWithId]);
    message.success(`Zone "${newZone.name}" added successfully`);
  };

  const handleZoneEdit = (zoneId: string) => {
    console.log('Edit zone:', zoneId);
    // TODO: Implement zone edit functionality
    message.info('Zone editing functionality will be implemented soon');
  };

  const handleAddStation = (zoneId: string) => {
    console.log('Add station to zone:', zoneId);
    // TODO: Implement add station functionality
    message.info('Add station functionality will be implemented soon');
  };

  const handleStationDragStart = (e: React.DragEvent, station: Station) => {
    setDraggingStation(station);
    e.dataTransfer.setData('text/plain', station.id);
  };

  const handleStationDragEnd = () => {
    setDraggingStation(null);
    setDragOverZoneId(null);
  };

  const handleZoneDragOver = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    if (draggingStation) {
      setDragOverZoneId(zoneId);
    }
  };

  const handleZoneDragLeave = (e: React.DragEvent) => {
    // Only clear drag over if we're actually leaving the zone
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverZoneId(null);
    }
  };

  const handleZoneDrop = (e: React.DragEvent, targetZoneId: string) => {
    e.preventDefault();
    
    if (!draggingStation) return;

    // Find source zone
    const sourceZone = zones.find(zone => 
      zone.stations.some(station => station.id === draggingStation.id)
    );

    if (!sourceZone || sourceZone.id === targetZoneId) {
      setDragOverZoneId(null);
      return;
    }

    // Move station from source zone to target zone
    setZones(prev => prev.map(zone => {
      if (zone.id === sourceZone.id) {
        // Remove station from source zone
        return {
          ...zone,
          stations: zone.stations.filter(station => station.id !== draggingStation.id)
        };
      } else if (zone.id === targetZoneId) {
        // Add station to target zone
        return {
          ...zone,
          stations: [...zone.stations, draggingStation]
        };
      }
      return zone;
    }));

    message.success(`Station "${draggingStation.name}" moved to "${zones.find(z => z.id === targetZoneId)?.name}"`);
    setDragOverZoneId(null);
  };

  return (
    <Card className="shadow-sm !mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <EnvironmentOutlined className="text-2xl text-green-500" />
          <div>
            <Title level={4} className="!mb-1">Zone Configuration</Title>
            <Text className="text-gray-500">
              Set up warehouse zones, boundaries, and monitoring areas
            </Text>
          </div>
        </div>

        <Button
          type={isEditMode ? "primary" : "default"}
          icon={isEditMode ? <SaveOutlined /> : <EditOutlined />}
          onClick={handleToggleEditMode}
          style={isEditMode ? {
            background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
            border: 'none',
          } : undefined}
        >
          {isEditMode ? 'Save Changes' : 'Edit Layout'}
        </Button>
      </div>

      {/* Edit Mode Instruction */}
      {isEditMode && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Text className="text-blue-600 text-sm">
            <strong>Edit Mode Active:</strong> Drag stations between zones to reorganize your layout. 
            Use the "Add Station" buttons to create new stations within zones.
          </Text>
        </div>
      )}

      {/* Zones Grid */}
      <Row gutter={[16, 16]}>
        {/* Existing Zones */}
        {zones.map(zone => (
          <Col xs={24} lg={12} xl={8} key={zone.id}>
            <ZoneCard
              zone={zone}
              isEditMode={isEditMode}
              isDragOver={dragOverZoneId === zone.id}
              draggingStation={draggingStation}
              onEditClick={handleZoneEdit}
              onAddStationClick={handleAddStation}
              onDragOver={(e) => handleZoneDragOver(e, zone.id)}
              onDragLeave={handleZoneDragLeave}
              onDrop={handleZoneDrop}
              onStationDragStart={handleStationDragStart}
              onStationDragEnd={handleStationDragEnd}
            />
          </Col>
        ))}

        {/* Add Zone Card */}
        {isEditMode && (
          <Col xs={24} lg={12} xl={8}>
            <AddZoneCard onAdd={handleAddZone} />
          </Col>
        )}
      </Row>

      {/* Summary Statistics */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <Text strong className="block text-lg text-gray-900">
              {zones.length}
            </Text>
            <Text type="secondary" className="text-xs">
              Total Zones
            </Text>
          </div>
          <div>
            <Text strong className="block text-lg text-blue-600">
              {zones.reduce((sum, zone) => sum + zone.stations.length, 0)}
            </Text>
            <Text type="secondary" className="text-xs">
              Total Stations
            </Text>
          </div>
          <div>
            <Text strong className="block text-lg text-green-600">
              {zones.reduce((sum, zone) => 
                sum + zone.stations.filter(s => s.status === 'Active').length, 0
              )}
            </Text>
            <Text type="secondary" className="text-xs">
              Active Stations
            </Text>
          </div>
          <div>
            <Text strong className="block text-lg text-purple-600">
              {zones.reduce((sum, zone) => 
                sum + zone.stations.reduce((stationSum, station) => stationSum + station.target, 0), 0
              )}
            </Text>
            <Text type="secondary" className="text-xs">
              Total Target
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ZoneConfig; 