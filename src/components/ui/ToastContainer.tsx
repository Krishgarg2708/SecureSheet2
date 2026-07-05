import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import type { NotificationType } from '../../types';

const ICONS: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle2 size={18} className="text-emerald-500" />,
  error: <XCircle size={18} className="text-red-500" />,
  warning: <AlertTriangle size={18} className="text-amber-500" />,
  info: <Info size={18} className="text-sky-500" />,
};

export default function ToastContainer() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex w-80 flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="card flex items-start gap-3 p-4"
          >
            <div className="mt-0.5">{ICONS[toast.type]}</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-ledger-900 dark:text-ledger-50">{toast.title}</p>
              {toast.message && <p className="mt-0.5 text-xs text-ledger-500 dark:text-ledger-400">{toast.message}</p>}
            </div>
            <button onClick={() => dismiss(toast.id)} className="text-ledger-400 hover:text-ledger-600 dark:hover:text-ledger-200">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
