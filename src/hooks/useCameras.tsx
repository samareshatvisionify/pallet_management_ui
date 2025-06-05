'use client';

import { useState } from 'react';

interface Camera {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  zone: string;
  recording: boolean;
}

export const useCameras = () => {
  // Demo camera data - this would typically come from Redux or API
  const [cameras] = useState<Camera[]>([
    { id: 1, name: 'Entrance Camera 1', status: 'online', zone: 'Loading Dock A', recording: true },
    { id: 2, name: 'Warehouse Zone 1', status: 'online', zone: 'Storage Area 1', recording: true },
    { id: 3, name: 'Warehouse Zone 2', status: 'offline', zone: 'Storage Area 2', recording: false },
    { id: 4, name: 'Exit Camera 1', status: 'online', zone: 'Loading Dock B', recording: true },
    { id: 5, name: 'Quality Control', status: 'online', zone: 'QC Station', recording: true },
    { id: 6, name: 'Packaging Area', status: 'maintenance', zone: 'Packaging Zone', recording: false },
  ]);

  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  // Business logic functions
  const handleClearError = () => {
    // In real implementation, this would dispatch to Redux
    console.log('Clear error');
  };

  const getCameraById = (id: number) => {
    return cameras.find(camera => camera.id === id);
  };

  const getCamerasByStatus = (status: Camera['status']) => {
    return cameras.filter(camera => camera.status === status);
  };

  const getCamerasByZone = (zone: string) => {
    return cameras.filter(camera => camera.zone === zone);
  };

  const getOnlineCameras = () => {
    return cameras.filter(camera => camera.status === 'online');
  };

  const getRecordingCameras = () => {
    return cameras.filter(camera => camera.recording);
  };

  const getStatusColor = (status: Camera['status']) => {
    switch (status) {
      case 'online':
        return '#52c41a';
      case 'offline':
        return '#ff4d4f';
      case 'maintenance':
        return '#faad14';
      default:
        return '#d9d9d9';
    }
  };

  const getUniqueZones = (): string[] => {
    return [...new Set(cameras.map(camera => camera.zone))];
  };

  // Camera filtering
  const filterCameras = (searchTerm: string, statusFilter?: Camera['status'], zoneFilter?: string) => {
    let filtered = cameras;

    if (searchTerm) {
      filtered = filtered.filter(camera =>
        camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camera.zone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(camera => camera.status === statusFilter);
    }

    if (zoneFilter) {
      filtered = filtered.filter(camera => camera.zone === zoneFilter);
    }

    return filtered;
  };

  return {
    // Data
    cameras,
    loading,
    error,
    
    // Actions
    handleClearError,
    
    // Utility functions
    getCameraById,
    getCamerasByStatus,
    getCamerasByZone,
    getOnlineCameras,
    getRecordingCameras,
    getStatusColor,
    getUniqueZones,
    filterCameras,
  };
}; 