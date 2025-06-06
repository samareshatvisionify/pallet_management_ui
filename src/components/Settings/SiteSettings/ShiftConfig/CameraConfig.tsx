'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface CameraConfigProps {
  onClick?: () => void;
}

const CameraConfig: React.FC<CameraConfigProps> = ({ onClick }) => {
  return (
    <Card className="shadow-sm">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onClick}>
        <CameraOutlined className="text-2xl text-blue-500" />
        <div className="flex-1">
          <Title level={4} className="!mb-1">Camera Configuration</Title>
          <Text className="text-gray-500">
            Manage camera settings, resolution, and recording parameters
          </Text>
        </div>
        <div className="text-gray-400">
          <Text type="secondary">Click to configure →</Text>
        </div>
      </div>
    </Card>
  );
};

export default CameraConfig; 