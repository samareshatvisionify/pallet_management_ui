'use client';

import React from 'react';
import { Card, Row, Col } from 'antd';
import {
  EnvironmentOutlined,
  TrophyOutlined,
  AimOutlined
} from '@ant-design/icons';
import { ZoneStats as ZoneStatsType } from '@/store/slices/zoneSlice';

interface ZoneStatsProps {
  stats: ZoneStatsType;
  loading: boolean;
}

const ZoneStats: React.FC<ZoneStatsProps> = ({ stats, loading }) => {
  // Color scheme
  const colors = {
    primary: '#484848',
    secondary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
  };

  return (
    <Row gutter={[16, 16]} className="mb-8">
      <Col xs={12} sm={6}>
        <Card 
          className="h-full border border-gray-200 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#F8FAFC' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm mb-1 font-medium">Total Zones</div>
              <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2">
                {stats.totalZones}
              </div>
              <div className="text-gray-500 text-xs">Active monitoring</div>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200">
              <EnvironmentOutlined className="text-white text-2xl" style={{ color: colors.primary }}/>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card 
          className="h-full border border-gray-200 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#F8FAFC' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm mb-1 font-medium">Avg Efficiency</div>
              <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2 flex items-baseline gap-1">
                {stats.avgEfficiency}
                <span className="text-lg">%</span>
              </div>
              <div className="text-gray-500 text-xs">System performance</div>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200">
              <TrophyOutlined className="text-white text-2xl" style={{ color: colors.secondary }}/>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card 
          className="h-full border border-gray-200 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#F8FAFC' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm mb-1 font-medium">Target Progress</div>
              <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2 flex items-baseline gap-1">
                {stats.targetAchieved}
                <span className="text-lg">%</span>
              </div>
              <div className="text-gray-500 text-xs">Overall completion</div>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200">
              <AimOutlined className="text-white text-2xl" style={{ color: colors.warning }}/>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card 
          className="h-full border border-gray-200 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#F8FAFC' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm mb-1 font-medium">Zones Met Target</div>
              <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2">
                {stats.zonesMetTarget}
              </div>
              <div className="text-gray-500 text-xs">Goals achieved</div>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200">
              <TrophyOutlined className="text-white text-2xl" style={{ color: colors.success }}/>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ZoneStats; 