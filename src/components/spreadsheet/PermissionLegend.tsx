import { Lock, ShieldAlert, ShieldCheck, EyeOff, CheckCircle2, Eye } from 'lucide-react';

const ITEMS = [
  { label: 'Editable', icon: CheckCircle2, className: 'text-emerald-500' },
  { label: 'Read only', icon: Eye, className: 'text-ledger-400' },
  { label: 'Locked', icon: Lock, className: 'text-ledger-400' },
  { label: 'Admin only', icon: ShieldAlert, className: 'text-gold-500' },
  { label: 'Manager only', icon: ShieldCheck, className: 'text-sky-500' },
  { label: 'Disabled', icon: EyeOff, className: 'text-ledger-400' },
];

export default function PermissionLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-ledger-100 bg-white/60 px-4 py-2.5 text-xs text-ledger-500 dark:border-ledger-800 dark:bg-ledger-900/50 dark:text-ledger-400">
      {ITEMS.map(({ label, icon: Icon, className }) => (
        <span key={label} className="flex items-center gap-1.5">
          <Icon size={13} className={className} /> {label}
        </span>
      ))}
    </div>
  );
}
