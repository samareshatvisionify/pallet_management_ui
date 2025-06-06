'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
  barChartOptions,
  chartPalettes,
  calculatePercentageChange,
  BaseChartProps,
} from './index';

// Import chart registration
import './config';

const { Title: AntTitle } = Typography;

interface ComparisonChartProps extends BaseChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderRadius: number;
    }[];
  };
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
  yAxisLabel?: string;
  tooltipUnit?: string;
  originalData?: { name: string; currentCount: number; targetCount?: number; previousCount?: number; }[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ 
  data,
  loading = false,
  height = 384, // 96 * 4 = 384px (h-96)
  className = "!mt-8 mb-8 shadow-sm border border-gray-200",
  title = "Performance Comparison",
  subtitle = "Current vs target comparison",
  showLegend = true,
  yAxisLabel = "pallets",
  tooltipUnit = "pallets",
  originalData = [],
}) => {
  // Customize chart options with tooltips
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
            return value + ' ' + yAxisLabel;
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
            return `${label}: ${value} ${tooltipUnit}`;
          },
          afterLabel: function(context: any) {
            const dataIndex = context.dataIndex;
            const item = originalData[dataIndex];
            if (item && item.targetCount !== undefined && item.currentCount !== undefined) {
              const change = item.currentCount - item.targetCount;
              const changePercent = calculatePercentageChange(item.currentCount, item.targetCount);
              return `Difference: ${change > 0 ? '+' : ''}${change} (${changePercent})`;
            } else if (item && item.previousCount !== undefined && item.currentCount !== undefined) {
              const change = item.currentCount - item.previousCount;
              const changePercent = calculatePercentageChange(item.currentCount, item.previousCount);
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
        <Bar data={data} options={options} />
      </div>
      
      {/* Chart Legend/Info */}
      {showLegend && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {data.datasets.map((dataset, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: dataset.backgroundColor }}></div>
                <span>{dataset.label}</span>
              </div>
            ))}
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

export default ComparisonChart; 
