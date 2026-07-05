import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Undo2, Redo2, Save, Download, Search, RotateCcw, ChevronDown, FileSpreadsheet, FileText, FileType,
} from 'lucide-react';
import Button from '../ui/Button';

interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onReset: () => void;
  onSearch: (q: string) => void;
  onExport: (type: 'csv' | 'excel' | 'pdf') => void;
  canUndo: boolean;
  canRedo: boolean;
  lastSavedAt: string | null;
}

export default function SpreadsheetToolbar({ onUndo, onRedo, onSave, onReset, onSearch, onExport, canUndo, canRedo, lastSavedAt }: ToolbarProps) {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [query, setQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setDownloadOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-ledger-100 bg-white/80 p-3 dark:border-ledger-800 dark:bg-ledger-900/70">
      <div className="flex items-center gap-1.5 rounded-xl border border-ledger-100 bg-ledger-50 px-3 py-2 dark:border-ledger-800 dark:bg-ledger-950">
        <Search size={15} className="text-ledger-400" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
          placeholder="Search rows…"
          className="w-48 bg-transparent text-sm text-ledger-900 outline-none placeholder:text-ledger-400 dark:text-ledger-50"
        />
      </div>

      <div className="mx-1 h-6 w-px bg-ledger-100 dark:bg-ledger-800" />

      <Button variant="ghost" size="sm" icon={<Undo2 size={15} />} disabled={!canUndo} onClick={onUndo}>Undo</Button>
      <Button variant="ghost" size="sm" icon={<Redo2 size={15} />} disabled={!canRedo} onClick={onRedo}>Redo</Button>
      <Button variant="ghost" size="sm" icon={<RotateCcw size={15} />} onClick={onReset}>Reset</Button>

      <div className="mx-1 h-6 w-px bg-ledger-100 dark:bg-ledger-800" />

      <Button variant="secondary" size="sm" icon={<Save size={15} />} onClick={onSave}>Save</Button>

      <div className="relative" ref={menuRef}>
        <Button variant="primary" size="sm" icon={<Download size={15} />} onClick={() => setDownloadOpen((v) => !v)}>
          Download <ChevronDown size={13} />
        </Button>
        <AnimatePresence>
          {downloadOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              className="card absolute right-0 z-20 mt-2 w-48 p-1.5"
            >
              {[
                { label: 'CSV file', icon: FileText, type: 'csv' as const },
                { label: 'Excel file', icon: FileSpreadsheet, type: 'excel' as const },
                { label: 'PDF report (mock)', icon: FileType, type: 'pdf' as const },
              ].map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => { onExport(opt.type); setDownloadOpen(false); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ledger-700 hover:bg-ledger-100 dark:text-ledger-200 dark:hover:bg-ledger-800"
                >
                  <opt.icon size={15} /> {opt.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="ml-auto text-xs text-ledger-400">
        {lastSavedAt ? `Autosaved at ${lastSavedAt}` : 'Not yet saved'}
      </span>
    </div>
  );
}
