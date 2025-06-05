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
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrI-upRnloLyCOInfzs6pxQl1ZT2z5hnrcg&s',
    efficiency: 96,
    todaysTotal: 158,
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
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrI-upRnloLyCOInfzs6pxQl1ZT2z5hnrcg&s',
    efficiency: 87,
    todaysTotal: 142,
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
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrI-upRnloLyCOInfzs6pxQl1ZT2z5hnrcg&s',
    efficiency: 0,
    todaysTotal: 0,
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
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrI-upRnloLyCOInfzs6pxQl1ZT2z5hnrcg&s',
    efficiency: 92,
    todaysTotal: 134,
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
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrI-upRnloLyCOInfzs6pxQl1ZT2z5hnrcg&s',
    efficiency: 94,
    todaysTotal: 167,
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
    imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrI-upRnloLyCOInfzs6pxQl1ZT2z5hnrcg&s',
    efficiency: 78,
    todaysTotal: 89,
    appliedScenarios: ['Package Monitoring']
  },
]; 