'use client';

import React from 'react';
import { ZoneDetails } from '@/components';
import { useZones } from '@/hooks/useZones';

interface ZoneDetailsContainerProps {
  zoneId: string;
}

const ZoneDetailsContainer: React.FC<ZoneDetailsContainerProps> = ({ zoneId }) => {
  const {
    // Data
    zones,
    loading,
    error,
    
    // Actions
    handleClearError,
    handleUpdateZoneStatus,
    
    // Utility functions
    getZoneById,
    calculateZoneProgress,
    getPerformanceIndicator,
    getStatusColor,
    getEfficiencyColor,
  } = useZones();

  const zone = getZoneById(zoneId);

  return (
    <ZoneDetails
      zone={zone}
      loading={loading}
      error={error}
      onClearError={handleClearError}
      onUpdateZoneStatus={handleUpdateZoneStatus}
      calculateZoneProgress={calculateZoneProgress}
      getPerformanceIndicator={getPerformanceIndicator}
      getStatusColor={getStatusColor}
      getEfficiencyColor={getEfficiencyColor}
    />
  );
};

export default ZoneDetailsContainer; 