'use client';

import React from 'react';
import { Row, Col, Typography } from 'antd';
import { PerformanceData } from '@/demoData';
import PerformanceCard from './PerformanceCard';

const { Title } = Typography;

interface PerformanceOverviewProps {
  data: PerformanceData;
  loading?: boolean;
}

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({
  data,
  loading = false
}) => {
  return (
    <div className="w-full">
      {/* Section Title */}
      <div className="mb-6">
        <Title level={3} className="!mb-2 text-gray-800">
          Performance Overview
        </Title>
        <p className="text-gray-600 text-sm mb-0">
          Real-time tracking of production metrics and targets across all operations
        </p>
      </div>

      {/* Responsive Two-Section Layout */}
      <Row gutter={[24, 24]}>
        {/* Pallets Section */}
        <Col xs={24} lg={14} xl={15}>
          <div className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              <Title level={4} className="!mb-0 text-gray-700">
                Pallets
              </Title>
            </div>
            
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <PerformanceCard 
                  metric={data.pallets.manufactured} 
                  loading={loading}
                />
              </Col>
              <Col xs={24} md={8}>
                <PerformanceCard 
                  metric={data.pallets.repaired} 
                  loading={loading}
                />
              </Col>
              <Col xs={24} md={8}>
                <PerformanceCard 
                  metric={data.pallets.dismantled} 
                  loading={loading}
                />
              </Col>
            </Row>
          </div>
        </Col>

        {/* Boards Section */}
        <Col xs={24} lg={10} xl={9}>
          <div className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-green-500 rounded-full"></div>
              <Title level={4} className="!mb-0 text-gray-700">
                Boards
              </Title>
            </div>
            
            <Row gutter={[16, 16]} className='h-[calc(100%-60px)]'>
              <Col xs={24} sm={12} lg={24} xl={12}>
                <PerformanceCard 
                  metric={data.boards.boards} 
                  loading={loading}
                />
              </Col>
              <Col xs={24} sm={12} lg={24} xl={12}>
                <PerformanceCard 
                  metric={data.boards.trimSaw} 
                  loading={loading}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PerformanceOverview; 