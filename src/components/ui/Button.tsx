const Button = ({
  children,
  onClick,
  className = "",
  type,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => (
  <button
    className={`
      ${className}
      bg-gradient-to-r from-indigo-500 to-purple-500
      text-white
      font-bold
      rounded-lg
      px-4
      py-2
      transition
      duration-300
      ease-in-out
      hover:shadow-lg
      focus:outline-none
      focus:ring-2
      focus:ring-indigo-200
      focus:ring-offset-2
      focus:ring-offset-white
    `}
    onClick={onClick}
    type={type ? type : "button"}
    disabled={disabled}>
    {children}
  </button>
);

export default Button;
