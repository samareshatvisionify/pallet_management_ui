'use client';

import React from 'react';
import { Zones } from '@/components';
import { useZones } from '@/hooks/useZones';
import { useRouter } from 'next/navigation';

const ZoneContainer: React.FC = () => {
  const router = useRouter();
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

  const handleZoneClick = (zoneId: string) => {
    router.push(`/zones/${zoneId}`);
  };

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
      onZoneClick={handleZoneClick}
      
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

export default ZoneContainer; 