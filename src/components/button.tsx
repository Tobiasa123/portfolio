
interface ButtonProps {
  text: string;
  onClick?: () => void
}

export const Button = ({text, onClick}: ButtonProps) => {

    return (
    <button className="bg-slate-400 rounded-md cursor-pointer" onClick={onClick}>
        {text}
    </button>
    );
}