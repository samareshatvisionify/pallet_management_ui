'use client';

import React from 'react';
import { Layout, Menu, Button, Typography, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleSidebar, selectSidebarCollapsed } from '@/store/slices/uiSlice';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector(selectSidebarCollapsed);
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Menu items configuration
  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link href="/">Dashboard</Link>,
    },
    {
      key: '/pallets',
      icon: <AppstoreOutlined />,
      label: <Link href="/pallets">Pallet Management</Link>,
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: <Link href="/analytics">Analytics</Link>,
    },
    {
      key: '/vision-ai',
      icon: <SettingOutlined />,
      label: <Link href="/vision-ai">Vision AI</Link>,
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link href="/settings">Settings</Link>,
    },
  ];

  // Get current selected key based on pathname
  const getSelectedKey = () => {
    return menuItems.find(item => item.key === pathname)?.key || '/';
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
          boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)',
        }}
        width={250}
        collapsedWidth={80}
      >
        {/* Logo/Brand Section */}
        <div style={{ 
          padding: collapsed ? '16px 8px' : '16px 24px', 
          textAlign: collapsed ? 'center' : 'left',
          borderBottom: '1px solid #f0f0f0',
          marginBottom: '8px'
        }}>
          {!collapsed ? (
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              VisionAI Pallets
            </Title>
          ) : (
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              VA
            </Title>
          )}
        </div>

        {/* Navigation Menu */}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          style={{ 
            border: 'none',
            background: 'transparent',
          }}
        />

        {/* Logout Section at Bottom */}
        <div style={{ 
          position: 'absolute', 
          bottom: '16px', 
          left: collapsed ? '16px' : '24px',
          right: collapsed ? '16px' : '24px',
        }}>
          <Menu
            theme="light"
            mode="inline"
            style={{ 
              border: 'none',
              background: 'transparent',
            }}
            items={[
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: collapsed ? null : 'Logout',
                onClick: () => {
                  // Handle logout logic here
                  console.log('Logout clicked');
                },
              },
            ]}
          />
        </div>
      </Sider>

      <Layout>
        {/* Header */}
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px 0 rgba(29, 35, 41, 0.05)',
          zIndex: 1,
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleSidebarToggle}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button type="text" icon={<UserOutlined />}>
              Admin User
            </Button>
          </div>
        </Header>

        {/* Main Content */}
        <Content
          style={{
            margin: '24px',
            padding: '24px',
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 