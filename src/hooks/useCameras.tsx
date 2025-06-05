'use client';

import { useState } from 'react';
import { Camera, democameras } from '@/demoData/cameraData';

export const useCameras = () => {
  // Demo camera data - this would typically come from Redux or API
  const [cameras] = useState<Camera[]>(democameras);

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

  const getCamerasByCategory = (category: Camera['category']) => {
    return cameras.filter(camera => camera.category === category);
  };

  const getCamerasBySubcategory = (subcategory: Camera['subcategory']) => {
    return cameras.filter(camera => camera.subcategory === subcategory);
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

  const getUniqueCategories = (): Camera['category'][] => {
    return [...new Set(cameras.map(camera => camera.category))];
  };

  const getSubcategoriesForCategory = (category: Camera['category']): Camera['subcategory'][] => {
    if (category === 'Pallets') {
      return ['Making', 'Dismantling', 'Repair'];
    } else if (category === 'Boards') {
      return ['Board', 'Trimsaw'];
    }
    return [];
  };

  // Camera filtering with category support
  const filterCameras = (
    statusFilter?: Camera['status'], 
    categoryFilters?: Camera['category'][], 
    subcategoryFilters?: Camera['subcategory'][]
  ) => {
    let filtered = cameras;

    if (statusFilter) {
      filtered = filtered.filter(camera => camera.status === statusFilter);
    }

    if (categoryFilters && categoryFilters.length > 0) {
      filtered = filtered.filter(camera => categoryFilters.includes(camera.category));
    }

    if (subcategoryFilters && subcategoryFilters.length > 0) {
      filtered = filtered.filter(camera => subcategoryFilters.includes(camera.subcategory));
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
    getCamerasByCategory,
    getCamerasBySubcategory,
    getOnlineCameras,
    getRecordingCameras,
    getStatusColor,
    getUniqueZones,
    getUniqueCategories,
    getSubcategoriesForCategory,
    filterCameras,
  };
}; 