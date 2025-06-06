'use client';

import React from 'react';
import CameraConfigure from '@/components/Settings/CameraSettings/CameraConfigure';

interface ConfigureContainerProps {
  cameraId: string;
}

const ConfigureContainer: React.FC<ConfigureContainerProps> = ({ cameraId }) => {
  return <CameraConfigure cameraId={cameraId} />;
};

export default ConfigureContainer; 