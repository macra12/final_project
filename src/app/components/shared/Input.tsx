// components/shared/Input.tsx
"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  error,
  leftIcon,
  rightIcon,
  helperText,
  disabled,
  type = "text",
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{leftIcon}</span>
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'block w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 placeholder-gray-400',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          disabled={disabled}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="text-gray-500">{rightIcon}</span>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={cn(
          "mt-1 text-sm",
          error ? "text-red-600" : "text-gray-500"
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";