import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutTemplate, ArrowRight } from 'lucide-react';
import { TEMPLATES } from '../data/mockData';
import { Card, Badge } from '../components/ui/Primitives';
import Button from '../components/ui/Button';
import { useToastStore } from '../store/toastStore';

export default function TemplatesPage() {
  const navigate = useNavigate();
  const push = useToastStore((s) => s.push);

  function useTemplate(name: string) {
    push({ type: 'success', title: 'Template loaded', message: `"${name}" has been opened in the workspace.` });
    navigate('/app/workspace');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ledger-900 dark:text-ledger-50">Templates</h1>
        <p className="mt-1 text-sm text-ledger-500 dark:text-ledger-400">Start from a pre-built workspace tailored to your team.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((tpl, i) => (
          <motion.div key={tpl.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card hover className="flex h-full flex-col">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${tpl.color}22`, color: tpl.color }}>
                <LayoutTemplate size={20} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ledger-900 dark:text-ledger-50">{tpl.name}</h3>
              <p className="mt-1.5 flex-1 text-sm text-ledger-500 dark:text-ledger-400">{tpl.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <Badge tone="neutral">{tpl.category}</Badge>
                <Badge tone="neutral">{tpl.rows} rows</Badge>
                <Badge tone="neutral">{tpl.cols} cols</Badge>
              </div>
              <Button className="mt-5" fullWidth variant="outline" icon={<ArrowRight size={15} />} onClick={() => useTemplate(tpl.name)}>
                Use template
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
