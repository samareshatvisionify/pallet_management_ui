'use client';

import React from 'react';
import { ConfigProvider, App } from 'antd';
import { antdTheme } from './antd-config';
import { defaultLocale } from './antd-locale';

const AntdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ConfigProvider
      theme={antdTheme}
      locale={defaultLocale}
      componentSize="middle"
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};

export default AntdProvider; 