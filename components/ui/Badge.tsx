import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[7px] border border-brand-blue/15 bg-brand-blue/7 px-2.5 py-1 text-xs font-semibold text-brand-blue dark:border-brand-blue-light/20 dark:bg-brand-blue-light/10 dark:text-brand-blue-light',
        className
      )}
      {...props}
    />
  );
}
