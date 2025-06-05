'use client';

import React from 'react';
import { Zone } from '@/store/slices/zoneSlice';
import { ComparisonChart, convertStationsToChartData, generateTargetComparisonDatasets, generateStationChartLabels } from '@/components/common/charts';

interface ZoneStationsChartProps {
  zone: Zone;
  loading: boolean;
}

const ZoneStationsChart: React.FC<ZoneStationsChartProps> = ({
  zone,
  loading
}) => {
  if (!zone.stations || zone.stations.length === 0) {
    return null;
  }

  return (
    <ComparisonChart
      data={{
        labels: generateStationChartLabels(zone.stations),
        datasets: generateTargetComparisonDatasets(convertStationsToChartData(zone.stations))
      }}
      title="Station Performance Comparison"
      subtitle="Target vs current pallet count for all stations in this zone"
      loading={loading}
      yAxisLabel="pallets"
      tooltipUnit="pallets"
      originalData={convertStationsToChartData(zone.stations)}
      className='!mb-0 h-full'
      height={420}
    />
  );
};

export default ZoneStationsChart; 