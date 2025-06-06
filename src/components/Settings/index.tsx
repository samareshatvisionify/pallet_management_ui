'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import SettingsLayout from '../Layout/SettingsLayout';
import SiteSettings from './SiteSettings';
import CameraSettings from './CameraSettings';
import UserSettings from './UserSettings';

const Settings: React.FC = () => {
  const pathname = usePathname();

  const renderContent = () => {
    if (pathname === '/settings/users') {
      return <UserSettings />;
    }
    if (pathname.startsWith('/settings/cameras')) {
      return <CameraSettings />;
    }
    if (pathname.startsWith('/settings/sites') || pathname === '/settings') {
      return <SiteSettings />;
    }
    return <SiteSettings />; // Default fallback
  };

  return (
    <SettingsLayout>
      {renderContent()}
    </SettingsLayout>
  );
};

export default Settings; 