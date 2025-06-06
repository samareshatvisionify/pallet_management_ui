'use client';

import React from 'react';
import { Card, Typography, Progress } from 'antd';

const { Text } = Typography;

interface EdgeDevice {
  id: string;
  name: string;
  ipAddress: string;
  status: 'online' | 'offline';
  cpu: number;
  memory: number;
  network: number;
}

interface EdgeDevicesCardProps {
  loading?: boolean;
}

const EdgeDevicesCard: React.FC<EdgeDevicesCardProps> = ({ loading = false }) => {
  // Static demo data for edge devices
  const edgeDevices: EdgeDevice[] = [
    {
      id: 'edge-01',
      name: 'Edge-Device-01',
      ipAddress: '192.168.1.50',
      status: 'online',
      cpu: 45.2,
      memory: 67.8,
      network: 23.1
    },
    {
      id: 'edge-02',
      name: 'Edge-Device-02',
      ipAddress: '192.168.1.51',
      status: 'online',
      cpu: 78.9,
      memory: 45.3,
      network: 67.2
    },
    {
      id: 'edge-03',
      name: 'Edge-Device-03',
      ipAddress: '192.168.1.52',
      status: 'offline',
      cpu: 0,
      memory: 0,
      network: 0
    },
    {
      id: 'edge-04',
      name: 'Edge-Device-04',
      ipAddress: '192.168.1.53',
      status: 'online',
      cpu: 62.5,
      memory: 84.1,
      network: 41.7
    },
    {
      id: 'edge-05',
      name: 'Edge-Device-05',
      ipAddress: '192.168.1.54',
      status: 'online',
      cpu: 39.8,
      memory: 71.3,
      network: 58.9
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'online' ? '#52c41a' : '#ff4d4f';
  };

  const getStatusTag = (status: string) => {
    return status === 'online' ? 'green' : 'red';
  };

  const getPerformanceColor = (value: number) => {
    if (value < 50) return '#52c41a';
    if (value < 80) return '#faad14';
    return '#ff4d4f';
  };

  const deviceCount = edgeDevices.length;
  const onlineCount = edgeDevices.filter(device => device.status === 'online').length;

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
        {edgeDevices.map((device) => (
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