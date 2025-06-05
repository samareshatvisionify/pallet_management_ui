'use client';

import React from 'react';
import { Card, Row, Col, Typography, Progress, Alert, Button, Badge, Space, Divider } from 'antd';
import { 
  ArrowLeftOutlined, 
  EnvironmentOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
  TrophyOutlined,
  RiseOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Zone } from '@/store/slices/zoneSlice';
import { StatCard } from '@/components';

const { Title, Text, Paragraph } = Typography;

interface ZoneDetailsProps {
  zone: Zone | undefined;
  loading: boolean;
  error: string | null;
  onClearError: () => void;
  onUpdateZoneStatus: (zoneId: string, status: Zone['status']) => void;
  calculateZoneProgress: (zone: Zone) => {
    percentage: number;
    isOnTarget: boolean;
    remaining: number;
  };
  getPerformanceIndicator: (performanceChange: number) => {
    type: 'positive' | 'negative' | 'neutral';
    icon: string;
    color: string;
    text: string;
  };
  getStatusColor: (status: Zone['status']) => string;
  getEfficiencyColor: (efficiency: number) => string;
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({
  zone,
  loading,
  error,
  onClearError,
  onUpdateZoneStatus,
  calculateZoneProgress,
  getPerformanceIndicator,
  getStatusColor,
  getEfficiencyColor
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/zones');
  };

  if (loading) {
    return (
      <div className="w-full p-6">
        <Card loading={true} className="h-96">
          <div className="text-center">Loading zone details...</div>
        </Card>
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

  const progress = calculateZoneProgress(zone);
  const performance = getPerformanceIndicator(zone.performanceChange);

  const getStatusBadge = (status: Zone['status']) => {
    const statusConfig = {
      active: { color: 'success', text: 'Active' },
      warning: { color: 'warning', text: 'Warning' },
      inactive: { color: 'error', text: 'Inactive' }
    } as const;

    const config = statusConfig[status];
    return <Badge status={config.color} text={config.text} />;
  };

  const getStationIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'maintenance':
        return <SettingOutlined style={{ color: '#faad14' }} />;
      default:
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
    }
  };

  return (
    <div className="w-full">
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
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          className="mb-4"
        >
          Back to Zones
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Title level={2} className="!mb-2">
              <EnvironmentOutlined className="mr-2" />
              {zone.name}
            </Title>
            <Text type="secondary" className="text-base">
              {zone.description}
            </Text>
          </div>
          <div>
            {getStatusBadge(zone.status)}
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Current Count"
            value={zone.currentCount}
            subtitle="Pallets processed"
            icon={<EnvironmentOutlined />}
            iconColor="#1890ff"
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Target Count"
            value={zone.targetCount}
            subtitle="Goal for this zone"
            icon={<CheckCircleOutlined />}
            iconColor="#52c41a"
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Efficiency"
            value={zone.efficiency.toFixed(1)}
            suffix="%"
            subtitle="Performance metric"
            icon={<TrophyOutlined />}
            iconColor={getEfficiencyColor(zone.efficiency)}
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Performance"
            value={Math.abs(zone.performanceChange)}
            suffix="%"
            subtitle={performance.text}
            icon={<RiseOutlined />}
            iconColor={performance.color}
            loading={loading}
          />
        </Col>
      </Row>

      {/* Progress and Details */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title="Progress Overview" className="h-full">
            <div className="text-center mb-4">
              <Progress
                type="circle"
                percent={progress.percentage}
                size={150}
                strokeColor={{
                  '0%': progress.isOnTarget ? '#52c41a' : 
                        progress.percentage > 70 ? '#faad14' : '#ff4d4f',
                  '100%': progress.isOnTarget ? '#52c41a' : 
                         progress.percentage > 70 ? '#faad14' : '#ff4d4f',
                }}
                format={(percent) => (
                  <div className="text-center">
                    <div className="text-2xl font-bold">{percent}%</div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                )}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Text>Remaining to target:</Text>
                <Text strong>{progress.remaining} units</Text>
              </div>
              <div className="flex justify-between">
                <Text>Status:</Text>
                <Text style={{ color: progress.isOnTarget ? '#52c41a' : '#faad14' }}>
                  {progress.isOnTarget ? 'On Target' : 'Needs Attention'}
                </Text>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Zone Information" className="h-full">
            <div className="space-y-4">
              <div>
                <Text type="secondary">Zone ID:</Text>
                <br />
                <Text strong>{zone.id}</Text>
              </div>
              <Divider />
              <div>
                <Text type="secondary">Last Updated:</Text>
                <br />
                <Text strong>
                  <ClockCircleOutlined className="mr-1" />
                  {new Date(zone.lastUpdated).toLocaleString()}
                </Text>
              </div>
              <Divider />
              <div>
                <Text type="secondary">Previous Count:</Text>
                <br />
                <Text strong>{zone.previousCount} units</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Stations */}
      <Card title={`Stations (${zone.stations.length})`}>
        <Row gutter={[16, 16]}>
          {zone.stations.map((station) => (
            <Col xs={24} sm={12} md={8} lg={6} key={station.id}>
              <Card size="small" className="h-full">
                <div className="flex items-center justify-between mb-2">
                  <Text strong>{station.name}</Text>
                  {getStationIcon(station.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Text type="secondary">Current:</Text>
                    <Text>{station.currentCount}</Text>
                  </div>
                  <div className="flex justify-between text-sm">
                    <Text type="secondary">Target:</Text>
                    <Text>{station.targetCount}</Text>
                  </div>
                  <div className="flex justify-between text-sm">
                    <Text type="secondary">Efficiency:</Text>
                    <Text style={{ color: getEfficiencyColor(station.efficiency) }}>
                      {station.efficiency.toFixed(1)}%
                    </Text>
                  </div>
                  <Progress
                    percent={(station.currentCount / station.targetCount) * 100}
                    size="small"
                    status={station.status === 'active' ? 'active' : 'exception'}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default ZoneDetails; 