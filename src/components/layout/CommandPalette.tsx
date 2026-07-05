import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sheet, LayoutGrid, LayoutTemplate, Bell, History, Settings, User, Search } from 'lucide-react';

const ACTIONS = [
  { label: 'Go to Dashboard', path: '/app/dashboard', icon: LayoutGrid },
  { label: 'Open Spreadsheet Workspace', path: '/app/workspace', icon: Sheet },
  { label: 'Browse Templates', path: '/app/templates', icon: LayoutTemplate },
  { label: 'View Notifications', path: '/app/notifications', icon: Bell },
  { label: 'View Activity History', path: '/app/activity', icon: History },
  { label: 'Open Settings', path: '/app/settings', icon: Settings },
  { label: 'View Profile', path: '/app/profile', icon: User },
];

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(
    () => ACTIONS.filter((a) => a.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-ledger-950/60 pt-32 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-ledger-100 bg-white shadow-soft dark:border-ledger-800 dark:bg-ledger-900"
          >
            <div className="flex items-center gap-3 border-b border-ledger-100 px-4 py-3 dark:border-ledger-800">
              <Search size={16} className="text-ledger-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="w-full bg-transparent text-sm text-ledger-900 outline-none placeholder:text-ledger-400 dark:text-ledger-50"
              />
              <kbd className="rounded-md border border-ledger-200 px-1.5 py-0.5 text-[10px] text-ledger-400 dark:border-ledger-700">esc</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
              {filtered.length === 0 && <p className="px-3 py-6 text-center text-sm text-ledger-400">No matching commands.</p>}
              {filtered.map(({ label, path, icon: Icon }) => (
                <button
                  key={path}
                  onClick={() => { navigate(path); onClose(); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-ledger-700 hover:bg-gold-500/10 hover:text-gold-500 dark:text-ledger-200"
                >
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
