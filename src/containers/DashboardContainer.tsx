'use client';

import React from 'react';
import { Card, Row, Col, Typography, Statistic, Progress } from 'antd';
import { 
  AppstoreOutlined, 
  BarChartOutlined, 
  EyeOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const DashboardContainer: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Dashboard</Title>
        <Paragraph>
          Welcome to VisionAI Pallet Management System. Monitor your pallet operations and AI analytics in real-time.
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Pallets"
              value={1234}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Scans"
              value={45}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Processed Today"
              value={892}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="AI Accuracy"
              value={98.5}
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
          <Card title="Recent Activity" style={{ height: '400px' }}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <Title level={4}>Pallet Activity Chart</Title>
              <Paragraph>Chart component will be implemented here</Paragraph>
              <Progress percent={75} status="active" />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="System Status" style={{ height: '400px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <Paragraph strong>Vision AI Status</Paragraph>
                <Progress percent={100} status="success" format={() => 'Online'} />
              </div>
              <div>
                <Paragraph strong>Database Connection</Paragraph>
                <Progress percent={100} status="success" format={() => 'Connected'} />
              </div>
              <div>
                <Paragraph strong>API Services</Paragraph>
                <Progress percent={95} status="active" format={() => 'Running'} />
              </div>
              <div>
                <Paragraph strong>Storage Usage</Paragraph>
                <Progress percent={68} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContainer; 