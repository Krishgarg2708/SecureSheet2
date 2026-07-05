import { useMemo, useState } from 'react';
import { Search, Download } from 'lucide-react';
import { ACTIVITY_LOG } from '../data/mockData';
import { Card, Badge } from '../components/ui/Primitives';
import Button from '../components/ui/Button';
import { useToastStore } from '../store/toastStore';

export default function ActivityHistoryPage() {
  const [query, setQuery] = useState('');
  const push = useToastStore((s) => s.push);

  const filtered = useMemo(() => {
    if (!query) return ACTIVITY_LOG;
    const q = query.toLowerCase();
    return ACTIVITY_LOG.filter(
      (a) => a.user.toLowerCase().includes(q) || a.action.toLowerCase().includes(q) || a.cell.toLowerCase().includes(q)
    );
  }, [query]);

  function handleExport() {
    const header = 'User,Action,Date,Time,Cell,Old Value,New Value,Status';
    const body = filtered.map((a) => `${a.user},${a.action},${a.date},${a.time},${a.cell},${a.oldValue},${a.newValue},${a.status}`).join('\n');
    const blob = new Blob([`${header}\n${body}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'activity-history.csv';
    link.click();
    URL.revokeObjectURL(url);
    push({ type: 'success', title: 'Export ready', message: 'Activity history downloaded as CSV.' });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-ledger-900 dark:text-ledger-50">Activity history</h1>
          <p className="mt-1 text-sm text-ledger-500 dark:text-ledger-400">A complete audit trail of every change made across your workspaces.</p>
        </div>
        <Button variant="outline" size="sm" icon={<Download size={14} />} onClick={handleExport}>Export CSV</Button>
      </div>

      <div className="flex items-center gap-2.5 rounded-xl border border-ledger-100 bg-white px-3.5 py-2.5 dark:border-ledger-800 dark:bg-ledger-900 sm:max-w-xs">
        <Search size={15} className="text-ledger-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search user, action, or cell…"
          className="w-full bg-transparent text-sm text-ledger-900 outline-none placeholder:text-ledger-400 dark:text-ledger-50"
        />
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="max-h-[calc(100vh-20rem)] overflow-auto scrollbar-thin">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-ledger-50 dark:bg-ledger-900">
              <tr className="text-xs uppercase tracking-wide text-ledger-400">
                {['User', 'Action', 'Date', 'Time', 'Cell', 'Old value', 'New value', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr key={entry.id} className="border-t border-ledger-100 hover:bg-ledger-50 dark:border-ledger-800 dark:hover:bg-ledger-800/50">
                  <td className="px-4 py-3 font-medium text-ledger-900 dark:text-ledger-50">{entry.user}</td>
                  <td className="px-4 py-3 text-ledger-600 dark:text-ledger-300">{entry.action}</td>
                  <td className="px-4 py-3 text-ledger-500 dark:text-ledger-400">{entry.date}</td>
                  <td className="px-4 py-3 text-ledger-500 dark:text-ledger-400">{entry.time}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gold-500">{entry.cell}</td>
                  <td className="px-4 py-3 text-ledger-500 dark:text-ledger-400">{entry.oldValue}</td>
                  <td className="px-4 py-3 text-ledger-500 dark:text-ledger-400">{entry.newValue}</td>
                  <td className="px-4 py-3">
                    <Badge tone={entry.status === 'success' ? 'success' : entry.status === 'failed' ? 'error' : 'warning'}>{entry.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
