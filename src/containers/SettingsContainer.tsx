'use client';

import React from 'react';
import { Card, Typography, Form, Input, Switch, Button, Row, Col, Divider, Select, Slider, InputNumber } from 'antd';
import { 
  SettingOutlined, 
  SaveOutlined,
  ReloadOutlined,
  SecurityScanOutlined,
  CameraOutlined,
  BellOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const SettingsContainer: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Settings saved:', values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-4 md:mb-6">
        <Title level={2} className="!mb-2 !text-xl md:!text-2xl">Settings</Title>
        <Paragraph className="!mb-0 text-sm md:text-base">
          Configure system settings, AI parameters, and notification preferences.
        </Paragraph>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="small"
        className="md:size-default"
        initialValues={{
          aiConfidenceThreshold: 85,
          recordingEnabled: true,
          alertsEnabled: true,
          autoBackup: true,
          detectionSensitivity: 75,
          maxStorageDays: 30,
          notificationEmail: 'admin@company.com',
          camerafps: 30,
          qualityThreshold: 90,
        }}
      >
        <Row gutter={[12, 12]} className="md:gutter-24">
          {/* AI Configuration */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <SecurityScanOutlined className="text-sm md:text-base" />
                  <span className="text-sm md:text-base">AI Configuration</span>
                </div>
              }
              className="h-full"
            >
              <Form.Item
                label={<span className="text-xs md:text-sm">AI Confidence Threshold (%)</span>}
                name="aiConfidenceThreshold"
                tooltip="Minimum confidence level required for AI detections"
              >
                <Row gutter={16} className="items-center">
                  <Col span={16}>
                    <Slider min={50} max={100} />
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      min={50}
                      max={100}
                      className="w-full"
                      formatter={value => `${value}%`}
                      parser={(value: any) => value.replace('%', '')}
                    />
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                label={<span className="text-xs md:text-sm">Detection Sensitivity</span>}
                name="detectionSensitivity"
                tooltip="Higher values detect more objects but may increase false positives"
              >
                <Row gutter={16} className="items-center">
                  <Col span={16}>
                    <Slider min={25} max={100} />
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      min={25}
                      max={100}
                      className="w-full"
                      formatter={value => `${value}%`}
                      parser={(value: any) => value.replace('%', '')}
                    />
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                label={<span className="text-xs md:text-sm">Quality Check Threshold (%)</span>}
                name="qualityThreshold"
                tooltip="Minimum quality score for automated quality checks"
              >
                <InputNumber
                  min={70}
                  max={100}
                  className="w-full"
                  formatter={value => `${value}%`}
                  parser={(value: any) => value.replace('%', '')}
                />
              </Form.Item>
            </Card>
          </Col>

          {/* Camera Settings */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <CameraOutlined className="text-sm md:text-base" />
                  <span className="text-sm md:text-base">Camera Settings</span>
                </div>
              }
              className="h-full"
            >
              <Form.Item
                label={<span className="text-xs md:text-sm">Recording Enabled</span>}
                name="recordingEnabled"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label={<span className="text-xs md:text-sm">Camera FPS</span>}
                name="camerafps"
                tooltip="Frames per second for camera recording"
              >
                <Select className="w-full">
                  <Select.Option value={15}>15 FPS</Select.Option>
                  <Select.Option value={24}>24 FPS</Select.Option>
                  <Select.Option value={30}>30 FPS</Select.Option>
                  <Select.Option value={60}>60 FPS</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<span className="text-xs md:text-sm">Storage Retention (Days)</span>}
                name="maxStorageDays"
                tooltip="Number of days to keep recorded footage"
              >
                <InputNumber
                  min={7}
                  max={365}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-xs md:text-sm">Auto Backup</span>}
                name="autoBackup"
                valuePropName="checked"
                tooltip="Automatically backup recordings to cloud storage"
              >
                <Switch />
              </Form.Item>
            </Card>
          </Col>

          {/* Notifications */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <BellOutlined className="text-sm md:text-base" />
                  <span className="text-sm md:text-base">Notifications</span>
                </div>
              }
              className="h-full"
            >
              <Form.Item
                label={<span className="text-xs md:text-sm">Email Alerts Enabled</span>}
                name="alertsEnabled"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label={<span className="text-xs md:text-sm">Notification Email</span>}
                name="notificationEmail"
                rules={[
                  { required: true, message: 'Please enter notification email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="admin@company.com" />
              </Form.Item>

              <Form.Item
                label={<span className="text-xs md:text-sm">Alert Types</span>}
                name="alertTypes"
                tooltip="Select which events should trigger notifications"
              >
                <Select
                  mode="multiple"
                  placeholder="Select alert types"
                  className="w-full"
                  defaultValue={['errors', 'lowConfidence', 'systemStatus']}
                >
                  <Select.Option value="errors">Detection Errors</Select.Option>
                  <Select.Option value="lowConfidence">Low Confidence</Select.Option>
                  <Select.Option value="systemStatus">System Status</Select.Option>
                  <Select.Option value="dailyReport">Daily Reports</Select.Option>
                  <Select.Option value="maintenanceAlerts">Maintenance</Select.Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>

          {/* System Settings */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <SettingOutlined className="text-sm md:text-base" />
                  <span className="text-sm md:text-base">System Settings</span>
                </div>
              }
              className="h-full"
            >
              <Form.Item
                label={<span className="text-xs md:text-sm">System Name</span>}
                name="systemName"
                tooltip="Display name for this VisionAI system"
              >
                <Input placeholder="VisionAI Pallet System" defaultValue="VisionAI Pallet System" />
              </Form.Item>

              <Form.Item
                label={<span className="text-xs md:text-sm">Timezone</span>}
                name="timezone"
              >
                <Select className="w-full" defaultValue="UTC-5">
                  <Select.Option value="UTC-8">Pacific (UTC-8)</Select.Option>
                  <Select.Option value="UTC-7">Mountain (UTC-7)</Select.Option>
                  <Select.Option value="UTC-6">Central (UTC-6)</Select.Option>
                  <Select.Option value="UTC-5">Eastern (UTC-5)</Select.Option>
                  <Select.Option value="UTC+0">UTC</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<span className="text-xs md:text-sm">Language</span>}
                name="language"
              >
                <Select className="w-full" defaultValue="en">
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="es">Spanish</Select.Option>
                  <Select.Option value="fr">French</Select.Option>
                  <Select.Option value="de">German</Select.Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Divider className="my-4 md:my-6" />

        {/* Action Buttons */}
        <Row gutter={12} justify="end" className="md:gutter-16">
          <Col xs={12} sm="auto">
            <Button 
              onClick={onReset} 
              icon={<ReloadOutlined />} 
              block
              className="text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Reset to Defaults</span>
              <span className="sm:hidden">Reset</span>
            </Button>
          </Col>
          <Col xs={12} sm="auto">
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SaveOutlined />}
              block
              className="text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Save Settings</span>
              <span className="sm:hidden">Save</span>
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SettingsContainer; 