'use client';

import React from 'react';
import { Card, Row, Col } from 'antd';
import { Camera } from '@/demoData/cameraData';
import DashboardCameraCard from './DashboardCameraCard';

interface CameraStatusCardProps {
  cameras: Camera[];
  loading?: boolean;
}

const CameraStatusCard: React.FC<CameraStatusCardProps> = ({ cameras, loading = false }) => {
  const maxCamerasBeforeScroll = 6;
  const shouldShowScroll = cameras.length > maxCamerasBeforeScroll;

    return (
    <Card 
      title="Camera Status"
      loading={loading}
      className="h-full"
    >
      <div 
        className={`${shouldShowScroll ? 'max-h-96 overflow-y-auto' : ''} overflow-x-hidden px-1`}
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
        <Row gutter={[8, 8]}>
          {cameras.map((camera) => (
            <Col xs={24} sm={12} md={8} key={camera.id}>
              <DashboardCameraCard camera={camera} />
            </Col>
          ))}
        </Row>
      </div>
    </Card>
  );
};

export default CameraStatusCard; 