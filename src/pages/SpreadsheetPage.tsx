import { useMemo, useRef, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, CellClickedEvent, ValueGetterParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Lock, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { useSpreadsheetStore } from '../store/spreadsheetStore';
import { useToastStore } from '../store/toastStore';
import { exportToCSV, exportToExcel, exportToPDFMock } from '../utils/exportUtils';
import SpreadsheetToolbar from '../components/spreadsheet/SpreadsheetToolbar';
import PermissionLegend from '../components/spreadsheet/PermissionLegend';
import GenericCellEditor from '../components/spreadsheet/GenericCellEditor';
import PermissionCellRenderer from '../components/spreadsheet/PermissionCellRenderer';
import type { SheetRow } from '../types';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function SpreadsheetPage() {
  const user = useAuthStore((s) => s.user);
  const theme = useUIStore((s) => s.theme);
  const gridDensity = useUIStore((s) => s.gridDensity);
  const {
    rows, columns, loadInitial, updateCell, undo, redo, saveNow, resetAll,
    undoStack, redoStack, lastSavedAt, canEdit,
  } = useSpreadsheetStore();
  const push = useToastStore((s) => s.push);
  const gridRef = useRef<AgGridReact<SheetRow>>(null);
  const [quickFilter, setQuickFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitial();
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [loadInitial]);

  const role = user?.role ?? 'Employee';

  const columnDefs: ColDef<SheetRow>[] = useMemo(() => {
    return columns.map((col) => {
      const editable = col.type !== 'checkbox' && canEdit(col.permission, role);
      const def: ColDef<SheetRow> = {
        field: col.field,
        headerName: col.headerName,
        width: col.width,
        editable,
        sortable: true,
        filter: true,
        resizable: true,
        cellEditor: GenericCellEditor,
        cellEditorParams: { cellType: col.type, options: col.options },
        cellRenderer: (rendererParams: ValueGetterParams<SheetRow>) => (
          <PermissionCellRenderer
            {...(rendererParams as any)}
            permission={col.permission}
            canEditThisCell={canEdit(col.permission, role)}
            cellType={col.type}
          />
        ),
        cellClass: (_params) => {
          const editableCell = canEdit(col.permission, role);
          return [
            !editableCell && col.permission !== 'readonly' ? 'cell-locked' : '',
            editableCell && col.permission === 'editable' ? 'cell-editable' : '',
            col.permission === 'admin-only' ? 'cell-admin-only' : '',
          ].filter(Boolean).join(' ');
        },
        onCellClicked: (e: CellClickedEvent<SheetRow>) => {
          if (col.type === 'checkbox' && canEdit(col.permission, role) && e.data) {
            const current = e.data[col.field];
            updateCell(e.data.id, col.field, !current);
          }
        },
      };
      return def;
    });
  }, [columns, role, canEdit, updateCell]);

  const handleCellValueChanged = useCallback(
    (e: { data: SheetRow; colDef: ColDef<SheetRow>; oldValue: unknown; newValue: unknown }) => {
      if (!e.colDef.field) return;
      updateCell(e.data.id, e.colDef.field, e.newValue as any);
    },
    [updateCell]
  );

  function handleExport(type: 'csv' | 'excel' | 'pdf') {
    if (type === 'csv') exportToCSV(columns, rows);
    if (type === 'excel') exportToExcel(columns, rows);
    if (type === 'pdf') exportToPDFMock(columns, rows);
    push({ type: 'success', title: 'Export started', message: `Your ${type.toUpperCase()} file is downloading now.` });
  }

  function handleSave() {
    saveNow();
    push({ type: 'success', title: 'Workspace saved', message: 'All changes have been saved to your browser.' });
  }

  function handleReset() {
    resetAll();
    push({ type: 'info', title: 'Workspace reset', message: 'The spreadsheet has been restored to its original state.' });
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col gap-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-ledger-900 dark:text-ledger-50">Q3 Regional Budget Tracker</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ledger-500 dark:text-ledger-400">
            <Lock size={13} /> Signed in as <span className="font-medium text-ledger-700 dark:text-ledger-200">{role}</span> — permissions applied automatically
          </p>
        </div>
      </div>

      <SpreadsheetToolbar
        onUndo={undo}
        onRedo={redo}
        onSave={handleSave}
        onReset={handleReset}
        onSearch={setQuickFilter}
        onExport={handleExport}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
        lastSavedAt={lastSavedAt}
      />

      <PermissionLegend />

      <div className="ss-grid-wrapper relative flex-1 overflow-hidden rounded-2xl border border-ledger-100 dark:border-ledger-800">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-ledger-950/70">
            <Loader2 className="animate-spin text-gold-500" size={28} />
          </div>
        )}
        <div className={theme === 'dark' ? 'ag-theme-quartz-dark h-full' : 'ag-theme-quartz h-full'}>
          <AgGridReact<SheetRow>
            ref={gridRef}
            rowData={rows}
            columnDefs={columnDefs}
            quickFilterText={quickFilter}
            pagination
            paginationPageSize={20}
            paginationPageSizeSelector={[20, 50, 100]}
            rowHeight={gridDensity === 'compact' ? 30 : 38}
            headerHeight={40}
            onCellValueChanged={handleCellValueChanged as any}
            animateRows
            suppressMovableColumns={false}
            enableCellTextSelection
          />
        </div>
      </div>
    </div>
  );
}
