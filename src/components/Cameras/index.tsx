'use client';

import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { Camera } from '../../demoData/cameraData';
import CameraFilters from './CameraFilters';
import CameraCard from './CameraCard';

const { Title, Paragraph } = Typography;

interface CamerasComponentProps {
  // Data props
  cameras: Camera[];
  loading: boolean;
  error: string | null;
  
  // Action props
  onClearError: () => void;
  onCameraClick?: (cameraId: number) => void;
  onAddCamera?: () => void;
  
  // Utility props
  filterCameras: (zoneFilters?: string[], categoryFilters?: Camera['category'][], subcategoryFilters?: Camera['subcategory'][], targetAchievementFilter?: 'all' | 'met' | 'not-met') => Camera[];
  getStatusColor: (status: Camera['status']) => string;
  getUniqueZones: () => string[];
  getUniqueCategories: () => Camera['category'][];
  getSubcategoriesForCategory: (category: Camera['category']) => Camera['subcategory'][];
}

const Cameras: React.FC<CamerasComponentProps> = ({
  error,
  onClearError,
  onCameraClick,
  onAddCamera,
  filterCameras,
  getUniqueZones,
  getUniqueCategories,
  getSubcategoriesForCategory
}) => {
  const [zoneFilters, setZoneFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<Camera['category'][]>([]);
  const [subcategoryFilters, setSubcategoryFilters] = useState<Camera['subcategory'][]>([]);
  const [targetAchievementFilter, setTargetAchievementFilter] = useState<'all' | 'met' | 'not-met' | undefined>(undefined);

  const filteredCameras = filterCameras(zoneFilters, categoryFilters, subcategoryFilters, targetAchievementFilter);
  const uniqueZones = getUniqueZones();
  const uniqueCategories = getUniqueCategories();
  const availableSubcategories = categoryFilters.length > 0 
    ? categoryFilters.flatMap(cat => getSubcategoriesForCategory(cat))
    : [];

  if (error) {
    onClearError();
  }

  // Handle view camera click
  const handleViewCamera = (cameraId: number) => {
    if (onCameraClick) {
      onCameraClick(cameraId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <CameraFilters
        zoneFilters={zoneFilters}
        categoryFilters={categoryFilters}
        subcategoryFilters={subcategoryFilters}
        targetAchievementFilter={targetAchievementFilter}
        onZoneChange={setZoneFilters}
        onCategoryChange={setCategoryFilters}
        onSubcategoryChange={setSubcategoryFilters}
        onTargetAchievementChange={setTargetAchievementFilter}
        uniqueZones={uniqueZones}
        uniqueCategories={uniqueCategories}
        availableSubcategories={availableSubcategories}
        onAddCamera={onAddCamera}
      />

      {/* Main Content Area */}
      <div className="space-y-4 md:space-y-6">
        {/* Camera Grid */}
        <Row gutter={[12, 12]} className="md:gutter-16 lg:gutter-24">
          {filteredCameras.map((camera) => (
            <Col xs={24} sm={12} lg={8} key={camera.id}>
              <CameraCard camera={camera} onViewClick={handleViewCamera} />
            </Col>
          ))}
        </Row>

        {/* Show message when no cameras match filters */}
        {filteredCameras.length === 0 && (
          <div className="text-center py-8">
            <CameraOutlined className="text-4xl text-gray-300 mb-4" />
            <Title level={4} className="!text-lg text-gray-500">No cameras found</Title>
            <Paragraph className="text-gray-400">
              {zoneFilters.length > 0 || categoryFilters.length > 0 || subcategoryFilters.length > 0 || targetAchievementFilter
                ? "Try adjusting your filter criteria to find the cameras you're looking for."
                : "No cameras match the selected filters. Try adjusting your filter criteria or clearing some filters."}
            </Paragraph>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cameras; 