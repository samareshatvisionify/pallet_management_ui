'use client';

import React from 'react';
import { Row, Col, Select, Checkbox } from 'antd';
import { Camera } from '@/demoData/cameraData';

interface CameraFiltersProps {
  statusFilter: Camera['status'] | undefined;
  categoryFilters: Camera['category'][];
  subcategoryFilters: Camera['subcategory'][];
  onStatusChange: (value: Camera['status'] | undefined) => void;
  onCategoryChange: (values: Camera['category'][]) => void;
  onSubcategoryChange: (values: Camera['subcategory'][]) => void;
  uniqueCategories: Camera['category'][];
  availableSubcategories: Camera['subcategory'][];
}

const CameraFilters: React.FC<CameraFiltersProps> = ({
  statusFilter,
  categoryFilters,
  subcategoryFilters,
  onStatusChange,
  onCategoryChange,
  onSubcategoryChange,
  uniqueCategories,
  availableSubcategories
}) => {
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

  return (
    <Row gutter={[16, 16]} align="middle" className="mb-6">
      <Col xs={12} sm={8} md={6}>
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={onStatusChange}
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
          onCategoryChange
        )}
      </Col>
      {categoryFilters.length > 0 && (
        <Col xs={12} sm={8} md={6}>
          {renderMultiSelectDropdown(
            "Sub-category",
            availableSubcategories,
            subcategoryFilters,
            onSubcategoryChange
          )}
        </Col>
      )}
    </Row>
  );
};

export default CameraFilters; 