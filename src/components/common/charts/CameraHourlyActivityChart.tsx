'use client';

import React from 'react';
import { Card } from 'antd';

interface CameraHourlyActivityChartProps {
  selectedActivity: string;
}

const CameraHourlyActivityChart: React.FC<CameraHourlyActivityChartProps> = ({ selectedActivity }) => {
  // Enhanced demo data with different patterns for each activity type
  const hourlyDataMap = {
    Making: [
      { hour: '06:00', count: 22 },
      { hour: '07:00', count: 38 },
      { hour: '08:00', count: 30 },
      { hour: '09:00', count: 7 },
      { hour: '10:00', count: 15 },
      { hour: '11:00', count: 47 },
      { hour: '12:00', count: 20 },
      { hour: '13:00', count: 40 },
      { hour: '14:00', count: 30 },
      { hour: '15:00', count: 8 },
      { hour: '16:00', count: 16 },
      { hour: '17:00', count: 50 },
      { hour: '18:00', count: 10 },
    ],
    Dismantling: [
      { hour: '06:00', count: 12 },
      { hour: '07:00', count: 18 },
      { hour: '08:00', count: 25 },
      { hour: '09:00', count: 30 },
      { hour: '10:00', count: 0 },
      { hour: '11:00', count: 35 },
      { hour: '12:00', count: 0 },
      { hour: '13:00', count: 28 },
      { hour: '14:00', count: 20 },
      { hour: '15:00', count: 15 },
      { hour: '16:00', count: 8 },
      { hour: '17:00', count: 0 },
      { hour: '18:00', count: 5 },
    ],
    Repair: [
      { hour: '06:00', count: 5 },
      { hour: '07:00', count: 8 },
      { hour: '08:00', count: 12 },
      { hour: '09:00', count: 15 },
      { hour: '10:00', count: 18 },
      { hour: '11:00', count: 0 },
      { hour: '12:00', count: 0 },
      { hour: '13:00', count: 22 },
      { hour: '14:00', count: 16 },
      { hour: '15:00', count: 10 },
      { hour: '16:00', count: 6 },
      { hour: '17:00', count: 3 },
      { hour: '18:00', count: 0 },
    ],
    Board: [
      { hour: '06:00', count: 45 },
      { hour: '07:00', count: 52 },
      { hour: '08:00', count: 48 },
      { hour: '09:00', count: 35 },
      { hour: '10:00', count: 40 },
      { hour: '11:00', count: 0 },
      { hour: '12:00', count: 0 },
      { hour: '13:00', count: 55 },
      { hour: '14:00', count: 42 },
      { hour: '15:00', count: 38 },
      { hour: '16:00', count: 25 },
      { hour: '17:00', count: 15 },
      { hour: '18:00', count: 8 },
    ],
    Trimsaw: [
      { hour: '06:00', count: 18 },
      { hour: '07:00', count: 25 },
      { hour: '08:00', count: 32 },
      { hour: '09:00', count: 28 },
      { hour: '10:00', count: 35 },
      { hour: '11:00', count: 30 },
      { hour: '12:00', count: 0 },
      { hour: '13:00', count: 38 },
      { hour: '14:00', count: 40 },
      { hour: '15:00', count: 33 },
      { hour: '16:00', count: 20 },
      { hour: '17:00', count: 12 },
      { hour: '18:00', count: 6 },
    ]
  };

  const currentData = hourlyDataMap[selectedActivity as keyof typeof hourlyDataMap];
  // Use fixed maximum of 60 for consistent scale across all activities
  const maxCount = 60;
  const chartHeight = 256; // 16rem in pixels

  // Get color based on activity type
  const getActivityColor = (activity: string) => {
    const colors = {
      Making: '#22c55e',    // green-500
      Dismantling: '#f59e0b', // amber-500
      Repair: '#ef4444',    // red-500
      Board: '#3b82f6',     // blue-500
      Trimsaw: '#8b5cf6'    // violet-500
    };
    return colors[activity as keyof typeof colors] || '#22c55e';
  };

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Hourly Activity Breakdown</h3>
        <p className="text-gray-600 text-sm">Activity count per hour for {selectedActivity}</p>
      </div>

      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-gray-500 py-4">
          <span>60</span>
          <span>45</span>
          <span>30</span>
          <span>15</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 pl-4 border-l border-b border-gray-200">
          <div className="flex items-end justify-between h-64 px-2" style={{ gap: '2px' }}>
            {currentData.map((item, index) => {
              // Calculate bar height as percentage of chart height
              const barHeightPercentage = (item.count / maxCount) * 100;
              const barHeightPx = (barHeightPercentage / 100) * (chartHeight - 32); // subtract padding
              
              return (
                <div key={index} className="flex flex-col items-center flex-1" style={{ maxWidth: '7%' }}>
                  <div className="relative group w-full flex justify-center">
                    <div
                      className="rounded-t-sm transition-all duration-300 hover:opacity-80 relative"
                      style={{
                        backgroundColor: getActivityColor(selectedActivity),
                        height: `${Math.max(barHeightPx, item.count > 0 ? 4 : 1)}px`,
                        width: '80%'
                      }}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {item.count} activities
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2 whitespace-nowrap">
                    {item.hour}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CameraHourlyActivityChart; 