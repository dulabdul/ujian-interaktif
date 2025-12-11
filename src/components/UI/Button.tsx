import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:bg-blue-700',
      outline: 'border-2 border-primary text-primary hover:bg-blue-50',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'px-4 py-2 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
