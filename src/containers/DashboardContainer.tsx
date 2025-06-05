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
    <div>
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Title level={2}>Dashboard</Title>
          <Paragraph>
            Welcome to VisionAI Pallet Management System. Monitor your pallet operations and AI analytics in real-time.
          </Paragraph>
        </div>
        <Button 
          icon={<ReloadOutlined />} 
          onClick={handleRefresh}
          loading={loading}
        >
          Refresh
        </Button>
      </div>

      {/* Statistics Cards */}
      <Spin spinning={loading}>
        <Row gutter={[24, 24]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Pallets"
                value={stats.totalPallets}
                prefix={<AppstoreOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Scans"
                value={stats.activeScans}
                prefix={<EyeOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Processed Today"
                value={stats.processedToday}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="AI Accuracy"
                value={stats.aiAccuracy}
                suffix="%"
                prefix={<BarChartOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Dashboard Content */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card title="Recent Activity" className="h-96">
              <div className="p-5 text-center">
                <Title level={4}>Pallet Activity Chart</Title>
                <Paragraph>Chart component will be implemented here</Paragraph>
                <Progress percent={75} status="active" />
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="System Status" className="h-96">
              <div className="flex flex-col gap-4">
                <div>
                  <Paragraph strong>Vision AI Status</Paragraph>
                  <Progress 
                    percent={systemStatus.visionAI} 
                    status={systemStatus.visionAI >= 95 ? "success" : "normal"} 
                    format={() => systemStatus.visionAI >= 95 ? 'Online' : 'Warning'} 
                  />
                </div>
                <div>
                  <Paragraph strong>Database Connection</Paragraph>
                  <Progress 
                    percent={systemStatus.databaseConnection} 
                    status={systemStatus.databaseConnection >= 95 ? "success" : "normal"} 
                    format={() => systemStatus.databaseConnection >= 95 ? 'Connected' : 'Issues'} 
                  />
                </div>
                <div>
                  <Paragraph strong>API Services</Paragraph>
                  <Progress 
                    percent={systemStatus.apiServices} 
                    status={systemStatus.apiServices >= 90 ? "active" : "exception"} 
                    format={() => systemStatus.apiServices >= 90 ? 'Running' : 'Problems'} 
                  />
                </div>
                <div>
                  <Paragraph strong>Storage Usage</Paragraph>
                  <Progress 
                    percent={systemStatus.storageUsage} 
                    status={systemStatus.storageUsage < 80 ? "normal" : "exception"}
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