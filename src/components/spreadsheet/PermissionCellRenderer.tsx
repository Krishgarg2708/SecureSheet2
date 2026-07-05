import { Lock, ShieldAlert, ShieldCheck, EyeOff } from 'lucide-react';
import type { CustomCellRendererProps } from 'ag-grid-react';
import type { PermissionLevel } from '../../types';

interface PermissionCellProps extends CustomCellRendererProps {
  permission: PermissionLevel;
  canEditThisCell: boolean;
  cellType: string;
}

export default function PermissionCellRenderer(props: PermissionCellProps) {
  const { value, permission, canEditThisCell, cellType } = props;

  const icon =
    permission === 'locked' ? <Lock size={12} className="text-ledger-400" /> :
    permission === 'admin-only' ? <ShieldAlert size={12} className="text-gold-500" /> :
    permission === 'manager-only' ? <ShieldCheck size={12} className="text-sky-500" /> :
    permission === 'disabled' ? <EyeOff size={12} className="text-ledger-400" /> :
    null;

  let display: React.ReactNode = value;
  if (cellType === 'checkbox') {
    display = (
      <span className={`inline-flex h-4 w-4 items-center justify-center rounded border ${value ? 'border-gold-500 bg-gold-500' : 'border-ledger-300 dark:border-ledger-600'}`}>
        {value ? <span className="text-[10px] font-bold text-ledger-950">✓</span> : null}
      </span>
    );
  }

  return (
    <div className="flex h-full w-full items-center gap-1.5 truncate">
      {icon}
      <span className={`truncate ${!canEditThisCell ? 'text-ledger-400 dark:text-ledger-500' : ''}`}>{display}</span>
    </div>
  );
}
