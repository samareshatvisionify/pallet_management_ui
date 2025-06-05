'use client';

import React from 'react';
import { Card, Tag, Switch, Image } from 'antd';
import { Camera } from '@/demoData/cameraData';

interface CameraLiveFeedProps {
  camera?: Camera;
  cameraEnabled: boolean;
  onToggleCamera: (enabled: boolean) => void;
  loading?: boolean;
}

const CameraLiveFeed: React.FC<CameraLiveFeedProps> = ({
  camera,
  cameraEnabled,
  onToggleCamera,
  loading = false
}) => {
  if (!camera && !loading) {
    return null;
  }

  return (
    <Card 
      title={
        <div className="flex items-center justify-between">
          {/* Toggle Switch for Camera Enable/Disable */}
          <div className="flex items-center gap-3 ml-2">
            <Switch
              checked={cameraEnabled}
              onChange={onToggleCamera}
              loading={loading}
              checkedChildren={
                <span className="text-xs font-medium text-white">
                  Enabled
                </span>
              }
              unCheckedChildren={
                <span className="text-xs font-medium text-white">
                  Disabled
                </span>
              }
              style={{
                backgroundColor: cameraEnabled ? '#52c41a' : '#ff4d4f',
                minWidth: '90px'
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {camera?.appliedScenarios?.map((scenario, index) => (
              <Tag key={index} color="blue" className="text-xs">
                {scenario}
              </Tag>
            )) || (loading && (
              <>
                <div className="h-6 w-16 bg-gray-300 animate-pulse rounded" />
                <div className="h-6 w-20 bg-gray-300 animate-pulse rounded" />
              </>
            ))}
          </div>
        </div>
      }
      className="h-full"
      loading={loading}
    >
      <div className="relative">
        {/* Placeholder for RTSP video player */}
        <div className="bg-black rounded-lg relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image
            alt={`${camera?.name || 'Camera'} live feed`}
            className="w-full h-full object-cover"
            preview={false}
          />
          
          {/* Offline overlay */}
          {!cameraEnabled && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-lg font-semibold mb-2">Camera Disabled</div>
                <div className="text-sm opacity-75">Enable camera to view feed</div>
              </div>
            </div>
          )}
        </div>

        {/* Camera ID overlay */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm font-mono">
          c75c8890-b8c8-4721-8d6d-cce938e56e7a - {camera?.zone || 'Unknown Zone'}
        </div>
      </div>
    </Card>
  );
};

export default CameraLiveFeed; 