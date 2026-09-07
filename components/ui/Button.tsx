import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export function buttonVariants({
  variant = 'default',
  size = 'default',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  const variants: Record<ButtonVariant, string> = {
    default:
      'bg-[linear-gradient(135deg,#f35b0a_0%,#ff7a18_100%)] text-white shadow-[0_12px_28px_-16px_rgba(243,91,10,0.75)] hover:shadow-[0_18px_32px_-16px_rgba(243,91,10,0.82)] focus-visible:ring-brand-orange/35 dark:text-white',
    secondary:
      'bg-[linear-gradient(135deg,#1237a5_0%,#1d4ed8_100%)] text-white shadow-[0_12px_28px_-16px_rgba(18,55,165,0.68)] hover:shadow-[0_18px_32px_-16px_rgba(18,55,165,0.76)] focus-visible:ring-brand-blue/30',
    outline:
      'border border-border bg-background/82 text-foreground shadow-[0_8px_24px_-22px_rgba(7,17,38,0.45)] backdrop-blur hover:border-brand-blue/25 hover:bg-brand-blue/[0.045] hover:text-foreground dark:hover:border-brand-blue-light/25 dark:hover:bg-brand-blue-light/[0.055]',
    ghost: 'text-foreground hover:bg-muted',
  };
  const sizes: Record<ButtonSize, string> = {
    default: 'h-11 px-5 py-2.5',
    sm: 'h-9 rounded-[7px] px-3.5 text-sm',
    lg: 'h-12 rounded-[8px] px-6 text-base',
    icon: 'size-10 rounded-[8px]',
  };

  return cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-sm font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-200 outline-none hover:-translate-y-0.5 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0',
    variants[variant],
    sizes[size],
    className
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
);
Button.displayName = 'Button';
