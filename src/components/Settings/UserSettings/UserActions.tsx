'use client';

import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface UserActionsProps {
  onAddUser: () => void;
}

const UserActions: React.FC<UserActionsProps> = ({ onAddUser }) => {
  return (
    <div className="flex justify-end">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onAddUser}
        size="large"
        className="shadow-sm hover:shadow-md transition-shadow duration-200"
        style={{
          borderRadius: '6px',
          height: '40px',
          fontWeight: '500',
          background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
          border: 'none',
        }}
      >
        Add User
      </Button>
    </div>
  );
};

export default UserActions; 