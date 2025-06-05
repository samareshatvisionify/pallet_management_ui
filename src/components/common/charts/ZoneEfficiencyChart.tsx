'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Zone } from '@/store/slices/zoneSlice';
import {
  barChartOptions,
  chartPalettes,
  convertZonesToChartData,
  generateEfficiencyDataset,
  generateChartLabels,
  BaseChartProps,
} from './index';

// Import chart registration
import './config';

const { Title: AntTitle } = Typography;

interface ZoneEfficiencyChartProps extends BaseChartProps {
  data: Zone[];
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
}

const ZoneEfficiencyChart: React.FC<ZoneEfficiencyChartProps> = ({ 
  data, 
  loading = false,
  height = 384,
  className = "mb-8 shadow-sm border border-gray-200",
  title = "Zone Efficiency Performance",
  subtitle = "Efficiency percentage across all zones",
  showLegend = true,
}) => {
  // Convert zones to chart data format
  const chartData = convertZonesToChartData(data);
  
  // Prepare chart data
  const chartDataConfig = {
    labels: generateChartLabels(data),
    datasets: generateEfficiencyDataset(chartData),
  };

  // Customize chart options for efficiency display
  const options = {
    ...barChartOptions,
    scales: {
      ...barChartOptions.scales,
      x: {
        ...barChartOptions.scales?.x,
        ticks: {
          ...barChartOptions.scales?.x?.ticks,
          color: chartPalettes.primary[0],
        }
      },
      y: {
        ...barChartOptions.scales?.y,
        min: 0,
        max: 100,
        ticks: {
          ...barChartOptions.scales?.y?.ticks,
          color: chartPalettes.primary[0],
          callback: function(value: any) {
            return value + '%';
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
            const value = context.parsed.y;
            return `Efficiency: ${value}%`;
          },
          afterLabel: function(context: any) {
            const zoneIndex = context.dataIndex;
            const zone = data[zoneIndex];
            if (zone) {
              let status = 'Average';
              if (zone.efficiency >= 90) status = 'Excellent';
              else if (zone.efficiency >= 75) status = 'Good';
              else if (zone.efficiency < 60) status = 'Needs Attention';
              
              return `Status: ${status}`;
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
              <div className="w-3 h-3 rounded" style={{ backgroundColor: chartPalettes.performance.excellent }}></div>
              <span>Excellent (90%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: chartPalettes.performance.good }}></div>
              <span>Good (75-89%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: chartPalettes.performance.average }}></div>
              <span>Average (60-74%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: chartPalettes.performance.poor }}></div>
              <span>Poor (&lt;60%)</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ZoneEfficiencyChart; 