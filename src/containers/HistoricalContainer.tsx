'use client';

import React, { useState } from 'react';
import { Card, Typography, Table, DatePicker, Select, Button, Row, Col, Tag, Space, Input } from 'antd';
import { 
  HistoryOutlined, 
  DownloadOutlined,
  SearchOutlined,
  ReloadOutlined,
  FilterOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;

interface HistoricalRecord {
  id: string;
  timestamp: string;
  palletId: string;
  action: string;
  zone: string;
  camera: string;
  confidence: number;
  status: 'success' | 'warning' | 'error';
  details: string;
}

const HistoricalContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Demo historical data
  const historicalData: HistoricalRecord[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      palletId: 'PLT-001234',
      action: 'detected',
      zone: 'Loading Dock A',
      camera: 'Entrance Camera 1',
      confidence: 98.5,
      status: 'success',
      details: 'Pallet successfully detected entering zone'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:28:15',
      palletId: 'PLT-001235',
      action: 'moved',
      zone: 'Storage Area 1',
      camera: 'Warehouse Zone 1',
      confidence: 95.2,
      status: 'success',
      details: 'Pallet movement tracked within storage area'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:25:42',
      palletId: 'PLT-001230',
      action: 'quality_check',
      zone: 'Quality Control',
      camera: 'Quality Control',
      confidence: 92.1,
      status: 'warning',
      details: 'Quality inspection completed with minor anomalies'
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:22:18',
      palletId: 'PLT-001231',
      action: 'departed',
      zone: 'Loading Dock B',
      camera: 'Exit Camera 1',
      confidence: 97.8,
      status: 'success',
      details: 'Pallet successfully departed facility'
    },
    {
      id: '5',
      timestamp: '2024-01-15 14:18:33',
      palletId: 'PLT-001228',
      action: 'error',
      zone: 'Packaging Zone',
      camera: 'Packaging Area',
      confidence: 45.2,
      status: 'error',
      details: 'Detection failed - low confidence score'
    },
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'detected': return 'green';
      case 'moved': return 'blue';
      case 'departed': return 'purple';
      case 'quality_check': return 'orange';
      case 'error': return 'red';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const columns: ColumnsType<HistoricalRecord> = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
      sorter: true,
    },
    {
      title: 'Pallet ID',
      dataIndex: 'palletId',
      key: 'palletId',
      width: 120,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (action: string) => (
        <Tag color={getActionColor(action)}>
          {action.toUpperCase().replace('_', ' ')}
        </Tag>
      ),
      filters: [
        { text: 'Detected', value: 'detected' },
        { text: 'Moved', value: 'moved' },
        { text: 'Departed', value: 'departed' },
        { text: 'Quality Check', value: 'quality_check' },
        { text: 'Error', value: 'error' },
      ],
    },
    {
      title: 'Zone',
      dataIndex: 'zone',
      key: 'zone',
      width: 150,
    },
    {
      title: 'Camera',
      dataIndex: 'camera',
      key: 'camera',
      width: 150,
    },
    {
      title: 'Confidence',
      dataIndex: 'confidence',
      key: 'confidence',
      width: 100,
      render: (confidence: number) => `${confidence}%`,
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      ellipsis: true,
    },
  ];

  const handleExport = () => {
    setLoading(true);
    // Simulate export process
    setTimeout(() => {
      setLoading(false);
      console.log('Export completed');
    }, 2000);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Title level={2}>Historical Data</Title>
          <Paragraph>
            View and analyze historical pallet tracking data, AI detections, and system events.
          </Paragraph>
        </div>
        <Space>
          <Button icon={<DownloadOutlined />} loading={loading} onClick={handleExport}>
            Export Data
          </Button>
          <Button icon={<ReloadOutlined />}>
            Refresh
          </Button>
        </Space>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8} lg={6}>
            <div className="mb-2 text-sm font-medium">Date Range</div>
            <RangePicker className="w-full" />
          </Col>
          <Col xs={24} sm={8} lg={4}>
            <div className="mb-2 text-sm font-medium">Action Type</div>
            <Select
              placeholder="All actions"
              className="w-full"
              allowClear
              value={selectedAction}
              onChange={setSelectedAction}
            >
              <Select.Option value="detected">Detected</Select.Option>
              <Select.Option value="moved">Moved</Select.Option>
              <Select.Option value="departed">Departed</Select.Option>
              <Select.Option value="quality_check">Quality Check</Select.Option>
              <Select.Option value="error">Error</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} lg={6}>
            <div className="mb-2 text-sm font-medium">Search</div>
            <Search
              placeholder="Search pallet ID, zone, camera..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} lg={8}>
            <div className="mb-2 text-sm font-medium">&nbsp;</div>
            <Space>
              <Button icon={<FilterOutlined />}>
                Advanced Filters
              </Button>
              <Button 
                onClick={() => {
                  setSelectedAction(null);
                  setSearchTerm('');
                }}
              >
                Clear All
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Historical Data Table */}
      <Card title={`Historical Records (${historicalData.length} entries)`}>
        <Table
          columns={columns}
          dataSource={historicalData}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            total: historicalData.length,
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} records`,
          }}
        />
      </Card>
    </div>
  );
};

export default HistoricalContainer; 