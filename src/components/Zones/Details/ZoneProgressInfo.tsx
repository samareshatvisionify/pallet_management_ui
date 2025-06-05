'use client';

import React from 'react';
import { Card, Row, Col, Typography, Progress, Badge } from 'antd';
import { 
  EnvironmentOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  RiseOutlined
} from '@ant-design/icons';
import { Zone } from '@/store/slices/zoneSlice';

const { Text } = Typography;

interface ZoneProgressInfoProps {
  zone: Zone;
  calculateZoneProgress: (zone: Zone) => {
    percentage: number;
    isOnTarget: boolean;
    remaining: number;
  };
}

const ZoneProgressInfo: React.FC<ZoneProgressInfoProps> = ({
  zone,
  calculateZoneProgress
}) => {
  const progress = calculateZoneProgress(zone);

  return (
    <Card className="h-full overflow-hidden">
      <div className="h-full flex flex-col p-2">
        {/* Header with Progress */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 mb-5 flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <Text className="text-base font-semibold text-gray-700">Progress Overview</Text>
            </div>
            <Badge 
              status={progress.isOnTarget ? "success" : "warning"} 
              text={progress.isOnTarget ? "On Target" : "Needs Attention"}
            />
          </div>
          
          <Row gutter={20} align="middle" className="h-full">
            <Col xs={24} sm={12}>
              <div className="text-center py-2">
                <Progress
                  type="circle"
                  percent={progress.percentage}
                  size={120}
                  strokeWidth={10}
                  strokeColor={{
                    '0%': progress.isOnTarget ? '#52c41a' : 
                          progress.percentage > 70 ? '#faad14' : '#ff4d4f',
                    '100%': progress.isOnTarget ? '#52c41a' : 
                           progress.percentage > 70 ? '#faad14' : '#ff4d4f',
                  }}
                  format={(percent) => (
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{percent}%</div>
                      <div className="text-sm text-gray-500">Complete</div>
                    </div>
                  )}
                />
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="space-y-4 mt-4 sm:mt-0">
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircleOutlined className="text-green-500 text-base" />
                    Current
                  </span>
                  <span className="font-bold text-gray-800 text-base">{zone.currentCount}</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <TrophyOutlined className="text-blue-500 text-base" />
                    Target
                  </span>
                  <span className="font-bold text-gray-800 text-base">{zone.targetCount}</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <RiseOutlined className="text-orange-500 text-base" />
                    Remaining
                  </span>
                  <span className="font-bold text-gray-800 text-base">{progress.remaining}</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Zone Information Grid */}
        <div className="bg-gray-50 rounded-lg p-5 flex-1">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <Text className="text-base font-semibold text-gray-700">Zone Information</Text>
          </div>
          
          <Row gutter={[16, 16]} className="h-full">
            <Col xs={24} sm={12}>
              <div className="bg-white rounded-lg p-4 border border-gray-200 h-full flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <EnvironmentOutlined className="text-blue-500 text-base" />
                  <Text className="text-sm text-gray-500 uppercase tracking-wide font-medium">Zone ID</Text>
                </div>
                <Text strong className="text-base">{zone.id}</Text>
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="bg-white rounded-lg p-4 border border-gray-200 h-full flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <ClockCircleOutlined className="text-green-500 text-base" />
                  <Text className="text-sm text-gray-500 uppercase tracking-wide font-medium">Previous Count</Text>
                </div>
                <Text strong className="text-base">{zone.previousCount} units</Text>
              </div>
            </Col>
            
            <Col xs={24}>
              <div className="bg-white rounded-lg p-4 border border-gray-200 h-full flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <ClockCircleOutlined className="text-purple-500 text-base" />
                  <Text className="text-sm text-gray-500 uppercase tracking-wide font-medium">Last Updated</Text>
                </div>
                <Text strong className="text-base">
                  {new Date(zone.lastUpdated).toLocaleString()}
                </Text>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default ZoneProgressInfo; 