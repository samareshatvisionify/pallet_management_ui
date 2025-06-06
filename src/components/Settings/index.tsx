'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import SettingsLayout from '../Layout/SettingsLayout';
import SiteSettings from './SiteSettings';
import UserSettings from './UserSettings';

const Settings: React.FC = () => {
  const pathname = usePathname();

  const renderContent = () => {
    if (pathname === '/settings/users') {
      return <UserSettings />;
    }
    return <SiteSettings />;
  };

  return (
    <SettingsLayout>
      {renderContent()}
    </SettingsLayout>
  );
};

export default Settings; 