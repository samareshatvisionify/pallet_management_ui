'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Zone } from '@/store/slices/zoneSlice';

const { Title: AntTitle } = Typography;

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ZoneComparisonChartProps {
  zones: Zone[];
  loading: boolean;
}

const ZoneComparisonChart: React.FC<ZoneComparisonChartProps> = ({ zones, loading }) => {
  // Color scheme
  const colors = {
    primary: '#484848',
    secondary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    light: '#E5E7EB',
  };

  // Prepare chart data
  const chartData = {
    labels: zones.map(zone => zone.name.replace(' - ', '\n')), // Zone names as x-axis labels
    datasets: [
      {
        label: 'Previous Period',
        data: zones.map(zone => zone.previousCount),
        backgroundColor: colors.light,
        borderRadius: 8,
      },
      {
        label: 'Current Period',
        data: zones.map(zone => zone.currentCount),
        backgroundColor: colors.secondary,
        borderRadius: 8,
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 'normal' as const,
          }
        }
      },
      title: {
        display: false, // We'll use our own title
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: function(tooltipItems: any) {
            return tooltipItems[0].label;
          },
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} pallets`;
          },
          afterLabel: function(context: any) {
            const zoneIndex = context.dataIndex;
            const zone = zones[zoneIndex];
            if (zone) {
              const change = zone.currentCount - zone.previousCount;
              const changePercent = ((change / zone.previousCount) * 100).toFixed(1);
              return `Change: ${change > 0 ? '+' : ''}${change} (${changePercent}%)`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: colors.primary,
          font: {
            size: 11,
            weight: 'normal' as const,
          },
          maxRotation: 45,
          minRotation: 0,
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: colors.primary,
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return value + ' pallets';
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  if (loading) {
    return (
      <Card className="mb-8">
        <div className="h-96 flex items-center justify-center">
          <div className="text-gray-500">Loading chart data...</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="!mt-8 mb-8 shadow-sm border border-gray-200">
      <div className="mb-6">
        <AntTitle level={4} className="!mb-2 !font-semibold text-gray-800">
          Zone Performance Comparison
        </AntTitle>
        <p className="text-sm text-gray-600 mb-0">
          Current period vs previous period pallet counts across all zones
        </p>
      </div>
      
      <div className="h-96">
        <Bar data={chartData} options={options} />
      </div>
      
      {/* Chart Legend/Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.light }}></div>
            <span>Previous Period</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.secondary }}></div>
            <span>Current Period</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-500">
              Hover over bars for detailed information
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ZoneComparisonChart; 