import { useNavigate } from 'react-router-dom';
import { Mail, Building2, ShieldCheck, Clock, Moon, Globe, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { Card } from '../components/ui/Primitives';
import Button from '../components/ui/Button';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const { theme, language } = useUIStore();
  const navigate = useNavigate();

  if (!user) return null;

  const fields = [
    { icon: Mail, label: 'Email', value: user.email },
    { icon: ShieldCheck, label: 'Role', value: user.role },
    { icon: Building2, label: 'Department', value: user.department },
    { icon: Clock, label: 'Last login', value: user.lastLogin },
    { icon: Moon, label: 'Theme', value: theme === 'dark' ? 'Dark' : 'Light' },
    { icon: Globe, label: 'Language', value: language },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ledger-900 dark:text-ledger-50">Profile</h1>
        <p className="mt-1 text-sm text-ledger-500 dark:text-ledger-400">View your account details and workspace preferences.</p>
      </div>

      <Card className="flex items-center gap-5">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-ledger-950"
          style={{ backgroundColor: user.avatarColor }}
        >
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-ledger-900 dark:text-ledger-50">{user.name}</h2>
          <p className="text-sm text-ledger-500 dark:text-ledger-400">{user.department}</p>
        </div>
        <Button variant="danger" size="sm" icon={<LogOut size={14} />} className="ml-auto" onClick={() => { logout(); navigate('/login'); }}>
          Log out
        </Button>
      </Card>

      <Card>
        <h2 className="font-display text-base font-semibold text-ledger-900 dark:text-ledger-50">Account details</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-ledger-100 p-3.5 dark:border-ledger-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ledger-100 text-ledger-500 dark:bg-ledger-800 dark:text-ledger-300">
                <Icon size={15} />
              </div>
              <div>
                <p className="text-xs text-ledger-400">{label}</p>
                <p className="text-sm font-medium text-ledger-900 dark:text-ledger-50">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
