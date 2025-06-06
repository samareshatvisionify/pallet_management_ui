'use client';

import React, { useEffect } from 'react';
import { Card, Table, Tag, Button, Space, Typography, Input, Row, Col, Spin } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined 
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver';
import { useAppDispatch, useAppSelector } from '@/store';
import { 
  fetchPallets,
  setSearchTerm,
  setStatusFilter,
  selectFilteredPallets,
  selectPalletsLoading,
  selectSearchTerm,
  selectStatusFilter
} from '@/store/slices/palletSlice';
import { PalletData } from '@/demoData';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const PalletManagementContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const pallets = useAppSelector(selectFilteredPallets);
  const loading = useAppSelector(selectPalletsLoading);
  const searchTerm = useAppSelector(selectSearchTerm);
  const statusFilter = useAppSelector(selectStatusFilter);

  useEffect(() => {
    // Fetch pallets on component mount
    dispatch(fetchPallets());
  }, [dispatch]);

  const getStatusColor = (status: PalletData['status']) => {
    const colorMap = {
      'warehouse': 'blue',
      'loading': 'orange', 
      'in-transit': 'purple',
      'delivered': 'green',
      'maintenance': 'red'
    };
    return colorMap[status];
  };

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handleStatusFilter = (status: string | null) => {
    dispatch(setStatusFilter(status));
  };

  const handleRefresh = () => {
    dispatch(fetchPallets());
  };

  const columns: ColumnsType<PalletData> = [
    {
      title: 'Pallet',
      dataIndex: 'palletNumber',
      key: 'palletNumber',
      fixed: 'left' as const,
      width: 120,
      render: (palletNumber: string) => (
        <span className="text-xs md:text-sm font-medium">
          {palletNumber}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: PalletData['status']) => (
        <Tag color={getStatusColor(status)} className="text-xs">
          {status.toUpperCase().replace('-', ' ')}
        </Tag>
      ),
      width: 100,
      filters: [
        { text: 'Warehouse', value: 'warehouse' },
        { text: 'Loading', value: 'loading' },
        { text: 'In Transit', value: 'in-transit' },
        { text: 'Delivered', value: 'delivered' },
        { text: 'Maintenance', value: 'maintenance' },
      ],
      onFilter: (value: any, record: PalletData) => {
        if (value === statusFilter) {
          handleStatusFilter(null);
          return true;
        }
        handleStatusFilter(value);
        return record.status === value;
      },
      filteredValue: statusFilter ? [statusFilter] : null,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 150,
      responsive: ['sm'] as Breakpoint[],
      render: (location: string) => (
        <span className="text-xs md:text-sm truncate" title={location}>
          {location}
        </span>
      ),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      width: 70,
      responsive: ['lg'] as Breakpoint[],
      render: (items: number) => (
        <span className="text-xs md:text-sm">
          {items}
        </span>
      ),
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      width: 80,
      responsive: ['md'] as Breakpoint[],
      render: (weight: number) => (
        <span className="text-xs md:text-sm">
          {weight}kg
        </span>
      ),
    },
    {
      title: 'AI Conf.',
      dataIndex: 'aiConfidence',
      key: 'aiConfidence',
      render: (confidence: number) => (
        <span className="text-xs md:text-sm">
          {confidence}%
        </span>
      ),
      width: 80,
      responsive: ['sm'] as Breakpoint[],
    },
    {
      title: 'Last Scan',
      dataIndex: 'lastScanned',
      key: 'lastScanned',
      render: (date: string) => (
        <span className="text-xs md:text-sm">
          {new Date(date).toLocaleDateString()}
        </span>
      ),
      width: 100,
      responsive: ['lg'] as Breakpoint[],
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right' as const,
      width: 100,
      render: (_: any, record: PalletData) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" className="hidden sm:inline-flex" />
          <Button type="text" icon={<DeleteOutlined />} size="small" danger className="hidden md:inline-flex" />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <Title level={2} className="!mb-2 !text-xl md:!text-2xl">Pallet Management</Title>
          <Paragraph className="!mb-0 text-sm md:text-base">
            Monitor and manage all pallets in your system. Track location, status, and AI analysis results.
          </Paragraph>
        </div>
        <div className="flex-shrink-0">
          <Button 
            icon={<ReloadOutlined />} 
            onClick={handleRefresh}
            loading={loading}
            size="small"
            className="md:size-default"
          >
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Controls Section */}
      <Card className="mb-4 md:mb-6">
        <Row gutter={[12, 12]} align="middle" className="md:gutter-16">
          <Col xs={24} sm={12} lg={8}>
            <Search
              placeholder="Search pallets..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
              size="small"
            />
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Button type="primary" icon={<PlusOutlined />} block size="small" className="md:size-default">
              <span className="hidden sm:inline">Add Pallet</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </Col>
          <Col xs={24} lg={12}>
            <Space wrap size="small">
              <Button size="small" className="md:size-default">Export</Button>
              <Button size="small" className="md:size-default">Filter</Button>
              <Button 
                onClick={() => {
                  dispatch(setSearchTerm(''));
                  dispatch(setStatusFilter(null));
                }}
                size="small"
                className="md:size-default"
              >
                <span className="hidden sm:inline">Clear Filters</span>
                <span className="sm:hidden">Clear</span>
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Pallets Table */}
      <Card title={`Pallets (${pallets.length})`} className="overflow-hidden">
        <Table
          columns={columns}
          dataSource={pallets}
          rowKey="id"
          loading={loading}
          scroll={{ x: 600 }}
          size="small"
          className="md:size-default"
          pagination={{
            total: pallets.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: false,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total}`,
            simple: true,
            responsive: true,
          }}
        />
      </Card>
    </div>
  );
};

export default PalletManagementContainer; 