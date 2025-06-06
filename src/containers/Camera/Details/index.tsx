'use client';

import React from 'react';
import { CameraDetails } from '@/components';
import { useCameras } from '@/hooks/useCameras';
import { useRouter } from 'next/navigation';

interface CameraDetailsContainerProps {
  cameraId: string;
}

const CameraDetailsContainer: React.FC<CameraDetailsContainerProps> = ({ cameraId }) => {
  const router = useRouter();
  const {
    // Data
    cameras,
    loading,
    error,
    
    // Actions
    handleClearError,
    
    // Utility functions
    getCameraById,
  } = useCameras();

  const cameraIdNum = parseInt(cameraId);
  const camera = getCameraById(cameraIdNum);

  const handleBack = () => {
    router.push('/cameras');
  };

  return (
    <CameraDetails
      camera={camera}
      loading={loading}
      error={error}
      onClearError={handleClearError}
      onBack={handleBack}
    />
  );
};

export default CameraDetailsContainer; 