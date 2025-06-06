export interface Site {
  value: string;
  label: string;
}

export const sites: Site[] = [
  { value: 'warehouse-a', label: 'Warehouse A - North' },
  { value: 'warehouse-b', label: 'Warehouse B - South' },
  { value: 'warehouse-c', label: 'Warehouse C - East' },
  { value: 'distribution-1', label: 'Distribution Center 1' },
  { value: 'distribution-2', label: 'Distribution Center 2' },
  { value: 'manufacturing-1', label: 'Manufacturing Plant 1' },
  { value: 'manufacturing-2', label: 'Manufacturing Plant 2' },
]; 