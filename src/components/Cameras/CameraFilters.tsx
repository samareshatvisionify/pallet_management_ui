'use client';

import React, { useState } from 'react';
import { Row, Col, Select, Checkbox, Button, Badge, Typography, Modal } from 'antd';
import { PlusOutlined, FilterFilled, SettingOutlined } from '@ant-design/icons';
import { Camera } from '@/demoData/cameraData';

const { Title } = Typography;

interface CameraFiltersProps {
  zoneFilters: string[];
  categoryFilters: Camera['category'][];
  subcategoryFilters: Camera['subcategory'][];
  targetAchievementFilter: 'all' | 'met' | 'not-met' | undefined;
  onZoneChange: (values: string[]) => void;
  onCategoryChange: (values: Camera['category'][]) => void;
  onSubcategoryChange: (values: Camera['subcategory'][]) => void;
  onTargetAchievementChange: (value: 'all' | 'met' | 'not-met' | undefined) => void;
  uniqueZones: string[];
  uniqueCategories: Camera['category'][];
  availableSubcategories: Camera['subcategory'][];
  onAddCamera?: () => void;
}

const CameraFilters: React.FC<CameraFiltersProps> = ({
  zoneFilters,
  categoryFilters,
  subcategoryFilters,
  targetAchievementFilter,
  onZoneChange,
  onCategoryChange,
  onSubcategoryChange,
  onTargetAchievementChange,
  uniqueZones,
  uniqueCategories,
  availableSubcategories,
  onAddCamera
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Custom multiselect dropdown with checkboxes
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

  const hasActiveFilters = zoneFilters.length > 0 || categoryFilters.length > 0 || subcategoryFilters.length > 0 || !!targetAchievementFilter;

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <Row gutter={[16, 16]} align="middle" className="mb-6" justify="space-between">
          <Col flex="auto">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderMultiSelectDropdown(
                  "Zones",
                  uniqueZones,
                  zoneFilters,
                  onZoneChange
                )}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderMultiSelectDropdown(
                  "Category",
                  uniqueCategories,
                  categoryFilters,
                  onCategoryChange
                )}
              </Col>
              {categoryFilters.length > 0 && (
                <Col xs={24} sm={12} md={8} lg={6}>
                  {renderMultiSelectDropdown(
                    "Sub-category",
                    availableSubcategories,
                    subcategoryFilters,
                    onSubcategoryChange
                  )}
                </Col>
              )}
              <Col xs={24} sm={12} md={8} lg={6}>
                              <Select
                placeholder="Target Status"
                value={targetAchievementFilter}
                onChange={onTargetAchievementChange}
                allowClear
                size="large"
                className="w-full"
                style={{ borderRadius: '12px' }}
                options={[
                  { label: 'All Cameras', value: 'all' },
                  { label: 'Exceeding Targets', value: 'met' },
                  { label: 'Below Targets', value: 'not-met' }
                ]}
              />
              </Col>
            </Row>
          </Col>
          
          {/* Add Camera Button - Aligned to the right */}
          <Col flex="none">
            <Button
              icon={<PlusOutlined />}
              size="large"
              onClick={onAddCamera}
              style={{
                backgroundColor: '#4b5563',
                borderColor: '#4b5563',
                color: 'white',
                borderRadius: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
                e.currentTarget.style.borderColor = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
                e.currentTarget.style.borderColor = '#4b5563';
              }}
            >
              Add Camera
            </Button>
          </Col>
        </Row>
      </div>

      {/* Mobile View */}
      <div className="md:hidden mb-6">
        <div className="flex justify-between items-center gap-3">
          <Title level={4} className="!mb-0 !font-base">Cameras</Title>
          <Badge count={hasActiveFilters ? [...zoneFilters, ...categoryFilters, ...subcategoryFilters, targetAchievementFilter].filter(Boolean).length : 0}>
            <Button
              icon={
                  <FilterFilled />
              }
              size="middle"
              onClick={() => setIsModalOpen(true)}
              className='!bg-gray-100 !text-gray-600'
              type='text' 
            />
          </Badge>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <SettingOutlined />
            <span>Filter Cameras</span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <div className="flex gap-2">
            <Button onClick={() => {
              onZoneChange([]);
              onCategoryChange([]);
              onSubcategoryChange([]);
              onTargetAchievementChange(undefined);
            }}>
              Clear All
            </Button>
            <Button 
              type="primary" 
              onClick={() => setIsModalOpen(false)}
              style={{
                backgroundColor: '#065f46',
                borderColor: '#065f46'
              }}
            >
              Apply Filters
            </Button>
          </div>
        }
        width="90%"
        style={{ maxWidth: '400px' }}
      >
        <div className="space-y-4">
          <div>
            <Title level={5} className="!mb-2">Zones</Title>
            {renderMultiSelectDropdown(
              "Select zones",
              uniqueZones,
              zoneFilters,
              onZoneChange
            )}
          </div>
          
          <div>
            <Title level={5} className="!mb-2">Category</Title>
            {renderMultiSelectDropdown(
              "Select category",
              uniqueCategories,
              categoryFilters,
              onCategoryChange
            )}
          </div>
          
          {categoryFilters.length > 0 && (
            <div>
              <Title level={5} className="!mb-2">Sub-category</Title>
              {renderMultiSelectDropdown(
                "Select sub-category",
                availableSubcategories,
                subcategoryFilters,
                onSubcategoryChange
              )}
            </div>
          )}
          
          <div>
            <Title level={5} className="!mb-2">Target Status</Title>
            <Select
              placeholder="Select performance status"
              value={targetAchievementFilter}
              onChange={onTargetAchievementChange}
              allowClear
              size="large"
              className="w-full"
              style={{ borderRadius: '12px' }}
              options={[
                { label: 'All Cameras', value: 'all' },
                { label: 'Exceeding Targets', value: 'met' },
                { label: 'Below Targets', value: 'not-met' }
              ]}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CameraFilters; 