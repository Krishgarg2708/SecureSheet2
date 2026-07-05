import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, BellOff, Check } from 'lucide-react';
import { NOTIFICATIONS as INITIAL_NOTIFICATIONS } from '../data/mockData';
import { Card, EmptyState } from '../components/ui/Primitives';
import Button from '../components/ui/Button';
import type { NotificationType } from '../types';

const ICONS: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle2 size={18} className="text-emerald-500" />,
  error: <XCircle size={18} className="text-red-500" />,
  warning: <AlertTriangle size={18} className="text-amber-500" />,
  info: <Info size={18} className="text-sky-500" />,
};

const FILTERS: (NotificationType | 'all')[] = ['all', 'success', 'warning', 'error', 'info'];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');

  const filtered = filter === 'all' ? notifications : notifications.filter((n) => n.type === filter);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-ledger-900 dark:text-ledger-50">Notifications</h1>
          <p className="mt-1 text-sm text-ledger-500 dark:text-ledger-400">Stay on top of approvals, sync issues, and workspace updates.</p>
        </div>
        <Button variant="outline" size="sm" icon={<Check size={14} />} onClick={markAllRead}>Mark all as read</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition ${
              filter === f
                ? 'bg-gold-500 text-ledger-950'
                : 'bg-ledger-100 text-ledger-500 hover:bg-ledger-200 dark:bg-ledger-800 dark:text-ledger-400 dark:hover:bg-ledger-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState icon={<BellOff size={22} />} title="No notifications" description="You're all caught up — new updates will appear here." />
        </Card>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((n, i) => (
            <motion.div key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className={`flex items-start gap-3.5 !p-4 ${!n.read ? 'border-gold-500/30' : ''}`}>
                <div className="mt-0.5">{ICONS[n.type]}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-ledger-900 dark:text-ledger-50">{n.title}</p>
                    <span className="shrink-0 text-xs text-ledger-400">{n.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-ledger-500 dark:text-ledger-400">{n.message}</p>
                </div>
                {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" />}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
