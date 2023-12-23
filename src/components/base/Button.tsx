import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  type: "primary" | "secondary";
}

export const Button = ({
  label,
  type,
  className,
  ...btnProps
}: ButtonProps) => {
  const style = {
    primary: "bg-slate-700 text-white active:bg-slate-500",
    secondary: "border-2 border-slate-700 active:bg-slate-200",
    gray: "bg-gray-500",
    yellow: "bg-yellow-500",
  }[type];

  return (
    <button {...btnProps} className={`p-3 rounded-lg ${style} ${className}`}>
      {label}
    </button>
  );
};
