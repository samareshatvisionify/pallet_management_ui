export interface PalletData {
  id: string;
  palletNumber: string;
  location: string;
  status: 'in-transit' | 'warehouse' | 'loading' | 'delivered' | 'maintenance';
  lastScanned: string;
  aiConfidence: number;
  items: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  destination?: string;
  origin?: string;
}

export const demopalletData: PalletData[] = [
  {
    id: '1',
    palletNumber: 'PLT-001234',
    location: 'Warehouse A-1',
    status: 'warehouse',
    lastScanned: '2024-01-15T10:30:00Z',
    aiConfidence: 98.5,
    items: 24,
    weight: 450.5,
    dimensions: { length: 120, width: 80, height: 145 },
    destination: 'Distribution Center B',
    origin: 'Manufacturing Plant 1'
  },
  {
    id: '2',
    palletNumber: 'PLT-001235',
    location: 'Loading Dock 3',
    status: 'loading',
    lastScanned: '2024-01-15T11:15:00Z',
    aiConfidence: 95.2,
    items: 18,
    weight: 320.8,
    dimensions: { length: 120, width: 80, height: 120 },
    destination: 'Retail Store 45',
    origin: 'Warehouse A'
  },
  {
    id: '3',
    palletNumber: 'PLT-001236',
    location: 'In Transit - Route 66',
    status: 'in-transit',
    lastScanned: '2024-01-15T09:45:00Z',
    aiConfidence: 97.8,
    items: 30,
    weight: 520.2,
    dimensions: { length: 120, width: 80, height: 160 },
    destination: 'Regional Hub C',
    origin: 'Warehouse B'
  },
  {
    id: '4',
    palletNumber: 'PLT-001237',
    location: 'Maintenance Bay',
    status: 'maintenance',
    lastScanned: '2024-01-14T16:20:00Z',
    aiConfidence: 89.1,
    items: 0,
    weight: 25.0,
    dimensions: { length: 120, width: 80, height: 15 },
  },
  {
    id: '5',
    palletNumber: 'PLT-001238',
    location: 'Customer Site - Delivered',
    status: 'delivered',
    lastScanned: '2024-01-15T08:30:00Z',
    aiConfidence: 99.2,
    items: 22,
    weight: 380.6,
    dimensions: { length: 120, width: 80, height: 135 },
    destination: 'Customer XYZ',
    origin: 'Distribution Center A'
  }
];

export interface ActivityLog {
  id: string;
  palletId: string;
  palletNumber: string;
  action: string;
  timestamp: string;
  location: string;
  user: string;
  details?: string;
}

export const demoActivityLogs: ActivityLog[] = [
  {
    id: '1',
    palletId: '1',
    palletNumber: 'PLT-001234',
    action: 'Scanned',
    timestamp: '2024-01-15T10:30:00Z',
    location: 'Warehouse A-1',
    user: 'Scanner Bot',
    details: 'AI confidence: 98.5%'
  },
  {
    id: '2',
    palletId: '2',
    palletNumber: 'PLT-001235',
    action: 'Moved to Loading',
    timestamp: '2024-01-15T11:15:00Z',
    location: 'Loading Dock 3',
    user: 'John Smith',
    details: 'Prepared for shipment to Retail Store 45'
  },
  {
    id: '3',
    palletId: '3',
    palletNumber: 'PLT-001236',
    action: 'In Transit',
    timestamp: '2024-01-15T09:45:00Z',
    location: 'Route 66',
    user: 'Truck Driver Mike',
    details: 'En route to Regional Hub C'
  },
  {
    id: '4',
    palletId: '5',
    palletNumber: 'PLT-001238',
    action: 'Delivered',
    timestamp: '2024-01-15T08:30:00Z',
    location: 'Customer XYZ',
    user: 'Delivery Team',
    details: 'Successfully delivered to customer'
  },
  {
    id: '5',
    palletId: '4',
    palletNumber: 'PLT-001237',
    action: 'Maintenance Required',
    timestamp: '2024-01-14T16:20:00Z',
    location: 'Maintenance Bay',
    user: 'System Alert',
    details: 'Pallet damage detected, requires inspection'
  }
];

export const dashboardStats = {
  totalPallets: 1234,
  activeScans: 45,
  processedToday: 892,
  aiAccuracy: 98.5
}; 