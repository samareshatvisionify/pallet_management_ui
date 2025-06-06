'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button, Typography, Alert } from 'antd';
import { UndoOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Point interface for polygon coordinates
export interface Point {
  x: number;
  y: number;
}

// Polygon interface
export interface Polygon {
  points: Point[];
  completed: boolean;
}

interface CanvasDrawingProps {
  imageUrl: string;
  onPolygonChange: (polygon: Polygon | null) => void;
  isDrawingMode: boolean;
  existingPolygon?: Polygon | null;
  className?: string;
}

/**
 * CanvasDrawing Component
 * 
 * Provides interactive polygon drawing functionality on camera images:
 * - Click to add points for polygon creation
 * - Double-click or click first point to complete polygon
 * - Undo last point functionality
 * - Clear polygon functionality
 * - Visual feedback with lines and points
 * 
 * The polygon coordinates are relative to the image dimensions
 * and can be used to define station monitoring areas
 */
const CanvasDrawing: React.FC<CanvasDrawingProps> = ({
  imageUrl,
  onPolygonChange,
  isDrawingMode,
  existingPolygon,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // State for polygon drawing
  const [polygon, setPolygon] = useState<Polygon | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<Point | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPointIndex, setDragPointIndex] = useState<number | null>(null);

  // Initialize canvas and load image
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Calculate canvas size maintaining aspect ratio
      const containerWidth = container.offsetWidth;
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      const canvasWidth = containerWidth;
      const canvasHeight = containerWidth * aspectRatio;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      setCanvasDimensions({ width: canvasWidth, height: canvasHeight });
      setImageLoaded(true);
      
      // Store image reference for drawing
      imageRef.current = img;
      
      // Initial draw
      drawCanvas();
    };

    img.src = imageUrl;
  }, [imageUrl]);

  // Draw canvas with image and polygon
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;
    
    if (!canvas || !ctx || !img || !imageLoaded) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Draw polygon if exists
    if (polygon && polygon.points.length > 0) {
      drawPolygon(ctx, polygon);
    }

    // Draw preview line from last point to mouse cursor (only when drawing)
    if (isDrawingMode && polygon && !polygon.completed && polygon.points.length > 0 && mousePosition) {
      drawPreviewLine(ctx, polygon, mousePosition);
    }
  }, [polygon, imageLoaded, mousePosition, isDrawingMode]);

  // Draw preview line from last point to mouse cursor
  const drawPreviewLine = (ctx: CanvasRenderingContext2D, poly: Polygon, mousePos: Point) => {
    if (poly.points.length === 0) return;
    
    const lastPoint = poly.points[poly.points.length - 1];
    const lastCanvasPoint = {
      x: lastPoint.x * canvasDimensions.width,
      y: lastPoint.y * canvasDimensions.height
    };
    const mouseCanvasPoint = {
      x: mousePos.x * canvasDimensions.width,
      y: mousePos.y * canvasDimensions.height
    };

    ctx.strokeStyle = '#1890ff';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]); // Dashed line for preview
    ctx.beginPath();
    ctx.moveTo(lastCanvasPoint.x, lastCanvasPoint.y);
    ctx.lineTo(mouseCanvasPoint.x, mouseCanvasPoint.y);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash
  };

  // Draw polygon on canvas
  const drawPolygon = (ctx: CanvasRenderingContext2D, poly: Polygon) => {
    const { points, completed } = poly;
    if (points.length === 0) return;

    // Convert relative coordinates to canvas coordinates
    const canvasPoints = points.map(point => ({
      x: point.x * canvasDimensions.width,
      y: point.y * canvasDimensions.height
    }));

    // Draw lines
    ctx.strokeStyle = completed ? '#52c41a' : '#1890ff';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    
    if (canvasPoints.length > 1) {
      ctx.beginPath();
      ctx.moveTo(canvasPoints[0].x, canvasPoints[0].y);
      
      for (let i = 1; i < canvasPoints.length; i++) {
        ctx.lineTo(canvasPoints[i].x, canvasPoints[i].y);
      }
      
      if (completed) {
        ctx.closePath();
      }
      ctx.stroke();
    }

    // Draw points (larger if polygon is completed for better dragging)
    const pointRadius = completed ? 6 : 4;
    canvasPoints.forEach((point, index) => {
      ctx.fillStyle = index === 0 ? '#ff4d4f' : '#1890ff';
      ctx.beginPath();
      ctx.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add white border for completed polygon points
      if (completed) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Draw fill for completed polygon
    if (completed && canvasPoints.length > 2) {
      ctx.fillStyle = 'rgba(82, 196, 26, 0.1)';
      ctx.beginPath();
      ctx.moveTo(canvasPoints[0].x, canvasPoints[0].y);
      for (let i = 1; i < canvasPoints.length; i++) {
        ctx.lineTo(canvasPoints[i].x, canvasPoints[i].y);
      }
      ctx.closePath();
      ctx.fill();
    }
  };

  // Sync existing polygon with local state
  useEffect(() => {
    if (existingPolygon !== polygon) {
      setPolygon(existingPolygon || null);
    }
  }, [existingPolygon]);

  // Redraw when polygon changes
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Handle mouse move for preview line and dragging
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!imageLoaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / canvas.offsetWidth;
    const y = (event.clientY - rect.top) / canvas.offsetHeight;

    setMousePosition({ x, y });

    // Handle dragging of completed polygon points
    if (isDragging && dragPointIndex !== null && polygon && polygon.completed) {
      const updatedPoints = [...polygon.points];
      updatedPoints[dragPointIndex] = { x, y };
      
      const updatedPolygon = { ...polygon, points: updatedPoints };
      setPolygon(updatedPolygon);
      
      // Use setTimeout to avoid setState during render
      setTimeout(() => {
        onPolygonChange(updatedPolygon);
      }, 0);
    }
  }, [imageLoaded, isDragging, dragPointIndex, polygon, onPolygonChange]);

  // Handle mouse down for dragging
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !imageLoaded || !polygon || !polygon.completed) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / canvas.offsetWidth;
    const y = (event.clientY - rect.top) / canvas.offsetHeight;

    // Check if clicking near any point
    const clickRadius = 15; // pixels
    for (let i = 0; i < polygon.points.length; i++) {
      const point = polygon.points[i];
      const distance = Math.sqrt(
        Math.pow((x - point.x) * canvasDimensions.width, 2) + 
        Math.pow((y - point.y) * canvasDimensions.height, 2)
      );
      
      if (distance < clickRadius) {
        setIsDragging(true);
        setDragPointIndex(i);
        event.preventDefault();
        return;
      }
    }
  }, [isDrawingMode, imageLoaded, polygon, canvasDimensions.width, canvasDimensions.height]);

  // Handle mouse up to stop dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragPointIndex(null);
  }, []);

  // Handle canvas click for polygon drawing
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !imageLoaded) return;
    
    // Don't add points if we're in drag mode for completed polygon
    if (polygon && polygon.completed && !isDragging) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / canvas.offsetWidth;
    const y = (event.clientY - rect.top) / canvas.offsetHeight;

    const newPoint: Point = { x, y };

    setPolygon(prev => {
      let newPolygon;
      
      if (!prev) {
        // Start new polygon
        newPolygon = { points: [newPoint], completed: false };
      } else if (prev.completed) {
        return prev;
      } else {
        // Check if clicking near first point to complete polygon (minimum 3 points)
        if (prev.points.length >= 3) {
          const firstPoint = prev.points[0];
          const distance = Math.sqrt(
            Math.pow((x - firstPoint.x) * canvasDimensions.width, 2) + 
            Math.pow((y - firstPoint.y) * canvasDimensions.height, 2)
          );
          
          if (distance < 15) {
            // Complete polygon
            newPolygon = { ...prev, completed: true };
          } else {
            // Add new point
            newPolygon = {
              ...prev,
              points: [...prev.points, newPoint]
            };
          }
        } else {
          // Add new point
          newPolygon = {
            ...prev,
            points: [...prev.points, newPoint]
          };
        }
      }
      
      // Use setTimeout to avoid setState during render
      setTimeout(() => {
        onPolygonChange(newPolygon);
      }, 0);
      
      return newPolygon;
    });
  }, [isDrawingMode, imageLoaded, polygon, isDragging, canvasDimensions.width, canvasDimensions.height, onPolygonChange]);

  // Handle double-click to complete polygon
  const handleDoubleClick = useCallback(() => {
    if (!isDrawingMode || !polygon || polygon.completed || polygon.points.length < 3) return;
    
    const completedPolygon = { ...polygon, completed: true };
    setPolygon(completedPolygon);
    
    // Use setTimeout to avoid setState during render
    setTimeout(() => {
      onPolygonChange(completedPolygon);
    }, 0);
  }, [isDrawingMode, polygon, onPolygonChange]);

  // Undo last point
  const handleUndo = useCallback(() => {
    if (!polygon || polygon.completed || polygon.points.length === 0) return;
    
    setPolygon(prev => {
      if (!prev || prev.points.length === 0) {
        setTimeout(() => onPolygonChange(null), 0);
        return null;
      }
      
      const updatedPoints = prev.points.slice(0, -1);
      if (updatedPoints.length === 0) {
        setTimeout(() => onPolygonChange(null), 0);
        return null;
      }
      
      const updatedPolygon = { ...prev, points: updatedPoints };
      setTimeout(() => onPolygonChange(updatedPolygon), 0);
      return updatedPolygon;
    });
  }, [polygon, onPolygonChange]);

  // Clear polygon
  const handleClear = useCallback(() => {
    setPolygon(null);
    setTimeout(() => onPolygonChange(null), 0);
  }, [onPolygonChange]);

  // Complete current polygon
  const handleComplete = useCallback(() => {
    if (!polygon || polygon.completed || polygon.points.length < 3) return;
    
    const completedPolygon = { ...polygon, completed: true };
    setPolygon(completedPolygon);
    setTimeout(() => onPolygonChange(completedPolygon), 0);
  }, [polygon, onPolygonChange]);

  return (
    <div className={`relative ${className}`}>
      {/* Canvas Container */}
      <div ref={containerRef} className="relative w-full">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onDoubleClick={handleDoubleClick}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`w-full border rounded-lg ${
            isDrawingMode ? (isDragging ? 'cursor-grabbing' : 'cursor-crosshair') : 'cursor-default'
          }`}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        
        {/* Loading state */}
        {!imageLoaded && (
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <Text type="secondary">Loading image...</Text>
          </div>
        )}
      </div>

      {/* Drawing Instructions */}
      {isDrawingMode && (
        <div className="mt-3">
          <Alert
            message="Drawing Mode Active"
            description="Click to add points. Click the first point or double-click to complete the polygon."
            type="info"
            showIcon
            className="mb-3"
          />
        </div>
      )}

      {/* Drawing Controls */}
      {isDrawingMode && polygon && (
        <div className="mt-3 flex gap-2">
          <Button
            size="small"
            icon={<UndoOutlined />}
            onClick={handleUndo}
            disabled={polygon.completed || polygon.points.length === 0}
            className="text-xs"
          >
            Undo
          </Button>
          
          <Button
            size="small"
            icon={<CheckOutlined />}
            onClick={handleComplete}
            disabled={polygon.completed || polygon.points.length < 3}
            type="primary"
            className="text-xs"
          >
            Complete
          </Button>
          
          <Button
            size="small"
            icon={<DeleteOutlined />}
            onClick={handleClear}
            danger
            className="text-xs"
          >
            Clear
          </Button>
        </div>
      )}

      {/* Status Info */}
      {polygon && (
        <div className="mt-2">
          <Text type="secondary" className="text-xs">
            Points: {polygon.points.length} | 
            Status: {polygon.completed ? 'Completed' : 'Drawing...'}
          </Text>
        </div>
      )}
    </div>
  );
};

export default CanvasDrawing; 