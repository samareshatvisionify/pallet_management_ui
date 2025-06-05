'use client';

import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Badge,
  Tag,
  Select,
  Checkbox,
  Image
} from 'antd';
import {
  CameraOutlined,
  PlayCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface Camera {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  zone: string;
  recording: boolean;
  category: 'Pallets' | 'Boards';
  subcategory: 'Making' | 'Dismantling' | 'Repair' | 'Board' | 'Trimsaw';
  rtspUrl: string;
  imagePath: string;
}

interface CamerasComponentProps {
  // Data props
  cameras: Camera[];
  loading: boolean;
  error: string | null;
  
  // Action props
  onClearError: () => void;
  
  // Utility props
  filterCameras: (statusFilter?: Camera['status'], categoryFilters?: Camera['category'][], subcategoryFilters?: Camera['subcategory'][]) => Camera[];
  getStatusColor: (status: Camera['status']) => string;
  getUniqueCategories: () => Camera['category'][];
  getSubcategoriesForCategory: (category: Camera['category']) => Camera['subcategory'][];
}

const CamerasComponent: React.FC<CamerasComponentProps> = ({
  cameras,
  loading,
  error,
  onClearError,
  filterCameras,
  getStatusColor,
  getUniqueCategories,
  getSubcategoriesForCategory
}) => {
  const [statusFilter, setStatusFilter] = useState<Camera['status'] | undefined>(undefined);
  const [categoryFilters, setCategoryFilters] = useState<Camera['category'][]>([]);
  const [subcategoryFilters, setSubcategoryFilters] = useState<Camera['subcategory'][]>([]);
  const filteredCameras = filterCameras(statusFilter, categoryFilters, subcategoryFilters);
  const uniqueCategories = getUniqueCategories();
  const availableSubcategories = categoryFilters.length > 0 
    ? categoryFilters.flatMap(cat => getSubcategoriesForCategory(cat))
    : [];

  if (error) {
    onClearError();
  }

  console.log('Status colors available:', cameras.map(c => getStatusColor(c.status)));

  // Get status dot color
  const getStatusDotColor = (status: Camera['status']) => {
    switch (status) {
      case 'online':
        return '#52c41a'; // green
      case 'offline':
        return '#ff4d4f'; // red
      case 'maintenance':
        return '#faad14'; // orange
      default:
        return '#d9d9d9'; // gray
    }
  };

  const renderMultiSelectDropdown = <T extends string>(
    placeholder: string,
    options: T[],
    value: T[],
    onChange: (values: T[]) => void
  ) => {
    return (
      <Select
        mode="multiple"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        allowClear
        size="large"
        className="w-full"
        style={{ borderRadius: '12px' }}
        maxTagCount={1}
        maxTagPlaceholder={(omittedValues) => `+${omittedValues.length}`}
        optionLabelProp="label"
        popupRender={(menu) => (
          <div>
            {menu}
          </div>
        )}
      >
        {options.map(option => (
          <Select.Option key={option} value={option} label={option}>
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={value.includes(option)}
              />
              <span>{option}</span>
            </div>
          </Select.Option>
        ))}
      </Select>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters Section - Inline like Zones */}
      <Row gutter={[16, 16]} align="middle" className="mb-6">
        <Col xs={12} sm={8} md={6}>
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
            allowClear
            size="large"
            className="w-full"
            style={{ borderRadius: '12px' }}
            options={[
              { label: 'Online', value: 'online' },
              { label: 'Offline', value: 'offline' },
              { label: 'Maintenance', value: 'maintenance' }
            ]}
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          {renderMultiSelectDropdown(
            "Category",
            uniqueCategories,
            categoryFilters,
            setCategoryFilters
          )}
        </Col>
        {categoryFilters.length > 0 && (
          <Col xs={12} sm={8} md={6}>
            {renderMultiSelectDropdown(
              "Sub-category",
              availableSubcategories,
              subcategoryFilters,
              setSubcategoryFilters
            )}
          </Col>
        )}
      </Row>

      {/* Main Content Area */}
      <div className="space-y-4 md:space-y-6">
        {/* Camera Grid */}
        <Row gutter={[12, 12]} className="md:gutter-24">
          {filteredCameras.map((camera) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={camera.id}>
              <Card
                title={
                  <div className="flex items-center justify-between">
                    <span className="text-sm md:text-base truncate">{camera.name}</span>
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0 ml-2"
                      style={{ backgroundColor: getStatusDotColor(camera.status) }}
                      title={`Status: ${camera.status}`}
                    />
                  </div>
                }
                actions={[
                  <Button key="view" type="text" icon={<PlayCircleOutlined />} size="small" className="md:size-default">
                    <span className="hidden sm:inline">View</span>
                  </Button>,
                  <Button key="settings" type="text" icon={<SettingOutlined />} size="small" className="md:size-default">
                    <span className="hidden sm:inline">Settings</span>
                  </Button>,
                ]}
                className="h-full"
              >
                {/* Image Viewer */}
                <div className="mb-4">
                  <Image
                    src={camera.imagePath}
                    alt={`${camera.name} feed`}
                    className="w-full h-32 object-cover rounded-md"
                    fallback="../../demoData/cameraImages/camera1.svg"
                    preview={{
                      mask: <div className="text-white">View Feed</div>,
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 md:gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm font-medium">Zone:</span>
                    <Tag className="text-xs md:text-sm max-w-32 truncate" title={camera.zone}>
                      {camera.zone}
                    </Tag>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm font-medium">RTSP URL:</span>
                    <Tag 
                      color="purple" 
                      className="text-xs md:text-sm font-mono cursor-pointer"
                      title={camera.rtspUrl}
                      onClick={() => navigator.clipboard.writeText(camera.rtspUrl)}
                    >
                      {camera.rtspUrl.length > 20 
                        ? `${camera.rtspUrl.substring(0, 20)}...` 
                        : camera.rtspUrl
                      }
                    </Tag>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Show message when no cameras match filters */}
        {filteredCameras.length === 0 && (
          <div className="text-center py-8">
            <CameraOutlined className="text-4xl text-gray-300 mb-4" />
            <Title level={4} className="!text-lg text-gray-500">No cameras found</Title>
            <Paragraph className="text-gray-400">
              {statusFilter || categoryFilters.length > 0 || subcategoryFilters.length > 0
                ? "Try adjusting your filter criteria to find the cameras you're looking for."
                : "No cameras match the selected filters. Try adjusting your filter criteria or clearing some filters."}
            </Paragraph>
          </div>
        )}

        {/* Add Camera Button */}
        <div className="text-center py-6 md:py-10 border-t border-gray-100">
          <CameraOutlined className="text-3xl md:text-5xl text-gray-300 mb-2 md:mb-4" />
          <Title level={4} className="!text-base md:!text-xl">Add New Camera</Title>
          <Paragraph className="!text-sm md:!text-base">Configure additional cameras to monitor your facility.</Paragraph>
          <Button type="primary" size="middle" className="md:size-large">
            Add Camera
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CamerasComponent; 