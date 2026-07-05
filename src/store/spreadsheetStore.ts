import { create } from 'zustand';
import type { Role, SheetRow, ColumnConfig, PermissionLevel } from '../types';
import { COLUMN_CONFIG, generateRows } from '../data/sheetData';

const STORAGE_KEY = 'securesheet.workspace.rows';
const HISTORY_LIMIT = 50;

interface CellEdit {
  rowId: string;
  field: string;
  oldValue: SheetRow[string];
  newValue: SheetRow[string];
}

interface SpreadsheetState {
  rows: SheetRow[];
  columns: ColumnConfig[];
  undoStack: CellEdit[];
  redoStack: CellEdit[];
  lastSavedAt: string | null;
  dirty: boolean;
  loadInitial: () => void;
  updateCell: (rowId: string, field: string, value: SheetRow[keyof SheetRow]) => void;
  undo: () => void;
  redo: () => void;
  saveNow: () => void;
  resetAll: () => void;
  canEdit: (permission: PermissionLevel, role: Role) => boolean;
}

function loadRows(): SheetRow[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupted cache */
  }
  return generateRows(120);
}

function persistRows(rows: SheetRow[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export const useSpreadsheetStore = create<SpreadsheetState>((set, get) => ({
  rows: [],
  columns: COLUMN_CONFIG,
  undoStack: [],
  redoStack: [],
  lastSavedAt: null,
  dirty: false,

  loadInitial: () => {
    if (get().rows.length === 0) {
      set({ rows: loadRows() });
    }
  },

  canEdit: (permission, role) => {
    if (permission === 'editable') return true;
    if (permission === 'admin-only') return role === 'Admin';
    if (permission === 'manager-only') return role === 'Admin' || role === 'Manager';
    return false; // readonly, locked, disabled
  },

  updateCell: (rowId, field, value) => {
    const { rows, undoStack } = get();
    const rowIndex = rows.findIndex((r) => r.id === rowId);
    if (rowIndex === -1) return;
    const oldValue = rows[rowIndex][field];
    if (oldValue === value) return;
    const updatedRows = [...rows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [field]: value };
    const edit: CellEdit = { rowId, field, oldValue, newValue: value };
    const newUndo = [...undoStack, edit].slice(-HISTORY_LIMIT);
    set({ rows: updatedRows, undoStack: newUndo, redoStack: [], dirty: true });
    persistRows(updatedRows);
    set({ lastSavedAt: new Date().toLocaleTimeString(), dirty: false });
  },

  undo: () => {
    const { undoStack, rows, redoStack } = get();
    if (undoStack.length === 0) return;
    const last = undoStack[undoStack.length - 1];
    const rowIndex = rows.findIndex((r) => r.id === last.rowId);
    if (rowIndex === -1) return;
    const updatedRows = [...rows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [last.field]: last.oldValue };
    set({
      rows: updatedRows,
      undoStack: undoStack.slice(0, -1),
      redoStack: [...redoStack, last],
    });
    persistRows(updatedRows);
    set({ lastSavedAt: new Date().toLocaleTimeString() });
  },

  redo: () => {
    const { redoStack, rows, undoStack } = get();
    if (redoStack.length === 0) return;
    const last = redoStack[redoStack.length - 1];
    const rowIndex = rows.findIndex((r) => r.id === last.rowId);
    if (rowIndex === -1) return;
    const updatedRows = [...rows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [last.field]: last.newValue };
    set({
      rows: updatedRows,
      redoStack: redoStack.slice(0, -1),
      undoStack: [...undoStack, last],
    });
    persistRows(updatedRows);
    set({ lastSavedAt: new Date().toLocaleTimeString() });
  },

  saveNow: () => {
    persistRows(get().rows);
    set({ lastSavedAt: new Date().toLocaleTimeString(), dirty: false });
  },

  resetAll: () => {
    const fresh = generateRows(120);
    persistRows(fresh);
    set({ rows: fresh, undoStack: [], redoStack: [], lastSavedAt: new Date().toLocaleTimeString(), dirty: false });
  },
}));
