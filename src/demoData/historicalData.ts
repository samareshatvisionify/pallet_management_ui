export interface HistoricalRecord {
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

export const historicalData: HistoricalRecord[] = [
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