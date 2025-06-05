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
import { ComparisonChart, convertStationsToChartData, generateTargetComparisonDatasets, generateStationChartLabels } from '@/components/common/charts';

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
      <div className="mb-6 ">
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

      {/* Chart and Progress/Details Row */}
      <Row gutter={[24, 24]} className="mb-6">
        {/* Combined Progress and Zone Information */}
        <Col xs={24} lg={10}>
          <Card className="h-full overflow-hidden">
            <div className="h-full flex flex-col p-2">
              {/* Header with Progress */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 mb-5 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <Text className="text-base font-semibold text-gray-700">Progress Overview</Text>
                  </div>
                  <Badge 
                    status={progress.isOnTarget ? "success" : "warning"} 
                    text={progress.isOnTarget ? "On Target" : "Needs Attention"}
                  />
                </div>
                
                <Row gutter={20} align="middle" className="h-full">
                  <Col xs={24} sm={12}>
                    <div className="text-center py-2">
                      <Progress
                        type="circle"
                        percent={progress.percentage}
                        size={120}
                        strokeWidth={10}
                        strokeColor={{
                          '0%': progress.isOnTarget ? '#52c41a' : 
                                progress.percentage > 70 ? '#faad14' : '#ff4d4f',
                          '100%': progress.isOnTarget ? '#52c41a' : 
                                 progress.percentage > 70 ? '#faad14' : '#ff4d4f',
                        }}
                        format={(percent) => (
                          <div className="text-center">
                            <div className="text-xl font-bold text-gray-800">{percent}%</div>
                            <div className="text-sm text-gray-500">Complete</div>
                          </div>
                        )}
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="space-y-4 mt-4 sm:mt-0">
                      <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm">
                        <span className="text-sm text-gray-600 flex items-center gap-2">
                          <CheckCircleOutlined className="text-green-500 text-base" />
                          Current
                        </span>
                        <span className="font-bold text-gray-800 text-base">{zone.currentCount}</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm">
                        <span className="text-sm text-gray-600 flex items-center gap-2">
                          <TrophyOutlined className="text-blue-500 text-base" />
                          Target
                        </span>
                        <span className="font-bold text-gray-800 text-base">{zone.targetCount}</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm">
                        <span className="text-sm text-gray-600 flex items-center gap-2">
                          <RiseOutlined className="text-orange-500 text-base" />
                          Remaining
                        </span>
                        <span className="font-bold text-gray-800 text-base">{progress.remaining}</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Zone Information Grid */}
              <div className="bg-gray-50 rounded-lg p-5 flex-1">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <Text className="text-base font-semibold text-gray-700">Zone Information</Text>
                </div>
                
                <Row gutter={[16, 16]} className="h-full">
                  <Col xs={24} sm={12}>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <EnvironmentOutlined className="text-blue-500 text-base" />
                        <Text className="text-sm text-gray-500 uppercase tracking-wide font-medium">Zone ID</Text>
                      </div>
                      <Text strong className="text-base">{zone.id}</Text>
                    </div>
                  </Col>
                  
                  <Col xs={24} sm={12}>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <ClockCircleOutlined className="text-green-500 text-base" />
                        <Text className="text-sm text-gray-500 uppercase tracking-wide font-medium">Previous Count</Text>
                      </div>
                      <Text strong className="text-base">{zone.previousCount} units</Text>
                    </div>
                  </Col>
                  
                  <Col xs={24}>
                    <div className="bg-white rounded-lg p-4 border border-gray-200 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <ClockCircleOutlined className="text-purple-500 text-base" />
                        <Text className="text-sm text-gray-500 uppercase tracking-wide font-medium">Last Updated</Text>
                      </div>
                      <Text strong className="text-base">
                        {new Date(zone.lastUpdated).toLocaleString()}
                      </Text>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Card>
        </Col>

        {/* Stations Performance Chart */}
        <Col xs={24} lg={14}>
          {zone.stations && zone.stations.length > 0 && (
            <ComparisonChart
              data={{
                labels: generateStationChartLabels(zone.stations),
                datasets: generateTargetComparisonDatasets(convertStationsToChartData(zone.stations))
              }}
              title="Station Performance Comparison"
              subtitle="Target vs current pallet count for all stations in this zone"
              loading={loading}
              yAxisLabel="pallets"
              tooltipUnit="pallets"
              originalData={convertStationsToChartData(zone.stations)}
              className='!mb-0 h-full'
              height={420}
            />
          )}
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