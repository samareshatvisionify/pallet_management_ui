'use client';

import React from 'react';
import { Layout, Menu, Button, Typography, theme, Select } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  CameraOutlined,
  EnvironmentOutlined,
  HistoryOutlined,
  SettingOutlined,
  UserOutlined,
  GlobalOutlined,
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

// Demo site data - this could be moved to Redux or fetched from API
const sites = [
  { value: 'warehouse-a', label: 'Warehouse A - North' },
  { value: 'warehouse-b', label: 'Warehouse B - South' },
  { value: 'warehouse-c', label: 'Warehouse C - East' },
  { value: 'distribution-1', label: 'Distribution Center 1' },
  { value: 'distribution-2', label: 'Distribution Center 2' },
  { value: 'manufacturing-1', label: 'Manufacturing Plant 1' },
  { value: 'manufacturing-2', label: 'Manufacturing Plant 2' },
];

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector(selectSidebarCollapsed);
  const pathname = usePathname();
  const [selectedSite, setSelectedSite] = React.useState('warehouse-a');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Main navigation items
  const mainMenuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link href="/">Dashboard</Link>,
    },
    {
      key: '/cameras',
      icon: <CameraOutlined />,
      label: <Link href="/cameras">Cameras</Link>,
    },
    {
      key: '/zones',
      icon: <EnvironmentOutlined />,
      label: <Link href="/zones">Zones</Link>,
    },
    {
      key: '/historical',
      icon: <HistoryOutlined />,
      label: <Link href="/historical">Historical</Link>,
    },
  ];

  // Bottom navigation items with site selector submenu when collapsed
  const getBottomMenuItems = () => {
    const settingsItem = {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link href="/settings">Settings</Link>,
    };

    const siteMenuItem = {
      key: 'site-selector',
      icon: <GlobalOutlined />,
      label: collapsed ? 'Site' : null,
      children: collapsed ? sites.map(site => ({
        key: site.value,
        label: site.label,
        onClick: () => handleSiteChange(site.value),
      })) : undefined,
    };

    return collapsed ? [settingsItem, siteMenuItem] : [settingsItem];
  };

  // Get current selected key based on pathname
  const getSelectedKey = () => {
    return [...mainMenuItems].find(item => item.key === pathname)?.key || '/';
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleSiteChange = (value: string) => {
    setSelectedSite(value);
    // TODO: Dispatch action to update selected site in Redux
    console.log('Selected site:', value);
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
          position: 'relative',
          height: '100vh',
        }}
        width={280}
        collapsedWidth={80}
      >
        {/* Logo/Brand Section */}
        <div style={{ 
          padding: collapsed ? '16px 8px' : '16px 24px', 
          textAlign: collapsed ? 'center' : 'left',
          borderBottom: '1px solid #f0f0f0',
          marginBottom: '16px'
        }}>
          {!collapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #1890ff, #722ed1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                VP
              </div>
              <div>
                <Title level={4} style={{ margin: 0, color: '#1890ff', lineHeight: 1.2 }}>
                  VisionAI
                </Title>
                <div style={{ fontSize: '12px', color: '#8c8c8c', lineHeight: 1 }}>
                  Pallet Management
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #1890ff, #722ed1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '0 auto'
            }}>
              VP
            </div>
          )}
        </div>

        {/* Main Navigation Menu */}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={mainMenuItems}
          style={{ 
            border: 'none',
            background: 'transparent',
            paddingBottom: '140px', // Add space for bottom section
          }}
        />

        {/* Bottom Section - Absolute positioned at bottom */}
        <div style={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid #f0f0f0',
          background: colorBgContainer,
        }}>
          {/* Settings Menu */}
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={pathname === '/settings' ? ['/settings'] : []}
            items={getBottomMenuItems()}
            style={{ 
              border: 'none',
              background: 'transparent',
              marginBottom: collapsed ? 0 : '16px',
            }}
          />

          {/* Site Selector - Only show when expanded */}
          {!collapsed && (
            <div style={{ 
              padding: '8px 24px',
              paddingBottom: '24px',
            }}>
              <div style={{ 
                marginBottom: '8px', 
                fontSize: '12px', 
                color: '#8c8c8c', 
                textTransform: 'uppercase', 
                letterSpacing: '0.5px' 
              }}>
                Current Site
              </div>
              <Select
                value={selectedSite}
                onChange={handleSiteChange}
                style={{ width: '100%' }}
                showSearch
                placeholder="Select a site"
                optionFilterProp="label"
                options={sites}
              />
            </div>
          )}
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
            <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
              {sites.find(site => site.value === selectedSite)?.label}
            </div>
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