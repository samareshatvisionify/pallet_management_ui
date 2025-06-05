'use client';

import React from 'react';
import { Card } from 'antd';

interface CameraWeeklyTrendChartProps {
  cameraName?: string;
}

const CameraWeeklyTrendChart: React.FC<CameraWeeklyTrendChartProps> = ({ cameraName }) => {
  // Weekly trend data matching the image pattern
  const weeklyData = [
    { day: 'Mon', count: 140, label: 'Mon' },
    { day: 'Tue', count: 165, label: 'Tue' },
    { day: 'Wed', count: 135, label: 'Wed' },
    { day: 'Thu', count: 180, label: 'Thu' },
    { day: 'Fri', count: 155, label: 'Fri' },
    { day: 'Sat', count: 135, label: 'Sat' },
    { day: 'Sun', count: 150, label: 'Sun' },
  ];

  const maxValue = 180;
  const minValue = 0;

  // Calculate SVG coordinates for each data point
  const getCoordinates = (index: number, value: number) => {
    const x = (index / (weeklyData.length - 1)) * 100; // Percentage across width
    const y = 90 - ((value - minValue) / (maxValue - minValue)) * 70; // Inverted Y with padding
    return { x, y };
  };

  // Generate path for the line
  const linePath = weeklyData.map((point, index) => {
    const coords = getCoordinates(index, point.count);
    return `${index === 0 ? 'M' : 'L'} ${coords.x} ${coords.y}`;
  }).join(' ');

  // Generate path for the area
  const areaPath = [
    linePath,
    `L 100 90`, // Bottom right
    `L 0 90`,   // Bottom left
    'Z'         // Close path
  ].join(' ');

  return (
    <Card>
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Weekly Trend</h3>
        <p className="text-gray-600 text-sm">Total activity over the past week</p>
      </div>

      <div className="relative h-72">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
          <span>180</span>
          <span>135</span>
          <span>90</span>
          <span>45</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 h-full relative">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between py-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-t border-gray-200" />
            ))}
          </div>

          {/* SVG Chart */}
          <div className="relative h-full w-full">
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="weeklyAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.15 }} />
                  <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              
              {/* Area under curve */}
              <path
                d={areaPath}
                fill="url(#weeklyAreaGradient)"
              />

              {/* Main line */}
              <path
                d={linePath}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-300"
              />
            </svg>

            {/* Data points overlay */}
            <div className="absolute inset-0">
              {weeklyData.map((point, index) => {
                const coords = getCoordinates(index, point.count);
                return (
                  <div
                    key={index}
                    className="absolute w-2 h-2 bg-blue-500 border-2 border-white rounded-full hover:w-3 hover:h-3 transition-all duration-200 cursor-pointer"
                    style={{
                      left: `${coords.x}%`,
                      top: `${coords.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    title={`${point.day}: ${point.count}`}
                  />
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 px-1">
              {weeklyData.map((point, index) => (
                <span key={index} className="text-center">
                  {point.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CameraWeeklyTrendChart; 