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

  const columns = [
    {
      title: 'Pallet Number',
      dataIndex: 'palletNumber',
      key: 'palletNumber',
      fixed: 'left' as const,
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: PalletData['status']) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase().replace('-', ' ')}
        </Tag>
      ),
      width: 120,
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
      width: 200,
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      width: 80,
    },
    {
      title: 'Weight (kg)',
      dataIndex: 'weight',
      key: 'weight',
      width: 100,
    },
    {
      title: 'AI Confidence',
      dataIndex: 'aiConfidence',
      key: 'aiConfidence',
      render: (confidence: number) => `${confidence}%`,
      width: 120,
    },
    {
      title: 'Last Scanned',
      dataIndex: 'lastScanned',
      key: 'lastScanned',
      render: (date: string) => new Date(date).toLocaleString(),
      width: 180,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right' as const,
      width: 150,
      render: (_: any, record: PalletData) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Button type="text" icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2}>Pallet Management</Title>
          <Paragraph>
            Monitor and manage all pallets in your system. Track location, status, and AI analysis results.
          </Paragraph>
        </div>
        <Button 
          icon={<ReloadOutlined />} 
          onClick={handleRefresh}
          loading={loading}
        >
          Refresh
        </Button>
      </div>

      {/* Controls Section */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} lg={8}>
            <Search
              placeholder="Search pallets..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Button type="primary" icon={<PlusOutlined />} block>
              Add Pallet
            </Button>
          </Col>
          <Col xs={24} lg={12}>
            <Space wrap>
              <Button>Export</Button>
              <Button>Filter</Button>
              <Button 
                onClick={() => {
                  dispatch(setSearchTerm(''));
                  dispatch(setStatusFilter(null));
                }}
              >
                Clear Filters
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Pallets Table */}
      <Card title={`Pallets Overview (${pallets.length} items)`}>
        <Table
          columns={columns}
          dataSource={pallets}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            total: pallets.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} pallets`,
          }}
        />
      </Card>
    </div>
  );
};

export default PalletManagementContainer; 