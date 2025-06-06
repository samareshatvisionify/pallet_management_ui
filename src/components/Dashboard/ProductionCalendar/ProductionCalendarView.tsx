'use client';

import React from 'react';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import { CalendarData, CalendarDayData } from '@/demoData/palletData';
import ProductionCalendarHeader from './ProductionCalendarHeader';

interface ProductionCalendarViewProps {
  data: CalendarData;
  currentMonth: Dayjs;
  setCurrentMonth: (date: Dayjs) => void;
  onDateSelect: (dayData: CalendarDayData) => void;
}

const ProductionCalendarView: React.FC<ProductionCalendarViewProps> = ({
  data,
  currentMonth,
  setCurrentMonth,
  onDateSelect
}) => {
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
        onClick={() => onDateSelect(dayData)}
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

  const headerRender = ({ value, onChange }: { value: unknown; onChange: (date: unknown) => void }) => {
    return (
      <ProductionCalendarHeader
        value={value}
        onChange={onChange}
      />
    );
  };

  return (
    <Calendar
      cellRender={cellRender}
      headerRender={headerRender}
      value={currentMonth}
      onChange={setCurrentMonth}
      mode="month"
    />
  );
};

export default ProductionCalendarView; 