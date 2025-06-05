'use client';

import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Statistic, 
  Progress, 
  Tag, 
  Badge,
  Spin,
  Alert,
  Input,
  Select,
  Space,
  Tooltip
} from 'antd';
import {
  EnvironmentOutlined,
  SearchOutlined,
  FilterOutlined,
  TeamOutlined,
  TrophyOutlined,
  AimOutlined
} from '@ant-design/icons';
import { Zone, ZoneStats } from '@/store/slices/zoneSlice';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

interface ZonesComponentProps {
  // Data props
  zones: Zone[];
  stats: ZoneStats;
  loading: boolean;
  error: string | null;
  
  // Action props
  onClearError: () => void;
  onUpdateZoneStatus: (zoneId: string, status: Zone['status']) => void;
  
  // Utility props
  getZoneById: (id: string) => Zone | undefined;
  getZonesByStatus: (status: Zone['status']) => Zone[];
  getTopPerformingZones: (limit?: number) => Zone[];
  getZonesNeedingAttention: () => Zone[];
  calculateZoneProgress: (zone: Zone) => {
    percentage: number;
    isOnTarget: boolean;
    remaining: number;
  };
  getPerformanceIndicator: (performanceChange: number) => {
    type: 'positive' | 'negative' | 'neutral';
    icon: string;
    color: string;
    text: string;
  };
  getStatusColor: (status: Zone['status']) => string;
  getEfficiencyColor: (efficiency: number) => string;
  filterZones: (searchTerm: string, statusFilter?: Zone['status']) => Zone[];
  sortZones: (zones: Zone[], sortBy: 'name' | 'efficiency' | 'currentCount' | 'targetCount', order?: 'asc' | 'desc') => Zone[];
}

const ZonesComponent: React.FC<ZonesComponentProps> = ({
  zones,
  stats,
  loading,
  error,
  onClearError,
  onUpdateZoneStatus,
  calculateZoneProgress,
  getPerformanceIndicator,
  getStatusColor,
  getEfficiencyColor,
  filterZones,
  sortZones
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Zone['status'] | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'name' | 'efficiency' | 'currentCount' | 'targetCount'>('efficiency');

  // Filter and sort zones
  const filteredZones = filterZones(searchTerm, statusFilter);
  const sortedZones = sortZones(filteredZones, sortBy);

  // Color scheme
  const colors = {
    primary: '#484848',
    secondary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    light: '#F8FAFC',
    border: '#E2E8F0'
  };

  const renderZoneCard = (zone: Zone) => {
    const progress = calculateZoneProgress(zone);
    const performance = getPerformanceIndicator(zone.performanceChange);
    const statusStyle = getStatusBadgeStyle(zone.status);
    
    return (
      <Col xs={24} sm={12} lg={8} xl={6} key={zone.id}>
        <Card
          className="h-full !p-0 border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden"
        >
          {/* Header Section */}
          <div className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <Text className="text-lg font-bold text-gray-900 block truncate">
                  {zone.name}
                </Text>
              </div>
              <div 
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ml-4 flex-shrink-0"
                style={statusStyle}
              >
                {zone.status}
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="py-2 bg-white/50">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-gray-600">Current:</span>
                  <span className="text-xl font-bold text-gray-900">{zone.currentCount}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-gray-600">Target:</span>
                  <span className="text-lg font-semibold text-gray-700">{zone.targetCount}</span>
                </div>
              </div>
              <div className="flex-shrink-0 ml-6">
                <Progress
                  type="circle"
                  percent={progress.percentage}
                  size={90}
                  strokeColor={{
                    '0%': progress.isOnTarget ? colors.success : 
                          progress.percentage > 70 ? colors.warning : colors.danger,
                    '100%': progress.isOnTarget ? colors.success : 
                           progress.percentage > 70 ? colors.warning : colors.danger,
                  }}
                  trailColor="#f3f4f6"
                  strokeWidth={8}
                  format={(percent) => (
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-900">{percent}%</div>
                      <div className="text-xs text-gray-500 font-medium">progress</div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="py-2">
            <div className="flex items-center justify-between bg-gray-50 rounded-xl py-4 px-1">
              <div className="flex-1 mr-3">
                <div className="text-sm font-medium text-gray-600 mb-1">Efficiency</div>
                <div className="text-xl font-bold text-gray-900">{zone.efficiency.toFixed(1)}%</div>
              </div>
              <div className="flex-1 ml-3 flex flex-col items-end justify-center">
                <div className="text-sm font-medium text-gray-600 mb-1">vs Last Period</div>
                <div className="flex items-center gap-2">
                  <span className="text-lg" style={{ color: performance.color }}>{performance.icon}</span>
                  <span className="text-base font-bold" style={{ color: performance.color }}>
                    {performance.text}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stations Section */}
          <div className="py-2 bg-white/30">
            <div className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Stations ({zone.stations.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {zone.stations.map((station) => (
                <span
                  key={station.id}
                  className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-white text-gray-800 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div 
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: station.status === 'active' ? colors.success : 
                                     station.status === 'maintenance' ? colors.warning : colors.danger
                    }}
                  ></div>
                  <span>{station.name}</span>
                </span>
              ))}
            </div>
          </div>
        </Card>
      </Col>
    );
  };

  const getStatusBadgeStyle = (status: Zone['status']) => {
    switch (status) {
      case 'active':
        return { backgroundColor: colors.success, color: 'white' };
      case 'warning':
        return { backgroundColor: colors.warning, color: 'white' };
      case 'inactive':
        return { backgroundColor: colors.danger, color: 'white' };
      default:
        return { backgroundColor: colors.primary, color: 'white' };
    }
  };

  return (
    <div className="w-full">
      {/* Error Alert */}
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          closable
          onClose={onClearError}
          className="mb-6"
        />
      )}

      {/* Filters and Search */}
      <Row gutter={[16, 16]} align="middle" className="mb-6">
        <Col xs={24} sm={12} md={10}>
          <Search
            placeholder="Search zones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
            size="large"
            className="w-full"
            style={{ 
              borderRadius: '12px',
            }}
          />
        </Col>
        <Col xs={12} sm={6} md={7}>
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
            allowClear
            size="large"
            className="w-full"
            style={{ borderRadius: '12px' }}
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Warning', value: 'warning' },
              { label: 'Inactive', value: 'inactive' }
            ]}
          />
        </Col>
        <Col xs={12} sm={6} md={7}>
          <Select
            placeholder="Sort by"
            value={sortBy}
            onChange={setSortBy}
            size="large"
            className="w-full"
            style={{ borderRadius: '12px' }}
            options={[
              { label: 'Efficiency', value: 'efficiency' },
              { label: 'Name', value: 'name' },
              { label: 'Current Count', value: 'currentCount' },
              { label: 'Target Count', value: 'targetCount' }
            ]}
          />
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Spin spinning={loading}>
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={12} sm={6}>
            <Card 
              className="h-full border border-gray-200 shadow-sm overflow-hidden"
              style={{ backgroundColor: '#F8FAFC' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-600 text-sm mb-1 font-medium">Total Zones</div>
                  <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2">
                    {stats.totalZones}
                  </div>
                  <div className="text-gray-500 text-xs">Active monitoring</div>
                </div>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200"
                >
                  <EnvironmentOutlined className="text-white text-2xl" style={{ color: colors.primary }}/>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card 
              className="h-full border border-gray-200 shadow-sm overflow-hidden"
              style={{ backgroundColor: '#F8FAFC' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-600 text-sm mb-1 font-medium">Avg Efficiency</div>
                  <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2 flex items-baseline gap-1">
                    {stats.avgEfficiency}
                    <span className="text-lg">%</span>
                  </div>
                  <div className="text-gray-500 text-xs">System performance</div>
                </div>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200"
                >
                  <TrophyOutlined className="text-white text-2xl" style={{ color: colors.secondary }}/>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card 
              className="h-full border border-gray-200 shadow-sm overflow-hidden"
              style={{ backgroundColor: '#F8FAFC' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-600 text-sm mb-1 font-medium">Target Progress</div>
                  <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2 flex items-baseline gap-1">
                    {stats.targetAchieved}
                    <span className="text-lg">%</span>
                  </div>
                  <div className="text-gray-500 text-xs">Overall completion</div>
                </div>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200"
                >
                  <AimOutlined className="text-white text-2xl" style={{ color: colors.warning }}/>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card 
              className="h-full border border-gray-200 shadow-sm overflow-hidden"
              style={{ backgroundColor: '#F8FAFC' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-600 text-sm mb-1 font-medium">Zones Met Target</div>
                  <div className="text-gray-800 text-2xl md:text-3xl font-bold mb-2">
                    {stats.zonesMetTarget}
                  </div>
                  <div className="text-gray-500 text-xs">Goals achieved</div>
                </div>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200"
                >
                  <TrophyOutlined className="text-white text-2xl" style={{ color: colors.success }}/>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Zones Grid */}
        <Row gutter={[16, 16]}>
          {sortedZones.map(renderZoneCard)}
        </Row>

        {/* Empty State */}
        {sortedZones.length === 0 && !loading && (
          <div className="text-center py-16">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: colors.light }}
            >
              <EnvironmentOutlined className="text-3xl text-gray-400" />
            </div>
            <Title level={4} className="text-gray-500 mb-2">No zones found</Title>
            <Paragraph className="text-gray-400 max-w-md mx-auto">
              {searchTerm || statusFilter 
                ? "Try adjusting your search or filter criteria to find the zones you're looking for." 
                : "No zones are currently available in the system. Contact your administrator for assistance."}
            </Paragraph>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default ZonesComponent; 