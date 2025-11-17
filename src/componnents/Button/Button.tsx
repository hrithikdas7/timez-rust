import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "icon" | "circular" | "play" | "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "w-6 h-6 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-10 h-10 text-2xl",
};

const variantClasses: Record<ButtonVariant, string> = {
  icon: "border-none bg-transparent text-gray-600 cursor-pointer rounded-lg transition-all duration-200 hover:bg-gray-100",
  circular:
    "rounded-full border-none bg-white/25 cursor-pointer transition-all duration-200 relative hover:bg-white/35",
  play: "border-none bg-transparent text-gray-600 cursor-pointer rounded transition-all duration-200 hover:bg-gray-100 hover:text-[#5A2A82]",
  primary:
    "border-none bg-[#5A2A82] text-white cursor-pointer rounded-lg transition-all duration-200 hover:bg-[#6A3A92] px-4 py-2",
  secondary:
    "border border-gray-200 bg-white text-gray-900 cursor-pointer rounded-lg transition-all duration-200 hover:bg-gray-50 px-4 py-2",
};

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses = "flex items-center justify-center";
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
