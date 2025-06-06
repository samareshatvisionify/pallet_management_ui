'use client';

import React, { useState } from 'react';
import { Card, Input, Button, Typography, ColorPicker } from 'antd';
import { PlusOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { Zone } from './ZoneCard';

const { Text } = Typography;

interface AddZoneCardProps {
  onAdd: (zone: Omit<Zone, 'id' | 'stations'>) => void;
}

const AddZoneCard: React.FC<AddZoneCardProps> = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newZone, setNewZone] = useState({
    name: '',
    description: '',
    color: '#1890ff'
  });

  const handleStartAdd = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewZone({
      name: '',
      description: '',
      color: '#1890ff'
    });
  };

  const handleSave = () => {
    if (newZone.name.trim()) {
      onAdd(newZone);
      handleCancel();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewZone(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewZone(prev => ({
      ...prev,
      description: e.target.value
    }));
  };

  const handleColorChange = (color: { toHexString: () => string }) => {
    setNewZone(prev => ({
      ...prev,
      color: color.toHexString()
    }));
  };

  if (isAdding) {
    return (
      <Card 
        className="border-2 border-dashed border-blue-300 shadow-md bg-blue-50/50"
        style={{ minHeight: '300px' }}
      >
        <div className="flex flex-col h-full">
          {/* Add Form */}
          <div className="flex-1 space-y-4">
            <div>
              <Text strong className="block mb-2 text-sm">Zone Name</Text>
              <Input
                value={newZone.name}
                onChange={handleNameChange}
                placeholder="Enter zone name"
                autoFocus
              />
            </div>
            
            <div>
              <Text strong className="block mb-2 text-sm">Description</Text>
              <Input
                value={newZone.description}
                onChange={handleDescriptionChange}
                placeholder="Enter zone description"
              />
            </div>
            
            <div>
              <Text strong className="block mb-2 text-sm">Zone Color</Text>
              <div className="flex items-center gap-2">
                <ColorPicker
                  value={newZone.color}
                  onChange={handleColorChange}
                  showText
                />
                <div 
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: newZone.color }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-6">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              disabled={!newZone.name.trim()}
              style={{
                background: newZone.name.trim() 
                  ? 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)' 
                  : undefined,
                border: 'none',
              }}
            >
              Add Zone
            </Button>
            <Button
              type="default"
              icon={<CloseOutlined />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="border-2 border-dashed border-gray-300 hover:border-green-400 hover:shadow-md transition-all duration-200 cursor-pointer bg-gray-50/50 hover:bg-green-50/50"
      onClick={handleStartAdd}
      style={{ minHeight: '300px' }}
    >
      <div className="flex flex-col items-center justify-center h-full text-center py-8">
        <div className="mb-4">
          <PlusOutlined className="text-4xl text-gray-400 hover:text-green-500 transition-colors" />
        </div>
        <Text className="text-base font-medium text-gray-600 mb-2">Add New Zone</Text>
        <Text type="secondary" className="text-sm">
          Click to create a new zone area
        </Text>
      </div>
    </Card>
  );
};

export default AddZoneCard; 