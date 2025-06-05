'use client';

import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { Camera } from '@/demoData/cameraData';
import CameraFilters from './CameraFilters';
import CameraCard from './CameraCard';
import CameraDetails from './CameraDetails';

const { Title, Paragraph } = Typography;

interface CamerasComponentProps {
  // Data props
  cameras: Camera[];
  loading: boolean;
  error: string | null;
  
  // Action props
  onClearError: () => void;
  
  // Utility props
  filterCameras: (statusFilter?: Camera['status'], categoryFilters?: Camera['category'][], subcategoryFilters?: Camera['subcategory'][]) => Camera[];
  getStatusColor: (status: Camera['status']) => string;
  getUniqueCategories: () => Camera['category'][];
  getSubcategoriesForCategory: (category: Camera['category']) => Camera['subcategory'][];
}

const Cameras: React.FC<CamerasComponentProps> = ({
  cameras,
  loading,
  error,
  onClearError,
  filterCameras,
  getStatusColor,
  getUniqueCategories,
  getSubcategoriesForCategory
}) => {
  const [statusFilter, setStatusFilter] = useState<Camera['status'] | undefined>(undefined);
  const [categoryFilters, setCategoryFilters] = useState<Camera['category'][]>([]);
  const [subcategoryFilters, setSubcategoryFilters] = useState<Camera['subcategory'][]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<number | null>(null);

  const filteredCameras = filterCameras(statusFilter, categoryFilters, subcategoryFilters);
  const uniqueCategories = getUniqueCategories();
  const availableSubcategories = categoryFilters.length > 0 
    ? categoryFilters.flatMap(cat => getSubcategoriesForCategory(cat))
    : [];

  if (error) {
    onClearError();
  }

  console.log('Status colors available:', cameras.map(c => getStatusColor(c.status)));

  // Handle view camera click
  const handleViewCamera = (cameraId: number) => {
    setSelectedCameraId(cameraId);
  };

  // Handle back from camera details
  const handleBackToList = () => {
    setSelectedCameraId(null);
  };

  // If a camera is selected, show camera details
  if (selectedCameraId) {
    const selectedCamera = cameras.find(c => c.id === selectedCameraId);
    if (selectedCamera) {
      return <CameraDetails camera={selectedCamera} onBack={handleBackToList} />;
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <CameraFilters
        statusFilter={statusFilter}
        categoryFilters={categoryFilters}
        subcategoryFilters={subcategoryFilters}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilters}
        onSubcategoryChange={setSubcategoryFilters}
        uniqueCategories={uniqueCategories}
        availableSubcategories={availableSubcategories}
      />

      {/* Main Content Area */}
      <div className="space-y-4 md:space-y-6">
        {/* Camera Grid */}
        <Row gutter={[12, 12]} className="md:gutter-24">
          {filteredCameras.map((camera) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={camera.id}>
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
              {statusFilter || categoryFilters.length > 0 || subcategoryFilters.length > 0
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