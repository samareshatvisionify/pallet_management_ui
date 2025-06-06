'use client';

import React, { useState } from 'react';
import { Typography, Card } from 'antd';
import UserFilters from './UserFilters';
import UserActions from './UserActions';
import UserTable, { User } from './UserTable';

const { Text } = Typography;

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.admin@company.com',
    name: 'John Smith',
    role: 'Admin',
    phone: '+1-234-567-8901',
    status: 'Active',
  },
  {
    id: '2',
    email: 'sarah.manager@company.com',
    name: 'Sarah Johnson',
    role: 'Manager',
    phone: '+1-234-567-8902',
    status: 'Active',
  },
  {
    id: '3',
    email: 'mike.operator@company.com',
    name: 'Mike Wilson',
    role: 'Operator',
    phone: '+1-234-567-8903',
    status: 'Inactive',
  },
  {
    id: '4',
    email: 'emma.viewer@company.com',
    name: 'Emma Davis',
    role: 'Viewer',
    phone: '+1-234-567-8904',
    status: 'Pending',
  },
];

const UserSettings: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddUser = () => {
    console.log('Add new user');
    // TODO: Implement add user functionality
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
    <div className="w-full">
      <div className="mb-4">
        <Text className="text-gray-500">
          Manage users, roles, and permissions for your organization
        </Text>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header Section */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
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

        {/* Users Table */}
        <div className="p-0">
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