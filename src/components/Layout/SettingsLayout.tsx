'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Card } from 'antd';
import { SettingOutlined, TeamOutlined } from '@ant-design/icons';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Site Settings',
    },
    {
      key: '/settings/users',
      icon: <TeamOutlined />,
      label: 'User Management',
    },
  ];

  const handleMenuClick = (key: string) => {
    router.push(key);
  };

  // Get current selected key based on pathname
  const getSelectedKey = () => {
    if (pathname === '/settings/users') return '/settings/users';
    return '/settings';
  };

  return (
    <div className="w-full space-y-6">
      {/* Navigation */}
      <Menu
        mode="horizontal"
        selectedKeys={[getSelectedKey()]}
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key)}
        className="border-none !bg-transparent !mb-4"
      />

      {/* Content */}
      <div className="w-full p-4">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout; 