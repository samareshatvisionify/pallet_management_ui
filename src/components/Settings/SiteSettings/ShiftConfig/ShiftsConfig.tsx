'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ShiftsConfigProps {
  onClick?: () => void;
}

const ShiftsConfig: React.FC<ShiftsConfigProps> = ({ onClick }) => {
  return (
    <Card className="shadow-sm !mb-6">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onClick}>
        <ClockCircleOutlined className="text-2xl text-orange-500" />
        <div className="flex-1">
          <Title level={4} className="!mb-1">Shifts Configuration</Title>
          <Text className="text-gray-500">
            Define work shifts, schedules, and operational hours
          </Text>
        </div>
        <div className="text-gray-400">
          <Text type="secondary">Click to configure →</Text>
        </div>
      </div>
    </Card>
  );
};

export default ShiftsConfig; 