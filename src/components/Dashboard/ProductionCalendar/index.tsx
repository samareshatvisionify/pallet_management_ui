'use client';

import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { CalendarData, CalendarDayData } from '@/demoData/palletData';
import ProductionCalendarView from './ProductionCalendarView';
import ProductionCalendarLegend from './ProductionCalendarLegend';
import ProductionDetailsPanel from './ProductionDetailsPanel';
import ProductionActivityModal from './ProductionActivityModal';

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDateSelect = (dayData: CalendarDayData) => {
    setSelectedDate(dayData);
  };

  const handleViewDetails = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="w-full">
      <Row gutter={24}>
        {/* Calendar Section */}
        <Col xs={24} lg={16}>
          <Card className="shadow-sm border border-gray-200 h-full">
            <ProductionCalendarView
              data={data}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              onDateSelect={handleDateSelect}
            />
            <ProductionCalendarLegend />
          </Card>
        </Col>

        {/* Details Panel */}
        <Col xs={24} lg={8}>
          <ProductionDetailsPanel
            selectedDate={selectedDate}
            onViewDetails={handleViewDetails}
          />
        </Col>
      </Row>

      {/* Activity Timeline Modal */}
      <ProductionActivityModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default ProductionCalendar; 