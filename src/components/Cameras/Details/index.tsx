'use client';

import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Typography, Tag, Button, Image, Switch, Tooltip, Progress, Alert } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined, BarChartOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Camera } from '@/demoData/cameraData';
import { StatCard } from '@/components';
import { 
  CameraActivityTimelineChart, 
  CameraHourlyActivityChart, 
  CameraWeeklyTrendChart 
} from '@/components/common/charts';

const { Title } = Typography;

interface CameraDetailsProps {
  camera?: Camera;
  loading?: boolean;
  error?: string | null;
  onClearError?: () => void;
  onBack: () => void;
}

const CameraDetails: React.FC<CameraDetailsProps> = ({ 
  camera, 
  loading = false, 
  error = null, 
  onClearError,
  onBack 
}) => {
  const [selectedActivity, setSelectedActivity] = useState('Making');
  const [cameraEnabled, setCameraEnabled] = useState(camera?.status === 'online');

  // Get status tooltip text
  const getStatusTooltip = (status: Camera['status']) => {
    switch (status) {
      case 'online':
        return 'This camera is online';
      case 'offline':
        return 'This camera is offline';
      case 'maintenance':
        return 'This camera is under maintenance';
      default:
        return 'Camera status unknown';
    }
  };

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

  if (loading) {
    return (
      <div className="w-full p-6">
        <Card loading={true} className="h-96">
          <div className="text-center">Loading camera details...</div>
        </Card>
      </div>
    );
  }

  if (!camera) {
    return (
      <div className="w-full p-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
          className="mb-4"
        >
          Back to Cameras
        </Button>
        <Alert
          message="Camera Not Found"
          description="The requested camera could not be found."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Error Alert */}
      {error && onClearError && (
        <Alert
          message="Error"
          description={error}
          type="error"
          closable
          onClose={onClearError}
          className="mb-6"
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
          size="large"
          className="flex items-center"
        >
          Back
        </Button>
        <div className="flex items-center gap-3">
          <Tooltip title={getStatusTooltip(camera.status)} placement="top">
            <div 
              className="w-3 h-3 rounded-full cursor-help"
              style={{ backgroundColor: camera.status === 'online' ? '#52c41a' : camera.status === 'offline' ? '#ff4d4f' : '#faad14' }}
            />
          </Tooltip>
          <Title level={2} className="!mb-0">
            {camera.name}
          </Title>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {/* Left Side - Live Feed */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex items-center justify-between">
                {/* Toggle Switch for Camera Enable/Disable */}
                <div className="flex items-center gap-3 ml-2">
                  <Switch
                    checked={cameraEnabled}
                    onChange={setCameraEnabled}
                    checkedChildren={
                      <span className="text-xs font-medium text-white">
                        Enabled
                      </span>
                    }
                    unCheckedChildren={
                      <span className="text-xs font-medium text-white">
                        Disabled
                      </span>
                    }
                    style={{
                      backgroundColor: cameraEnabled ? '#52c41a' : '#ff4d4f',
                      minWidth: '90px'
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {camera.appliedScenarios.map((scenario, index) => (
                    <Tag key={index} color="blue" className="text-xs">
                      {scenario}
                    </Tag>
                  ))}
                </div>
              </div>
            }
            className="h-full"
          >
            <div className="relative">
              {/* Placeholder for RTSP video player */}
              <div className="bg-black rounded-lg relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <Image
                  alt={`${camera.name} live feed`}
                  className="w-full h-full object-cover"
                  preview={false}
                />
                
                {/* Offline overlay */}
                {!cameraEnabled && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-lg font-semibold mb-2">Camera Disabled</div>
                      <div className="text-sm opacity-75">Enable camera to view feed</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera ID overlay */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm font-mono">
                c75c8890-b8c8-4721-8d6d-cce938e56e7a - {camera.zone}
              </div>
            </div>
          </Card>
        </Col>

        {/* Right Side - Stats */}
        <Col xs={24} lg={12}>
          <div className="h-full flex flex-col">
            {/* Stats Cards - Half the height */}
            <Row gutter={[16, 16]} className="flex-shrink-0 mb-6">
              <Col xs={24} sm={12}>
                <StatCard
                  title="Today's Total"
                  value={camera.todaysTotal}
                  subtitle="Objects processed"
                  icon={<BarChartOutlined />}
                  iconColor="#3B82F6"
                  loading={loading}
                />
              </Col>

              <Col xs={24} sm={12}>
                <StatCard
                  title="Efficiency"
                  value={camera.efficiency}
                  suffix="%"
                  subtitle="Performance rate"
                  icon={<CheckCircleOutlined />}
                  iconColor="#10B981"
                  loading={loading}
                />
              </Col>
            </Row>

            {/* Stations Section */}
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
                            <div className="flex-1 ">
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
                        percent={Math.round(cameraStations.reduce((acc, station) => acc + station.percentage, 0) / cameraStations.length)}
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
          </div>
        </Col>
      </Row>

      {/* Activity Charts Section - One chart per line with proper spacing */}
      <div className="mt-8 space-y-8">
        {/* Activity Timeline */}
        <div className="mb-8">
          <CameraActivityTimelineChart 
            cameraName={camera.name}
            onActivityChange={setSelectedActivity}
          />
        </div>
        
        {/* Hourly Activity Chart */}
        <div className="mb-8">
          <CameraHourlyActivityChart selectedActivity={selectedActivity} />
        </div>
        
        {/* Weekly Trend Chart */}
        <div className="mb-8">
          <CameraWeeklyTrendChart cameraName={camera.name} />
        </div>
      </div>
    </div>
  );
};

export default CameraDetails; 