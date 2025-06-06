export interface EdgeDevice {
  id: string;
  name: string;
  ipAddress: string;
  status: 'online' | 'offline';
  cpu: number;
  memory: number;
  network: number;
}

export const edgeDevicesData: EdgeDevice[] = [
  {
    id: 'edge-01',
    name: 'Edge-Device-01',
    ipAddress: '192.168.1.50',
    status: 'online',
    cpu: 45.2,
    memory: 67.8,
    network: 23.1
  },
  {
    id: 'edge-02',
    name: 'Edge-Device-02',
    ipAddress: '192.168.1.51',
    status: 'online',
    cpu: 78.9,
    memory: 45.3,
    network: 67.2
  },
  {
    id: 'edge-03',
    name: 'Edge-Device-03',
    ipAddress: '192.168.1.52',
    status: 'offline',
    cpu: 0,
    memory: 0,
    network: 0
  },
  {
    id: 'edge-04',
    name: 'Edge-Device-04',
    ipAddress: '192.168.1.53',
    status: 'online',
    cpu: 62.5,
    memory: 84.1,
    network: 41.7
  },
  {
    id: 'edge-05',
    name: 'Edge-Device-05',
    ipAddress: '192.168.1.54',
    status: 'online',
    cpu: 39.8,
    memory: 71.3,
    network: 58.9
  }
]; 