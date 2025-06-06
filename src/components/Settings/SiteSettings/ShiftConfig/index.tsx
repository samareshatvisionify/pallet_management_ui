'use client';

import React, { useState } from 'react';
import { Card, Typography, Row, Col, App } from 'antd';
import { ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ShiftCard, { Shift } from './ShiftCard';
import AddShiftCard from './AddShiftCard';

const { Title, Text } = Typography;

// Mock shift data
const initialShifts: Shift[] = [
  {
    id: '1',
    name: 'Morning Shift',
    startTime: '06:00',
    endTime: '14:00',
    isActive: true
  },
  {
    id: '2',
    name: 'Afternoon Shift',
    startTime: '14:00',
    endTime: '22:00',
    isActive: true
  },
  {
    id: '3',
    name: 'Night Shift',
    startTime: '22:00',
    endTime: '06:00',
    isActive: false
  }
];

interface ShiftsConfigProps {
  onClick?: () => void;
}

const ShiftsConfig: React.FC<ShiftsConfigProps> = ({ onClick }) => {
  const { modal } = App.useApp();
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [editingShiftId, setEditingShiftId] = useState<string | null>(null);

  const generateShiftId = () => {
    return Date.now().toString();
  };

  const handleAddShift = (newShift: Omit<Shift, 'id'>) => {
    const shiftWithId: Shift = {
      ...newShift,
      id: generateShiftId()
    };
    setShifts(prev => [...prev, shiftWithId]);
  };

  const handleEditShift = (shiftId: string) => {
    setEditingShiftId(shiftId);
  };

  const handleSaveShift = (updatedShift: Shift) => {
    setShifts(prev => 
      prev.map(shift => 
        shift.id === updatedShift.id ? updatedShift : shift
      )
    );
    setEditingShiftId(null);
  };

  const handleDeleteShift = (shiftId: string) => {
    const shiftToDelete = shifts.find(shift => shift.id === shiftId);
    if (!shiftToDelete) return;

    modal.confirm({
      title: 'Delete Shift',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete "${shiftToDelete.name}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setShifts(prev => prev.filter(shift => shift.id !== shiftId));
      },
    });
  };

  const handleCancelEdit = () => {
    setEditingShiftId(null);
  };

  return (
    <Card className="shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ClockCircleOutlined className="text-2xl text-orange-500" />
        <div className="flex-1">
          <Title level={4} className="!mb-1">Shifts Configuration</Title>
          <Text className="text-gray-500">
            Define work shifts, schedules, and operational hours for your facility
          </Text>
        </div>
      </div>

      {/* Shifts Grid */}
      <Row gutter={[16, 16]}>
        {/* Existing Shifts */}
        {shifts.map(shift => (
          <Col xs={24} sm={12} lg={8} xl={6} key={shift.id}>
            <ShiftCard
              shift={shift}
              isEditing={editingShiftId === shift.id}
              onEdit={handleEditShift}
              onSave={handleSaveShift}
              onDelete={handleDeleteShift}
              onCancel={handleCancelEdit}
            />
          </Col>
        ))}

        {/* Add Shift Card */}
        <Col xs={24} sm={12} lg={8} xl={6}>
          <AddShiftCard onAdd={handleAddShift} />
        </Col>
      </Row>

      {/* Summary Info */}
      {shifts.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <Text strong className="block text-lg text-gray-900">
                {shifts.length}
              </Text>
              <Text type="secondary" className="text-xs">
                Total Shifts
              </Text>
            </div>
            <div>
              <Text strong className="block text-lg text-green-600">
                {shifts.filter(shift => shift.isActive).length}
              </Text>
              <Text type="secondary" className="text-xs">
                Active Shifts
              </Text>
            </div>
            <div>
              <Text strong className="block text-lg text-blue-600">
                24h
              </Text>
              <Text type="secondary" className="text-xs">
                Coverage
              </Text>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ShiftsConfig; 