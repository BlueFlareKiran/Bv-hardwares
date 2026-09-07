'use client';

import { LogOut, Plus, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
  username: string;
  onAdd: () => void;
  onLogout: () => void;
  loggingOut: boolean;
}

export default function AdminToolbar({ username, onAdd, onLogout, loggingOut }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-brand-blue/20 bg-brand-blue/[0.045] p-4 sm:flex-row sm:items-center sm:justify-between dark:border-brand-blue-light/20 dark:bg-brand-blue-light/[0.06]">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-blue text-white"><ShieldCheck size={18} /></span>
        <div>
          <p className="text-sm font-semibold text-foreground">Admin Mode</p>
          <p className="text-xs text-muted-foreground">Logged in as {username}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onAdd}><Plus size={16} /> Add Job</Button>
        <Button variant="outline" onClick={onLogout} disabled={loggingOut}><LogOut size={16} /> {loggingOut ? 'Logging out…' : 'Logout'}</Button>
      </div>
    </div>
  );
}
