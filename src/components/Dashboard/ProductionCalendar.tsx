'use client';

import React, { useState } from 'react';
import { Calendar, Card, Row, Col, Typography, Button, Select } from 'antd';
import { CalendarOutlined, LeftOutlined, RightOutlined, EyeOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { CalendarData, CalendarDayData } from '@/demoData/palletData';

const { Title, Text } = Typography;

interface ProductionCalendarProps {
  data: CalendarData;
  loading?: boolean;
}

const ProductionCalendar: React.FC<ProductionCalendarProps> = ({ 
  data,
  loading = false 
}) => {
  const [selectedDate, setSelectedDate] = useState<CalendarDayData | null>(() => {
    const today = dayjs().format('YYYY-MM-DD');
    return data.days.find(day => day.date === today) || data.days[0];
  });
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const getStatusColor = (status: CalendarDayData['status']) => {
    switch (status) {
      case 'above-target':
        return '#10b981'; // green
      case 'meeting-target':
        return '#f59e0b'; // yellow/orange
      case 'below-target':
        return '#ef4444'; // red
      case 'poor-performance':
        return '#dc2626'; // dark red
      default:
        return '#d1d5db'; // gray
    }
  };

  const getDataForDate = (date: Dayjs): CalendarDayData | null => {
    const dateString = date.format('YYYY-MM-DD');
    return data.days.find(day => day.date === dateString) || null;
  };

  const cellRender = (date: Dayjs) => {
    const dayData = getDataForDate(date);
    
    if (!dayData || dayData.production === 0) {
      return (
        <div className="h-8 flex flex-col justify-center items-center">
        </div>
      );
    }

    
    return (
    <div 
        className={`h-8 flex flex-col justify-center items-center cursor-pointer relative overflow-hidden transition-all duration-200`}
        onClick={() => setSelectedDate(dayData)}
    >
    {/* Color bar at bottom */}
    <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: getStatusColor(dayData.status) }}
    />
    
    <span className="text-xs text-gray-600 font-medium">
        {dayData.production.toLocaleString()}
    </span>
    </div>
    );
  };

  const headerRender = ({ value, onChange }: any) => {
    const monthYear = value.format('MMMM YYYY');
    
    return (
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <CalendarOutlined className="text-blue-500 text-xl" />
          <div>
            <Title level={3} className="!mb-0 text-gray-800">
              Production Calendar
            </Title>
            <Text className="text-gray-600 text-sm">
              Track daily production performance across all stations
            </Text>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Select
            defaultValue="all-types"
            className="min-w-[120px]"
            size="small"
            options={[
              { value: 'all-types', label: 'All Types' },
              { value: 'pallets', label: 'Pallets Only' },
              { value: 'boards', label: 'Boards Only' }
            ]}
          />
          
          <div className="flex items-center gap-2">
            <Button
              type="text"
              icon={<LeftOutlined />}
              onClick={() => onChange(value.subtract(1, 'month'))}
              size="small"
            />
            <span className="text-lg font-semibold text-gray-800 min-w-[140px] text-center">
              {monthYear}
            </span>
            <Button
              type="text"
              icon={<RightOutlined />}
              onClick={() => onChange(value.add(1, 'month'))}
              size="small"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Row gutter={24}>
        {/* Calendar Section */}
        <Col xs={24} lg={16}>
          <Card className="shadow-sm border border-gray-200">
            <Calendar
              cellRender={cellRender}
              headerRender={headerRender}
              value={currentMonth}
              onChange={setCurrentMonth}
              mode="month"
            />
            
            {/* Legend */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 rounded" style={{ backgroundColor: '#10b981' }} />
                  <Text className="text-sm text-gray-600">Above Target</Text>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 rounded" style={{ backgroundColor: '#f59e0b' }} />
                  <Text className="text-sm text-gray-600">Meeting Target</Text>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 rounded" style={{ backgroundColor: '#ef4444' }} />
                  <Text className="text-sm text-gray-600">Below Target</Text>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 rounded" style={{ backgroundColor: '#dc2626' }} />
                  <Text className="text-sm text-gray-600">Poor Performance</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Details Panel */}
        <Col xs={24} lg={8}>
          {selectedDate && (
            <Card className="shadow-sm border border-gray-200 h-full">
              <div className="text-center mb-6">
                <Title level={4} className="!mb-2 text-gray-800">
                  {dayjs(selectedDate.date).format('MMM D, YYYY')}
                </Title>
              </div>

              {/* Production Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {selectedDate.production.toLocaleString()}
                  </div>
                  <Text className="text-sm text-blue-600 font-medium">Production</Text>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {selectedDate.target.toLocaleString()}
                  </div>
                  <Text className="text-sm text-gray-600 font-medium">Target</Text>
                </div>
              </div>

              {/* Efficiency */}
              <div className="text-center mb-6">
                <div className="text-2xl font-bold mb-1" style={{ 
                  color: getStatusColor(selectedDate.status) 
                }}>
                  {selectedDate.efficiency.toFixed(0)}%
                </div>
                <Text className="text-sm text-gray-600">Efficiency</Text>
                <div className="flex justify-center mt-1">
                  {selectedDate.efficiency > 100 ? (
                    <span className="text-xs text-red-500">↗</span>
                  ) : (
                    <span className="text-xs text-red-500">↘</span>
                  )}
                </div>
              </div>

              {/* Station Breakdown */}
              <div className="mb-6">
                <Title level={5} className="!mb-3 text-gray-700">
                  Station Breakdown
                </Title>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Text className="text-sm text-gray-600">Dismantle</Text>
                    <Text className="text-sm font-semibold text-gray-800">
                      {selectedDate.breakdown.dismantle}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text className="text-sm text-gray-600">Boards</Text>
                    <Text className="text-sm font-semibold text-gray-800">
                      {selectedDate.breakdown.boards}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text className="text-sm text-gray-600">Trim Saw</Text>
                    <Text className="text-sm font-semibold text-gray-800">
                      {selectedDate.breakdown.trimSaw}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text className="text-sm text-gray-600">New Pallet</Text>
                    <Text className="text-sm font-semibold text-gray-800">
                      {selectedDate.breakdown.newPallet}
                    </Text>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <Button 
                type="primary"
                block
                icon={<EyeOutlined />}
                className="bg-gray-800 border-gray-800 hover:bg-gray-700"
              >
                View Details
              </Button>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductionCalendar; 