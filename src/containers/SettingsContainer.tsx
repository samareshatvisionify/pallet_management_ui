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
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Settings</Title>
        <Paragraph>
          Configure system settings, AI parameters, and notification preferences.
        </Paragraph>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
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
        <Row gutter={[24, 24]}>
          {/* AI Configuration */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SecurityScanOutlined />
                  AI Configuration
                </div>
              }
            >
              <Form.Item
                label="AI Confidence Threshold (%)"
                name="aiConfidenceThreshold"
                tooltip="Minimum confidence level required for AI detections"
              >
                <Row gutter={16} style={{ alignItems: 'center' }}>
                  <Col span={16}>
                    <Slider min={50} max={100} />
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      min={50}
                      max={100}
                      style={{ width: '100%' }}
                      formatter={value => `${value}%`}
                      parser={(value: any) => value.replace('%', '')}
                    />
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                label="Detection Sensitivity"
                name="detectionSensitivity"
                tooltip="Higher values detect more objects but may increase false positives"
              >
                <Row gutter={16} style={{ alignItems: 'center' }}>
                  <Col span={16}>
                    <Slider min={25} max={100} />
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      min={25}
                      max={100}
                      style={{ width: '100%' }}
                      formatter={value => `${value}%`}
                      parser={(value: any) => value.replace('%', '')}
                    />
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                label="Quality Check Threshold (%)"
                name="qualityThreshold"
                tooltip="Minimum quality score for automated quality checks"
              >
                <InputNumber
                  min={70}
                  max={100}
                  style={{ width: '100%' }}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CameraOutlined />
                  Camera Settings
                </div>
              }
            >
              <Form.Item
                label="Recording Enabled"
                name="recordingEnabled"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="Camera FPS"
                name="camerafps"
                tooltip="Frames per second for camera recording"
              >
                <Select style={{ width: '100%' }}>
                  <Select.Option value={15}>15 FPS</Select.Option>
                  <Select.Option value={24}>24 FPS</Select.Option>
                  <Select.Option value={30}>30 FPS</Select.Option>
                  <Select.Option value={60}>60 FPS</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Storage Retention (Days)"
                name="maxStorageDays"
                tooltip="Number of days to keep recorded footage"
              >
                <InputNumber
                  min={7}
                  max={365}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label="Auto Backup"
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BellOutlined />
                  Notifications
                </div>
              }
            >
              <Form.Item
                label="Email Alerts Enabled"
                name="alertsEnabled"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="Notification Email"
                name="notificationEmail"
                rules={[
                  { required: true, message: 'Please enter notification email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="admin@company.com" />
              </Form.Item>

              <Form.Item
                label="Alert Types"
                name="alertTypes"
                tooltip="Select which events should trigger notifications"
              >
                <Select
                  mode="multiple"
                  placeholder="Select alert types"
                  style={{ width: '100%' }}
                  defaultValue={['errors', 'lowConfidence', 'systemStatus']}
                >
                  <Select.Option value="errors">Detection Errors</Select.Option>
                  <Select.Option value="lowConfidence">Low Confidence Detections</Select.Option>
                  <Select.Option value="systemStatus">System Status Changes</Select.Option>
                  <Select.Option value="dailyReport">Daily Reports</Select.Option>
                  <Select.Option value="maintenanceAlerts">Maintenance Alerts</Select.Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>

          {/* System Settings */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SettingOutlined />
                  System Settings
                </div>
              }
            >
              <Form.Item
                label="System Name"
                name="systemName"
                tooltip="Display name for this VisionAI system"
              >
                <Input placeholder="VisionAI Pallet System" defaultValue="VisionAI Pallet System" />
              </Form.Item>

              <Form.Item
                label="Timezone"
                name="timezone"
              >
                <Select style={{ width: '100%' }} defaultValue="UTC-5">
                  <Select.Option value="UTC-8">Pacific Time (UTC-8)</Select.Option>
                  <Select.Option value="UTC-7">Mountain Time (UTC-7)</Select.Option>
                  <Select.Option value="UTC-6">Central Time (UTC-6)</Select.Option>
                  <Select.Option value="UTC-5">Eastern Time (UTC-5)</Select.Option>
                  <Select.Option value="UTC+0">UTC</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Language"
                name="language"
              >
                <Select style={{ width: '100%' }} defaultValue="en">
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="es">Spanish</Select.Option>
                  <Select.Option value="fr">French</Select.Option>
                  <Select.Option value="de">German</Select.Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* Action Buttons */}
        <Row gutter={16} justify="end">
          <Col>
            <Button onClick={onReset} icon={<ReloadOutlined />}>
              Reset to Defaults
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Settings
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SettingsContainer; 