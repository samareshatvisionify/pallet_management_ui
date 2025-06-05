'use client';

import React from 'react';
import { Typography, Button, Select } from 'antd';
import { CalendarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';

const { Title } = Typography;

interface ProductionCalendarHeaderProps {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}

const ProductionCalendarHeader: React.FC<ProductionCalendarHeaderProps> = ({ 
  value, 
  onChange 
}) => {
  const monthYear = value.format('MMMM YYYY');

  return (
    <div className="flex items-center justify-between p-2 mb-4">
      <div className="flex items-center gap-4">
        <CalendarOutlined className="text-blue-500 text-xl" />
        <div>
          <Title level={4} className="!mb-0 text-gray-800">
            Production Calendar
          </Title>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select
          defaultValue="all-types"
          className="min-w-[120px]"
          size="middle"
          variant='borderless'
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

export default ProductionCalendarHeader; 