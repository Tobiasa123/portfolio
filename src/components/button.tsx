"use client";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string; // <--- add this
}

export const Button = ({ text, onClick, disabled = false, className = "" }: ButtonProps) => {
  return (
    <button
      className={`bg-slate-400 rounded-md cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-500"
      } transition-colors ${className}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
