'use client';

import React from 'react';
import { Typography } from 'antd';
import ZoneConfig from './ZoneConfig';

const { Text } = Typography;

const SiteSettings: React.FC = () => {
  const handleZoneConfigClick = () => {
    console.log('Zone Config clicked');
    // TODO: Navigate to zone config or open modal
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <Text className="text-gray-500">
          Configure zones, boundaries, and site-specific settings for your facility
        </Text>
      </div>

      <div className="space-y-6">
        {/* Zone Configuration Section */}
        <ZoneConfig onClick={handleZoneConfigClick} />
      </div>
    </div>
  );
};

export default SiteSettings; 