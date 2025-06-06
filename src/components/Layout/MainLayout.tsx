'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Typography, theme, Select, Dropdown } from 'antd';
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
  LogoutOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleSidebar, selectSidebarCollapsed } from '@/store/slices/uiSlice';
import { useAuth } from '@/hooks/useAuth';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

// Page titles and subtitles configuration
const pageConfig = {
  '/': {
    title: 'Dashboard',
    subtitle: 'Welcome to VisionAI Pallet Management System. Monitor your pallet operations and AI analytics in real-time.',
    showRefresh: true,
  },
  '/cameras': {
    title: 'Camera Management',
    subtitle: 'Monitor and configure AI-powered cameras for pallet detection and tracking across your warehouse.',
    showRefresh: true,
  },
  '/zones': {
    title: 'Zones Management',
    subtitle: 'Monitor and manage warehouse zones with real-time performance tracking and efficiency metrics.',
    showRefresh: true,
  },
  '/historical': {
    title: 'Historical Data',
    subtitle: 'Analyze historical pallet data, trends, and performance metrics for insights and reporting.',
    showRefresh: true,
  },
  '/settings': {
    title: 'Settings',
    subtitle: 'Configure system preferences, user settings, and application parameters.',
    showRefresh: false,
  },
  '/settings/sites': {
    title: 'Site Settings',
    subtitle: 'Configure zones, boundaries, and site-specific settings for your facility.',
    showRefresh: false,
  },
  '/settings/cameras': {
    title: 'Camera Settings',
    subtitle: 'Configure camera settings, monitoring parameters, and operational shifts.',
    showRefresh: false,
  },
  '/settings/users': {
    title: 'User Management',
    subtitle: 'Manage users, roles, and permissions for your organization.',
    showRefresh: false,
  },
} as const;

// Function to get page config including dynamic routes
const getPageConfig = (pathname: string) => {
  // Check for exact matches first
  if (pageConfig[pathname as keyof typeof pageConfig]) {
    return pageConfig[pathname as keyof typeof pageConfig];
  }
  
  // Handle dynamic routes
  if (pathname.startsWith('/settings/cameras/') && pathname !== '/settings/cameras') {
    return {
      title: 'Configure Camera',
      subtitle: 'Set up stations and configure settings for this camera',
      showRefresh: false,
    };
  }
  
  // Default fallback
  return {
    title: 'VisionAI',
    subtitle: 'Pallet Management System',
    showRefresh: false,
  };
};

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
  const router = useRouter();
  const { user, logout } = useAuth();
  const [selectedSite, setSelectedSite] = useState('warehouse-a');
  const [isMobile, setIsMobile] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Get current page configuration
  const currentPageConfig = getPageConfig(pathname);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle page refresh
  const handlePageRefresh = () => {
    // This can be customized per page or trigger specific refresh actions
    window.location.reload();
  };

  // Page Header Component - Only shown on desktop
  const PageHeader = () => (
    <div className="hidden md:block mb-4 md:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 bg-white p-4 md:p-6 rounded-lg shadow-sm">
      <div className="min-w-0 flex-1">
        <Title level={2} className="!mb-0 !text-xl md:!text-2xl">
          {currentPageConfig.title} | {currentPageConfig.subtitle}
        </Title>
      </div>
      {currentPageConfig.showRefresh && (
        <div className="flex-shrink-0">
          <Button 
            icon={<ReloadOutlined />} 
            onClick={handlePageRefresh}
            size="small"
            className="md:size-default"
          >
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      )}
    </div>
  );

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

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  // User menu items
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

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
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Button type="text" icon={<UserOutlined />} size="small">
                {user?.username || 'Admin'}
              </Button>
            </Dropdown>
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
        className="relative h-screen shadow-xs hidden md:block"
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
          className="!px-4 !h-18 flex items-center justify-between shadow-xs z-10 hidden md:flex"
          style={{ background: colorBgContainer }}
        >
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleSidebarToggle}
              className="!text-xl"
            />
            <div className="min-w-0 flex items-center justify-start ml-4">
                <Title level={5} className="!mb-0 pr-4 border-r border-gray-200 !text-lg md:!text-lg">
                    {currentPageConfig.title}
                </Title>
                <Text className="!mb-0 ml-4 font-light !text-md md:!text-md">
                  {currentPageConfig.subtitle}
                </Text>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {sites.find(site => site.value === selectedSite)?.label}
            </div>
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Button type="text" icon={<UserOutlined />}>
                {user?.username || 'Admin User'}
              </Button>
            </Dropdown>
          </div>
        </Header>

        {/* Desktop Content */}
        <Content
          className="p-6 !max-h-[calc(100vh-5rem)] !overflow-auto hidden md:block"
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