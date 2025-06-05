'use client';

import React, { ReactNode } from 'react';
import { Card } from 'antd';

interface StatCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  subtitle?: string;
  icon: ReactNode;
  iconColor?: string;
  backgroundColor?: string;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  suffix,
  subtitle,
  icon,
  iconColor = '#484848',
  backgroundColor = '#F8FAFC',
  onClick,
  loading = false,
  className = ''
}) => {
  return (
    <Card 
      className={`h-full border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:shadow-md hover:scale-105' : ''
      } ${className}`}
      style={{ backgroundColor }}
      onClick={onClick}
      loading={loading}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="text-gray-600 text-sm mb-1 font-medium truncate">{title}</div>
          <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2 flex items-baseline gap-1">
            {value}
            {suffix && <span className="text-lg">{suffix}</span>}
          </div>
          {subtitle && (
            <div className="text-gray-500 text-xs truncate">{subtitle}</div>
          )}
        </div>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200 flex-shrink-0 ml-4">
          <div className="text-2xl" style={{ color: iconColor }}>
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard; 