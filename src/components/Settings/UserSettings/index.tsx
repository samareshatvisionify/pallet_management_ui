'use client';

import React, { useState } from 'react';
import { Typography } from 'antd';
import UserFilters from './UserFilters';
import UserActions from './UserActions';
import UserTable, { User } from './UserTable';
import { mockUsers } from '@/demoData';

const { Text } = Typography;

const UserSettings: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddUser = () => {
    console.log('Add new user');
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  return (
    <div className="user-settings-container">
      <div className="user-settings-description">
        <Text className="text-gray-500">
          Manage users, roles, and permissions for your organization
        </Text>
      </div>

      <div className="user-settings-card">
        <div className="user-settings-header">
          <div className="user-settings-filters user-settings-filters-sm">
            <UserFilters
              searchText={searchText}
              roleFilter={roleFilter}
              statusFilter={statusFilter}
              onSearchChange={handleSearchChange}
              onRoleFilterChange={handleRoleFilterChange}
              onStatusFilterChange={handleStatusFilterChange}
            />

            <UserActions onAddUser={handleAddUser} />
          </div>
        </div>

        <div className="user-settings-table">
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchText={searchText}
            roleFilter={roleFilter}
            statusFilter={statusFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default UserSettings; 