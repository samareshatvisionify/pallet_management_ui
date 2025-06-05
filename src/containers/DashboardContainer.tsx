'use client';

import React, { useEffect } from 'react';
import { Card, Row, Col, Typography, Statistic, Progress, Button, Spin } from 'antd';
import { 
  AppstoreOutlined, 
  BarChartOutlined, 
  EyeOutlined,
  CheckCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { 
  fetchDashboardStats, 
  fetchSystemStatus, 
  refreshDashboard,
  selectDashboardStats, 
  selectSystemStatus, 
  selectDashboardLoading 
} from '@/store/slices/dashboardSlice';

const { Title, Paragraph } = Typography;

const DashboardContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectDashboardStats);
  const systemStatus = useAppSelector(selectSystemStatus);
  const loading = useAppSelector(selectDashboardLoading);

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchDashboardStats());
    dispatch(fetchSystemStatus());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(refreshDashboard());
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <Title level={2} className="!mb-2 !text-xl md:!text-2xl">Dashboard</Title>
          <Paragraph className="!mb-0 text-sm md:text-base">
            Welcome to VisionAI Pallet Management System. Monitor your pallet operations and AI analytics in real-time.
          </Paragraph>
        </div>
        <div className="flex-shrink-0">
          <Button 
            icon={<ReloadOutlined />} 
            onClick={handleRefresh}
            loading={loading}
            size="small"
            className="md:size-default"
          >
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <Spin spinning={loading}>
        <Row gutter={[12, 12]} className="mb-4 md:mb-6 md:gutter-24">
          <Col xs={12} sm={12} md={6}>
            <Card className="h-full">
              <Statistic
                title="Total Pallets"
                value={stats.totalPallets}
                prefix={<AppstoreOutlined />}
                valueStyle={{ color: '#3f8600', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                className="text-center sm:text-left"
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card className="h-full">
              <Statistic
                title="Active Scans"
                value={stats.activeScans}
                prefix={<EyeOutlined />}
                valueStyle={{ color: '#1890ff', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                className="text-center sm:text-left"
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card className="h-full">
              <Statistic
                title="Processed Today"
                value={stats.processedToday}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#cf1322', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                className="text-center sm:text-left"
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card className="h-full">
              <Statistic
                title="AI Accuracy"
                value={stats.aiAccuracy}
                suffix="%"
                prefix={<BarChartOutlined />}
                valueStyle={{ color: '#722ed1', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                className="text-center sm:text-left"
              />
            </Card>
          </Col>
        </Row>

        {/* Dashboard Content */}
        <Row gutter={[12, 12]} className="md:gutter-24">
          <Col xs={24} lg={16}>
            <Card title="Recent Activity" className="h-64 md:h-96">
              <div className="p-2 md:p-5 text-center h-full flex flex-col justify-center">
                <Title level={4} className="!text-base md:!text-xl">Pallet Activity Chart</Title>
                <Paragraph className="!text-sm md:!text-base">Chart component will be implemented here</Paragraph>
                <Progress percent={75} status="active" className="max-w-md mx-auto" />
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="System Status" className="h-64 md:h-96">
              <div className="flex flex-col gap-3 md:gap-4">
                <div>
                  <Paragraph strong className="!text-sm md:!text-base">Vision AI Status</Paragraph>
                  <Progress 
                    percent={systemStatus.visionAI} 
                    status={systemStatus.visionAI >= 95 ? "success" : "normal"} 
                    format={() => systemStatus.visionAI >= 95 ? 'Online' : 'Warning'}
                    size="small"
                    className="md:size-default"
                  />
                </div>
                <div>
                  <Paragraph strong className="!text-sm md:!text-base">Database Connection</Paragraph>
                  <Progress 
                    percent={systemStatus.databaseConnection} 
                    status={systemStatus.databaseConnection >= 95 ? "success" : "normal"} 
                    format={() => systemStatus.databaseConnection >= 95 ? 'Connected' : 'Issues'}
                    size="small"
                    className="md:size-default"
                  />
                </div>
                <div>
                  <Paragraph strong className="!text-sm md:!text-base">API Services</Paragraph>
                  <Progress 
                    percent={systemStatus.apiServices} 
                    status={systemStatus.apiServices >= 90 ? "active" : "exception"} 
                    format={() => systemStatus.apiServices >= 90 ? 'Running' : 'Problems'}
                    size="small"
                    className="md:size-default"
                  />
                </div>
                <div>
                  <Paragraph strong className="!text-sm md:!text-base">Storage Usage</Paragraph>
                  <Progress 
                    percent={systemStatus.storageUsage} 
                    status={systemStatus.storageUsage < 80 ? "normal" : "exception"}
                    size="small"
                    className="md:size-default"
                  />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default DashboardContainer; 