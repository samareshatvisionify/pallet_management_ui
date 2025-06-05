'use client';

import React, { useState } from 'react';
import { Select, List, Row, Col, Typography } from 'antd';
import { EnvironmentOutlined, CameraOutlined, HomeOutlined } from '@ant-design/icons';
import type { TrackingLocation } from '@/demoData/palletData';

const { Text } = Typography;

interface TrackingDetailsProps {
  stations: TrackingLocation[];
  zones: TrackingLocation[];
  cameras: TrackingLocation[];
  className?: string;
}

type TrackingType = 'stations' | 'zones' | 'cameras';

const TrackingDetails: React.FC<TrackingDetailsProps> = ({
  stations,
  zones,
  cameras,
  className
}) => {
  const [selectedType, setSelectedType] = useState<TrackingType>('stations');

  const getIcon = (type: TrackingType) => {
    switch (type) {
      case 'stations':
        return <HomeOutlined className="text-blue-500" />;
      case 'zones':
        return <EnvironmentOutlined className="text-green-500" />;
      case 'cameras':
        return <CameraOutlined className="text-orange-500" />;
    }
  };



  const getCurrentData = () => {
    switch (selectedType) {
      case 'stations':
        return stations;
      case 'zones':
        return zones;
      case 'cameras':
        return cameras;
      default:
        return [];
    }
  };

  const selectOptions = [
    { value: 'stations', label: 'Stations', icon: <HomeOutlined /> },
    { value: 'zones', label: 'Zones', icon: <EnvironmentOutlined /> },
    { value: 'cameras', label: 'Cameras', icon: <CameraOutlined /> }
  ];

  return (
    <div className={`${className} h-full flex flex-col`}>
      {/* Title with Dropdown */}
      <div className="flex items-center justify-between gap-3 mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-0.5 h-4 bg-gradient-to-b from-blue-500 to-blue-700 rounded-sm"></span>
          <Text className="text-sm font-semibold text-gray-700 m-0">
            Tracked by
          </Text>
        </div>
        <Select
          value={selectedType}
          onChange={setSelectedType}
          options={selectOptions}
          className="min-w-[80px]"
          size="small"
          placeholder="Select tracking type"
        />
      </div>
      
      {/* Scrollable List - Takes remaining space */}
      <div className="h-30 overflow-y-auto border border-gray-200 rounded-md bg-gray-50">
        <List
          dataSource={getCurrentData()}
          size="small"
          renderItem={(item) => (
            <List.Item className="px-4 py-3 border-b border-gray-200 bg-white mx-1 mb-0.5 rounded">
              <Row className="w-full" justify="space-between" align="middle">
                <Col flex="auto">
                  <div className="flex items-center gap-2">
                    {getIcon(selectedType)}
                    <Text className="!text-xs !font-medium text-gray-700" ellipsis={{ tooltip: true }}>
                      {item.name}
                    </Text>
                  </div>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default TrackingDetails; 