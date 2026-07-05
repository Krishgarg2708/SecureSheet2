import type { SpreadsheetFile, ActivityEntry, AppNotification, SheetTemplate } from '../types';

export const RECENT_FILES: SpreadsheetFile[] = [
  { id: 'f-1', name: 'Q3 Regional Budget Tracker', owner: 'Ariana Voss', lastEdited: '12 minutes ago', pinned: true, rows: 120, cols: 22, category: 'Finance' },
  { id: 'f-2', name: 'Engineering Sprint Capacity', owner: 'Devon Marsh', lastEdited: '1 hour ago', pinned: true, rows: 84, cols: 18, category: 'Engineering' },
  { id: 'f-3', name: 'Client Onboarding Pipeline', owner: 'Priya Nair', lastEdited: '3 hours ago', pinned: false, rows: 150, cols: 20, category: 'Sales' },
  { id: 'f-4', name: 'Vendor Compliance Audit', owner: 'Marcus Okafor', lastEdited: 'Yesterday', pinned: false, rows: 97, cols: 21, category: 'Legal' },
  { id: 'f-5', name: 'Annual Headcount Plan', owner: 'Elena Petrova', lastEdited: 'Yesterday', pinned: true, rows: 200, cols: 24, category: 'HR' },
  { id: 'f-6', name: 'Marketing Campaign ROI', owner: 'Jonah Kim', lastEdited: '2 days ago', pinned: false, rows: 110, cols: 19, category: 'Marketing' },
];

export const ACTIVITY_LOG: ActivityEntry[] = Array.from({ length: 40 }).map((_, i) => {
  const users = ['Ariana Voss', 'Devon Marsh', 'Priya Nair', 'Marcus Okafor', 'Elena Petrova'];
  const actions = ['Updated cell', 'Locked row', 'Approved budget', 'Changed status', 'Added comment', 'Exported sheet', 'Deleted row', 'Restored version'];
  const statuses: ActivityEntry['status'][] = ['success', 'success', 'success', 'pending', 'failed'];
  const cols = ['B', 'D', 'F', 'H', 'K', 'M', 'P'];
  const row = 4 + (i % 116);
  const col = cols[i % cols.length];
  return {
    id: `act-${i}`,
    user: users[i % users.length],
    action: actions[i % actions.length],
    date: `2026-07-${String((i % 4) + 1).padStart(2, '0')}`,
    time: `${String(8 + (i % 10)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')} AM`,
    cell: `${col}${row}`,
    oldValue: i % 3 === 0 ? '4,200' : 'Pending',
    newValue: i % 3 === 0 ? '5,850' : 'Approved',
    status: statuses[i % statuses.length],
  };
});

export const NOTIFICATIONS: AppNotification[] = [
  { id: 'n-1', type: 'success', title: 'Sheet saved', message: 'Q3 Regional Budget Tracker was auto-saved successfully.', time: '2m ago', read: false },
  { id: 'n-2', type: 'warning', title: 'Approval pending', message: '3 budget entries are waiting for manager approval.', time: '18m ago', read: false },
  { id: 'n-3', type: 'info', title: 'New template available', message: 'The "Annual Compliance Audit" template was published.', time: '1h ago', read: false },
  { id: 'n-4', type: 'error', title: 'Sync failed', message: 'Vendor Compliance Audit failed to sync locally. Retry saved changes.', time: '3h ago', read: true },
  { id: 'n-5', type: 'success', title: 'Access granted', message: 'You were given Manager-level access to Engineering Sprint Capacity.', time: 'Yesterday', read: true },
];

export const TEMPLATES: SheetTemplate[] = [
  { id: 't-1', name: 'Departmental Budget Tracker', description: 'Track allocated vs. spent budget across departments with variance analysis.', category: 'Finance', rows: 120, cols: 22, color: '#D4A94C' },
  { id: 't-2', name: 'Sprint Capacity Planner', description: 'Plan engineering sprints with capacity, velocity, and completion tracking.', category: 'Engineering', rows: 90, cols: 18, color: '#6E88B8' },
  { id: 't-3', name: 'Sales Pipeline CRM', description: 'Manage leads, deal stages, and revenue forecasts in one workspace.', category: 'Sales', rows: 150, cols: 20, color: '#3E5A8C' },
  { id: 't-4', name: 'Vendor Compliance Audit', description: 'Audit vendor contracts with risk scoring and compliance flags.', category: 'Legal', rows: 100, cols: 21, color: '#B4842E' },
  { id: 't-5', name: 'Annual Headcount Plan', description: 'Forecast headcount growth by department and region.', category: 'HR', rows: 200, cols: 24, color: '#8AA0C7' },
  { id: 't-6', name: 'Marketing Campaign ROI', description: 'Measure campaign spend, reach, and return on investment.', category: 'Marketing', rows: 110, cols: 19, color: '#D4A94C' },
];
