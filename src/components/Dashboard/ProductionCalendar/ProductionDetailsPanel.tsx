'use client';

import React from 'react';
import { Card, Typography, Button, Progress, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { CalendarDayData } from '@/demoData/palletData';

interface ProductionDetailsPanelProps {
  selectedDate: CalendarDayData | null;
  onViewDetails: () => void;
}

const ProductionDetailsPanel: React.FC<ProductionDetailsPanelProps> = ({
  selectedDate,
  onViewDetails
}) => {
  if (!selectedDate) {
    return null;
  }

  return (
    <Card className="shadow-sm border border-gray-100 h-full">
      {/* Header */}
      <div className="pb-6 border-b border-gray-100">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {dayjs(selectedDate.date).format('MMM D, YYYY')}
          </h3>
          <p className="text-sm text-gray-500">Production Summary</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="py-6 space-y-6">
        {/* Circular Progress */}
        <div className="bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <Tooltip title={`Production: ${selectedDate.production.toLocaleString()} | Target: ${selectedDate.target.toLocaleString()}`}>
              <Progress
                type="circle"
                percent={Math.min(selectedDate.efficiency, 100)}
                size={180}
                strokeWidth={8}
                strokeColor={
                  selectedDate.efficiency >= 100 
                    ? '#10b981' 
                    : selectedDate.efficiency >= 75 
                    ? '#f59e0b' 
                    : '#ef4444'
                }
                trailColor="#e5e7eb"
                format={() => (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedDate.efficiency.toFixed(0)}%
                    </div>
                    <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Efficiency
                    </div>
                  </div>
                )}
              />
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Station Breakdown */}
      <div className="py-6 border-t border-gray-100">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Station Breakdown
          </h4>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Dismantle</span>
            <span className="text-sm font-bold text-gray-900">
              {selectedDate.breakdown.dismantle}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Boards</span>
            <span className="text-sm font-bold text-gray-900">
              {selectedDate.breakdown.boards}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Trim Saw</span>
            <span className="text-sm font-bold text-gray-900">
              {selectedDate.breakdown.trimSaw}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">New Pallet</span>
            <span className="text-sm font-bold text-gray-900">
              {selectedDate.breakdown.newPallet}
            </span>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="pt-6 border-t border-gray-100">
        <Button
          type="primary"
          block
          icon={<EyeOutlined />}
          className="bg-gray-900 border-gray-900 hover:bg-gray-800 hover:border-gray-800 h-10 text-sm font-medium"
          onClick={onViewDetails}
        >
          View Detailed Report
        </Button>
      </div>
    </Card>
  );
};

export default ProductionDetailsPanel; 