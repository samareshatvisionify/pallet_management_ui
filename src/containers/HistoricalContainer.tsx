'use client';

import React, { useState } from 'react';
import { Card, Typography, Table, DatePicker, Select, Button, Row, Col, Tag, Space, Input } from 'antd';
import { 
  DownloadOutlined,
  ReloadOutlined,
  FilterOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { historicalData, HistoricalRecord } from '@/demoData';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;



const HistoricalContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');



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
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 140,
      sorter: true,
      responsive: ['md'],
      render: (timestamp: string) => (
        <span className="text-xs md:text-sm">
          {new Date(timestamp).toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Pallet',
      dataIndex: 'palletId',
      key: 'palletId',
      width: 100,
      render: (palletId: string) => (
        <span className="text-xs md:text-sm font-medium">
          {palletId}
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (action: string) => (
        <Tag color={getActionColor(action)} className="text-xs">
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
      width: 120,
      responsive: ['sm'],
      render: (zone: string) => (
        <span className="text-xs md:text-sm truncate" title={zone}>
          {zone}
        </span>
      ),
    },
    {
      title: 'Camera',
      dataIndex: 'camera',
      key: 'camera',
      width: 120,
      responsive: ['lg'],
      render: (camera: string) => (
        <span className="text-xs md:text-sm truncate" title={camera}>
          {camera}
        </span>
      ),
    },
    {
      title: 'Conf.',
      dataIndex: 'confidence',
      key: 'confidence',
      width: 80,
      render: (confidence: number) => (
        <span className="text-xs md:text-sm">
          {confidence}%
        </span>
      ),
      sorter: true,
      responsive: ['sm'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) => (
        <Tag color={getStatusColor(status)} className="text-xs">
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      ellipsis: true,
      responsive: ['lg'],
      render: (details: string) => (
        <span className="text-xs md:text-sm" title={details}>
          {details}
        </span>
      ),
    },
  ];

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Export completed');
    }, 2000);
  };

  return (
    <div className="historical-table-container">
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <Title level={2} className="!mb-2 !text-xl md:!text-2xl">Historical Data</Title>
          <Paragraph className="!mb-0 text-sm md:text-base">
            View and analyze historical pallet tracking data, AI detections, and system events.
          </Paragraph>
        </div>
        <div className="flex-shrink-0">
          <Space size="small">
            <Button 
              icon={<DownloadOutlined />} 
              loading={loading} 
              onClick={handleExport}
              size="small"
              className="md:size-default"
            >
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button icon={<ReloadOutlined />} size="small" className="md:size-default">
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </Space>
        </div>
      </div>

      <Card className="mb-4 md:mb-6">
        <Row gutter={[12, 12]} align="middle" className="md:gutter-16">
          <Col xs={24} sm={12} lg={6}>
            <div className="mb-1 md:mb-2 text-xs md:text-sm font-medium">Date Range</div>
            <RangePicker 
              className="w-full" 
              size="small"
              placeholder={['Start', 'End']}
            />
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <div className="mb-1 md:mb-2 text-xs md:text-sm font-medium">Action Type</div>
            <Select
              placeholder="All actions"
              className="w-full"
              allowClear
              value={selectedAction}
              onChange={setSelectedAction}
              size="small"
            >
              <Select.Option value="detected">Detected</Select.Option>
              <Select.Option value="moved">Moved</Select.Option>
              <Select.Option value="departed">Departed</Select.Option>
              <Select.Option value="quality_check">Quality Check</Select.Option>
              <Select.Option value="error">Error</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="mb-1 md:mb-2 text-xs md:text-sm font-medium">Search</div>
            <Search
              placeholder="Search pallet ID, zone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
              size="small"
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <div className="mb-1 md:mb-2 text-xs md:text-sm font-medium opacity-0 md:opacity-100">&nbsp;</div>
            <Space size="small" wrap>
              <Button icon={<FilterOutlined />} size="small" className="md:size-default">
                <span className="hidden sm:inline">Advanced</span>
              </Button>
              <Button 
                onClick={() => {
                  setSelectedAction(null);
                  setSearchTerm('');
                }}
                size="small"
                className="md:size-default"
              >
                <span className="hidden sm:inline">Clear All</span>
                <span className="sm:hidden">Clear</span>
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card title={`Records (${historicalData.length})`} className="overflow-hidden">
        <Table
          columns={columns}
          dataSource={historicalData}
          rowKey="id"
          loading={loading}
          scroll={{ x: 600 }}
          size="small"
          className="md:size-default"
          pagination={{
            total: historicalData.length,
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

export default HistoricalContainer; 