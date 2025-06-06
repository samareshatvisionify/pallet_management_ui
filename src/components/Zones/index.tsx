'use client';

import React, { useState } from 'react';
import { Alert, Typography } from 'antd';
import { Zone, ZoneStats } from '@/store/slices/zoneSlice';
import { ZoneComparisonChart } from '@/components/common/charts';
import ZoneFilters from './ZoneFilters';
import ZoneStatsComponent from './ZoneStats';
import ZonesList from './ZonesList';

const { Title } = Typography;

interface ZonesProps {
  // Data props
  zones: Zone[];
  stats: ZoneStats;
  loading: boolean;
  error: string | null;
  
  // Action props
  onClearError: () => void;
  onUpdateZoneStatus: (zoneId: string, status: Zone['status']) => void;
  onZoneClick?: (zoneId: string) => void;
  
  // Utility props
  getZoneById: (id: string) => Zone | undefined;
  getZonesByStatus: (status: Zone['status']) => Zone[];
  getTopPerformingZones: (limit?: number) => Zone[];
  getZonesNeedingAttention: () => Zone[];
  calculateZoneProgress: (zone: Zone) => {
    percentage: number;
    isOnTarget: boolean;
    remaining: number;
  };
  getPerformanceIndicator: (performanceChange: number) => {
    type: 'positive' | 'negative' | 'neutral';
    icon: string;
    color: string;
    text: string;
  };
  getStatusColor: (status: Zone['status']) => string;
  getEfficiencyColor: (efficiency: number) => string;
  filterZones: (searchTerm: string, statusFilter?: Zone['status']) => Zone[];
  sortZones: (zones: Zone[], sortBy: 'name' | 'efficiency' | 'currentCount' | 'targetCount', order?: 'asc' | 'desc') => Zone[];
}

const Zones: React.FC<ZonesProps> = ({
  zones,
  stats,
  loading,
  error,
  onClearError,
  onUpdateZoneStatus,
  onZoneClick,
  calculateZoneProgress,
  getPerformanceIndicator,
  getStatusColor,
  getEfficiencyColor,
  filterZones,
  sortZones
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Zone['status'] | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'name' | 'efficiency' | 'currentCount' | 'targetCount'>('efficiency');

  // Filter and sort zones
  const filteredZones = filterZones(searchTerm, statusFilter);
  const sortedZones = sortZones(filteredZones, sortBy);

  return (
    <div className="w-full">
      {/* Error Alert */}
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          closable
          onClose={onClearError}
          className="mb-6"
        />
      )}

      {/* Filters Section */}
      <ZoneFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        sortBy={sortBy}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onSortChange={setSortBy}
      />

      {/* Statistics Section */}
      <ZoneStatsComponent stats={stats} loading={loading} />

      <Title level={4} className="!font-medium mb-2 text-center">Production Zones</Title>

      {/* Zones List Section */}
      <ZonesList
        zones={sortedZones}
        loading={loading}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        calculateZoneProgress={calculateZoneProgress}
        getPerformanceIndicator={getPerformanceIndicator}
        getStatusColor={getStatusColor}
        onUpdateZoneStatus={onUpdateZoneStatus}
        onZoneClick={onZoneClick}
      />

      {/* Zone Comparison Chart Section */}
      <ZoneComparisonChart data={sortedZones} loading={loading} />
    </div>
  );
};

export default Zones; 