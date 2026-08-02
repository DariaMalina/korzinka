import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className = '',
      disabled,
      isLoading = false,
      size = 'md',
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={`ui-button ui-button--${variant} ui-button--${size} ${className}`}
        disabled={disabled || isLoading}
        type={type}
        {...props}
      >
        {isLoading ? (
          <span
            aria-label="Загрузка"
            className="ui-button__spinner"
            role="status"
          />
        ) : null}
        <span className={isLoading ? 'ui-button__label--loading' : ''}>
          {children}
        </span>
      </button>
    );
  },
);
