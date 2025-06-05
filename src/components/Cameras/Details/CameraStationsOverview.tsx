'use client';

import React, { useMemo } from 'react';
import { Row, Col, Typography, Progress } from 'antd';
import { Camera } from '@/demoData/cameraData';

const { Title } = Typography;

interface CameraStationsOverviewProps {
  camera?: Camera;
  loading?: boolean;
}

const CameraStationsOverview: React.FC<CameraStationsOverviewProps> = ({
  camera,
  loading = false
}) => {
  // Generate static station data based on camera ID with targets and current values
  const cameraStations = useMemo(() => {
    if (!camera) return [];
    
    const stationTypes = ['Dismantling-Station', 'Assembly-Station', 'Quality-Station', 'Repair-Station'];
    const stationNumbers = ['2-3', '1-4', '5-6', '3-7', '8-9'];
    
    // Use camera ID as seed for consistent results
    const seed = camera.id || 1;
    const numStations = ((seed * 3) % 3) + 3; // Generate 3-5 stations consistently
    const stations = [];
    
    for (let i = 0; i < numStations; i++) {
      const stationTypeIndex = (seed + i * 2) % stationTypes.length;
      const stationNumberIndex = (seed + i * 3) % stationNumbers.length;
      const stationType = stationTypes[stationTypeIndex];
      const stationNumber = stationNumbers[stationNumberIndex];
      
      // Generate target and current values
      const target = 50 + ((seed + i * 5) % 50); // 50-100 range
      const current = Math.floor(target * (0.6 + ((seed + i * 7) % 40) / 100)); // 60-100% of target
      
      stations.push({
        name: `${stationType}-${stationNumber}`,
        current,
        target,
        percentage: Math.round((current / target) * 100)
      });
    }
    
    return stations;
  }, [camera?.id]); // Only regenerate if camera ID changes

  const averagePerformance = useMemo(() => {
    if (cameraStations.length === 0) return 0;
    return Math.round(cameraStations.reduce((acc, station) => acc + station.percentage, 0) / cameraStations.length);
  }, [cameraStations]);

  if (!camera && !loading) {
    return null;
  }

  if (loading) {
    return (
      <Row className="h-full bg-white rounded-lg shadow-sm p-4">
        <Row gutter={[16, 16]} className="overflow-hidden h-full w-full">
          <Col xs={24} md={12}>
            <div className="h-6 w-32 bg-gray-300 animate-pulse rounded mb-4" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-gray-200 animate-pulse rounded" />
              ))}
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-40 h-40 bg-gray-300 animate-pulse rounded-full mb-4" />
              <div className="h-6 w-32 bg-gray-300 animate-pulse rounded mb-2" />
              <div className="h-4 w-40 bg-gray-300 animate-pulse rounded" />
            </div>
          </Col>
        </Row>
      </Row>
    );
  }

  return (
    <Row className="h-full bg-white rounded-lg shadow-sm p-4">
      <Row gutter={[16, 16]} className="overflow-hidden h-full w-full">
        {/* Left Half - Stations List */}
        <Col xs={24} md={12}>
          <Title level={5}>Stations Overview</Title>
          <div className="space-y-2 h-full overflow-y-auto">
            {cameraStations.map((station, index) => (
              <div
                key={index}
                className="!bg-white !border !border-gray-200 hover:!bg-gray-50 !transition-all !duration-200 !p-2 !rounded-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="!text-base font-medium text-gray-800">{station.name}</div>
                    <div className="flex items-baseline gap-1 !mt-1">
                      <span className="!text-sm text-gray-600">Target:</span>
                      <span className="!text-sm font-bold text-gray-900">
                        {station.current}/{station.target}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <div className="!text-xs font-semibold text-gray-700">
                      {station.percentage}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
        
        {/* Right Half - Progress Bar */}
        <Col xs={24} md={12} className="h-full">
          <div className="flex flex-col items-center justify-center !p-2 h-full">
            <Progress
              type="circle"
              percent={averagePerformance}
              size={160}
              strokeColor={{
                '0%': '#10B981',
                '100%': '#3B82F6',
              }}
              trailColor="#f3f4f6"
              strokeWidth={6}
              format={(percent) => (
                <div className="text-center">
                  <div className="!text-xl font-bold text-gray-900">{percent}%</div>
                  <div className="!text-base text-gray-500">avg</div>
                </div>
              )}
            />
            <div className="!mt-3 text-center">
              <div className="!text-lg text-gray-700">Overall Performance</div>
              <div className="!text-sm text-gray-500 !mt-1">
                Average across all stations
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Row>
  );
};

export default CameraStationsOverview; 