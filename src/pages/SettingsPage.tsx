import { Moon, Sun, Layers, Globe, Bell, Rows3 } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { Card } from '../components/ui/Primitives';
import { useToastStore } from '../store/toastStore';
import type { Language } from '../store/uiStore';

const LANGUAGES: Language[] = ['English', 'Hindi', 'Spanish', 'French'];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-gold-500' : 'bg-ledger-200 dark:bg-ledger-700'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const {
    theme, setTheme, compactMode, setCompactMode, gridDensity, setGridDensity,
    language, setLanguage, notificationsEnabled, setNotificationsEnabled,
  } = useUIStore();
  const push = useToastStore((s) => s.push);

  function handleChange<T>(setter: (v: T) => void, value: T, label: string) {
    setter(value);
    push({ type: 'success', title: 'Settings updated', message: `${label} preference saved.` });
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ledger-900 dark:text-ledger-50">Settings</h1>
        <p className="mt-1 text-sm text-ledger-500 dark:text-ledger-400">Manage appearance, workspace density, and notification preferences.</p>
      </div>

      <Card>
        <h2 className="font-display text-base font-semibold text-ledger-900 dark:text-ledger-50">Appearance</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon size={17} className="text-ledger-400" /> : <Sun size={17} className="text-ledger-400" />}
              <div>
                <p className="text-sm font-medium text-ledger-900 dark:text-ledger-50">Dark mode</p>
                <p className="text-xs text-ledger-500 dark:text-ledger-400">Switch between light and dark interface themes.</p>
              </div>
            </div>
            <Toggle checked={theme === 'dark'} onChange={(v) => handleChange(setTheme, v ? 'dark' : 'light', 'Theme')} />
          </div>
          <div className="flex items-center justify-between border-t border-ledger-100 pt-4 dark:border-ledger-800">
            <div className="flex items-center gap-3">
              <Layers size={17} className="text-ledger-400" />
              <div>
                <p className="text-sm font-medium text-ledger-900 dark:text-ledger-50">Compact mode</p>
                <p className="text-xs text-ledger-500 dark:text-ledger-400">Reduce spacing across cards and lists for denser layouts.</p>
              </div>
            </div>
            <Toggle checked={compactMode} onChange={(v) => handleChange(setCompactMode, v, 'Compact mode')} />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-base font-semibold text-ledger-900 dark:text-ledger-50">Workspace</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Rows3 size={17} className="text-ledger-400" />
              <div>
                <p className="text-sm font-medium text-ledger-900 dark:text-ledger-50">Grid density</p>
                <p className="text-xs text-ledger-500 dark:text-ledger-400">Choose how tightly rows are packed in the spreadsheet.</p>
              </div>
            </div>
            <div className="flex overflow-hidden rounded-lg border border-ledger-200 dark:border-ledger-700">
              {(['comfortable', 'compact'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => handleChange(setGridDensity, d, 'Grid density')}
                  className={`px-3 py-1.5 text-xs font-medium capitalize ${gridDensity === d ? 'bg-gold-500 text-ledger-950' : 'text-ledger-500 hover:bg-ledger-100 dark:text-ledger-400 dark:hover:bg-ledger-800'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-ledger-100 pt-4 dark:border-ledger-800">
            <div className="flex items-center gap-3">
              <Globe size={17} className="text-ledger-400" />
              <div>
                <p className="text-sm font-medium text-ledger-900 dark:text-ledger-50">Language</p>
                <p className="text-xs text-ledger-500 dark:text-ledger-400">Set your preferred display language.</p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => handleChange(setLanguage, e.target.value as Language, 'Language')}
              className="rounded-lg border border-ledger-200 bg-white px-3 py-1.5 text-sm text-ledger-700 dark:border-ledger-700 dark:bg-ledger-800 dark:text-ledger-200"
            >
              {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-base font-semibold text-ledger-900 dark:text-ledger-50">Notifications</h2>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={17} className="text-ledger-400" />
            <div>
              <p className="text-sm font-medium text-ledger-900 dark:text-ledger-50">Enable notifications</p>
              <p className="text-xs text-ledger-500 dark:text-ledger-400">Receive alerts for approvals, sync issues, and updates.</p>
            </div>
          </div>
          <Toggle checked={notificationsEnabled} onChange={(v) => handleChange(setNotificationsEnabled, v, 'Notifications')} />
        </div>
      </Card>
    </div>
  );
}
