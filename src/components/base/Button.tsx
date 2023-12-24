import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  decoration: "primary" | "secondary" | "text";
}

export const Button = ({
  label,
  decoration,
  className,
  children,
  ...btnProps
}: ButtonProps) => {
  const style = {
    primary: "bg-black text-white active:bg-slate-70 disabled:bg-slate-700 ",
    secondary: "border-2 border-slate-700 active:bg-slate-200",
    text: "active:bg-slate-200 font-bold",
  }[decoration];

  return (
    <button {...btnProps} className={`p-3 rounded-2xl ${style} ${className}`}>
      {children}
      {label}
    </button>
  );
};
