'use client';

import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface FilterSection {
  title: string;
  component: React.ReactNode;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  sections: FilterSection[];
  onClearAll: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  title,
  sections,
  onClearAll
  
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <SettingOutlined />
          <span>{title}</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={
        <div className="flex gap-2">
          <Button onClick={onClearAll}>
            Clear All
          </Button>
          <Button type="primary" onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      }
      width="90%"
      style={{ maxWidth: '400px' }}
    >
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index}>
            <Title level={5} className="!mb-2">{section.title}</Title>
            {section.component}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default FilterModal; 