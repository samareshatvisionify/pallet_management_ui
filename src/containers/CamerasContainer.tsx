'use client';

import React from 'react';
import { CamerasComponent } from '@/components';
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
    getOnlineCameras,
    getRecordingCameras,
    getStatusColor,
    getUniqueZones,
    filterCameras,
  } = useCameras();

  return (
    <CamerasComponent
      // Data props
      cameras={cameras}
      loading={loading}
      error={error}
      
      // Action props
      onClearError={handleClearError}
      
      // Utility props
      filterCameras={filterCameras}
      getStatusColor={getStatusColor}
      getUniqueZones={getUniqueZones}
    />
  );
};

export default CamerasContainer; 