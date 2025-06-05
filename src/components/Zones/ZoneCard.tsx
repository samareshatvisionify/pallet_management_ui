'use client';

import React from 'react';
import { Card, Typography, Progress } from 'antd';
import { Zone } from '@/store/slices/zoneSlice';

const { Text } = Typography;

interface ZoneCardProps {
  zone: Zone;
  calculateZoneProgress: (zone: Zone) => {
    percentage: number;
    isOnTarget: boolean;
    remaining: number;
  };
  getPerformanceIndicator: (performanceChange: number) => {
    type: 'positive' | 'negative' | 'neutral';
    icon: string;
    color: string;
    text: string;
  };
  getStatusColor: (status: Zone['status']) => string;
  onUpdateZoneStatus?: (zoneId: string, status: Zone['status']) => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({
  zone,
  calculateZoneProgress,
  getPerformanceIndicator,
  getStatusColor,
  onUpdateZoneStatus
}) => {
  const progress = calculateZoneProgress(zone);
  const performance = getPerformanceIndicator(zone.performanceChange);

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

  const getStatusBadgeStyle = (status: Zone['status']) => {
    switch (status) {
      case 'active':
        return { backgroundColor: colors.success, color: 'white' };
      case 'warning':
        return { backgroundColor: colors.warning, color: 'white' };
      case 'inactive':
        return { backgroundColor: colors.danger, color: 'white' };
      default:
        return { backgroundColor: colors.primary, color: 'white' };
    }
  };

  const statusStyle = getStatusBadgeStyle(zone.status);

  return (
    <Card
      className="h-full !p-0 border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden"
    >
      {/* Header Section */}
      <div className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <Text className="text-lg font-bold text-gray-900 block truncate">
              {zone.name}
            </Text>
          </div>
          <div 
            className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ml-4 flex-shrink-0"
            style={statusStyle}
          >
            {zone.status}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="py-2 bg-white/50">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-gray-600">Current:</span>
              <span className="text-xl font-bold text-gray-900">{zone.currentCount}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-gray-600">Target:</span>
              <span className="text-lg font-semibold text-gray-700">{zone.targetCount}</span>
            </div>
          </div>
          <div className="flex-shrink-0 ml-6">
            <Progress
              type="circle"
              percent={progress.percentage}
              size={90}
              strokeColor={{
                '0%': progress.isOnTarget ? colors.success : 
                      progress.percentage > 70 ? colors.warning : colors.danger,
                '100%': progress.isOnTarget ? colors.success : 
                       progress.percentage > 70 ? colors.warning : colors.danger,
              }}
              trailColor="#f3f4f6"
              strokeWidth={8}
              format={(percent) => (
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900">{percent}%</div>
                  <div className="text-xs text-gray-500 font-medium">progress</div>
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="py-2">
        <div className="flex items-center justify-between bg-gray-50 rounded-xl py-4 px-1">
          <div className="flex-1 mr-3">
            <div className="text-sm font-medium text-gray-600 mb-1">Efficiency</div>
            <div className="text-xl font-bold text-gray-900">{zone.efficiency.toFixed(1)}%</div>
          </div>
          <div className="flex-1 ml-3 flex flex-col items-end justify-center">
            <div className="text-sm font-medium text-gray-600 mb-1">vs Last Period</div>
            <div className="flex items-center gap-2">
              <span className="text-lg" style={{ color: performance.color }}>{performance.icon}</span>
              <span className="text-base font-bold" style={{ color: performance.color }}>
                {performance.text}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stations Section */}
      <div className="py-2 bg-white/30">
        <div className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Stations ({zone.stations.length})
        </div>
        <div className="flex flex-wrap gap-2">
          {zone.stations.map((station) => (
            <span
              key={station.id}
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-white text-gray-800 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <div 
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: station.status === 'active' ? colors.success : 
                                 station.status === 'maintenance' ? colors.warning : colors.danger
                }}
              ></div>
              <span>{station.name}</span>
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ZoneCard; 