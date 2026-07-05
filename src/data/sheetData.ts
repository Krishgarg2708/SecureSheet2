import type { ColumnConfig, SheetRow } from '../types';

const DEPARTMENTS = ['Finance', 'Sales', 'Engineering', 'Marketing', 'Operations', 'HR', 'Legal', 'Support'];
const REGIONS = ['North', 'South', 'East', 'West', 'Central'];
const STATUSES = ['Active', 'On Hold', 'Closed', 'Pending Review'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const FIRST_NAMES = ['Ariana', 'Devon', 'Priya', 'Marcus', 'Elena', 'Jonah', 'Fatima', 'Leo', 'Nadia', 'Sam', 'Ravi', 'Claire', 'Tobias', 'Mina', 'Owen', 'Yusuf'];
const LAST_NAMES = ['Voss', 'Marsh', 'Nair', 'Okafor', 'Petrova', 'Kim', 'Haddad', 'Bennett', 'Rahman', 'Delgado', 'Iyer', 'Novak', 'Reyes', 'Larsen', 'Chen', 'Farrow'];

export const COLUMN_CONFIG: ColumnConfig[] = [
  { field: 'rowNum', headerName: '#', type: 'text', permission: 'readonly', width: 60 },
  { field: 'recordId', headerName: 'Record ID', type: 'text', permission: 'locked', width: 120 },
  { field: 'employeeName', headerName: 'Employee', type: 'text', permission: 'editable', width: 160 },
  { field: 'department', headerName: 'Department', type: 'select', permission: 'editable', options: DEPARTMENTS, width: 140 },
  { field: 'region', headerName: 'Region', type: 'select', permission: 'editable', options: REGIONS, width: 120 },
  { field: 'projectCode', headerName: 'Project Code', type: 'text', permission: 'readonly', width: 130 },
  { field: 'status', headerName: 'Status', type: 'select', permission: 'editable', options: STATUSES, width: 140 },
  { field: 'priority', headerName: 'Priority', type: 'select', permission: 'manager-only', options: PRIORITIES, width: 120 },
  { field: 'budgetAllocated', headerName: 'Budget Allocated', type: 'number', permission: 'manager-only', width: 150 },
  { field: 'budgetSpent', headerName: 'Budget Spent', type: 'number', permission: 'editable', width: 140 },
  { field: 'variance', headerName: 'Variance', type: 'number', permission: 'readonly', width: 120 },
  { field: 'startDate', headerName: 'Start Date', type: 'date', permission: 'editable', width: 140 },
  { field: 'endDate', headerName: 'End Date', type: 'date', permission: 'editable', width: 140 },
  { field: 'completion', headerName: 'Completion %', type: 'number', permission: 'editable', width: 140 },
  { field: 'billable', headerName: 'Billable', type: 'checkbox', permission: 'editable', width: 110 },
  { field: 'approved', headerName: 'Approved', type: 'checkbox', permission: 'manager-only', width: 110 },
  { field: 'auditFlag', headerName: 'Audit Flag', type: 'checkbox', permission: 'admin-only', width: 120 },
  { field: 'riskScore', headerName: 'Risk Score', type: 'number', permission: 'admin-only', width: 120 },
  { field: 'complianceId', headerName: 'Compliance ID', type: 'text', permission: 'locked', width: 140 },
  { field: 'notes', headerName: 'Notes', type: 'textarea', permission: 'editable', width: 220 },
  { field: 'lastModifiedBy', headerName: 'Last Modified By', type: 'text', permission: 'readonly', width: 160 },
  { field: 'confidential', headerName: 'Confidential', type: 'checkbox', permission: 'disabled', width: 130 },
];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function pad(n: number, len = 4) {
  return n.toString().padStart(len, '0');
}

export function generateRows(count = 120): SheetRow[] {
  const rows: SheetRow[] = [];
  for (let i = 0; i < count; i++) {
    const budgetAllocated = 5000 + ((i * 733) % 45000);
    const budgetSpent = Math.round(budgetAllocated * (0.2 + ((i * 37) % 80) / 100));
    const name = `${pick(FIRST_NAMES, i)} ${pick(LAST_NAMES, i + 3)}`;
    rows.push({
      id: `row-${i}`,
      rowNum: i + 1,
      recordId: `REC-${pad(1000 + i)}`,
      employeeName: name,
      department: pick(DEPARTMENTS, i),
      region: pick(REGIONS, i + 1),
      projectCode: `PRJ-${pad(200 + (i % 40), 3)}`,
      status: pick(STATUSES, i + 2),
      priority: pick(PRIORITIES, i + 1),
      budgetAllocated,
      budgetSpent,
      variance: budgetAllocated - budgetSpent,
      startDate: `2026-${pad((i % 6) + 1, 2)}-${pad((i % 27) + 1, 2)}`,
      endDate: `2026-${pad(((i + 3) % 6) + 6, 2)}-${pad((i % 27) + 1, 2)}`,
      completion: (i * 13) % 101,
      billable: i % 3 !== 0,
      approved: i % 4 === 0,
      auditFlag: i % 11 === 0,
      riskScore: (i * 17) % 100,
      complianceId: `CMP-${pad(500 + i)}`,
      notes: i % 5 === 0 ? 'Flagged for quarterly review by compliance team.' : '',
      lastModifiedBy: pick(FIRST_NAMES, i + 5),
      confidential: i % 7 === 0,
    });
  }
  return rows;
}
