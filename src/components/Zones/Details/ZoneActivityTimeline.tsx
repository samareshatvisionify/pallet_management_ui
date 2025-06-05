'use client';

import React from 'react';
import { ActivityTimelineChart } from '@/components/common/charts';

const ZoneActivityTimeline: React.FC = () => {
  return (
    <ActivityTimelineChart
      title="Activity Timeline"
      subtitle="Hourly pallet processing activity breakdown for today's shift"
      activityOptions={[
        { label: 'Processing', value: 'Processing' },
        { label: 'Loading', value: 'Loading' },
        { label: 'Unloading', value: 'Unloading' },
        { label: 'Maintenance', value: 'Maintenance' },
        { label: 'Quality Check', value: 'Quality Check' }
      ]}
      activityDataMap={{
        Processing: [
          { time: '06:00', count: 45, active: true },
          { time: '07:00', count: 52, active: true },
          { time: '08:00', count: 48, active: true },
          { time: '09:00', count: 38, active: true },
          { time: '10:00', count: 42, active: true },
          { time: '11:00', count: 35, active: true },
          { time: '12:00', count: 0, active: false },
          { time: '13:00', count: 47, active: true },
          { time: '14:00', count: 40, active: true },
          { time: '15:00', count: 33, active: true },
          { time: '16:00', count: 28, active: true },
          { time: '17:00', count: 15, active: true },
          { time: '18:00', count: 8, active: true },
        ],
        Loading: [
          { time: '06:00', count: 25, active: true },
          { time: '07:00', count: 30, active: true },
          { time: '08:00', count: 28, active: true },
          { time: '09:00', count: 22, active: true },
          { time: '10:00', count: 26, active: true },
          { time: '11:00', count: 20, active: true },
          { time: '12:00', count: 0, active: false },
          { time: '13:00', count: 32, active: true },
          { time: '14:00', count: 28, active: true },
          { time: '15:00', count: 24, active: true },
          { time: '16:00', count: 18, active: true },
          { time: '17:00', count: 12, active: true },
          { time: '18:00', count: 6, active: true },
        ],
        Unloading: [
          { time: '06:00', count: 18, active: true },
          { time: '07:00', count: 22, active: true },
          { time: '08:00', count: 25, active: true },
          { time: '09:00', count: 20, active: true },
          { time: '10:00', count: 24, active: true },
          { time: '11:00', count: 16, active: true },
          { time: '12:00', count: 0, active: false },
          { time: '13:00', count: 28, active: true },
          { time: '14:00', count: 22, active: true },
          { time: '15:00', count: 18, active: true },
          { time: '16:00', count: 14, active: true },
          { time: '17:00', count: 8, active: true },
          { time: '18:00', count: 4, active: true },
        ],
        Maintenance: [
          { time: '06:00', count: 0, active: false },
          { time: '07:00', count: 0, active: false },
          { time: '08:00', count: 0, active: false },
          { time: '09:00', count: 2, active: true },
          { time: '10:00', count: 3, active: true },
          { time: '11:00', count: 0, active: false },
          { time: '12:00', count: 8, active: true },
          { time: '13:00', count: 0, active: false },
          { time: '14:00', count: 0, active: false },
          { time: '15:00', count: 4, active: true },
          { time: '16:00', count: 2, active: true },
          { time: '17:00', count: 0, active: false },
          { time: '18:00', count: 0, active: false },
        ],
        'Quality Check': [
          { time: '06:00', count: 8, active: true },
          { time: '07:00', count: 12, active: true },
          { time: '08:00', count: 15, active: true },
          { time: '09:00', count: 10, active: true },
          { time: '10:00', count: 14, active: true },
          { time: '11:00', count: 8, active: true },
          { time: '12:00', count: 0, active: false },
          { time: '13:00', count: 16, active: true },
          { time: '14:00', count: 12, active: true },
          { time: '15:00', count: 10, active: true },
          { time: '16:00', count: 6, active: true },
          { time: '17:00', count: 4, active: true },
          { time: '18:00', count: 2, active: true },
        ]
      }}
      defaultActivity="Processing"
      className="mb-0"
    />
  );
};

export default ZoneActivityTimeline; 