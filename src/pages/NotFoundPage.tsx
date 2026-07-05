import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ledger-950 px-6 text-center text-ledger-100">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400">
        <FileQuestion size={28} />
      </div>
      <h1 className="mt-6 font-display text-4xl font-bold">404</h1>
      <p className="mt-2 max-w-sm text-sm text-ledger-400">
        This sheet doesn't exist, or you don't have permission to view it.
      </p>
      <Link to="/" className="mt-7">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
