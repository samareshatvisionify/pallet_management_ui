'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { shiftData } from '@/demoData';

const { Text } = Typography;

interface ActivityByShiftCardProps {
  loading?: boolean;
}

const ActivityByShiftCard: React.FC<ActivityByShiftCardProps> = ({ loading = false }) => {

  const getShiftColorClass = (shift: string) => {
    switch (shift) {
      case 'morning':
        return 'shift-color-morning';
      case 'afternoon':
        return 'shift-color-afternoon';
      case 'night':
        return 'shift-color-night';
      default:
        return 'shift-color-default';
    }
  };

  const maxValue = Math.max(...shiftData.map(d => d.value));

  return (
    <Card 
      title={
        <div className="pt-2">
          <div>Activity by Shift</div>
        </div>
      }
      loading={loading}
      className="h-full"
    >
      <div className="space-y-4">
        {/* Chart */}
        <div className="relative h-48 md:h-64 flex items-end justify-between gap-1 bg-gray-50 rounded-lg p-3 md:p-4">
          {shiftData.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              {/* Bar */}
              <div 
                className={`chart-bar-dynamic ${getShiftColorClass(data.shift)}`}
                style={{ height: `${(data.value / maxValue) * 160}px` }}
                title={`${data.time}: ${data.value}`}
              >
                <div className="chart-tooltip-hover">
                  {data.value}
                </div>
              </div>
              
              <Text className="shift-chart-text mt-2 text-center">
                {data.time}
              </Text>
            </div>
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="flex justify-between text-xs text-gray-500 px-4">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 pt-2">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${getShiftColorClass('morning')}`} />
            <Text className="text-xs">Morning (06:00-12:00)</Text>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${getShiftColorClass('afternoon')}`} />
            <Text className="text-xs">Afternoon (12:00-19:00)</Text>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${getShiftColorClass('night')}`} />
            <Text className="text-xs">Night (20:00-06:00)</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActivityByShiftCard; 