'use client';

import React from 'react';
import { Card, Row, Col } from 'antd';
import { 
  CameraOutlined, 
  CheckCircleOutlined, 
  BarChartOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import { Camera } from '@/demoData/cameraData';

interface CameraStatsProps {
  camera: Camera;
}

const CameraStats: React.FC<CameraStatsProps> = ({ camera }) => {
  // Color scheme
  const colors = {
    primary: '#484848',
    secondary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    light: '#F8FAFC',
    border: '#E2E8F0'
  };

  const getStatusColor = () => {
    switch (camera.status) {
      case 'online':
        return colors.success;
      case 'offline':
        return colors.danger;
      case 'maintenance':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12}>
        <Card 
          className="h-full border border-gray-200 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#F8FAFC' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm mb-1 font-medium">Status</div>
              <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2 capitalize">
                {camera.status}
              </div>
              <div className="text-gray-500 text-xs">Camera active status</div>
            </div>
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: getStatusColor() }}
            >
              <CameraOutlined className="text-white text-2xl"/>
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12}>
        <Card 
          className="h-full border border-gray-200 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#F8FAFC' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm mb-1 font-medium">Today&apos;s Total</div>
              <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2">
                {camera.todaysTotal}
              </div>
              <div className="text-gray-500 text-xs">Objects processed</div>
            </div>
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200"
            >
              <BarChartOutlined className="text-white text-2xl" style={{ color: colors.secondary }}/>
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12}>
        <Card 
          className="h-full border border-gray-200 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#F8FAFC' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm mb-1 font-medium">Efficiency</div>
              <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2 flex items-baseline gap-1">
                {camera.efficiency}
                <span className="text-lg">%</span>
              </div>
              <div className="text-gray-500 text-xs">Performance rate</div>
            </div>
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200"
            >
              <CheckCircleOutlined className="text-white text-2xl" style={{ color: colors.success }}/>
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12}>
        <Card 
          className="h-full border border-gray-200 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#F8FAFC' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm mb-1 font-medium">Recording</div>
              <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2">
                {camera.recording ? 'Active' : 'Stopped'}
              </div>
              <div className="text-gray-500 text-xs">Recording status</div>
            </div>
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200"
            >
              <PlayCircleOutlined 
                className="text-white text-2xl" 
                style={{ color: camera.recording ? colors.danger : colors.primary }}
              />
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default CameraStats; 