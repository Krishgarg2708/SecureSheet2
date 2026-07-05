import type { User } from '../types';

export interface MockCredential {
  email: string;
  password: string;
  user: User;
}

export const MOCK_CREDENTIALS: MockCredential[] = [
  {
    email: 'admin@securesheet.io',
    password: 'admin123',
    user: {
      id: 'u-001',
      name: 'Ariana Voss',
      email: 'admin@securesheet.io',
      role: 'Admin',
      department: 'IT Administration',
      avatarColor: '#D4A94C',
      lastLogin: '2026-07-04 08:12 AM',
    },
  },
  {
    email: 'manager@securesheet.io',
    password: 'manager123',
    user: {
      id: 'u-002',
      name: 'Devon Marsh',
      email: 'manager@securesheet.io',
      role: 'Manager',
      department: 'Finance & Operations',
      avatarColor: '#6E88B8',
      lastLogin: '2026-07-04 07:45 AM',
    },
  },
  {
    email: 'employee@securesheet.io',
    password: 'employee123',
    user: {
      id: 'u-003',
      name: 'Priya Nair',
      email: 'employee@securesheet.io',
      role: 'Employee',
      department: 'Data Operations',
      avatarColor: '#3E5A8C',
      lastLogin: '2026-07-03 06:30 PM',
    },
  },
];
