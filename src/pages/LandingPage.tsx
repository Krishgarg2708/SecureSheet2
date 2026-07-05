import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, GitBranch, History, Download, Lock, Users, ArrowRight, Check, ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import PublicFooter from '../components/layout/PublicFooter';
import Button from '../components/ui/Button';

const FEATURES = [
  { icon: Lock, title: 'Cell-level permissions', desc: 'Lock, mask, or restrict individual cells by role — Admin, Manager, or Employee — without duplicating sheets.' },
  { icon: GitBranch, title: 'Undo, redo, autosave', desc: 'Every edit is tracked in a local change stack so teams can revert mistakes instantly.' },
  { icon: History, title: 'Full activity trail', desc: 'See exactly who changed what, when, and from which cell — with before and after values.' },
  { icon: Download, title: 'Export anywhere', desc: 'Download any workspace as CSV, Excel, or a shareable report in one click.' },
  { icon: ShieldCheck, title: 'Role-based access', desc: 'Three built-in roles map permissions across thousands of rows automatically.' },
  { icon: Users, title: 'Built for teams', desc: 'Pin critical sheets, track recent files, and keep everyone working from one source of truth.' },
];

const STEPS = [
  { title: 'Import or start from a template', desc: 'Bring your data in or launch from a finance, sales, or HR template built for enterprise workflows.' },
  { title: 'Define who can edit what', desc: 'Set editable, read-only, locked, or role-restricted permissions down to the individual cell.' },
  { title: 'Work, track, and export', desc: 'Edit safely, review the full activity history, and export clean reports whenever you need them.' },
];

const PLANS = [
  { name: 'Team', price: '$0', period: 'forever', desc: 'For small teams getting started with shared spreadsheets.', features: ['Up to 5 workspace members', 'Unlimited spreadsheets', 'CSV & Excel export', 'Basic activity history'], highlighted: false },
  { name: 'Business', price: '$24', period: '/user/mo', desc: 'For growing companies that need real permission controls.', features: ['Unlimited members', 'Cell-level permissions', 'Full activity trail', 'Custom templates', 'Priority support'], highlighted: true },
  { name: 'Enterprise', price: 'Custom', period: 'contact us', desc: 'For organizations with advanced security and compliance needs.', features: ['SSO & audit logs', 'Dedicated success manager', 'Custom data retention', 'SLA-backed uptime'], highlighted: false },
];

const FAQS = [
  { q: 'Do I need to install anything?', a: 'No. SecureSheet runs entirely in your browser — there is nothing to download or configure on your machine.' },
  { q: 'Can I control who edits specific cells?', a: 'Yes. Every column can be marked editable, read-only, locked, admin-only, manager-only, or disabled, and the grid enforces it visually and functionally.' },
  { q: 'What happens to my changes if I close the tab?', a: 'Changes autosave to your browser as you work, and the activity history keeps a record of every edit.' },
  { q: 'Can I export my data?', a: 'Yes — every workspace can be downloaded as CSV, Excel, or a formatted report at any time.' },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-ledger-950 text-ledger-100">
      <PublicNavbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-graph-paper bg-graph [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-medium text-gold-400"
            >
              <Lock size={12} /> Cell-level permission control, built in
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ledger-50 sm:text-6xl"
            >
              The spreadsheet your
              <span className="text-gold-400"> whole company</span> can trust
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-6 max-w-xl text-lg text-ledger-300"
            >
              SecureSheet brings Excel-grade editing together with row and cell-level permissions,
              full audit trails, and enterprise-ready workflows — no backend required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link to="/login">
                <Button size="lg" icon={<ArrowRight size={18} />}>Start free</Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline">See how it works</Button>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="card mx-auto mt-16 max-w-5xl overflow-hidden !rounded-2xl border-ledger-800 !bg-ledger-900/80 p-0"
          >
            <div className="flex items-center gap-2 border-b border-ledger-800 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs text-ledger-500">Q3 Regional Budget Tracker — SecureSheet</span>
            </div>
            <div className="grid grid-cols-6 gap-px bg-ledger-800 p-px text-xs">
              {['Record', 'Dept.', 'Status', 'Budget', 'Spent', 'Approved'].map((h) => (
                <div key={h} className="bg-ledger-850 px-3 py-2 font-semibold text-ledger-300">{h}</div>
              ))}
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className={`bg-ledger-900 px-3 py-2 text-ledger-400 ${i % 6 === 5 ? 'text-gold-400' : ''}`}>
                  {i % 6 === 0 && `REC-10${i}`}
                  {i % 6 === 1 && ['Finance', 'Sales', 'Ops'][i % 3]}
                  {i % 6 === 2 && ['Active', 'Pending'][i % 2]}
                  {i % 6 === 3 && `$${(12 + i) * 1000}`}
                  {i % 6 === 4 && `$${(8 + i) * 900}`}
                  {i % 6 === 5 && (i % 2 === 0 ? '✓ Locked' : '—')}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-t border-ledger-800/60 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">Features</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ledger-50">Everything a governed workspace needs</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-ledger-800 bg-ledger-900/60 p-6 transition hover:border-gold-500/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ledger-50">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ledger-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-t border-ledger-800/60 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">How it works</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ledger-50">From raw data to governed workspace</h2>
          </div>
          <div className="mt-14 space-y-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-5 rounded-2xl border border-ledger-800 bg-ledger-900/60 p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500 font-display font-bold text-ledger-950">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-ledger-50">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-ledger-400">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-ledger-800/60 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">Pricing</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ledger-50">Simple plans that scale with your team</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-7 ${plan.highlighted ? 'border-gold-500 bg-gold-500/5 shadow-glow' : 'border-ledger-800 bg-ledger-900/60'}`}
              >
                {plan.highlighted && <Badge>Most popular</Badge>}
                <h3 className="mt-3 font-display text-lg font-semibold text-ledger-50">{plan.name}</h3>
                <p className="mt-1 text-sm text-ledger-400">{plan.desc}</p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-bold text-ledger-50">{plan.price}</span>
                  <span className="text-sm text-ledger-500">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-ledger-300">
                      <Check size={15} className="text-gold-400" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login" className="mt-7 block">
                  <Button fullWidth variant={plan.highlighted ? 'primary' : 'outline'}>
                    {plan.name === 'Enterprise' ? 'Contact sales' : 'Get started'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-ledger-800/60 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">Testimonials</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ledger-50">Trusted by data-driven teams</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { quote: 'Our finance reviews used to take a day of cross-checking. Now the permissions do that work for us.', name: 'Ariana Voss', role: 'Head of IT, Northline Group' },
              { quote: 'The activity history alone justified switching — we finally know exactly who changed what.', name: 'Devon Marsh', role: 'Finance Manager, Corda Labs' },
              { quote: 'Rolling out role-based access across 40 spreadsheets took an afternoon, not a quarter.', name: 'Priya Nair', role: 'Operations Lead, Fenwick & Ro' },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-ledger-800 bg-ledger-900/60 p-6">
                <p className="text-sm leading-relaxed text-ledger-300">"{t.quote}"</p>
                <p className="mt-5 text-sm font-semibold text-ledger-50">{t.name}</p>
                <p className="text-xs text-ledger-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-ledger-800/60 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ledger-50">Frequently asked questions</h2>
          </div>
          <div className="mt-10 space-y-3">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="overflow-hidden rounded-xl border border-ledger-800 bg-ledger-900/60">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-ledger-100"
                >
                  {faq.q}
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}>
                    <ChevronDown size={16} className="text-ledger-500" />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm text-ledger-400">{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-ledger-950">{children}</span>;
}
