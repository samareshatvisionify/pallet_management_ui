'use client';

import React from 'react';
import { Zones } from '@/components';
import { useZones } from '@/hooks/useZones';

const ZonesContainer: React.FC = () => {
  const {
    // Data
    zones,
    stats,
    loading,
    error,
    
    // Actions
    handleClearError,
    handleUpdateZoneStatus,
    
    // Utility functions
    getZoneById,
    getZonesByStatus,
    getTopPerformingZones,
    getZonesNeedingAttention,
    calculateZoneProgress,
    getPerformanceIndicator,
    getStatusColor,
    getEfficiencyColor,
    filterZones,
    sortZones,
  } = useZones();

  return (
    <Zones
      // Data props
      zones={zones}
      stats={stats}
      loading={loading}
      error={error}
      
      // Action props
      onClearError={handleClearError}
      onUpdateZoneStatus={handleUpdateZoneStatus}
      
      // Utility props
      getZoneById={getZoneById}
      getZonesByStatus={getZonesByStatus}
      getTopPerformingZones={getTopPerformingZones}
      getZonesNeedingAttention={getZonesNeedingAttention}
      calculateZoneProgress={calculateZoneProgress}
      getPerformanceIndicator={getPerformanceIndicator}
      getStatusColor={getStatusColor}
      getEfficiencyColor={getEfficiencyColor}
      filterZones={filterZones}
      sortZones={sortZones}
    />
  );
};

export default ZonesContainer; 