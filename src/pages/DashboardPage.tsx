import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileSpreadsheet, Pin, Clock, TrendingUp, Users, ShieldAlert, ArrowUpRight, Star } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { RECENT_FILES, ACTIVITY_LOG } from '../data/mockData';
import { Card, Badge } from '../components/ui/Primitives';
import Button from '../components/ui/Button';

const STATS = [
  { label: 'Active Workspaces', value: '18', delta: '+3 this month', icon: FileSpreadsheet, tone: 'gold' as const },
  { label: 'Pinned Sheets', value: '6', delta: '2 updated today', icon: Pin, tone: 'info' as const },
  { label: 'Team Members', value: '42', delta: '+5 this quarter', icon: Users, tone: 'success' as const },
  { label: 'Pending Approvals', value: '9', delta: 'Needs review', icon: ShieldAlert, tone: 'warning' as const },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const pinned = RECENT_FILES.filter((f) => f.pinned);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-ledger-900 dark:text-ledger-50">
            Welcome back, {user?.name.split(' ')[0]}
          </h1>
          <p className="mt-1 text-sm text-ledger-500 dark:text-ledger-400">
            Here's what's happening across your workspaces today.
          </p>
        </div>
        <Link to="/app/workspace">
          <Button icon={<FileSpreadsheet size={16} />}>Open workspace</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/12 text-gold-500">
                  <stat.icon size={18} />
                </div>
                <Badge tone={stat.tone}>{stat.delta}</Badge>
              </div>
              <p className="mt-4 font-display text-2xl font-bold text-ledger-900 dark:text-ledger-50">{stat.value}</p>
              <p className="text-xs text-ledger-500 dark:text-ledger-400">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ledger-900 dark:text-ledger-50">Recent files</h2>
            <Link to="/app/workspace" className="flex items-center gap-1 text-xs font-medium text-gold-500 hover:text-gold-400">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="space-y-1">
            {RECENT_FILES.map((file) => (
              <Link
                key={file.id}
                to="/app/workspace"
                className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-ledger-100 dark:hover:bg-ledger-800"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ledger-100 text-ledger-500 dark:bg-ledger-800 dark:text-ledger-300">
                    <FileSpreadsheet size={16} />
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-medium text-ledger-900 dark:text-ledger-50">
                      {file.name}
                      {file.pinned && <Star size={12} className="fill-gold-500 text-gold-500" />}
                    </p>
                    <p className="text-xs text-ledger-500 dark:text-ledger-400">{file.owner} · {file.rows} rows · {file.cols} cols</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge tone="neutral">{file.category}</Badge>
                  <p className="mt-1 text-xs text-ledger-400">{file.lastEdited}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ledger-900 dark:text-ledger-50">Pinned sheets</h2>
            <Pin size={14} className="text-gold-500" />
          </div>
          <div className="space-y-3">
            {pinned.map((file) => (
              <div key={file.id} className="rounded-xl border border-ledger-100 p-3 dark:border-ledger-800">
                <p className="text-sm font-medium text-ledger-900 dark:text-ledger-50">{file.name}</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-ledger-400">
                  <Clock size={11} /> {file.lastEdited}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-ledger-900 dark:text-ledger-50">Recent activity</h2>
          <Link to="/app/activity" className="flex items-center gap-1 text-xs font-medium text-gold-500 hover:text-gold-400">
            Full history <ArrowUpRight size={12} />
          </Link>
        </div>
        <div className="space-y-1">
          {ACTIVITY_LOG.slice(0, 6).map((entry) => (
            <div key={entry.id} className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-ledger-100 dark:hover:bg-ledger-800">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/12 text-xs font-bold text-gold-500">
                  {entry.user.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm text-ledger-900 dark:text-ledger-50">
                    <span className="font-medium">{entry.user}</span> {entry.action.toLowerCase()} <span className="font-mono text-xs text-gold-500">{entry.cell}</span>
                  </p>
                  <p className="text-xs text-ledger-400">{entry.date} at {entry.time}</p>
                </div>
              </div>
              <Badge tone={entry.status === 'success' ? 'success' : entry.status === 'failed' ? 'error' : 'warning'}>
                <TrendingUp size={10} /> {entry.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
