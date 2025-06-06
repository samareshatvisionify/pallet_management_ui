'use client';

import React from 'react';
import { Modal, Card, Statistic, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { CalendarDayData } from '@/demoData/palletData';
import { ActivityTimelineChart } from '@/components/common/charts';

interface ProductionActivityModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedDate: CalendarDayData | null;
}

const ProductionActivityModal: React.FC<ProductionActivityModalProps> = ({
  isVisible,
  onClose,
  selectedDate
}) => {
  if (!selectedDate) {
    return null;
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <CalendarOutlined className="text-blue-500" />
          <div>
            <span className="text-lg font-semibold">Production Activity Timeline</span>
            <div className="text-sm text-gray-500 font-normal">
              {dayjs(selectedDate.date).format('MMMM D, YYYY')}
            </div>
          </div>
        </div>
      }
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={1000}
      className="production-timeline-modal"
    >
      <div className="mt-4">
        {/* Production Breakdown Cards */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 justify-between">
            <Card className="flex-1 min-w-[120px] text-center bg-blue-50 border-blue-200">
              <Statistic
                value={selectedDate.breakdown.dismantle}
                valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
              />
              <Typography.Text className="!text-xs font-medium text-blue-700 uppercase tracking-wide">
                Dismantle
              </Typography.Text>
            </Card>
            
            <Card className="flex-1 min-w-[120px] text-center bg-green-50 border-green-200">
              <Statistic
                value={selectedDate.breakdown.boards}
                valueStyle={{  fontSize: '24px', fontWeight: 'bold' }}
              />
              <Typography.Text className="!text-xs font-medium text-green-700 uppercase tracking-wide">
                Board Processing
              </Typography.Text>
            </Card>
            
            <Card className="flex-1 min-w-[120px] text-center bg-orange-50 border-orange-200">
              <Statistic
                value={selectedDate.breakdown.trimSaw}
                valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
              />
              <Typography.Text className="!text-xs font-medium text-orange-700 uppercase tracking-wide">
                Trim Saw
              </Typography.Text>
            </Card>
            
            <Card className="flex-1 min-w-[120px] text-center bg-purple-50 border-purple-200">
              <Statistic
                value={selectedDate.breakdown.newPallet}
                valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
              />
              <Typography.Text className="!text-xs font-medium text-purple-700 uppercase tracking-wide">
                Pallet Making
              </Typography.Text>
            </Card>
            
            <Card className="flex-1 min-w-[120px] text-center bg-red-50 border-red-200">
              <Statistic
                value={Math.floor(selectedDate.production * 0.05)}
                valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
              />
              <Typography.Text className="!text-xs font-medium text-red-700 uppercase tracking-wide">
                Repair
              </Typography.Text>
            </Card>
          </div>
        </div>

        <ActivityTimelineChart
          title=""
          subtitle="Hourly production activity breakdown for the selected day"
          activityOptions={[
            { label: 'Dismantle', value: 'Dismantle' },
            { label: 'Board Processing', value: 'Board Processing' },
            { label: 'Trim Saw', value: 'Trim Saw' },
            { label: 'New Pallet Assembly', value: 'New Pallet Assembly' },
            { label: 'Quality Control', value: 'Quality Control' }
          ]}
          activityDataMap={{
            'Dismantle': [
              { time: '06:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.08), active: true },
              { time: '07:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.12), active: true },
              { time: '08:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.14), active: true },
              { time: '09:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.13), active: true },
              { time: '10:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.11), active: true },
              { time: '11:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.09), active: true },
              { time: '12:00', count: 0, active: false },
              { time: '13:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.12), active: true },
              { time: '14:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.10), active: true },
              { time: '15:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.08), active: true },
              { time: '16:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.06), active: true },
              { time: '17:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.04), active: true },
              { time: '18:00', count: Math.floor(selectedDate.breakdown.dismantle * 0.03), active: true },
            ],
            'Board Processing': [
              { time: '06:00', count: Math.floor(selectedDate.breakdown.boards * 0.07), active: true },
              { time: '07:00', count: Math.floor(selectedDate.breakdown.boards * 0.11), active: true },
              { time: '08:00', count: Math.floor(selectedDate.breakdown.boards * 0.13), active: true },
              { time: '09:00', count: Math.floor(selectedDate.breakdown.boards * 0.12), active: true },
              { time: '10:00', count: Math.floor(selectedDate.breakdown.boards * 0.14), active: true },
              { time: '11:00', count: Math.floor(selectedDate.breakdown.boards * 0.10), active: true },
              { time: '12:00', count: 0, active: false },
              { time: '13:00', count: Math.floor(selectedDate.breakdown.boards * 0.13), active: true },
              { time: '14:00', count: Math.floor(selectedDate.breakdown.boards * 0.11), active: true },
              { time: '15:00', count: Math.floor(selectedDate.breakdown.boards * 0.09), active: true },
              { time: '16:00', count: Math.floor(selectedDate.breakdown.boards * 0.07), active: true },
              { time: '17:00', count: Math.floor(selectedDate.breakdown.boards * 0.05), active: true },
              { time: '18:00', count: Math.floor(selectedDate.breakdown.boards * 0.03), active: true },
            ],
            'Trim Saw': [
              { time: '06:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.06), active: true },
              { time: '07:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.10), active: true },
              { time: '08:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.15), active: true },
              { time: '09:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.14), active: true },
              { time: '10:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.12), active: true },
              { time: '11:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.11), active: true },
              { time: '12:00', count: 0, active: false },
              { time: '13:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.14), active: true },
              { time: '14:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.12), active: true },
              { time: '15:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.10), active: true },
              { time: '16:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.08), active: true },
              { time: '17:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.05), active: true },
              { time: '18:00', count: Math.floor(selectedDate.breakdown.trimSaw * 0.03), active: true },
            ],
            'New Pallet Assembly': [
              { time: '06:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.05), active: true },
              { time: '07:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.09), active: true },
              { time: '08:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.12), active: true },
              { time: '09:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.13), active: true },
              { time: '10:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.15), active: true },
              { time: '11:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.12), active: true },
              { time: '12:00', count: 0, active: false },
              { time: '13:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.15), active: true },
              { time: '14:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.13), active: true },
              { time: '15:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.11), active: true },
              { time: '16:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.08), active: true },
              { time: '17:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.05), active: true },
              { time: '18:00', count: Math.floor(selectedDate.breakdown.newPallet * 0.02), active: true },
            ],
            'Quality Control': [
              { time: '06:00', count: Math.floor(selectedDate.production * 0.02), active: true },
              { time: '07:00', count: Math.floor(selectedDate.production * 0.04), active: true },
              { time: '08:00', count: Math.floor(selectedDate.production * 0.06), active: true },
              { time: '09:00', count: Math.floor(selectedDate.production * 0.05), active: true },
              { time: '10:00', count: Math.floor(selectedDate.production * 0.07), active: true },
              { time: '11:00', count: Math.floor(selectedDate.production * 0.04), active: true },
              { time: '12:00', count: 0, active: false },
              { time: '13:00', count: Math.floor(selectedDate.production * 0.08), active: true },
              { time: '14:00', count: Math.floor(selectedDate.production * 0.06), active: true },
              { time: '15:00', count: Math.floor(selectedDate.production * 0.05), active: true },
              { time: '16:00', count: Math.floor(selectedDate.production * 0.03), active: true },
              { time: '17:00', count: Math.floor(selectedDate.production * 0.02), active: true },
              { time: '18:00', count: Math.floor(selectedDate.production * 0.01), active: true },
            ]
          }}
          defaultActivity="Dismantle"
          className="mb-0"
        />
      </div>
    </Modal>
  );
};

export default ProductionActivityModal; 