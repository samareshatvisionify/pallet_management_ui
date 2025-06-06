'use client';

import React from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface UserFiltersProps {
  searchText: string;
  roleFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchText,
  roleFilter,
  statusFilter,
  onSearchChange,
  onRoleFilterChange,
  onStatusFilterChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Search
        placeholder="Search users..."
        allowClear
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: 250 }}
        prefix={<SearchOutlined />}
      />
      <Select
        placeholder="Filter by role"
        allowClear
        value={roleFilter}
        onChange={onRoleFilterChange}
        style={{ width: 150 }}
        options={[
          { value: 'Admin', label: 'Admin' },
          { value: 'Manager', label: 'Manager' },
          { value: 'Operator', label: 'Operator' },
          { value: 'Viewer', label: 'Viewer' },
        ]}
      />
      <Select
        placeholder="Filter by status"
        allowClear
        value={statusFilter}
        onChange={onStatusFilterChange}
        style={{ width: 150 }}
        options={[
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
          { value: 'Pending', label: 'Pending' },
        ]}
      />
    </div>
  );
};

export default UserFilters; 