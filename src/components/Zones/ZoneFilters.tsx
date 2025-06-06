'use client';

import React, { useState } from 'react';
import { Row, Col, Input, Select, Button, Badge, Typography, Modal } from 'antd';
import { SearchOutlined, SettingOutlined, FilterFilled } from '@ant-design/icons';
import { Zone } from '@/store/slices/zoneSlice';

const { Search } = Input;
const { Title } = Typography;

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasActiveFilters = !!statusFilter || !!searchTerm || sortBy !== 'efficiency';

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
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
      </div>

      {/* Mobile View */}
      <div className="md:hidden mb-6">
        <Row gutter={[12, 12]} align="middle">
          <Col span={24}>
            <div className="flex justify-between items-center gap-3 mb-3">
              <Title level={4} className="!mb-0 !font-base">Zones</Title>
              <Badge count={hasActiveFilters ? (statusFilter ? 1 : 0) + (sortBy !== 'efficiency' ? 1 : 0) + (searchTerm ? 1 : 0) : 0}>
                <Button
                  icon={<FilterFilled />}
                  size="middle"
                  onClick={() => setIsModalOpen(true)}
                  className='!bg-gray-100 !text-gray-600'
                  type='text' 
                />
              </Badge>
            </div>
          </Col>
          <Col span={24}>
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
        </Row>
      </div>

      {/* Mobile Filters Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <SettingOutlined />
            <span>Filter & Sort Zones</span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <div className="flex gap-2">
            <Button onClick={() => {
              onSearchChange('');
              onStatusFilterChange(undefined);
              onSortChange('efficiency');
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
            <Title level={5} className="!mb-2">Status Filter</Title>
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
          </div>
          
          <div>
            <Title level={5} className="!mb-2">Sort By</Title>
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
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ZoneFilters; 