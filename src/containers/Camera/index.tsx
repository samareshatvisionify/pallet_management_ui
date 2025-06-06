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

  const handleAddCamera = () => {
    console.log('Add new camera');
    // TODO: Implement add camera functionality - could navigate to a form or open a modal
    // For now, we could navigate to camera settings or show a placeholder
    router.push('/settings/cameras');
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
      onAddCamera={handleAddCamera}
      
      // Utility props
      filterCameras={filterCameras}
      getStatusColor={getStatusColor}
      getUniqueZones={getUniqueZones}
      getUniqueCategories={getUniqueCategories}
      getSubcategoriesForCategory={getSubcategoriesForCategory}
    />
  );
};

export default CameraContainer; 