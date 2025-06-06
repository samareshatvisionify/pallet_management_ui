'use client';

import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Divider, Layout } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const { Title, Text } = Typography;
const { Content } = Layout;

interface LoginFormData {
  username: string;
  password: string;
}

const LoginContainer: React.FC = () => {
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  const onFinish = async (values: LoginFormData) => {
    const success = await login(values.username, values.password);
    if (success) {
      // Use replace instead of push to prevent back navigation to login
      router.replace('/');
    }
  };

  const handleErrorClose = () => {
    clearError();
  };

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return (
      <Layout className="!min-h-screen">
        <Content className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-lg border-0">
            <div className="text-center p-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto">
                  VP
                </div>
              </div>
              <Title level={4}>Redirecting to Dashboard...</Title>
            </div>
          </Card>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="!min-h-screen">
      <Content className="flex">
        {/* Left Side - Authentication Form */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-white">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                  VP
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-600">VisionAI</h1>
                  <p className="text-sm text-gray-600">Pallet Management</p>
                </div>
              </div>
            </div>

            <Card className="w-full shadow-lg border-0">
              <div className="text-center mb-6">
                <Title level={3} className="!mb-2">Welcome Back</Title>
                <Text type="secondary">Sign in to your VisionAI account</Text>
              </div>

              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  className="mb-4"
                  closable
                  onClose={handleErrorClose}
                />
              )}

              <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
                size="large"
                autoComplete="off"
              >
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    { required: true, message: 'Please enter your username' },
                    { min: 3, message: 'Username must be at least 3 characters' }
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: 'Please enter your password' },
                    { min: 6, message: 'Password must be at least 6 characters' }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item className="mb-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    block
                    className="h-12 text-base font-medium"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Form.Item>
              </Form>

              <Divider className="my-6" />

              {/* Demo Credentials Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <Text strong className="text-blue-800">Demo Credentials:</Text>
                <div className="mt-2 space-y-1">
                  <div className="text-sm text-blue-700">
                    <strong>Username:</strong> admin
                  </div>
                  <div className="text-sm text-blue-700">
                    <strong>Password:</strong> admin123
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <Text type="secondary" className="text-xs">
                  Powered by VisionAI • Secure Authentication
                </Text>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Right Side - Illustration (Hidden on mobile) */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-lg w-full">
            {/* VisionAI Branding */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  VP
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-600">VisionAI</h1>
                  <p className="text-sm text-gray-600">Pallet Management System</p>
                </div>
              </div>
            </div>
            
            {/* Illustration */}
            <div className="relative w-full aspect-[6/5] mb-8">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 600 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
              >
                {/* Background */}
                <rect width="600" height="500" fill="url(#gradient)" rx="12" />
                
                {/* Warehouse Building */}
                <rect x="50" y="200" width="500" height="250" fill="#3B82F6" rx="8" />
                <rect x="60" y="210" width="480" height="230" fill="#60A5FA" rx="4" />
                
                {/* Warehouse Door */}
                <rect x="250" y="300" width="100" height="150" fill="#1E40AF" rx="4" />
                <circle cx="330" cy="375" r="3" fill="#F59E0B" />
                
                {/* Windows */}
                <rect x="100" y="250" width="60" height="40" fill="#93C5FD" rx="2" />
                <rect x="180" y="250" width="60" height="40" fill="#93C5FD" rx="2" />
                <rect x="360" y="250" width="60" height="40" fill="#93C5FD" rx="2" />
                <rect x="440" y="250" width="60" height="40" fill="#93C5FD" rx="2" />
                
                {/* Pallet Stacks */}
                <g transform="translate(80, 350)">
                  <rect width="40" height="8" fill="#8B5CF6" rx="2" />
                  <rect y="8" width="40" height="8" fill="#A78BFA" rx="2" />
                  <rect y="16" width="40" height="8" fill="#8B5CF6" rx="2" />
                  <rect y="24" width="40" height="8" fill="#A78BFA" rx="2" />
                </g>
                
                <g transform="translate(450, 360)">
                  <rect width="40" height="8" fill="#10B981" rx="2" />
                  <rect y="8" width="40" height="8" fill="#34D399" rx="2" />
                  <rect y="16" width="40" height="8" fill="#10B981" rx="2" />
                </g>
                
                {/* Forklift */}
                <g transform="translate(380, 380)">
                  <rect width="50" height="20" fill="#F59E0B" rx="3" />
                  <rect x="45" y="5" width="15" height="40" fill="#D97706" rx="2" />
                  <circle cx="10" cy="25" r="8" fill="#374151" />
                  <circle cx="40" cy="25" r="8" fill="#374151" />
                  <circle cx="10" cy="25" r="4" fill="#6B7280" />
                  <circle cx="40" cy="25" r="4" fill="#6B7280" />
                </g>
                
                {/* AI Detection Elements */}
                <g transform="translate(200, 120)">
                  <line x1="0" y1="0" x2="200" y2="0" stroke="#06B6D4" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                  </line>
                  <line x1="20" y1="20" x2="180" y2="20" stroke="#06B6D4" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1.2s" repeatCount="indefinite" />
                  </line>
                  <line x1="40" y1="40" x2="160" y2="40" stroke="#06B6D4" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="0.8s" repeatCount="indefinite" />
                  </line>
                </g>
                
                {/* Floating Data Points */}
                <circle cx="150" cy="180" r="4" fill="#EF4444">
                  <animate attributeName="cy" values="180;170;180" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="160" r="4" fill="#10B981">
                  <animate attributeName="cy" values="160;150;160" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="320" cy="140" r="4" fill="#8B5CF6">
                  <animate attributeName="cy" values="140;130;140" dur="1.8s" repeatCount="indefinite" />
                </circle>
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#EBF8FF', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#DBEAFE', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">AI-Powered Pallet Detection</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Real-time Monitoring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Advanced Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginContainer; 