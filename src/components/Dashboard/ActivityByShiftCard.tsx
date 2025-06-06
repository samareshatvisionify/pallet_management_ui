'use client';

import React from 'react';
import { Card, Typography } from 'antd';

const { Text } = Typography;

interface ShiftData {
  time: string;
  value: number;
  shift: 'morning' | 'afternoon' | 'night';
}

interface ActivityByShiftCardProps {
  loading?: boolean;
}

const ActivityByShiftCard: React.FC<ActivityByShiftCardProps> = ({ loading = false }) => {
  // Static demo data for activity by shift
  const shiftData: ShiftData[] = [
    { time: '06:00', value: 45, shift: 'morning' },
    { time: '07:00', value: 45, shift: 'morning' },
    { time: '08:00', value: 78, shift: 'morning' },
    { time: '09:00', value: 78, shift: 'morning' },
    { time: '10:00', value: 95, shift: 'morning' },
    { time: '11:00', value: 95, shift: 'morning' },
    { time: '12:00', value: 65, shift: 'morning' },
    { time: '13:00', value: 65, shift: 'afternoon' },
    { time: '14:00', value: 88, shift: 'afternoon' },
    { time: '15:00', value: 88, shift: 'afternoon' },
    { time: '16:00', value: 92, shift: 'afternoon' },
    { time: '17:00', value: 92, shift: 'afternoon' },
    { time: '18:00', value: 68, shift: 'afternoon' },
    { time: '19:00', value: 55, shift: 'afternoon' },
    { time: '20:00', value: 40, shift: 'night' },
    { time: '21:00', value: 35, shift: 'night' },
    { time: '22:00', value: 28, shift: 'night' },
    { time: '23:00', value: 28, shift: 'night' },
    { time: '00:00', value: 28, shift: 'night' },
    { time: '01:00', value: 28, shift: 'night' },
    { time: '02:00', value: 28, shift: 'night' },
    { time: '03:00', value: 32, shift: 'night' },
    { time: '04:00', value: 32, shift: 'night' },
    { time: '05:00', value: 32, shift: 'night' },
  ];

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'morning':
        return '#1890ff';
      case 'afternoon':
        return '#52c41a';
      case 'night':
        return '#722ed1';
      default:
        return '#d9d9d9';
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
                className="w-full rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer relative group"
                style={{
                  height: `${(data.value / maxValue) * 160}px`,
                  backgroundColor: getShiftColor(data.shift),
                  minHeight: '4px'
                }}
                title={`${data.time}: ${data.value}`}
              >
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-1 whitespace-nowrap">
                  {data.value}
                </div>
              </div>
              
              {/* Time label */}
              <Text className="text-xs mt-2 text-center" style={{ fontSize: '10px' }}>
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
            <div 
              className="w-3 h-3 rounded"
              style={{ backgroundColor: getShiftColor('morning') }}
            />
            <Text className="text-xs">Morning (06:00-12:00)</Text>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded"
              style={{ backgroundColor: getShiftColor('afternoon') }}
            />
            <Text className="text-xs">Afternoon (12:00-19:00)</Text>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded"
              style={{ backgroundColor: getShiftColor('night') }}
            />
            <Text className="text-xs">Night (20:00-06:00)</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActivityByShiftCard; 