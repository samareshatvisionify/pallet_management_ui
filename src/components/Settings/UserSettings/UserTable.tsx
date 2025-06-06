'use client';

import React from 'react';
import { Table, Button, Tag, Dropdown, Modal, Avatar, Typography, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined, ExclamationCircleOutlined, UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const { Text } = Typography;

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Manager' | 'Operator' | 'Viewer';
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

interface UserTableProps {
  users: User[];
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
  searchText?: string;
  roleFilter?: string;
  statusFilter?: string;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  searchText = '',
  roleFilter = '',
  statusFilter = '',
}) => {
  const handleDelete = (userId: string, userName: string) => {
    Modal.confirm({
      title: 'Delete User',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${userName}? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        onDelete(userId);
      },
    });
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Active': return '#52c41a';
      case 'Inactive': return '#ff4d4f';
      case 'Pending': return '#faad14';
      default: return '#d9d9d9';
    }
  };

  const getStatusConfig = (status: User['status']) => {
    switch (status) {
      case 'Active': return { color: '#52c41a', bgColor: '#f6ffed', borderColor: '#b7eb8f' };
      case 'Inactive': return { color: '#ff4d4f', bgColor: '#fff2f0', borderColor: '#ffadd2' };
      case 'Pending': return { color: '#faad14', bgColor: '#fffbe6', borderColor: '#ffe58f' };
      default: return { color: '#d9d9d9', bgColor: '#fafafa', borderColor: '#d9d9d9' };
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'Admin': return '#722ed1';
      case 'Manager': return '#1890ff';
      case 'Operator': return '#13c2c2';
      case 'Viewer': return '#8c8c8c';
      default: return '#d9d9d9';
    }
  };

  const getRoleConfig = (role: User['role']) => {
    switch (role) {
      case 'Admin': return { color: '#722ed1', bgColor: '#f9f0ff', borderColor: '#d3adf7' };
      case 'Manager': return { color: '#1890ff', bgColor: '#e6f7ff', borderColor: '#91d5ff' };
      case 'Operator': return { color: '#13c2c2', bgColor: '#e6fffb', borderColor: '#87e8de' };
      case 'Viewer': return { color: '#8c8c8c', bgColor: '#f5f5f5', borderColor: '#d9d9d9' };
      default: return { color: '#d9d9d9', bgColor: '#fafafa', borderColor: '#d9d9d9' };
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#1890ff', '#52c41a', '#eb2f96', '#fa541c'];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const getActionItems = (user: User) => [
    {
      key: 'edit',
      label: (
        <span style={{ color: '#1890ff' }}>
          <EditOutlined style={{ marginRight: 8 }} />
          Edit User
        </span>
      ),
      onClick: () => onEdit(user.id),
    },
    {
      key: 'delete',
      label: (
        <span style={{ color: '#ff4d4f' }}>
          <DeleteOutlined style={{ marginRight: 8 }} />
          Delete User
        </span>
      ),
      onClick: () => handleDelete(user.id, user.name),
    },
  ];

  const columns = [
    {
      title: 'User',
      dataIndex: 'email',
      key: 'user',
      width: 280,
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value: any, record: User) =>
        record.email.toLowerCase().includes(value.toLowerCase()) ||
        record.name.toLowerCase().includes(value.toLowerCase()),
      render: (_: any, record: User) => (
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            style={{ 
              backgroundColor: getAvatarColor(record.name),
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {getInitials(record.name)}
          </Avatar>
          <div>
            <div className="font-semibold text-gray-900">{record.name}</div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <MailOutlined className="text-xs" />
              {record.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role: User['role']) => {
        const config = getRoleConfig(role);
        return (
          <Tag
            style={{
              color: config.color,
              backgroundColor: config.bgColor,
              borderColor: config.borderColor,
              border: `1px solid ${config.borderColor}`,
              borderRadius: '6px',
              padding: '4px 8px',
              fontWeight: '500',
              fontSize: '12px'
            }}
          >
            {role}
          </Tag>
        );
      },
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'Manager', value: 'Manager' },
        { text: 'Operator', value: 'Operator' },
        { text: 'Viewer', value: 'Viewer' },
      ],
      filteredValue: roleFilter ? [roleFilter] : null,
      onFilter: (value: any, record: User) => record.role === value,
    },
    {
      title: 'Contact',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      render: (phone: string) => (
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <PhoneOutlined className="text-xs" />
          {phone}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: User['status']) => {
        const config = getStatusConfig(status);
        return (
          <Tag
            style={{
              color: config.color,
              backgroundColor: config.bgColor,
              borderColor: config.borderColor,
              border: `1px solid ${config.borderColor}`,
              borderRadius: '6px',
              padding: '4px 8px',
              fontWeight: '500',
              fontSize: '12px'
            }}
          >
            ● {status}
          </Tag>
        );
      },
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
        { text: 'Pending', value: 'Pending' },
      ],
      filteredValue: statusFilter ? [statusFilter] : null,
      onFilter: (value: any, record: User) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      align: 'center' as const,
      render: (_: any, record: User) => (
        <Dropdown
          menu={{ items: getActionItems(record) }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            size="small"
            className="hover:bg-gray-100 rounded-full"
            style={{ 
              border: 'none',
              boxShadow: 'none'
            }}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg">
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          total: users.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} users`,
          className: 'px-4 py-3',
        }}
        scroll={{ x: 800 }}
        className="m-5"
        rowClassName="hover:bg-gray-50 transition-colors duration-200"
        size="large"
        style={{
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default UserTable; 