'use client';

import React from 'react';
import { Typography } from 'antd';
import CameraConfig from './CameraConfig';
import ZoneConfig from './ZoneConfig';
import ShiftsConfig from './ShiftConfig';

const { Text } = Typography;

const SiteSettings: React.FC = () => {
  const handleCameraConfigClick = () => {
    console.log('Camera Config clicked');
    // TODO: Navigate to camera config or open modal
  };

  const handleZoneConfigClick = () => {
    console.log('Zone Config clicked');
    // TODO: Navigate to zone config or open modal
  };

  const handleShiftsConfigClick = () => {
    console.log('Shifts Config clicked');
    // TODO: Navigate to shifts config or open modal
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <Text className="text-gray-500">
          Configure camera settings, zones, and shifts for your site
        </Text>
      </div>

      <div className="space-y-6">
        {/* Camera Configuration Section */}
        <CameraConfig onClick={handleCameraConfigClick} />

        {/* Zone Configuration Section */}
        <ZoneConfig onClick={handleZoneConfigClick} />

        {/* Shifts Configuration Section */}
        <ShiftsConfig onClick={handleShiftsConfigClick} />
      </div>
    </div>
  );
};

export default SiteSettings; 