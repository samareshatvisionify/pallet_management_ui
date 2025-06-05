'use client';

import React, { useState } from 'react';
import { Camera } from '@/demoData/cameraData';
import { 
  ActivityTimelineChart, 
  CameraHourlyActivityChart, 
  CameraWeeklyTrendChart 
} from '@/components/common/charts';

interface CameraActivityChartsProps {
  camera?: Camera;
  loading?: boolean;
}

const CameraActivityCharts: React.FC<CameraActivityChartsProps> = ({
  camera,
  loading = false
}) => {
  const [selectedActivity, setSelectedActivity] = useState('Making');

  if (!camera && !loading) {
    return null;
  }

  const activityData = {
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

  return (
    <div className="mt-8 space-y-8">
      {/* Activity Timeline */}
      <div className="mb-8">
        <ActivityTimelineChart
          title="Activity Timeline"
          subtitle="Hourly activity breakdown for today's shift (6 AM - 6 PM)"
          activityOptions={[
            { label: 'Making', value: 'Making' },
            { label: 'Dismantling', value: 'Dismantling' },
            { label: 'Repair', value: 'Repair' },
            { label: 'Board', value: 'Board' },
            { label: 'Trimsaw', value: 'Trimsaw' }
          ]}
          activityDataMap={activityData}
          defaultActivity="Making"
          onActivityChange={setSelectedActivity}
          className="mb-6"
        />
      </div>
      
      {/* Hourly Activity Chart */}
      <div className="mb-8">
        <CameraHourlyActivityChart selectedActivity={selectedActivity} />
      </div>
      
      {/* Weekly Trend Chart */}
      <div className="mb-8">
        <CameraWeeklyTrendChart cameraName={camera?.name || 'Unknown Camera'} />
      </div>
    </div>
  );
};

export default CameraActivityCharts; 