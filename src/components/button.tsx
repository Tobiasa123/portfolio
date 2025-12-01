interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({ text, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      className={`bg-slate-400 rounded-md cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-500"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
