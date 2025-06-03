'use client';

import { 
  Button, 
  Card, 
  Typography, 
  Space, 
  Row, 
  Col, 
  Divider,
  Alert
} from 'antd';
import { 
  RocketOutlined, 
  CheckCircleOutlined,
  SettingOutlined 
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <Title level={1} className="!mb-4">
            <RocketOutlined className="mr-3" />
            VisionAI Pallet Management
          </Title>
          <Paragraph className="text-lg">
            AI-powered pallet management and analytics system
          </Paragraph>
        </div>

        {/* Success Alert */}
        <Alert
          message="Ant Design Setup Complete!"
          description="Ant Design has been successfully integrated with Next.js 15 and React 19. All components are ready to use."
          type="success"
          showIcon
          icon={<CheckCircleOutlined />}
          className="mb-6"
          closable
        />

        {/* Demo Cards */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card
              title="Dashboard"
              extra={<SettingOutlined />}
              hoverable
              className="h-full"
            >
              <Paragraph>
                Real-time pallet tracking and monitoring dashboard with AI-powered insights.
              </Paragraph>
              <Button type="primary" block>
                View Dashboard
              </Button>
            </Card>
          </Col>
          
          <Col xs={24} md={8}>
            <Card
              title="Analytics"
              extra={<SettingOutlined />}
              hoverable
              className="h-full"
            >
              <Paragraph>
                Comprehensive analytics and reporting for pallet management operations.
              </Paragraph>
              <Button type="default" block>
                View Analytics
              </Button>
            </Card>
          </Col>
          
          <Col xs={24} md={8}>
            <Card
              title="Vision AI"
              extra={<SettingOutlined />}
              hoverable
              className="h-full"
            >
              <Paragraph>
                AI-powered computer vision for automated pallet detection and analysis.
              </Paragraph>
              <Button type="dashed" block>
                Configure AI
              </Button>
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* Component Demo Section */}
        <Card title="Ant Design Components Demo" className="mt-6">
          <Space direction="vertical" size="middle" className="w-full">
            <div>
              <Title level={4}>Buttons</Title>
              <Space wrap>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="text">Text</Button>
                <Button type="link">Link</Button>
              </Space>
            </div>
            
            <div>
              <Title level={4}>Typography</Title>
              <Paragraph>
                This is a paragraph with <Text strong>strong text</Text>, 
                <Text italic> italic text</Text>, and <Text code>inline code</Text>.
              </Paragraph>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
}
