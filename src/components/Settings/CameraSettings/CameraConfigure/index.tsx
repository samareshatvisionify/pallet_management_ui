'use client';

import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';
import { democameras, Camera } from '@/demoData';
import CameraPreview from './CameraPreview';
import StationsPanel from './StationsPanel';
import CanvasDrawing, { Polygon } from './CanvasDrawing';

const { Title } = Typography;

interface CameraConfigureProps {
  cameraId: string;
}

const CameraConfigure: React.FC<CameraConfigureProps> = ({ cameraId }) => {
  // State for drawing functionality
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState<Polygon | null>(null);

  // Find the camera by ID
  const camera = democameras.find(cam => cam.id === parseInt(cameraId));

  if (!camera) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Title level={4} className="text-gray-500">
            Camera not found
          </Title>
          <Typography.Text type="secondary">
            The camera with ID {cameraId} could not be found.
          </Typography.Text>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Two Column Layout */}
      <Row gutter={24} className="h-full">
        {/* Camera Preview or Canvas Drawing - 2/3 width */}
        <Col xs={24} lg={16} className="mb-6 lg:mb-0">
          {isDrawingMode ? (
            /* Drawing Mode: Show Canvas with Drawing Tools */
            <div className="relative">
              <CanvasDrawing
                imageUrl={camera.imagePath}
                onPolygonChange={setCurrentPolygon}
                isDrawingMode={isDrawingMode}
                existingPolygon={currentPolygon}
              />
            </div>
          ) : (
            /* View Mode: Show Camera Preview */
            <CameraPreview camera={camera} />
          )}
        </Col>

        {/* Stations Panel - 1/3 width */}
        <Col xs={24} lg={8}>
          <StationsPanel 
            cameraId={cameraId}
            onDrawingModeChange={setIsDrawingMode}
            onPolygonChange={setCurrentPolygon}
            currentPolygon={currentPolygon}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CameraConfigure; 