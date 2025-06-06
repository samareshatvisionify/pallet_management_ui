'use client';

import React, { useState } from 'react';
import { Card } from 'antd';
import { weeklyData } from '@/demoData';

interface CameraWeeklyTrendChartProps {
}

const CameraWeeklyTrendChart: React.FC<CameraWeeklyTrendChartProps> = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<{ day: string; count: number; x: number; y: number } | null>(null);

  const maxValue = 180;
  const minValue = 0;

  // Calculate SVG coordinates for each data point
  const getCoordinates = (index: number, value: number) => {
    const x = (index / (weeklyData.length - 1)) * 100; // Percentage across width
    const y = 90 - ((value - minValue) / (maxValue - minValue)) * 70; // Inverted Y with padding
    return { x, y };
  };

  // Generate smooth curve path using cubic bezier curves for more natural curves
  const generateSmoothPath = () => {
    if (weeklyData.length < 2) return '';
    
    const points = weeklyData.map((point, index) => getCoordinates(index, point.count));
    
    if (points.length === 2) {
      return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
    }

    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const current = points[i];
      const next = points[i + 1];
      
      // Calculate control points for smoother curves
      const tension = 0.3; // Smoothness factor
      
      let cp1x, cp1y, cp2x, cp2y;
      
      if (i === 1) {
        // First curve - use current and next point to determine direction
        const dx = next ? (next.x - prev.x) * tension : (current.x - prev.x) * tension;
        const dy = next ? (next.y - prev.y) * tension : (current.y - prev.y) * tension;
        cp1x = prev.x + dx * 0.5;
        cp1y = prev.y + dy * 0.5;
        cp2x = current.x - dx * 0.5;
        cp2y = current.y - dy * 0.5;
      } else if (i === points.length - 1) {
        // Last curve - use previous point to determine direction
        const prevPrev = points[i - 2];
        const dx = (current.x - prevPrev.x) * tension;
        const dy = (current.y - prevPrev.y) * tension;
        cp1x = prev.x + dx * 0.5;
        cp1y = prev.y + dy * 0.5;
        cp2x = current.x - dx * 0.5;
        cp2y = current.y - dy * 0.5;
      } else {
        // Middle curves - use surrounding points for smooth transitions
        const dx1 = (current.x - points[i - 2].x) * tension;
        const dy1 = (current.y - points[i - 2].y) * tension;
        const dx2 = (next.x - prev.x) * tension;
        const dy2 = (next.y - prev.y) * tension;
        
        cp1x = prev.x + dx1 * 0.5;
        cp1y = prev.y + dy1 * 0.5;
        cp2x = current.x - dx2 * 0.5;
        cp2y = current.y - dy2 * 0.5;
      }
      
      path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${current.x} ${current.y}`;
    }
    
    return path;
  };

  // Generate area path
  const generateAreaPath = () => {
    const linePath = generateSmoothPath();
    return `${linePath} L 100 90 L 0 90 Z`;
  };

  const handlePointHover = (index: number, event: React.MouseEvent) => {
    const point = weeklyData[index];
    const rect = event.currentTarget.getBoundingClientRect();
    
    setHoveredPoint(index);
    setTooltipData({
      day: point.day,
      count: point.count,
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };

  const handlePointLeave = () => {
    setHoveredPoint(null);
    setTooltipData(null);
  };

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
                d={generateAreaPath()}
                fill="url(#weeklyAreaGradient)"
              />

              {/* Main line with smooth curves */}
              <path
                d={generateSmoothPath()}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-300"
              />
            </svg>

            {/* Data points overlay */}
            <div className="absolute inset-0">
              {weeklyData.map((point, index) => {
                const coords = getCoordinates(index, point.count);
                const isHovered = hoveredPoint === index;
                
                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-200 cursor-pointer ${
                      isHovered ? 'w-3 h-3' : 'w-2 h-2'
                    } bg-blue-500 border-2 border-white rounded-full`}
                    style={{
                      left: `${coords.x}%`,
                      top: `${coords.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isHovered ? 10 : 1
                    }}
                    onMouseEnter={(e) => handlePointHover(index, e)}
                    onMouseLeave={handlePointLeave}
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

      {/* Custom Tooltip */}
      {tooltipData && (
        <div
          className="fixed bg-white border border-gray-300 rounded-lg shadow-lg px-3 py-2 text-sm z-50 pointer-events-none"
          style={{
            left: tooltipData.x,
            top: tooltipData.y - 60,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="font-medium text-gray-800">{tooltipData.day}</div>
          <div className="text-blue-600">total: {tooltipData.count}</div>
        </div>
      )}
    </Card>
  );
};

export default CameraWeeklyTrendChart; 