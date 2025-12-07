'use client';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  text,
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-base px-4 py-2 border border-border
        bg-surface text-surface-fg
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-surface-foreground
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer hover:brightness-90 active:brightness-75'}
        ${className}
      `}
    >
      {text}
    </button>
  );
};
