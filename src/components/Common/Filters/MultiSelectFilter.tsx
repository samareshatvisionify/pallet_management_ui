'use client';

import React, { useState } from 'react';
import { Card, Typography, Select, Checkbox } from 'antd';

const { Title } = Typography;

interface FilterOption {
  label: string;
  value: string;
}

interface MultiSelectFilterProps {
  title: string;
  placeholder: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  searchable?: boolean;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  title,
  placeholder,
  options,
  selectedValues,
  onChange,
  searchable = true,
}) => {
  return (
    <Card className="mb-4" size="small">
      <div className="mb-3">
        <Title level={5} className="!mb-3 !text-sm md:!text-base font-semibold text-gray-800">
          {title}
        </Title>
        
        <Select
          mode="multiple"
          placeholder={placeholder}
          value={selectedValues}
          onChange={onChange}
          options={options}
          className="w-full"
          size="middle"
          showSearch={searchable}
          filterOption={(input, option) =>
            String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          allowClear
          maxTagCount="responsive"
          style={{ minHeight: '32px' }}
          optionRender={(option) => (
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={selectedValues.includes(option.value as string)}
                onChange={() => {}} // Handled by Select onChange
              />
              <span>{option.label}</span>
            </div>
          )}
        />
      </div>
    </Card>
  );
};

export default MultiSelectFilter; 