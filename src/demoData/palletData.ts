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

export interface TrackingLocation {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  count: number;
  efficiency?: number;
}

export interface PerformanceMetric {
  title: string;
  current: number;
  target: number;
  isTargetMet: boolean;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  change: number; // percentage change from previous period
  tracking: {
    stations: TrackingLocation[];
    zones: TrackingLocation[];
    cameras: TrackingLocation[];
  };
}

export interface PerformanceData {
  pallets: {
    manufactured: PerformanceMetric;
    repaired: PerformanceMetric;
    dismantled: PerformanceMetric;
  };
  boards: {
    boards: PerformanceMetric;
    trimSaw: PerformanceMetric;
  };
}

export const performanceOverviewData: PerformanceData = {
  pallets: {
    manufactured: {
      title: 'Manufactured',
      current: 856,
      target: 900,
      isTargetMet: false,
      percentage: 95.1,
      trend: 'up',
      change: 8.2,
      tracking: {
        stations: [
          { id: 'st1', name: 'Assembly Station A1', status: 'active', count: 245, efficiency: 92 },
          { id: 'st2', name: 'Assembly Station A2', status: 'active', count: 198, efficiency: 88 },
          { id: 'st3', name: 'Assembly Station B1', status: 'maintenance', count: 156, efficiency: 85 },
          { id: 'st4', name: 'Assembly Station B2', status: 'active', count: 257, efficiency: 94 }
        ],
        zones: [
          { id: 'z1', name: 'Manufacturing Zone A', status: 'active', count: 443, efficiency: 90 },
          { id: 'z2', name: 'Manufacturing Zone B', status: 'active', count: 413, efficiency: 89 }
        ],
        cameras: [
          { id: 'c1', name: 'Camera MFG-001', status: 'active', count: 285 },
          { id: 'c2', name: 'Camera MFG-002', status: 'active', count: 298 },
          { id: 'c3', name: 'Camera MFG-003', status: 'inactive', count: 273 }
        ]
      }
    },
    repaired: {
      title: 'Repaired',
      current: 142,
      target: 120,
      isTargetMet: true,
      percentage: 118.3,
      trend: 'up',
      change: 15.6,
      tracking: {
        stations: [
          { id: 'st5', name: 'Repair Station R1', status: 'active', count: 67, efficiency: 95 },
          { id: 'st6', name: 'Repair Station R2', status: 'active', count: 75, efficiency: 91 }
        ],
        zones: [
          { id: 'z3', name: 'Repair Zone A', status: 'active', count: 142, efficiency: 93 }
        ],
        cameras: [
          { id: 'c4', name: 'Camera REP-001', status: 'active', count: 142 }
        ]
      }
    },
    dismantled: {
      title: 'Dismantled',
      current: 89,
      target: 100,
      isTargetMet: false,
      percentage: 89.0,
      trend: 'down',
      change: -5.4,
      tracking: {
        stations: [
          { id: 'st7', name: 'Dismantling Station D1', status: 'active', count: 45, efficiency: 82 },
          { id: 'st8', name: 'Dismantling Station D2', status: 'maintenance', count: 44, efficiency: 78 }
        ],
        zones: [
          { id: 'z4', name: 'Dismantling Zone A', status: 'active', count: 89, efficiency: 80 }
        ],
        cameras: [
          { id: 'c5', name: 'Camera DIS-001', status: 'active', count: 89 }
        ]
      }
    }
  },
  boards: {
    boards: {
      title: 'Boards',
      current: 2340,
      target: 2500,
      isTargetMet: false,
      percentage: 93.6,
      trend: 'up',
      change: 12.8,
      tracking: {
        stations: [
          { id: 'st9', name: 'Board Station B1', status: 'active', count: 890, efficiency: 94 },
          { id: 'st10', name: 'Board Station B2', status: 'active', count: 785, efficiency: 91 },
          { id: 'st11', name: 'Board Station B3', status: 'active', count: 665, efficiency: 88 }
        ],
        zones: [
          { id: 'z5', name: 'Board Production Zone A', status: 'active', count: 1340, efficiency: 92 },
          { id: 'z6', name: 'Board Production Zone B', status: 'active', count: 1000, efficiency: 89 }
        ],
        cameras: [
          { id: 'c6', name: 'Camera BRD-001', status: 'active', count: 1240 },
          { id: 'c7', name: 'Camera BRD-002', status: 'active', count: 1100 }
        ]
      }
    },
    trimSaw: {
      title: 'Trim Saw',
      current: 1890,
      target: 1800,
      isTargetMet: true,
      percentage: 105.0,
      trend: 'up',
      change: 7.3,
      tracking: {
        stations: [
          { id: 'st12', name: 'Trim Saw Station T1', status: 'active', count: 945, efficiency: 97 },
          { id: 'st13', name: 'Trim Saw Station T2', status: 'active', count: 945, efficiency: 95 }
        ],
        zones: [
          { id: 'z7', name: 'Trim Saw Zone A', status: 'active', count: 1890, efficiency: 96 }
        ],
        cameras: [
          { id: 'c8', name: 'Camera TRM-001', status: 'active', count: 945 },
          { id: 'c9', name: 'Camera TRM-002', status: 'active', count: 945 }
        ]
      }
    }
  }
};

export interface CalendarDayData {
  date: string; // YYYY-MM-DD format
  production: number;
  target: number;
  efficiency: number;
  status: 'above-target' | 'meeting-target' | 'below-target' | 'poor-performance';
  breakdown: {
    dismantle: number;
    boards: number;
    trimSaw: number;
    newPallet: number;
  };
}

export interface CalendarData {
  month: string; // YYYY-MM format
  days: CalendarDayData[];
}

export const productionCalendarData: CalendarData = {
  month: '2025-06',
  days: [
    {
      date: '2025-06-01',
      production: 1033,
      target: 1000,
      efficiency: 103.3,
      status: 'above-target',
      breakdown: { dismantle: 278, boards: 355, trimSaw: 200, newPallet: 200 }
    },
    {
      date: '2025-06-02',
      production: 963,
      target: 1000,
      efficiency: 96.3,
      status: 'meeting-target',
      breakdown: { dismantle: 241, boards: 326, trimSaw: 198, newPallet: 198 }
    },
    {
      date: '2025-06-03',
      production: 887,
      target: 1000,
      efficiency: 88.7,
      status: 'meeting-target',
      breakdown: { dismantle: 222, boards: 300, trimSaw: 183, newPallet: 182 }
    },
    {
      date: '2025-06-04',
      production: 990,
      target: 1000,
      efficiency: 99.0,
      status: 'meeting-target',
      breakdown: { dismantle: 247, boards: 346, trimSaw: 198, newPallet: 199 }
    },
    {
      date: '2025-06-05',
      production: 1167,
      target: 1000,
      efficiency: 116.7,
      status: 'above-target',
      breakdown: { dismantle: 292, boards: 408, trimSaw: 233, newPallet: 234 }
    },
    {
      date: '2025-06-06',
      production: 1068,
      target: 1000,
      efficiency: 106.8,
      status: 'above-target',
      breakdown: { dismantle: 267, boards: 373, trimSaw: 214, newPallet: 214 }
    },
    {
      date: '2025-06-07',
      production: 0,
      target: 0,
      efficiency: 0,
      status: 'meeting-target',
      breakdown: { dismantle: 0, boards: 0, trimSaw: 0, newPallet: 0 }
    },
    {
      date: '2025-06-08',
      production: 0,
      target: 0,
      efficiency: 0,
      status: 'meeting-target',
      breakdown: { dismantle: 0, boards: 0, trimSaw: 0, newPallet: 0 }
    },
    // Adding more days to fill the month
    {
      date: '2025-06-09',
      production: 1145,
      target: 1000,
      efficiency: 114.5,
      status: 'above-target',
      breakdown: { dismantle: 287, boards: 400, trimSaw: 229, newPallet: 229 }
    },
    {
      date: '2025-06-10',
      production: 945,
      target: 1000,
      efficiency: 94.5,
      status: 'meeting-target',
      breakdown: { dismantle: 236, boards: 330, trimSaw: 189, newPallet: 190 }
    }
  ]
}; 