import { Zone, Station } from '@/store/slices/zoneSlice';

export const demoZones: Zone[] = [
  {
    id: '1',
    name: 'Zone A - Incoming',
    description: 'Incoming goods processing area',
    currentCount: 245,
    targetCount: 300,
    efficiency: 81.7,
    performanceChange: 12.5,
    status: 'active',
    lastUpdated: new Date().toISOString(),
    stations: [
      {
        id: 'st1',
        name: 'Station A1',
        status: 'active',
        currentCount: 89,
        targetCount: 100,
        efficiency: 89.0
      },
      {
        id: 'st2',
        name: 'Station A2',
        status: 'active',
        currentCount: 76,
        targetCount: 100,
        efficiency: 76.0
      },
      {
        id: 'st3',
        name: 'Station A3',
        status: 'active',
        currentCount: 80,
        targetCount: 100,
        efficiency: 80.0
      }
    ]
  },
  {
    id: '2',
    name: 'Zone B - Storage',
    description: 'Main storage and inventory area',
    currentCount: 420,
    targetCount: 450,
    efficiency: 93.3,
    performanceChange: 8.2,
    status: 'active',
    lastUpdated: new Date().toISOString(),
    stations: [
      {
        id: 'st4',
        name: 'Station B1',
        status: 'active',
        currentCount: 95,
        targetCount: 100,
        efficiency: 95.0
      },
      {
        id: 'st5',
        name: 'Station B2',
        status: 'active',
        currentCount: 88,
        targetCount: 100,
        efficiency: 88.0
      },
      {
        id: 'st6',
        name: 'Station B3',
        status: 'maintenance',
        currentCount: 0,
        targetCount: 100,
        efficiency: 0
      },
      {
        id: 'st7',
        name: 'Station B4',
        status: 'active',
        currentCount: 92,
        targetCount: 100,
        efficiency: 92.0
      }
    ]
  },
  {
    id: '3',
    name: 'Zone C - Outgoing',
    description: 'Outbound shipping and dispatch',
    currentCount: 189,
    targetCount: 250,
    efficiency: 75.6,
    performanceChange: -5.3,
    status: 'warning',
    lastUpdated: new Date().toISOString(),
    stations: [
      {
        id: 'st8',
        name: 'Station C1',
        status: 'active',
        currentCount: 67,
        targetCount: 100,
        efficiency: 67.0
      },
      {
        id: 'st9',
        name: 'Station C2',
        status: 'active',
        currentCount: 72,
        targetCount: 100,
        efficiency: 72.0
      },
      {
        id: 'st10',
        name: 'Station C3',
        status: 'inactive',
        currentCount: 50,
        targetCount: 100,
        efficiency: 50.0
      }
    ]
  },
  {
    id: '4',
    name: 'Zone D - Quality Control',
    description: 'Quality inspection and control area',
    currentCount: 156,
    targetCount: 180,
    efficiency: 86.7,
    performanceChange: 15.8,
    status: 'active',
    lastUpdated: new Date().toISOString(),
    stations: [
      {
        id: 'st11',
        name: 'Station D1',
        status: 'active',
        currentCount: 78,
        targetCount: 90,
        efficiency: 86.7
      },
      {
        id: 'st12',
        name: 'Station D2',
        status: 'active',
        currentCount: 78,
        targetCount: 90,
        efficiency: 86.7
      }
    ]
  },
  {
    id: '5',
    name: 'Zone E - Processing',
    description: 'Material processing and handling',
    currentCount: 298,
    targetCount: 320,
    efficiency: 93.1,
    performanceChange: 7.4,
    status: 'active',
    lastUpdated: new Date().toISOString(),
    stations: [
      {
        id: 'st13',
        name: 'Station E1',
        status: 'active',
        currentCount: 98,
        targetCount: 100,
        efficiency: 98.0
      },
      {
        id: 'st14',
        name: 'Station E2',
        status: 'active',
        currentCount: 95,
        targetCount: 100,
        efficiency: 95.0
      },
      {
        id: 'st15',
        name: 'Station E3',
        status: 'active',
        currentCount: 105,
        targetCount: 120,
        efficiency: 87.5
      }
    ]
  },
  {
    id: '6',
    name: 'Zone F - Packaging',
    description: 'Final packaging and labeling',
    currentCount: 178,
    targetCount: 200,
    efficiency: 89.0,
    performanceChange: 3.2,
    status: 'active',
    lastUpdated: new Date().toISOString(),
    stations: [
      {
        id: 'st16',
        name: 'Station F1',
        status: 'active',
        currentCount: 89,
        targetCount: 100,
        efficiency: 89.0
      },
      {
        id: 'st17',
        name: 'Station F2',
        status: 'active',
        currentCount: 89,
        targetCount: 100,
        efficiency: 89.0
      }
    ]
  }
]; 