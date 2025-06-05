'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchZones,
  fetchZoneStats,
  refreshZones,
  clearError,
  updateZoneStatus,
  selectZones,
  selectZoneStats,
  selectZonesLoading,
  selectZonesError,
  selectZoneById,
  type Zone,
  type ZoneStats
} from '@/store/slices/zoneSlice';

export const useZones = () => {
  const dispatch = useAppDispatch();
  const zones = useAppSelector(selectZones);
  const stats = useAppSelector(selectZoneStats);
  const loading = useAppSelector(selectZonesLoading);
  const error = useAppSelector(selectZonesError);

  // Fetch data on hook initialization
  useEffect(() => {
    if (zones.length === 0) {
      dispatch(fetchZones());
      dispatch(fetchZoneStats());
    }
  }, [dispatch, zones.length]);

  // Business logic functions
  const handleRefresh = () => {
    dispatch(refreshZones());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleUpdateZoneStatus = (zoneId: string, status: Zone['status']) => {
    dispatch(updateZoneStatus({ zoneId, status }));
  };

  const getZoneById = (id: string) => {
    return zones.find((zone: Zone) => zone.id === id);
  };

  const getZonesByStatus = (status: Zone['status']) => {
    return zones.filter((zone: Zone) => zone.status === status);
  };

  const getTopPerformingZones = (limit: number = 3) => {
    return [...zones]
      .sort((a, b) => b.efficiency - a.efficiency)
      .slice(0, limit);
  };

  const getZonesNeedingAttention = () => {
    return zones.filter((zone: Zone) => 
      zone.status === 'warning' || 
      zone.efficiency < 80 || 
      zone.performanceChange < 0
    );
  };

  const calculateZoneProgress = (zone: Zone) => {
    return {
      percentage: Math.round((zone.currentCount / zone.targetCount) * 100),
      isOnTarget: zone.currentCount >= zone.targetCount,
      remaining: Math.max(0, zone.targetCount - zone.currentCount)
    };
  };

  const getPerformanceIndicator = (performanceChange: number) => {
    if (performanceChange > 0) {
      return {
        type: 'positive' as const,
        icon: '↗',
        color: '#52c41a',
        text: `+${performanceChange.toFixed(1)}%`
      };
    } else if (performanceChange < 0) {
      return {
        type: 'negative' as const,
        icon: '↘',
        color: '#ff4d4f',
        text: `${performanceChange.toFixed(1)}%`
      };
    } else {
      return {
        type: 'neutral' as const,
        icon: '→',
        color: '#8c8c8c',
        text: '0.0%'
      };
    }
  };

  const getStatusColor = (status: Zone['status']) => {
    switch (status) {
      case 'active':
        return '#52c41a';
      case 'warning':
        return '#faad14';
      case 'inactive':
        return '#d9d9d9';
      default:
        return '#d9d9d9';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return '#52c41a';
    if (efficiency >= 80) return '#faad14';
    if (efficiency >= 70) return '#fa8c16';
    return '#ff4d4f';
  };

  // Zone filtering and sorting
  const filterZones = (searchTerm: string, statusFilter?: Zone['status']) => {
    let filtered = zones;

    if (searchTerm) {
      filtered = filtered.filter((zone: Zone) =>
        zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        zone.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((zone: Zone) => zone.status === statusFilter);
    }

    return filtered;
  };

  const sortZones = (zones: Zone[], sortBy: 'name' | 'efficiency' | 'currentCount' | 'targetCount', order: 'asc' | 'desc' = 'desc') => {
    return [...zones].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  };

  return {
    // Data
    zones,
    stats,
    loading,
    error,
    
    // Actions
    handleRefresh,
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
  };
}; 