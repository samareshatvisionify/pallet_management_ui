<<<<<<< HEAD
import { Zone } from '@/store/slices/zoneSlice';
import { ZoneChartData, TooltipCallbacks } from './types';
import { chartPalettes } from './colors';

// Convert zones data to chart format
export const convertZonesToChartData = (zones: Zone[]): ZoneChartData[] => {
  return zones.map(zone => ({
    zoneName: zone.name,
    currentCount: zone.currentCount,
    previousCount: zone.previousCount,
    targetCount: zone.targetCount,
    efficiency: zone.efficiency,
    status: zone.status,
  }));
};

// Generate comparison chart dataset
export const generateComparisonDatasets = (data: ZoneChartData[]) => {
  return [
    {
      label: 'Previous Period',
      data: data.map(item => item.previousCount),
      backgroundColor: chartPalettes.comparison.previous,
      borderRadius: 8,
    },
    {
      label: 'Current Period',
      data: data.map(item => item.currentCount),
      backgroundColor: chartPalettes.comparison.current,
      borderRadius: 8,
    },
  ];
};

// Generate efficiency chart dataset
export const generateEfficiencyDataset = (data: ZoneChartData[]) => {
  return [
    {
      label: 'Efficiency %',
      data: data.map(item => item.efficiency),
      backgroundColor: data.map(item => {
        if (item.efficiency >= 90) return chartPalettes.performance.excellent;
        if (item.efficiency >= 75) return chartPalettes.performance.good;
        if (item.efficiency >= 60) return chartPalettes.performance.average;
        return chartPalettes.performance.poor;
      }),
      borderRadius: 8,
    },
  ];
};

// Common tooltip callbacks for comparison charts
export const comparisonTooltipCallbacks: TooltipCallbacks = {
  title: (tooltipItems) => tooltipItems[0].label,
  label: (context) => {
    const label = context.dataset.label || '';
    const value = context.parsed.y;
    return `${label}: ${value} pallets`;
  },
  afterLabel: (context) => {
    const dataIndex = context.dataIndex;
    // This would need access to the original data, so we'll handle this in the component
    return '';
  },
};

// Format large numbers for chart display
export const formatChartValue = (value: number, unit: string = ''): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M${unit}`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K${unit}`;
  }
  return `${value}${unit}`;
};

// Calculate percentage change
export const calculatePercentageChange = (current: number, previous: number): string => {
  if (previous === 0) return current > 0 ? '+100%' : '0%';
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
};

// Get status color from zone status
export const getStatusColor = (status: 'active' | 'warning' | 'inactive'): string => {
  return chartPalettes.status[status];
};

// Generate chart labels from zone names
export const generateChartLabels = (zones: Zone[]): string[] => {
  return zones.map(zone => zone.name.replace(' - ', '\n'));
=======
import { Zone } from '@/store/slices/zoneSlice';
import { ZoneChartData, TooltipCallbacks } from './types';
import { chartPalettes } from './colors';

// Convert zones data to chart format
export const convertZonesToChartData = (zones: Zone[]): ZoneChartData[] => {
  return zones.map(zone => ({
    zoneName: zone.name,
    currentCount: zone.currentCount,
    previousCount: zone.previousCount,
    targetCount: zone.targetCount,
    efficiency: zone.efficiency,
    status: zone.status,
  }));
};

// Generate comparison chart dataset
export const generateComparisonDatasets = (data: ZoneChartData[]) => {
  return [
    {
      label: 'Previous Period',
      data: data.map(item => item.previousCount),
      backgroundColor: chartPalettes.comparison.previous,
      borderRadius: 8,
    },
    {
      label: 'Current Period',
      data: data.map(item => item.currentCount),
      backgroundColor: chartPalettes.comparison.current,
      borderRadius: 8,
    },
  ];
};

// Generate efficiency chart dataset
export const generateEfficiencyDataset = (data: ZoneChartData[]) => {
  return [
    {
      label: 'Efficiency %',
      data: data.map(item => item.efficiency),
      backgroundColor: data.map(item => {
        if (item.efficiency >= 90) return chartPalettes.performance.excellent;
        if (item.efficiency >= 75) return chartPalettes.performance.good;
        if (item.efficiency >= 60) return chartPalettes.performance.average;
        return chartPalettes.performance.poor;
      }),
      borderRadius: 8,
    },
  ];
};

// Common tooltip callbacks for comparison charts
export const comparisonTooltipCallbacks: TooltipCallbacks = {
  title: (tooltipItems) => tooltipItems[0].label,
  label: (context) => {
    const label = context.dataset.label || '';
    const value = context.parsed.y;
    return `${label}: ${value} pallets`;
  },
  afterLabel: (context) => {
    const dataIndex = context.dataIndex;
    // This would need access to the original data, so we'll handle this in the component
    return '';
  },
};

// Format large numbers for chart display
export const formatChartValue = (value: number, unit: string = ''): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M${unit}`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K${unit}`;
  }
  return `${value}${unit}`;
};

// Calculate percentage change
export const calculatePercentageChange = (current: number, previous: number): string => {
  if (previous === 0) return current > 0 ? '+100%' : '0%';
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
};

// Get status color from zone status
export const getStatusColor = (status: 'active' | 'warning' | 'inactive'): string => {
  return chartPalettes.status[status];
};

// Generate chart labels from zone names
export const generateChartLabels = (zones: Zone[]): string[] => {
  return zones.map(zone => zone.name.replace(' - ', '\n'));
};

// New utility functions for stations
export const convertStationsToChartData = (stations: Zone['stations']) => {
  return stations.map(station => ({
    name: station.name,
    currentCount: station.currentCount,
    targetCount: station.targetCount,
    efficiency: station.efficiency,
    status: station.status,
  }));
};

// Generate target vs current comparison dataset for stations
export const generateTargetComparisonDatasets = (data: { name: string; currentCount: number; targetCount: number; }[]) => {
  return [
    {
      label: 'Target Count',
      data: data.map(item => item.targetCount),
      backgroundColor: chartPalettes.comparison.previous,
      borderRadius: 8,
    },
    {
      label: 'Current Count',
      data: data.map(item => item.currentCount),
      backgroundColor: chartPalettes.comparison.current,
      borderRadius: 8,
    },
  ];
};

// Generate chart labels from station names
export const generateStationChartLabels = (stations: Zone['stations']): string[] => {
  return stations.map(station => station.name.replace(' - ', '\n'));
>>>>>>> master
}; 