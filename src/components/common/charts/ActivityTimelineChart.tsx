'use client';

import React, { useState } from 'react';
import { Card, Select, Row, Col } from 'antd';

interface TimeSlotData {
  time: string;
  count: number;
  active: boolean;
}

interface ActivityOption {
  label: string;
  value: string;
}

interface ActivityTimelineChartProps {
  title?: string;
  subtitle?: string;
  activityOptions: ActivityOption[];
  activityDataMap: Record<string, TimeSlotData[]>;
  defaultActivity?: string;
  onActivityChange?: (activity: string) => void;
  className?: string;
}

const ActivityTimelineChart: React.FC<ActivityTimelineChartProps> = ({
  title = "Activity Timeline",
  subtitle = "Hourly activity breakdown for today's shift (6 AM - 6 PM)",
  activityOptions,
  activityDataMap,
  defaultActivity,
  onActivityChange,
  className = "mb-6"
}) => {
  const [selectedActivity, setSelectedActivity] = useState(
    defaultActivity || activityOptions[0]?.value || ''
  );

  const handleActivityChange = (value: string) => {
    setSelectedActivity(value);
    onActivityChange?.(value);
  };

  const currentData = activityDataMap[selectedActivity] || [];

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-gray-600 text-sm">{subtitle}</p>
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

export default ActivityTimelineChart; 