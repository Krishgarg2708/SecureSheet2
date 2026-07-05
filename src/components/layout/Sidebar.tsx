import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutGrid, Sheet, LayoutTemplate, Bell, History, Settings, ChevronsLeft, ChevronsRight, Lock,
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import clsx from '../../utils/clsx';

const NAV_ITEMS = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/app/workspace', label: 'Spreadsheet', icon: Sheet },
  { to: '/app/templates', label: 'Templates', icon: LayoutTemplate },
  { to: '/app/notifications', label: 'Notifications', icon: Bell },
  { to: '/app/activity', label: 'Activity History', icon: History },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 76 : 248 }}
      transition={{ type: 'spring', damping: 26, stiffness: 260 }}
      className="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-ledger-100 bg-white/80 backdrop-blur-xl dark:border-ledger-800 dark:bg-ledger-900/70 md:flex"
    >
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-500 text-ledger-950">
          <Lock size={16} strokeWidth={2.5} />
        </div>
        {!sidebarCollapsed && (
          <span className="font-display text-[15px] font-bold tracking-tight text-ledger-900 dark:text-ledger-50">
            SecureSheet
          </span>
        )}
      </div>

      <nav className="mt-4 flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gold-500/12 text-gold-500'
                  : 'text-ledger-500 hover:bg-ledger-100 hover:text-ledger-900 dark:text-ledger-400 dark:hover:bg-ledger-800 dark:hover:text-ledger-50'
              )
            }
          >
            <Icon size={18} strokeWidth={2} className="shrink-0" />
            {!sidebarCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={toggleSidebar}
        className="m-3 flex items-center justify-center gap-2 rounded-xl border border-ledger-100 py-2.5 text-xs font-medium text-ledger-400 hover:bg-ledger-100 dark:border-ledger-800 dark:hover:bg-ledger-800"
      >
        {sidebarCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        {!sidebarCollapsed && <span>Collapse</span>}
      </button>
    </motion.aside>
  );
}
