'use client';

import React, { useState } from 'react';
import { Card, Typography, Button, Empty, List, Tag, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Station {
  id: number;
  name: string;
  zone: string;
  status: 'active' | 'inactive';
}

interface StationsPanelProps {
  cameraId: string;
}

const StationsPanel: React.FC<StationsPanelProps> = ({ cameraId }) => {
  // Mock stations data - replace with actual API call based on cameraId
  const [stations, setStations] = useState<Station[]>([
    // Empty initially - uncomment for demo
    // { id: 1, name: 'Station A1', zone: 'Loading Dock A', status: 'active' },
    // { id: 2, name: 'Station A2', zone: 'Loading Dock A', status: 'inactive' }
  ]);

  const handleAddStation = () => {
    console.log('Add station for camera:', cameraId);
    // TODO: Implement add station functionality
  };

  const handleEditStation = (stationId: number) => {
    console.log('Edit station:', stationId);
    // TODO: Implement edit station functionality
  };

  const handleDeleteStation = (stationId: number) => {
    setStations(stations.filter(station => station.id !== stationId));
  };

  return (
    <Card className="h-full shadow-sm border border-gray-200">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <Title level={5} className="mb-0 text-gray-900">
            Added Stations
          </Title>
          <Text type="secondary" className="text-xs">
            {stations.length} station{stations.length !== 1 ? 's' : ''}
          </Text>
        </div>
      </div>

      {/* Stations Content */}
      <div className="flex-1">
        {stations.length === 0 ? (
          /* Empty State */
          <div className="h-full flex flex-col items-center justify-center py-8">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="text-center">
                  <Text type="secondary" className="text-sm">
                    No stations added yet
                  </Text>
                  <br />
                  <Text type="secondary" className="text-xs">
                    Add stations to configure this camera
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
              Add Station
            </Button>
          </div>
        ) : (
          /* Stations List */
          <div>
            <List
              size="small"
              dataSource={stations}
              renderItem={(station) => (
                <List.Item
                  className="border-b border-gray-100 last:border-b-0 py-3"
                  actions={[
                    <Button
                      key="edit"
                      type="text"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => handleEditStation(station.id)}
                      className="text-blue-500 hover:text-blue-600"
                    />,
                    <Button
                      key="delete"
                      type="text"
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteStation(station.id)}
                      className="text-red-500 hover:text-red-600"
                    />
                  ]}
                >
                  <div className="flex-1">
                    <div className="flex flex-col">
                      <Text strong className="text-sm text-gray-900">
                        {station.name}
                      </Text>
                      <Text type="secondary" className="text-xs mt-1">
                        {station.zone}
                      </Text>
                      <div className="mt-2">
                        <Tag 
                          color={station.status === 'active' ? 'green' : 'default'}
                          className="text-xs"
                        >
                          {station.status.toUpperCase()}
                        </Tag>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            
            {/* Add More Button */}
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
          </div>
        )}
      </div>
    </Card>
  );
};

export default StationsPanel; 