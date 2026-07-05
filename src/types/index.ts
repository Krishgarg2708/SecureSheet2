export type Role = 'Admin' | 'Manager' | 'Employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  avatarColor: string;
  lastLogin: string;
}

export type PermissionLevel =
  | 'editable'
  | 'readonly'
  | 'locked'
  | 'admin-only'
  | 'manager-only'
  | 'disabled';

export type CellType = 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'textarea';

export interface ColumnConfig {
  field: string;
  headerName: string;
  type: CellType;
  permission: PermissionLevel;
  options?: string[];
  width?: number;
}

export interface SheetRow {
  id: string;
  [key: string]: string | number | boolean | null;
}

export interface SpreadsheetFile {
  id: string;
  name: string;
  owner: string;
  lastEdited: string;
  pinned: boolean;
  rows: number;
  cols: number;
  category: string;
}

export type ActivityStatus = 'success' | 'failed' | 'pending';

export interface ActivityEntry {
  id: string;
  user: string;
  action: string;
  date: string;
  time: string;
  cell: string;
  oldValue: string;
  newValue: string;
  status: ActivityStatus;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface SheetTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  rows: number;
  cols: number;
  color: string;
}
