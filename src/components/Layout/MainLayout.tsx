'use client';

import React, { useState, useEffect } from 'react';
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
  const [selectedSite, setSelectedSite] = useState('warehouse-a');
  const [isMobile, setIsMobile] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link href="/settings">Settings</Link>,
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

  // Mobile Bottom Navigation Component
  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-gray-200" style={{ background: colorBgContainer }}>
      <div className="flex justify-around items-center py-2">
        {mainMenuItems.map((item) => (
          <Link key={item.key} href={item.key} className="flex flex-col items-center py-2 px-3 min-w-0 flex-1">
            <div className={`text-lg mb-1 ${pathname === item.key ? 'text-blue-500' : 'text-gray-500'}`}>
              {item.icon}
            </div>
            <span className={`text-xs truncate ${pathname === item.key ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
              {typeof item.label === 'object' && 'props' in item.label ? item.label.props.children : 'Nav'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Layout className="min-h-screen">
        {/* Mobile Header */}
        <Header 
          className="px-4 flex items-center justify-between shadow-sm z-10"
          style={{ background: colorBgContainer }}
        >
          <div className="flex items-center flex-1 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">
              VP
            </div>
            <div className="min-w-0 flex-1">
              <Title level={4} className="!m-0 !text-blue-500 !text-base !leading-tight truncate">
                VisionAI
              </Title>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select
              value={selectedSite}
              onChange={handleSiteChange}
              className="w-32"
              size="small"
              showSearch
              placeholder="Site"
              optionFilterProp="label"
              options={sites}
            />
            <Button type="text" icon={<UserOutlined />} size="small">
              Admin
            </Button>
          </div>
        </Header>

        {/* Mobile Content */}
        <Content
          className="flex-1 p-4 pb-20 overflow-auto"
          style={{
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>

        {/* Mobile Bottom Navigation */}
        <BottomNavigation />
      </Layout>
    );
  }

  // Desktop Layout
  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="relative h-screen shadow-lg hidden md:block"
        style={{ background: colorBgContainer }}
        width={280}
        collapsedWidth={80}
      >
        {/* Logo/Brand Section */}
        <div className={`${collapsed ? 'px-2 py-4 text-center' : 'px-6 py-4 text-left'} border-b border-gray-200 mb-4`}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                VP
              </div>
              <div>
                <Title level={4} className="!m-0 !text-blue-500 !leading-tight">
                  VisionAI
                </Title>
                <div className="text-xs text-gray-500 leading-none">
                  Pallet Management
                </div>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold mx-auto">
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
          className="border-none bg-transparent pb-36"
        />

        {/* Bottom Section - Absolute positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200" style={{ background: colorBgContainer }}>
          {/* Settings Menu */}
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={pathname === '/settings' ? ['/settings'] : []}
            items={getBottomMenuItems()}
            className={`border-none bg-transparent ${collapsed ? 'mb-0' : 'mb-4'}`}
          />

          {/* Site Selector - Only show when expanded */}
          {!collapsed && (
            <div className="px-6 pb-6">
              <div className="mb-2 text-xs text-gray-500 uppercase tracking-wider">
                Current Site
              </div>
              <Select
                value={selectedSite}
                onChange={handleSiteChange}
                className="w-full"
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
        {/* Desktop Header */}
        <Header 
          className="px-6 flex items-center justify-between shadow-sm z-10 hidden md:flex"
          style={{ background: colorBgContainer }}
        >
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleSidebarToggle}
              className="text-base w-16 h-16"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {sites.find(site => site.value === selectedSite)?.label}
            </div>
            <Button type="text" icon={<UserOutlined />}>
              Admin User
            </Button>
          </div>
        </Header>

        {/* Desktop Content */}
        <Content
          className="m-6 p-6 !max-h-[calc(100vh-7rem)] !overflow-auto hidden md:block"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>

        {/* Mobile Content for when sidebar is hidden */}
        <Content
          className="p-4 pb-20 overflow-auto md:hidden"
          style={{
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 