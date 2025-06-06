'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ZoneConfigProps {
  onClick?: () => void;
}

const ZoneConfig: React.FC<ZoneConfigProps> = ({ onClick }) => {
  return (
    <Card className="shadow-sm !mb-6">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onClick}>
        <EnvironmentOutlined className="text-2xl text-green-500" />
        <div className="flex-1">
          <Title level={4} className="!mb-1">Zone Configuration</Title>
          <Text className="text-gray-500">
            Set up warehouse zones, boundaries, and monitoring areas
          </Text>
        </div>
        <div className="text-gray-400">
          <Text type="secondary">Click to configure →</Text>
        </div>
      </div>
    </Card>
  );
};

export default ZoneConfig; 