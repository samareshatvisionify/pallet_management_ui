'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import { Zone } from '@/store/slices/zoneSlice';
import {
  pieChartOptions,
  chartPalettes,
  BaseChartProps,
} from './index';

// Import chart registration
import './config';

const { Title: AntTitle } = Typography;

interface ZoneStatusChartProps extends BaseChartProps {
  data: Zone[];
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
}

const ZoneStatusChart: React.FC<ZoneStatusChartProps> = ({ 
  data, 
  loading = false,
  height = 384,
  className = "mb-8 shadow-sm border border-gray-200",
  title = "Zone Status Distribution",
  subtitle = "Distribution of zones by operational status",
  showLegend = true,
}) => {
  // Calculate status distribution
  const statusCounts = data.reduce((acc, zone) => {
    acc[zone.status] = (acc[zone.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const labels = Object.keys(statusCounts).map(status => 
    status.charAt(0).toUpperCase() + status.slice(1)
  );
  
  const values = Object.values(statusCounts);
  const colors = Object.keys(statusCounts).map(status => 
    chartPalettes.status[status as keyof typeof chartPalettes.status]
  );

  // Prepare chart data
  const chartDataConfig = {
    labels,
    datasets: [
      {
        label: 'Zones',
        data: values,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // Customize chart options for status display
  const options = {
    ...pieChartOptions,
    plugins: {
      ...pieChartOptions.plugins,
      legend: {
        ...pieChartOptions.plugins?.legend,
        display: showLegend,
        position: 'bottom' as const,
      },
      tooltip: {
        ...pieChartOptions.plugins?.tooltip,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} zones (${percentage}%)`;
          }
        }
      }
    },
  };

  if (loading) {
    return (
      <Card className={className}>
        <div className="flex items-center justify-center" style={{ height }}>
          <div className="text-gray-500">Loading chart data...</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <AntTitle level={4} className="!mb-2 !font-semibold text-gray-800">
              {title}
            </AntTitle>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mb-0">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div style={{ height }} className="flex items-center justify-center">
        <Doughnut data={chartDataConfig} options={options} />
      </div>
      
      {/* Status Summary */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="text-center">
              <div className="text-2xl font-bold" style={{ 
                color: chartPalettes.status[status as keyof typeof chartPalettes.status] 
              }}>
                {count}
              </div>
              <div className="text-sm text-gray-600 capitalize">
                {status} Zones
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ZoneStatusChart; 