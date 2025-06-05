'use client';

import React, { useState } from 'react';
import { Card, Select, Row, Col } from 'antd';

interface CameraActivityTimelineChartProps {
  cameraName: string;
  onActivityChange?: (activity: string) => void;
}

const CameraActivityTimelineChart: React.FC<CameraActivityTimelineChartProps> = ({ 
  cameraName, 
  onActivityChange 
}) => {
  const [selectedActivity, setSelectedActivity] = useState('Making');

  // Enhanced demo data with different patterns for each activity type
  const activityDataMap = {
    Making: [
      { time: '06:00', count: 22, active: true },
      { time: '07:00', count: 38, active: true },
      { time: '08:00', count: 30, active: true },
      { time: '09:00', count: 0, active: false },
      { time: '10:00', count: 15, active: true },
      { time: '11:00', count: 47, active: true },
      { time: '12:00', count: 0, active: false },
      { time: '13:00', count: 40, active: true },
      { time: '14:00', count: 0, active: false },
      { time: '15:00', count: 8, active: true },
      { time: '16:00', count: 0, active: false },
      { time: '17:00', count: 0, active: false },
      { time: '18:00', count: 10, active: true },
    ],
    Dismantling: [
      { time: '06:00', count: 12, active: true },
      { time: '07:00', count: 18, active: true },
      { time: '08:00', count: 25, active: true },
      { time: '09:00', count: 30, active: true },
      { time: '10:00', count: 0, active: false },
      { time: '11:00', count: 35, active: true },
      { time: '12:00', count: 0, active: false },
      { time: '13:00', count: 28, active: true },
      { time: '14:00', count: 20, active: true },
      { time: '15:00', count: 15, active: true },
      { time: '16:00', count: 8, active: true },
      { time: '17:00', count: 0, active: false },
      { time: '18:00', count: 5, active: true },
    ],
    Repair: [
      { time: '06:00', count: 5, active: true },
      { time: '07:00', count: 8, active: true },
      { time: '08:00', count: 12, active: true },
      { time: '09:00', count: 15, active: true },
      { time: '10:00', count: 18, active: true },
      { time: '11:00', count: 0, active: false },
      { time: '12:00', count: 0, active: false },
      { time: '13:00', count: 22, active: true },
      { time: '14:00', count: 16, active: true },
      { time: '15:00', count: 10, active: true },
      { time: '16:00', count: 6, active: true },
      { time: '17:00', count: 3, active: true },
      { time: '18:00', count: 0, active: false },
    ],
    Board: [
      { time: '06:00', count: 45, active: true },
      { time: '07:00', count: 52, active: true },
      { time: '08:00', count: 48, active: true },
      { time: '09:00', count: 35, active: true },
      { time: '10:00', count: 40, active: true },
      { time: '11:00', count: 0, active: false },
      { time: '12:00', count: 0, active: false },
      { time: '13:00', count: 55, active: true },
      { time: '14:00', count: 42, active: true },
      { time: '15:00', count: 38, active: true },
      { time: '16:00', count: 25, active: true },
      { time: '17:00', count: 15, active: true },
      { time: '18:00', count: 8, active: true },
    ],
    Trimsaw: [
      { time: '06:00', count: 18, active: true },
      { time: '07:00', count: 25, active: true },
      { time: '08:00', count: 32, active: true },
      { time: '09:00', count: 28, active: true },
      { time: '10:00', count: 35, active: true },
      { time: '11:00', count: 30, active: true },
      { time: '12:00', count: 0, active: false },
      { time: '13:00', count: 38, active: true },
      { time: '14:00', count: 40, active: true },
      { time: '15:00', count: 33, active: true },
      { time: '16:00', count: 20, active: true },
      { time: '17:00', count: 12, active: true },
      { time: '18:00', count: 6, active: true },
    ]
  };

  const activityOptions = [
    { label: 'Making', value: 'Making' },
    { label: 'Dismantling', value: 'Dismantling' },
    { label: 'Repair', value: 'Repair' },
    { label: 'Board', value: 'Board' },
    { label: 'Trimsaw', value: 'Trimsaw' }
  ];

  const handleActivityChange = (value: string) => {
    setSelectedActivity(value);
    onActivityChange?.(value);
  };

  const currentData = activityDataMap[selectedActivity as keyof typeof activityDataMap];

  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Activity Timeline</h3>
          <p className="text-gray-600 text-sm">Hourly activity breakdown for today&apos;s shift (6 AM - 6 PM)</p>
        </div>
        <Select
          value={selectedActivity}
          onChange={handleActivityChange}
          options={activityOptions}
          className="w-40"
          size="large"
        />
      </div>

      <Row gutter={[8, 8]}>
        {currentData.map((item, index) => (
          <Col key={index} xs={12} sm={8} md={6} lg={4} xl={3}>
            <div
              className={`rounded-lg p-3 text-center ${
                item.active 
                  ? 'bg-green-100 border border-green-200' 
                  : 'bg-orange-100 border border-orange-200'
              }`}
            >
              <div className="text-xs text-gray-600 mb-1">{item.time}</div>
              <div 
                className={`text-2xl font-bold ${
                  item.active ? 'text-green-600' : 'text-orange-600'
                }`}
              >
                {item.count}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default CameraActivityTimelineChart; 