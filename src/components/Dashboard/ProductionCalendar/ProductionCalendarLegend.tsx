'use client';

import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const ProductionCalendarLegend: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded" style={{ backgroundColor: '#10b981' }} />
          <Text className="text-sm text-gray-600">Above Target</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded" style={{ backgroundColor: '#f59e0b' }} />
          <Text className="text-sm text-gray-600">Meeting Target</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded" style={{ backgroundColor: '#ef4444' }} />
          <Text className="text-sm text-gray-600">Below Target</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded" style={{ backgroundColor: '#dc2626' }} />
          <Text className="text-sm text-gray-600">Poor Performance</Text>
        </div>
      </div>
    </div>
  );
};

export default ProductionCalendarLegend; 