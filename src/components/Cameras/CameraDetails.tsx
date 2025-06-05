'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Typography, Tag, Button, Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Camera } from '@/demoData/cameraData';
import CameraStats from './CameraStats';
import { 
  CameraActivityTimelineChart, 
  CameraHourlyActivityChart, 
  CameraWeeklyTrendChart 
} from '@/components/common/charts';

const { Title } = Typography;

interface CameraDetailsProps {
  camera: Camera;
  onBack: () => void;
}

const CameraDetails: React.FC<CameraDetailsProps> = ({ camera, onBack }) => {
  const [selectedActivity, setSelectedActivity] = useState('Making');

  return (
    <div className="w-full">
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
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: camera.status === 'online' ? '#52c41a' : camera.status === 'offline' ? '#ff4d4f' : '#faad14' }}
          />
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
                {/* Only show LIVE indicator if camera is online */}
                {camera.status === 'online' && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-500 text-sm font-medium">LIVE</span>
                  </div>
                )}
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
                  src={camera.imagePath}
                  alt={`${camera.name} live feed`}
                  className="w-full h-full object-cover"
                  preview={false}
                />
                
                {/* Offline overlay */}
                {camera.status !== 'online' && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-lg font-semibold mb-2">Camera Offline</div>
                      <div className="text-sm opacity-75">Status: {camera.status}</div>
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
          <CameraStats camera={camera} />
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