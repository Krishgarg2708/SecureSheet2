import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import CommandPalette from '../components/layout/CommandPalette';
import ToastContainer from '../components/ui/ToastContainer';

export default function AppLayout() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-ledger-50 dark:bg-ledger-950">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar onOpenCommandPalette={() => setPaletteOpen(true)} />
        <main className="flex-1 px-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <ToastContainer />
    </div>
  );
}
