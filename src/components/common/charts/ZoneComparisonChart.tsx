'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Zone } from '@/store/slices/zoneSlice';
import {
  barChartOptions,
  chartPalettes,
  convertZonesToChartData,
  generateComparisonDatasets,
  generateChartLabels,
  calculatePercentageChange,
  BaseChartProps,
} from './index';

// Import chart registration
import './config';

const { Title: AntTitle } = Typography;

interface ZoneComparisonChartProps extends BaseChartProps {
  data: Zone[];
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
}

const ZoneComparisonChart: React.FC<ZoneComparisonChartProps> = ({ 
  data, 
  loading = false,
  height = 384, // 96 * 4 = 384px (h-96)
  className = "!mt-8 mb-8 shadow-sm border border-gray-200",
  title = "Zone Performance Comparison",
  subtitle = "Current period vs previous period pallet counts across all zones",
  showLegend = true,
}) => {
  // Convert zones to chart data format
  const chartData = convertZonesToChartData(data);
  
  // Prepare chart data
  const chartDataConfig = {
    labels: generateChartLabels(data),
    datasets: generateComparisonDatasets(chartData),
  };

  // Customize chart options with zone-specific tooltips
  const options = {
    ...barChartOptions,
    scales: {
      ...barChartOptions.scales,
      x: {
        ...barChartOptions.scales?.x,
        ticks: {
          ...barChartOptions.scales?.x?.ticks,
        }
      },
      y: {
        ...barChartOptions.scales?.y,
        ticks: {
          ...barChartOptions.scales?.y?.ticks,
          callback: function(value: any) {
            return value + ' pallets';
          }
        }
      }
    },
    plugins: {
      ...barChartOptions.plugins,
      legend: {
        ...barChartOptions.plugins?.legend,
        display: showLegend,
      },
      tooltip: {
        ...barChartOptions.plugins?.tooltip,
        callbacks: {
          title: function(tooltipItems: any[]) {
            return tooltipItems[0].label;
          },
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} pallets`;
          },
          afterLabel: function(context: any) {
            const zoneIndex = context.dataIndex;
            const zone = data[zoneIndex];
            if (zone) {
              const change = zone.currentCount - zone.previousCount;
              const changePercent = calculatePercentageChange(zone.currentCount, zone.previousCount);
              return `Change: ${change > 0 ? '+' : ''}${change} (${changePercent})`;
            }
            return '';
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
      
      <div style={{ height }}>
        <Bar data={chartDataConfig} options={options} />
      </div>
      
      {/* Chart Legend/Info */}
      {showLegend && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: chartPalettes.comparison.previous }}></div>
              <span>Previous Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: chartPalettes.comparison.current }}></div>
              <span>Current Period</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-gray-500">
                Hover over bars for detailed information
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ZoneComparisonChart; 