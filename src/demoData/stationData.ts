export interface Station {
  id: string;
  name: string;
  type: 'Loading' | 'Unloading' | 'Quality Control' | 'Storage' | 'Processing';
  status: 'Active' | 'Inactive' | 'Maintenance';
  target: number;
}

export const stationTypeColors = {
  'Loading': '#1890ff',
  'Unloading': '#52c41a',
  'Quality Control': '#faad14',
  'Storage': '#722ed1',
  'Processing': '#eb2f96',
} as const;

export const stationStatusColors = {
  'Active': '#52c41a',
  'Inactive': '#8c8c8c',
  'Maintenance': '#faad14',
} as const;

export const getStationTypeColor = (type: Station['type']) => {
  return stationTypeColors[type] || '#d9d9d9';
};

export const getStationStatusColor = (status: Station['status']) => {
  return stationStatusColors[status] || '#d9d9d9';
}; 