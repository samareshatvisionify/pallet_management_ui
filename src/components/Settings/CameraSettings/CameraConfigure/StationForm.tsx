'use client';

import React from 'react';
import { Form, Input, Select, InputNumber, Button, Space } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

// Station form data interface
export interface StationFormData {
  name: string;
  scenario: 'pallet making' | 'dismantle' | 'repair' | 'board' | 'trimsaw';
  targetCount: number;
  zoneName: string;
}

// Available scenarios for station
const SCENARIOS = [
  { value: 'pallet making', label: 'Pallet Making' },
  { value: 'dismantle', label: 'Dismantle' },
  { value: 'repair', label: 'Repair' },
  { value: 'board', label: 'Board' },
  { value: 'trimsaw', label: 'Trimsaw' }
] as const;

interface StationFormProps {
  onSave: (data: StationFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  initialData?: Partial<StationFormData>;
}

/**
 * StationForm Component
 * 
 * Handles the form for creating/editing station details including:
 * - Station name (required)
 * - Scenario type (required) 
 * - Target count (required)
 * - Zone name (required)
 * 
 * All fields are mandatory and must be filled before saving
 */
const StationForm: React.FC<StationFormProps> = ({ 
  onSave, 
  onCancel, 
  loading = false,
  initialData 
}) => {
  const [form] = Form.useForm();

  // Handle form submission
  const handleFinish = (values: StationFormData) => {
    onSave(values);
  };

  // Handle form validation failure
  const handleFinishFailed = (errorInfo: any) => {
    console.log('Form validation failed:', errorInfo);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      {/* Header */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-1">
          {initialData ? 'Edit Station' : 'New Station'}
        </h4>
        <p className="text-xs text-gray-500">
          Fill all fields and draw area on camera to save
        </p>
      </div>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        initialValues={initialData}
        size="small"
      >
        {/* Station Name */}
        <Form.Item
          name="name"
          label={<span className="text-xs font-medium text-gray-700">Station Name</span>}
          rules={[
            { required: true, message: 'Station name is required' },
            { min: 2, message: 'Name must be at least 2 characters' }
          ]}
          className="!mb-3"
        >
          <Input 
            placeholder="Enter station name"
            className="text-xs"
            size="middle"
          />
        </Form.Item>

        {/* Scenario Selection */}
        <Form.Item
          name="scenario"
          label={<span className="text-xs font-medium text-gray-700">Scenario</span>}
          rules={[{ required: true, message: 'Scenario is required' }]}
          className="!mb-3"
        >
          <Select 
            placeholder="Select scenario"
            className="text-xs"
            size="middle"
          >
            {SCENARIOS.map(scenario => (
              <Option key={scenario.value} value={scenario.value}>
                {scenario.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Target Count */}
        <Form.Item
          name="targetCount"
          label={<span className="text-xs font-medium text-gray-700">Target Count</span>}
          rules={[
            { required: true, message: 'Target count is required' },
            { type: 'number', min: 1, message: 'Must be at least 1' }
          ]}
          className="!mb-3"
        >
          <InputNumber
            placeholder="Enter target count"
            className="w-full text-xs"
            min={1}
            max={9999}
            size="middle"
          />
        </Form.Item>

        {/* Zone Name */}
        <Form.Item
          name="zoneName"
          label={<span className="text-xs font-medium text-gray-700">Zone Name</span>}
          rules={[
            { required: true, message: 'Zone name is required' },
            { min: 2, message: 'Zone name must be at least 2 characters' }
          ]}
          className="!mb-3"
        >
          <Input 
            placeholder="Enter zone name"
            className="text-xs"
            size="middle"
          />
        </Form.Item>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loading}
            size="middle"
            className="flex-1 text-xs"
          >
            Save Station
          </Button>
          <Button
            icon={<CloseOutlined />}
            onClick={onCancel}
            size="middle"
            className="text-xs"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StationForm; 