'use client';

import React from 'react';
import { ConfigProvider, theme, App } from 'antd';
import type { ThemeConfig } from 'antd';
import { defaultLocale } from './antd-locale';

// Custom theme configuration
export const antdTheme: ThemeConfig = {
  hashed: false,
  algorithm: theme.defaultAlgorithm,
  token: {
    // Color tokens
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#1890ff',
    
    // Typography tokens
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    
    // Layout tokens
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    
    // Component tokens
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
    
    // Spacing tokens
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,
    
    // Motion tokens
    motionDurationSlow: '0.3s',
    motionDurationMid: '0.2s',
    motionDurationFast: '0.1s',
  },
  components: {
    // Button component customization
    Button: {
      borderRadius: 6,
      controlHeight: 32,
      fontWeight: 500,
    },
    
    // Card component customization
    Card: {
      borderRadius: 8,
      paddingLG: 24,
    },
    
    // Input component customization
    Input: {
      borderRadius: 6,
      controlHeight: 32,
    },
    
    // Table component customization
    Table: {
      borderRadius: 6,
      headerBg: '#fafafa',
    },
    
    // Menu component customization
    Menu: {
      borderRadius: 6,
      itemBorderRadius: 4,
    },
    
    // Notification component customization
    Notification: {
      borderRadius: 8,
    },
    
    // Modal component customization
    Modal: {
      borderRadius: 8,
    },
  },
};

// Ant Design Provider Component
interface AntdProviderProps {
  children: React.ReactNode;
}

export const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  return (
    <ConfigProvider 
      theme={antdTheme} 
      locale={defaultLocale}
      componentSize="middle"
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
};

export default AntdProvider; 