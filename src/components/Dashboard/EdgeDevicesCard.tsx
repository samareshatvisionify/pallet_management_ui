'use client';

import React from 'react';
import { Card, Typography, Progress } from 'antd';
import { edgeDevicesData } from '@/demoData';

const { Text } = Typography;

interface EdgeDevicesCardProps {
  loading?: boolean;
}

const EdgeDevicesCard: React.FC<EdgeDevicesCardProps> = ({ loading = false }) => {
  const getStatusColor = (status: string) => {
    return status === 'online' ? '#52c41a' : '#ff4d4f';
  };

  const deviceCount = edgeDevicesData.length;

  return (
    <Card 
      title={
        <div className="flex items-center justify-between">
          <span>Edge Devices</span>
          <Text type="secondary">{deviceCount} devices</Text>
        </div>
      }
      loading={loading}
      className="h-full"
    >
      <div 
        className="space-y-6 max-h-96 overflow-y-auto px-1"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#d1d5db #f9fafb'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 6px;
          }
          div::-webkit-scrollbar-track {
            background: #f9fafb;
            border-radius: 3px;
          }
          div::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 3px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        `}</style>
        {edgeDevicesData.map((device) => (
          <div key={device.id} className="rounded-lg p-5 bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200">
            {/* Device Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getStatusColor(device.status) }}
                />
                <Text 
                  strong 
                  className="text-sm whitespace-nowrap overflow-hidden text-ellipsis" 
                  title={device.name}
                >
                  {device.name}
                </Text>
              </div>
              <div className="flex-shrink-0">
                <Text 
                  type="secondary" 
                  className="text-xs whitespace-nowrap overflow-hidden text-ellipsis" 
                  title={device.ipAddress}
                >
                  {device.ipAddress}
                </Text>
              </div>
            </div>

            {/* Performance Meters */}
            {device.status === 'online' && (
              <div className="flex justify-between items-center gap-4">
                {/* CPU Meter */}
                <div className="text-center flex-1">
                  <Progress
                    type="circle"
                    percent={device.cpu}
                    size={80}
                    strokeWidth={8}
                    strokeColor={{
                      '0%': '#3b82f6',
                      '100%': '#1d4ed8',
                    }}
                    trailColor="#f3f4f6"
                    format={(percent) => (
                      <div className="text-center">
                        <div className="text-xs font-bold text-blue-600">CPU</div>
                        <div className="text-xs font-bold text-blue-600">{percent}%</div>
                      </div>
                    )}
                  />
                </div>

                {/* Memory Meter */}
                <div className="text-center flex-1">
                  <Progress
                    type="circle"
                    percent={device.memory}
                    size={80}
                    strokeWidth={8}
                    strokeColor={{
                      '0%': '#10b981',
                      '100%': '#059669',
                    }}
                    trailColor="#f3f4f6"
                    format={(percent) => (
                      <div className="text-center">
                        <div className="text-xs font-bold text-green-600">Memory</div>
                        <div className="text-xs font-bold text-green-600">{percent}%</div>
                      </div>
                    )}
                  />
                </div>

                {/* Network Meter */}
                <div className="text-center flex-1">
                  <Progress
                    type="circle"
                    percent={device.network}
                    size={80}
                    strokeWidth={8}
                    strokeColor={{
                      '0%': '#8b5cf6',
                      '100%': '#7c3aed',
                    }}
                    trailColor="#f3f4f6"
                    format={(percent) => (
                      <div className="text-center">
                        <div className="text-xs font-bold text-purple-600">Network</div>
                        <div className="text-xs font-bold text-purple-600">{percent}%</div>
                      </div>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EdgeDevicesCard; 