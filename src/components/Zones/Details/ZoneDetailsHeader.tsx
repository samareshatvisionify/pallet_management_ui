'use client';

import React from 'react';
import { Button, Typography, Badge, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Zone } from '@/store/slices/zoneSlice';

const { Title } = Typography;

interface ZoneDetailsHeaderProps {
  zone: Zone | undefined;
  loading: boolean;
  error: string | null;
  onClearError: () => void;
}

const ZoneDetailsHeader: React.FC<ZoneDetailsHeaderProps> = ({
  zone,
  loading,
  error,
  onClearError
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/zones');
  };

  const getStatusBadge = (status: Zone['status']) => {
    const statusConfig = {
      active: { color: 'success', text: 'Active' },
      warning: { color: 'warning', text: 'Warning' },
      inactive: { color: 'error', text: 'Inactive' }
    } as const;

    const config = statusConfig[status];
    return <Badge status={config.color} text={config.text} />;
  };

  if (loading) {
    return (
      <div className="w-full p-6">
        <div className="text-center">Loading zone details...</div>
      </div>
    );
  }

  if (!zone) {
    return (
      <div className="w-full p-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          className="mb-4"
        >
          Back to Zones
        </Button>
        <Alert
          message="Zone Not Found"
          description="The requested zone could not be found."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <>
      {/* Error Alert */}
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          closable
          onClose={onClearError}
          className="mb-6"
        />
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-row gap-4 items-center">
            <Button 
              icon={<ArrowLeftOutlined />} 
              size="large"
              onClick={handleBack}
            >
              Back
            </Button>
            <Title level={2} className="!mb-0">
              {zone.name}
            </Title>
          </div>
          <div>
            {getStatusBadge(zone.status)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ZoneDetailsHeader; 