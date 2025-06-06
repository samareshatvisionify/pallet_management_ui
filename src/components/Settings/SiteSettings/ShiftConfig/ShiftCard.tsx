'use client';

import React, { useState } from 'react';
import { Card, Input, TimePicker, Button, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';

const { Text } = Typography;

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface ShiftCardProps {
  shift: Shift;
  isEditing?: boolean;
  onEdit: (shiftId: string) => void;
  onSave: (shift: Shift) => void;
  onDelete: (shiftId: string) => void;
  onCancel: () => void;
}

const ShiftCard: React.FC<ShiftCardProps> = ({
  shift,
  isEditing = false,
  onEdit,
  onSave,
  onDelete,
  onCancel
}) => {
  const [editedShift, setEditedShift] = useState<Shift>(shift);

  const handleSave = () => {
    onSave(editedShift);
  };

  const handleStartTimeChange = (time: Dayjs | null) => {
    if (time) {
      setEditedShift(prev => ({
        ...prev,
        startTime: time.format('HH:mm')
      }));
    }
  };

  const handleEndTimeChange = (time: Dayjs | null) => {
    if (time) {
      setEditedShift(prev => ({
        ...prev,
        endTime: time.format('HH:mm')
      }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedShift(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  if (isEditing) {
    return (
      <Card className="h-full border-2 border-blue-200 shadow-md">
        <div className="flex flex-col h-full">
          {/* Edit Form */}
          <div className="flex-1 space-y-4">
            <div>
              <Text strong className="block mb-2 text-xs">Shift Name</Text>
              <Input
                value={editedShift.name}
                onChange={handleNameChange}
                placeholder="Enter shift name"
                size="small"
              />
            </div>
            
            <div>
              <Text strong className="block mb-2 text-xs">Start Time</Text>
              <TimePicker
                value={dayjs(editedShift.startTime, 'HH:mm')}
                onChange={handleStartTimeChange}
                format="HH:mm"
                size="small"
                className="w-full"
              />
            </div>
            
            <div>
              <Text strong className="block mb-2 text-xs">End Time</Text>
              <TimePicker
                value={dayjs(editedShift.endTime, 'HH:mm')}
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
              style={{
                background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                border: 'none',
              }}
            >
              Save
            </Button>
            <Button
              type="default"
              icon={<CloseOutlined />}
              onClick={onCancel}
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
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col h-full">
        {/* Shift Info */}
        <div className="flex-1">
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">
              {shift.name}
            </h4>
            <div className="flex items-center gap-1">
              <div 
                className={`w-2 h-2 rounded-full ${shift.isActive ? 'bg-green-500' : 'bg-gray-400'}`}
              />
              <Text type="secondary" className="text-xs">
                {shift.isActive ? 'Active' : 'Inactive'}
              </Text>
            </div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <Text type="secondary">Start Time:</Text>
              <Text className="font-mono">{shift.startTime}</Text>
            </div>
            <div className="flex justify-between items-center">
              <Text type="secondary">End Time:</Text>
              <Text className="font-mono">{shift.endTime}</Text>
            </div>
            <div className="flex justify-between items-center">
              <Text type="secondary">Duration:</Text>
              <Text className="font-mono">
                {(() => {
                  const start = dayjs(shift.startTime, 'HH:mm');
                  const end = dayjs(shift.endTime, 'HH:mm');
                  const duration = end.diff(start, 'hour', true);
                  return `${duration.toFixed(1)}h`;
                })()}
              </Text>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => onEdit(shift.id)}
            size="small"
            className="hover:border-blue-400 hover:text-blue-500"
          >
            Edit
          </Button>
          <Button
            type="default"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(shift.id)}
            size="small"
            className="hover:border-red-400 hover:text-red-500"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ShiftCard; 