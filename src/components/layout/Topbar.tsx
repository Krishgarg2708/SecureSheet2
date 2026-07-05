import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Bell, Sun, Moon, ChevronDown, LogOut, User as UserIcon, Settings, Command } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { NOTIFICATIONS } from '../../data/mockData';
import { Badge } from '../ui/Primitives';

export default function Topbar({ onOpenCommandPalette }: { onOpenCommandPalette: () => void }) {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useUIStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-ledger-100 bg-white/70 px-6 backdrop-blur-xl dark:border-ledger-800 dark:bg-ledger-950/60">
      <button
        onClick={onOpenCommandPalette}
        className="flex w-full max-w-sm items-center gap-2.5 rounded-xl border border-ledger-100 bg-ledger-50 px-3.5 py-2 text-sm text-ledger-400 transition hover:border-gold-500/40 dark:border-ledger-800 dark:bg-ledger-900 focus-ring"
      >
        <Search size={16} />
        <span className="flex-1 text-left">Search sheets, files, actions…</span>
        <kbd className="flex items-center gap-0.5 rounded-md border border-ledger-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-ledger-400 dark:border-ledger-700 dark:bg-ledger-800">
          <Command size={10} />K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-xl p-2.5 text-ledger-500 hover:bg-ledger-100 dark:text-ledger-300 dark:hover:bg-ledger-800 focus-ring"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative rounded-xl p-2.5 text-ledger-500 hover:bg-ledger-100 dark:text-ledger-300 dark:hover:bg-ledger-800 focus-ring"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-ledger-950">
                {unread}
              </span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                className="card absolute right-0 mt-2 w-80 p-2"
              >
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ledger-400">Notifications</p>
                <div className="max-h-72 space-y-1 overflow-y-auto scrollbar-thin">
                  {NOTIFICATIONS.slice(0, 4).map((n) => (
                    <div key={n.id} className="rounded-lg px-3 py-2 hover:bg-ledger-100 dark:hover:bg-ledger-800">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-ledger-900 dark:text-ledger-50">{n.title}</p>
                        <Badge tone={n.type === 'error' ? 'error' : n.type === 'warning' ? 'warning' : n.type === 'success' ? 'success' : 'info'}>{n.type}</Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-ledger-500 dark:text-ledger-400">{n.message}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { setNotifOpen(false); navigate('/app/notifications'); }}
                  className="mt-1 w-full rounded-lg py-2 text-center text-xs font-semibold text-gold-500 hover:bg-gold-500/10"
                >
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button onClick={() => setProfileOpen((v) => !v)} className="flex items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-2.5 hover:bg-ledger-100 dark:hover:bg-ledger-800 focus-ring">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-ledger-950"
              style={{ backgroundColor: user?.avatarColor }}
            >
              {user?.name.charAt(0)}
            </div>
            <div className="hidden text-left leading-tight md:block">
              <p className="text-sm font-medium text-ledger-900 dark:text-ledger-50">{user?.name}</p>
              <p className="text-[11px] text-ledger-400">{user?.role}</p>
            </div>
            <ChevronDown size={14} className="text-ledger-400" />
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                className="card absolute right-0 mt-2 w-52 p-1.5"
              >
                <button onClick={() => { setProfileOpen(false); navigate('/app/profile'); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ledger-700 hover:bg-ledger-100 dark:text-ledger-200 dark:hover:bg-ledger-800">
                  <UserIcon size={15} /> View profile
                </button>
                <button onClick={() => { setProfileOpen(false); navigate('/app/settings'); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ledger-700 hover:bg-ledger-100 dark:text-ledger-200 dark:hover:bg-ledger-800">
                  <Settings size={15} /> Settings
                </button>
                <div className="my-1 h-px bg-ledger-100 dark:bg-ledger-800" />
                <button onClick={() => { logout(); navigate('/login'); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-500/10">
                  <LogOut size={15} /> Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
