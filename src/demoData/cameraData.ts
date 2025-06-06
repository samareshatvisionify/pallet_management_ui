export interface Camera {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  zone: string;
  recording: boolean;
  category: 'Pallets' | 'Boards';
  subcategory: 'Making' | 'Dismantling' | 'Repair' | 'Board' | 'Trimsaw';
  rtspUrl: string;
  imagePath: string;
  efficiency: number;
  todaysTotal: number;
  todaysTarget: number;
  appliedScenarios: string[];
}

export const democameras: Camera[] = [
  { 
    id: 1, 
    name: 'Entrance Camera 1', 
    status: 'online', 
    zone: 'Loading Dock A', 
    recording: true, 
    category: 'Pallets', 
    subcategory: 'Making',
    rtspUrl: 'rtsp://192.168.1.1:554/stream1',
    imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
    efficiency: 96,
    todaysTotal: 158,
    todaysTarget: 150,
    appliedScenarios: ['Pallet Build', 'Conveyor Board']
  },
  { 
    id: 2, 
    name: 'Warehouse Zone 1', 
    status: 'online', 
    zone: 'Storage Area 1', 
    recording: true, 
    category: 'Pallets', 
    subcategory: 'Dismantling',
    rtspUrl: 'rtsp://192.168.1.2:554/stream1',
    imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
    efficiency: 87,
    todaysTotal: 142,
    todaysTarget: 160,
    appliedScenarios: ['Pallet Dismantling', 'Quality Check']
  },
  { 
    id: 3, 
    name: 'Warehouse Zone 2', 
    status: 'offline', 
    zone: 'Storage Area 2', 
    recording: false, 
    category: 'Boards', 
    subcategory: 'Board',
    rtspUrl: 'rtsp://192.168.1.3:554/stream1',
    imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
    efficiency: 0,
    todaysTotal: 0,
    todaysTarget: 120,
    appliedScenarios: ['Board Processing']
  },
  { 
    id: 4, 
    name: 'Exit Camera 1', 
    status: 'online', 
    zone: 'Loading Dock B', 
    recording: true, 
    category: 'Pallets', 
    subcategory: 'Repair',
    rtspUrl: 'rtsp://192.168.1.4:554/stream1',
    imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
    efficiency: 92,
    todaysTotal: 134,
    todaysTarget: 140,
    appliedScenarios: ['Pallet Repair', 'Damage Assessment']
  },
  { 
    id: 5, 
    name: 'Quality Control', 
    status: 'online', 
    zone: 'QC Station', 
    recording: true, 
    category: 'Boards', 
    subcategory: 'Trimsaw',
    rtspUrl: 'rtsp://192.168.1.5:554/stream1',
    imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
    efficiency: 94,
    todaysTotal: 167,
    todaysTarget: 160,
    appliedScenarios: ['Board Quality', 'Trimsaw Operation']
  },
  { 
    id: 6, 
    name: 'Packaging Area', 
    status: 'maintenance', 
    zone: 'Packaging Zone', 
    recording: false, 
    category: 'Pallets', 
    subcategory: 'Making',
    rtspUrl: 'rtsp://192.168.1.6:554/stream1',
    imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
    efficiency: 78,
    todaysTotal: 89,
    todaysTarget: 110,
    appliedScenarios: ['Package Monitoring']
  },
     { 
     id: 7, 
     name: 'Security Gate 1', 
     status: 'online', 
     zone: 'Main Entrance', 
     recording: true, 
     category: 'Pallets', 
     subcategory: 'Making',
     rtspUrl: 'rtsp://192.168.1.7:554/stream1',
     imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
     efficiency: 91,
     todaysTotal: 203,
     todaysTarget: 200,
     appliedScenarios: ['Security Monitor', 'Access Control']
   },
   { 
     id: 8, 
     name: 'Assembly Line A', 
     status: 'online', 
     zone: 'Production Floor A', 
     recording: true, 
     category: 'Boards', 
     subcategory: 'Board',
     rtspUrl: 'rtsp://192.168.1.8:554/stream1',
     imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
     efficiency: 85,
     todaysTotal: 176,
     todaysTarget: 180,
     appliedScenarios: ['Assembly Monitor', 'Quality Check']
   },
   { 
     id: 9, 
     name: 'Assembly Line B', 
     status: 'offline', 
     zone: 'Production Floor B', 
     recording: false, 
     category: 'Boards', 
     subcategory: 'Board',
     rtspUrl: 'rtsp://192.168.1.9:554/stream1',
     imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
     efficiency: 0,
     todaysTotal: 0,
     todaysTarget: 180,
     appliedScenarios: ['Assembly Monitor']
   },
   { 
     id: 10, 
     name: 'Repair Station 1', 
     status: 'online', 
     zone: 'Repair Area', 
     recording: true, 
     category: 'Pallets', 
     subcategory: 'Repair',
     rtspUrl: 'rtsp://192.168.1.10:554/stream1',
     imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
     efficiency: 88,
     todaysTotal: 145,
     todaysTarget: 150,
     appliedScenarios: ['Repair Monitor', 'Quality Assessment']
   },
   { 
     id: 11, 
     name: 'Trimsaw Station', 
     status: 'online', 
     zone: 'Processing Area', 
     recording: true, 
     category: 'Boards', 
     subcategory: 'Trimsaw',
     rtspUrl: 'rtsp://192.168.1.11:554/stream1',
     imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
     efficiency: 93,
     todaysTotal: 187,
     todaysTarget: 180,
     appliedScenarios: ['Trimsaw Operation', 'Safety Monitor']
   },
   { 
     id: 12, 
     name: 'Shipping Dock', 
     status: 'maintenance', 
     zone: 'Loading Dock C', 
     recording: false, 
     category: 'Pallets', 
     subcategory: 'Making',
     rtspUrl: 'rtsp://192.168.1.12:554/stream1',
     imagePath: 'https://i.ytimg.com/vi/9wxEmqyVlB8/maxresdefault.jpg',
     efficiency: 72,
     todaysTotal: 98,
     todaysTarget: 120,
     appliedScenarios: ['Shipping Monitor']
   },
]; 