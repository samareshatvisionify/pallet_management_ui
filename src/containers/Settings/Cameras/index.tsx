'use client';

import React from 'react';
import CameraSettings from '@/components/Settings/CameraSettings';
import { democameras } from '@/demoData';

const CamerasContainer: React.FC = () => {
  return <CameraSettings cameras={democameras} />;
};

export default CamerasContainer; 