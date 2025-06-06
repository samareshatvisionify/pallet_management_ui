'use client';

import React from 'react';
import Cameras from '@/components/Cameras';
import { useCameras } from '@/hooks/useCameras';
import { useRouter } from 'next/navigation';

const CameraContainer: React.FC = () => {
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
    getCamerasByStatus,
    getCamerasByZone,
    getCamerasByCategory,
    getCamerasBySubcategory,
    getOnlineCameras,
    getRecordingCameras,
    getStatusColor,
    getUniqueZones,
    getUniqueCategories,
    getSubcategoriesForCategory,
    filterCameras,
  } = useCameras();

  const handleCameraClick = (cameraId: number) => {
    router.push(`/cameras/${cameraId}`);
  };

  return (
    <Cameras
      // Data props
      cameras={cameras}
      loading={loading}
      error={error}
      
      // Action props
      onClearError={handleClearError}
      onCameraClick={handleCameraClick}
      
      // Utility props
      filterCameras={filterCameras}
      getStatusColor={getStatusColor}
      getUniqueCategories={getUniqueCategories}
      getSubcategoriesForCategory={getSubcategoriesForCategory}
    />
  );
};

export default CameraContainer; 