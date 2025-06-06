'use client';

import React, { useState } from 'react';
import { Card, Input, TimePicker, Button, Typography } from 'antd';
import { PlusOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { Shift } from './ShiftCard';

const { Text } = Typography;

interface AddShiftCardProps {
  onAdd: (shift: Omit<Shift, 'id'>) => void;
}

const AddShiftCard: React.FC<AddShiftCardProps> = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newShift, setNewShift] = useState({
    name: '',
    startTime: '09:00',
    endTime: '17:00',
    isActive: true
  });

  const handleStartAdd = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewShift({
      name: '',
      startTime: '09:00',
      endTime: '17:00',
      isActive: true
    });
  };

  const handleSave = () => {
    if (newShift.name.trim()) {
      onAdd(newShift);
      handleCancel();
    }
  };

  const handleStartTimeChange = (time: Dayjs | null) => {
    if (time) {
      setNewShift(prev => ({
        ...prev,
        startTime: time.format('HH:mm')
      }));
    }
  };

  const handleEndTimeChange = (time: Dayjs | null) => {
    if (time) {
      setNewShift(prev => ({
        ...prev,
        endTime: time.format('HH:mm')
      }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewShift(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  if (isAdding) {
    return (
      <Card className="h-full border-2 border-dashed border-blue-300 shadow-md bg-blue-50/50">
        <div className="flex flex-col h-full">
          {/* Add Form */}
          <div className="flex-1 space-y-4">
            <div>
              <Text strong className="block mb-2 text-xs">Shift Name</Text>
              <Input
                value={newShift.name}
                onChange={handleNameChange}
                placeholder="Enter shift name"
                size="small"
                autoFocus
              />
            </div>
            
            <div>
              <Text strong className="block mb-2 text-xs">Start Time</Text>
              <TimePicker
                value={dayjs(newShift.startTime, 'HH:mm')}
                onChange={handleStartTimeChange}
                format="HH:mm"
                size="small"
                className="w-full"
              />
            </div>
            
            <div>
              <Text strong className="block mb-2 text-xs">End Time</Text>
              <TimePicker
                value={dayjs(newShift.endTime, 'HH:mm')}
                onChange={handleEndTimeChange}
                format="HH:mm"
                size="small"
                className="w-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              size="small"
              disabled={!newShift.name.trim()}
              style={{
                background: newShift.name.trim() 
                  ? 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)' 
                  : undefined,
                border: 'none',
              }}
            >
              Add
            </Button>
            <Button
              type="default"
              icon={<CloseOutlined />}
              onClick={handleCancel}
              size="small"
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
      className="h-full border-2 border-dashed border-gray-300 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer bg-gray-50/50 hover:bg-blue-50/50"
      onClick={handleStartAdd}
    >
      <div className="flex flex-col items-center justify-center h-full text-center py-8">
        <div className="mb-3">
          <PlusOutlined className="text-3xl text-gray-400 hover:text-blue-500 transition-colors" />
        </div>
        <Text className="text-sm font-medium text-gray-600 mb-1">Add New Shift</Text>
        <Text type="secondary" className="text-xs">
          Click to create a new shift schedule
        </Text>
      </div>
    </Card>
  );
};

export default AddShiftCard; 