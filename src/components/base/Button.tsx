import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  decoration: "primary" | "secondary" | "text" | "danger";
  iconOnly?: boolean;
}

export const Button = ({
  label,
  decoration,
  iconOnly,
  className,
  children,
  ...btnProps
}: ButtonProps) => {
  const style = {
    primary: "bg-black text-white active:bg-slate-70 disabled:bg-slate-700 ",
    secondary: "border-2 border-slate-700 active:bg-slate-200",
    text: "active:bg-slate-200 font-bold",
    danger: "bg-red-400 active:bg-red-200 text-white",
  }[decoration];

  const basePadding = iconOnly ? "p-2" : "p-3";
  return (
    <button
      {...btnProps}
      className={`rounded-lg ${basePadding} ${style} ${className}`}
    >
      {children}
      {label}
    </button>
  );
};
