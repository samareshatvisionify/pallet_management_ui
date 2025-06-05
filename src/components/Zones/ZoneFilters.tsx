'use client';

import React from 'react';
import { Row, Col, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Zone } from '@/store/slices/zoneSlice';

const { Search } = Input;

interface ZoneFiltersProps {
  searchTerm: string;
  statusFilter: Zone['status'] | undefined;
  sortBy: 'name' | 'efficiency' | 'currentCount' | 'targetCount';
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: Zone['status'] | undefined) => void;
  onSortChange: (value: 'name' | 'efficiency' | 'currentCount' | 'targetCount') => void;
}

const ZoneFilters: React.FC<ZoneFiltersProps> = ({
  searchTerm,
  statusFilter,
  sortBy,
  onSearchChange,
  onStatusFilterChange,
  onSortChange
}) => {
  return (
    <Row gutter={[16, 16]} align="middle" className="mb-6">
      <Col xs={24} sm={12} md={10}>
        <Search
          placeholder="Search zones..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          prefix={<SearchOutlined />}
          allowClear
          size="large"
          className="w-full"
          style={{ 
            borderRadius: '12px',
          }}
        />
      </Col>
      <Col xs={12} sm={6} md={7}>
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={onStatusFilterChange}
          allowClear
          size="large"
          className="w-full"
          style={{ borderRadius: '12px' }}
          options={[
            { label: 'Active', value: 'active' },
            { label: 'Warning', value: 'warning' },
            { label: 'Inactive', value: 'inactive' }
          ]}
        />
      </Col>
      <Col xs={12} sm={6} md={7}>
        <Select
          placeholder="Sort by"
          value={sortBy}
          onChange={onSortChange}
          size="large"
          className="w-full"
          style={{ borderRadius: '12px' }}
          options={[
            { label: 'Efficiency', value: 'efficiency' },
            { label: 'Name', value: 'name' },
            { label: 'Current Count', value: 'currentCount' },
            { label: 'Target Count', value: 'targetCount' }
          ]}
        />
      </Col>
    </Row>
  );
};

export default ZoneFilters; 