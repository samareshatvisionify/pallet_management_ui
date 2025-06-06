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
    const numStations = ((seed * 3) % 3) + 5; // Generate 3-5 stations consistently
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full">
        <div className="px-6 py-4 h-full flex flex-col">
          {/* Header with Divider */}
          <div className="mb-4">
            <div className="h-6 w-32 bg-gray-300 animate-pulse rounded mb-2" />
            <div className="w-full h-px bg-gray-200"></div>
          </div>

          <Row gutter={[24, 0]} className="flex-1 min-h-0">
            <Col xs={24} md={12} className="h-full">
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 animate-pulse rounded-lg" />
                ))}
              </div>
            </Col>
            <Col xs={24} md={12} className="h-full">
              <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-100 p-4">
                <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-full mb-4" />
                <div className="h-5 w-28 bg-gray-300 animate-pulse rounded mb-2" />
                <div className="h-4 w-36 bg-gray-300 animate-pulse rounded" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="px-6 py-4 h-full flex flex-col">
        {/* Header with Divider */}
        <div className="mb-4">
          <Title level={5} className="!mb-2 text-gray-900">Stations Overview</Title>
          <div className="w-full h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        </div>

        <Row gutter={[24, 0]} className="flex-1 min-h-0">
          {/* Left Half - Stations List */}
          <Col xs={24} md={12} className="h-full">
            <div className="h-full flex flex-col">
              <div 
                className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-55"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#d1d5db #f9fafb'
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    width: 6px;
                  }
                  div::-webkit-scrollbar-track {
                    background: #f9fafb;
                    border-radius: 3px;
                  }
                  div::-webkit-scrollbar-thumb {
                    background: #d1d5db;
                    border-radius: 3px;
                  }
                  div::-webkit-scrollbar-thumb:hover {
                    background: #9ca3af;
                  }
                `}</style>
                {cameraStations.map((station, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-sm transition-all duration-200 p-3 rounded-lg group flex-shrink-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate mb-1">
                          {station.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Target:</span>
                          <span className="text-xs font-bold text-gray-800">
                            {station.current}/{station.target}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            {station.percentage}%
                          </div>
                          <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                              style={{ width: `${station.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          
          {/* Right Half - Performance Meter */}
          <Col xs={24} md={12} className="h-full">
            <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 p-4">
              <div className="text-center mb-4">
                <Progress
                  type="circle"
                  percent={averagePerformance}
                  size={120}
                  strokeColor={{
                    '0%': '#3B82F6',
                    '100%': '#1D4ED8',
                  }}
                  trailColor="#E5E7EB"
                  strokeWidth={8}
                  format={(percent) => (
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">{percent}%</div>
                      <div className="text-sm text-gray-500 font-medium">avg</div>
                    </div>
                  )}
                />
              </div>
              <div className="text-center">
                <div className="text-base font-semibold text-gray-800 mb-1">
                  Overall Performance
                </div>
                <div className="text-sm text-gray-500">
                  Average across all stations
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CameraStationsOverview; 