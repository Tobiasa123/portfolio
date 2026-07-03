interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  text,
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        whitespace-nowrap
        rounded-base px-4 py-2 border portfolio-border-brand
        portfolio-surface portfolio-text
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--portfolio-brand-muted)/0.5)]
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:brightness-90 active:brightness-75"}
        ${className}
      `}
    >
      {children ?? text}
    </button>
  );
};