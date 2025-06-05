'use client';

import React from 'react';
import { Card, Progress, Tag, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons';
import { PerformanceMetric } from '@/demoData';
import TrackingDetails from './TrackingDetails';

interface PerformanceCardProps {
  metric: PerformanceMetric;
  loading?: boolean;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  metric,
  loading = false
}) => {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <ArrowUpOutlined className="text-green-500" />;
      case 'down':
        return <ArrowDownOutlined className="text-red-500" />;
      case 'stable':
        return <MinusOutlined className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getProgressColor = () => {
    if (metric.isTargetMet) {
      return {
        '0%': '#10b981',
        '100%': '#059669'
      };
    } else if (metric.percentage >= 80) {
      return {
        '0%': '#f59e0b',
        '100%': '#d97706'
      };
    } else {
      return {
        '0%': '#ef4444',
        '100%': '#dc2626'
      };
    }
  };

  if (loading) {
    return (
      <Card className="h-full shadow-sm border border-gray-200 animate-pulse">
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="h-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex flex-col h-full">
        {/* Fixed Content */}
        <div className="space-y-4">
          {/* Header with Title and Status */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 mb-0">
              {metric.title}
            </h3>
            <Tag 
              color={metric.isTargetMet ? 'green' : 'orange'}
              className="text-xs font-medium border-0"
            >
              {metric.isTargetMet ? 'Target Met' : 'Target Not Met'}
            </Tag>
          </div>

          {/* Current/Target Counts */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {metric.current.toLocaleString()}
            </span>
            <span className="text-sm text-gray-600">
              / {metric.target.toLocaleString()}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress
              percent={Math.min(metric.percentage, 100)}
              strokeColor={getProgressColor()}
              trailColor="#f3f4f6"
              showInfo={false}
              className="mb-2"
            />
            
            {/* Progress Percentage */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {metric.percentage.toFixed(1)}% of target
              </span>
              
              {/* Trend Indicator */}
              <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                {getTrendIcon()}
                <span className="font-medium">
                  {Math.abs(metric.change).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {metric.isTargetMet && (
            <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
              {((metric.current - metric.target) / metric.target * 100).toFixed(1)}% above target
            </div>
          )}
          
          {!metric.isTargetMet && (
            <div className="text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded">
              {metric.target - metric.current} units to reach target
            </div>
          )}
        </div>

        {/* Tracking Details Section - Takes remaining space */}
        <div className="flex-1 flex flex-col mt-4">
          <Divider className="my-0 mb-4" />
          <div className="flex-1">
            <TrackingDetails
              stations={metric.tracking.stations}
              zones={metric.tracking.zones}
              cameras={metric.tracking.cameras}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceCard; 