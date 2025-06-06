'use client';

import React from 'react';
import { Typography } from 'antd';
import CameraConfig from '../SiteSettings/CameraConfig';
import ShiftsConfig from '../SiteSettings/ShiftConfig';

const { Text } = Typography;

const CameraSettings: React.FC = () => {
  const handleCameraConfigClick = () => {
    console.log('Camera Config clicked');
    // TODO: Navigate to camera config or open modal
  };

  const handleShiftsConfigClick = () => {
    console.log('Shifts Config clicked');
    // TODO: Navigate to shifts config or open modal
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <Text className="text-gray-500">
          Configure camera settings, monitoring parameters, and operational shifts
        </Text>
      </div>

      <div className="space-y-6">
        {/* Camera Configuration Section */}
        <CameraConfig onClick={handleCameraConfigClick} />

        {/* Shifts Configuration Section */}
        <ShiftsConfig onClick={handleShiftsConfigClick} />
      </div>
    </div>
  );
};

export default CameraSettings; 