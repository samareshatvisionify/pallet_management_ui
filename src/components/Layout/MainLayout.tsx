'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Typography, Select, Dropdown } from 'antd';
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
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleSidebar, selectSidebarCollapsed } from '@/store/slices/uiSlice';
import { useAuth } from '@/hooks/useAuth';
import { sites } from '@/demoData';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}
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
const getPageConfig = (pathname: string) => {
  if (pageConfig[pathname as keyof typeof pageConfig]) {
    return pageConfig[pathname as keyof typeof pageConfig];
  }
  
  if (pathname.startsWith('/settings/cameras/') && pathname !== '/settings/cameras') {
    return {
      title: 'Configure Camera',
      subtitle: 'Set up stations and configure settings for this camera',
      showRefresh: false,
    };
  }
  
  return {
    title: 'VisionAI',
    subtitle: 'Pallet Management System',
    showRefresh: false,
  };
};



const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector(selectSidebarCollapsed);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [selectedSite, setSelectedSite] = useState('warehouse-a');
  const [isMobile, setIsMobile] = useState(false);

  const currentPageConfig = getPageConfig(pathname);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);




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

  const getSelectedKey = () => {
    return [...mainMenuItems].find(item => item.key === pathname)?.key || '/';
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleSiteChange = (value: string) => {
    setSelectedSite(value);
    console.log('Selected site:', value);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

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

  const BottomNavigation = () => (
    <div className="layout-mobile-bottom-nav bg-container-style">
      <div className="flex justify-around items-center py-2">
        {mainMenuItems.map((item) => (
          <Link key={item.key} href={item.key} className="layout-mobile-nav-link">
            <div className={`layout-mobile-nav-icon ${pathname === item.key ? 'layout-mobile-nav-active' : 'layout-mobile-nav-inactive'}`}>
              {item.icon}
            </div>
            <span className={`layout-mobile-nav-text ${pathname === item.key ? 'layout-mobile-nav-active' : 'layout-mobile-nav-inactive'}`}>
              {typeof item.label === 'object' && 'props' in item.label ? item.label.props.children : 'Nav'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Layout className="layout-mobile">
        <Header 
          className="layout-mobile-header bg-container-style"
        >
          <div className="flex items-center flex-1 min-w-0">
            <div className="layout-mobile-logo">
              VP
            </div>
            <div className="min-w-0 flex-1">
              <Title level={4} className="layout-mobile-title truncate">
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

        <Content
          className="layout-mobile-content bg-container-style"
        >
          {children}
        </Content>

        <BottomNavigation />
      </Layout>
    );
  }

  return (
    <Layout className="layout-desktop">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="layout-sidebar hidden md:block bg-container-style"
        width={280}
        collapsedWidth={80}
      >
        <div className={`layout-sidebar-logo-section ${collapsed ? 'layout-sidebar-logo-collapsed' : 'layout-sidebar-logo-expanded'}`}>
          {!collapsed ? (
            <div className="layout-sidebar-logo-container">
              <div className="layout-sidebar-logo-icon">
                VP
              </div>
              <div>
                <Title level={4} className="layout-sidebar-logo-title">
                  VisionAI
                </Title>
                <div className="layout-sidebar-logo-subtitle">
                  Pallet Management
                </div>
              </div>
            </div>
          ) : (
            <div className="layout-sidebar-logo-icon-collapsed">
              VP
            </div>
          )}
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={mainMenuItems}
          className="layout-sidebar-menu"
        />

        <div className="layout-sidebar-bottom bg-container-style">
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={pathname === '/settings' ? ['/settings'] : []}
            items={getBottomMenuItems()}
            className={`layout-sidebar-bottom-menu ${collapsed ? 'layout-sidebar-bottom-menu-collapsed' : 'layout-sidebar-bottom-menu-expanded'}`}
          />

          {!collapsed && (
            <div className="layout-sidebar-site-selector">
              <div className="layout-sidebar-site-label">
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
        <Header 
          className="layout-desktop-header hidden md:flex bg-container-style"
        >
          <div className="layout-desktop-header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleSidebarToggle}
              className="!text-xl"
            />
            <div className="layout-desktop-header-title-container">
                <Title level={5} className="layout-desktop-header-title">
                    {currentPageConfig.title}
                </Title>
                <Text className="layout-desktop-header-subtitle">
                  {currentPageConfig.subtitle}
                </Text>
            </div>
          </div>
          
          <div className="layout-desktop-header-right">
            <div className="layout-desktop-header-site">
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

        <Content
          className="layout-desktop-content hidden md:block"
        >
          {children}
        </Content>

        <Content
          className="layout-mobile-content-hidden md:hidden bg-container-style"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 