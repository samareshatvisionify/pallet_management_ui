export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Manager' | 'Operator' | 'Viewer';
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.admin@company.com',
    name: 'John Smith',
    role: 'Admin',
    phone: '+1-234-567-8901',
    status: 'Active',
  },
  {
    id: '2',
    email: 'sarah.manager@company.com',
    name: 'Sarah Johnson',
    role: 'Manager',
    phone: '+1-234-567-8902',
    status: 'Active',
  },
  {
    id: '3',
    email: 'mike.operator@company.com',
    name: 'Mike Wilson',
    role: 'Operator',
    phone: '+1-234-567-8903',
    status: 'Inactive',
  },
  {
    id: '4',
    email: 'emma.viewer@company.com',
    name: 'Emma Davis',
    role: 'Viewer',
    phone: '+1-234-567-8904',
    status: 'Pending',
  },
]; 