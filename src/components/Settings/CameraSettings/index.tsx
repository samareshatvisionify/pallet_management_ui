'use client';

import React from 'react';
import CameraGrid from './CameraGrid';
import { Camera } from '@/demoData';

interface CameraSettingsProps {
  cameras: Camera[];
}

const CameraSettings: React.FC<CameraSettingsProps> = ({ cameras }) => {
  return <CameraGrid cameras={cameras} />;
};

export default CameraSettings; 