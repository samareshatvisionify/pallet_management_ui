'use client';

import React from 'react';
import Cameras from '@/components/Cameras';
import { useCameras } from '@/hooks/useCameras';

const CamerasContainer: React.FC = () => {
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

  return (
    <Cameras
      // Data props
      cameras={cameras}
      loading={loading}
      error={error}
      
      // Action props
      onClearError={handleClearError}
      
      // Utility props
      filterCameras={filterCameras}
      getStatusColor={getStatusColor}
      getUniqueCategories={getUniqueCategories}
      getSubcategoriesForCategory={getSubcategoriesForCategory}
    />
  );
};

export default CamerasContainer; 