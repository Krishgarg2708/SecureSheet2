import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Users, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { MOCK_CREDENTIALS } from '../data/mockUsers';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useToastStore } from '../store/toastStore';

const ROLE_ICONS = { Admin: ShieldCheck, Manager: Users, Employee: UserIcon };

export default function LoginPage() {
  const [email, setEmail] = useState('admin@securesheet.io');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [forgotOpen, setForgotOpen] = useState(false);
  const login = useAuthStore((s) => s.login);
  const push = useToastStore((s) => s.push);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = login(email, password, remember);
    if (result.success) {
      push({ type: 'success', title: 'Welcome back', message: 'You have signed in successfully.' });
      navigate('/app/dashboard');
    } else {
      setError(result.message || 'Login failed.');
    }
  }

  function quickFill(demoEmail: string, demoPassword: string) {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  }

  return (
    <div className="flex min-h-screen bg-ledger-950 text-ledger-100">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-ledger-800 bg-ledger-900 p-12 lg:flex">
        <div className="absolute inset-0 bg-graph-paper bg-graph opacity-60 [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_75%)]" />
        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 text-ledger-950">
            <Lock size={17} strokeWidth={2.5} />
          </div>
          <span className="font-display text-base font-bold text-ledger-50">SecureSheet</span>
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <h2 className="font-display text-3xl font-bold leading-tight text-ledger-50">
            Governed spreadsheets, built for enterprise trust.
          </h2>
          <p className="mt-4 max-w-md text-sm text-ledger-400">
            Sign in to manage cell-level permissions, review activity history, and keep every
            edit accountable across your organization.
          </p>
        </motion.div>
        <p className="relative text-xs text-ledger-600">© 2026 SecureSheet, Inc.</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-bold text-ledger-50">Sign in to your workspace</h1>
          <p className="mt-2 text-sm text-ledger-400">Use a demo account below or enter your credentials.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ledger-400">Email address</label>
              <div className="flex items-center gap-2.5 rounded-xl border border-ledger-800 bg-ledger-900 px-3.5 py-2.5 focus-within:border-gold-500/60">
                <Mail size={16} className="text-ledger-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm text-ledger-100 outline-none placeholder:text-ledger-600"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ledger-400">Password</label>
              <div className="flex items-center gap-2.5 rounded-xl border border-ledger-800 bg-ledger-900 px-3.5 py-2.5 focus-within:border-gold-500/60">
                <Lock size={16} className="text-ledger-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm text-ledger-100 outline-none placeholder:text-ledger-600"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-ledger-500 hover:text-ledger-300">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-ledger-400">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-ledger-700 bg-ledger-900 accent-gold-500" />
                Remember me
              </label>
              <button type="button" onClick={() => setForgotOpen(true)} className="text-xs font-medium text-gold-400 hover:text-gold-300">
                Forgot password?
              </button>
            </div>

            <Button type="submit" fullWidth size="lg">Sign in</Button>
          </form>

          <div className="mt-8">
            <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-ledger-600">Or continue with a demo role</p>
            <div className="grid grid-cols-3 gap-2.5">
              {MOCK_CREDENTIALS.map((cred) => {
                const Icon = ROLE_ICONS[cred.user.role];
                return (
                  <button
                    key={cred.email}
                    type="button"
                    onClick={() => quickFill(cred.email, cred.password)}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-ledger-800 bg-ledger-900 py-3 text-xs text-ledger-300 transition hover:border-gold-500/50 hover:text-gold-400"
                  >
                    <Icon size={16} />
                    {cred.user.role}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <Modal open={forgotOpen} onClose={() => setForgotOpen(false)} title="Reset your password">
        <p className="text-sm text-ledger-400">
          Enter the email associated with your account and we'll send a reset link. This is a UI
          preview only — no email will be sent in this demo.
        </p>
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-ledger-200 bg-ledger-50 px-3.5 py-2.5 dark:border-ledger-800 dark:bg-ledger-900">
          <Mail size={16} className="text-ledger-500" />
          <input placeholder="you@company.com" className="w-full bg-transparent text-sm outline-none placeholder:text-ledger-500" />
        </div>
        <Button
          fullWidth
          className="mt-5"
          onClick={() => { setForgotOpen(false); push({ type: 'info', title: 'Reset link sent', message: 'Check your inbox for further instructions (demo only).' }); }}
        >
          Send reset link
        </Button>
      </Modal>
    </div>
  );
}
