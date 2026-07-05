import { Lock } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="border-t border-ledger-800/60 bg-ledger-950">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 text-ledger-950">
                <Lock size={16} strokeWidth={2.5} />
              </div>
              <span className="font-display text-[15px] font-bold text-ledger-50">SecureSheet</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-ledger-400">
              Row-level and cell-level permissions for spreadsheets your whole company can trust.
            </p>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Templates', 'Pricing', 'Security'] },
            { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
            { title: 'Resources', links: ['Documentation', 'Guides', 'API Reference', 'Status'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ledger-50">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-ledger-400 transition hover:text-gold-400">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ledger-800/60 pt-8 sm:flex-row">
          <p className="text-xs text-ledger-500">© 2026 SecureSheet, Inc. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-ledger-500">
            <a href="#" className="hover:text-ledger-300">Privacy</a>
            <a href="#" className="hover:text-ledger-300">Terms</a>
            <a href="#" className="hover:text-ledger-300">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
