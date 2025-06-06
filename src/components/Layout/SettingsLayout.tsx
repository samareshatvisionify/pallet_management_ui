'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'antd';
import { SettingOutlined, TeamOutlined, CameraOutlined } from '@ant-design/icons';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/settings/sites',
      icon: <SettingOutlined />,
      label: 'Site Settings',
    },
    {
      key: '/settings/cameras',
      icon: <CameraOutlined />,
      label: 'Camera Settings',
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
    if (pathname.startsWith('/settings/cameras')) return '/settings/cameras';
    if (pathname.startsWith('/settings/sites')) return '/settings/sites';
    return '/settings/sites'; // Default to sites
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