import { ChangeEvent, forwardRef, HTMLAttributes } from "react";

interface MoneyInputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  currency: "R$";
  errorText?: string;
}
type Ref = HTMLInputElement;
export const MoneyInput = forwardRef<Ref, MoneyInputProps>(
  ({ errorText, label, currency, children, ...inputProps }, ref) => {
    const validateValue = (value: string) => {
      const v = value.replace(",", ".");
      const price = Number(v);
      if (isNaN(price) || price <= 0) return false;
      return true;
    };

    const forceNumber = (e: ChangeEvent<HTMLInputElement>) => {
      if (!validateValue(e.target.value)) {
        e.target.value = e.target.value.slice(0, e.target.value.length - 1);
      }
    };

    return (
      <label
        role="button"
        className="text-xl font-semibold flex flex-col gap-2"
      >
        {label}
        <div className="flex flex-row gap-2 items-center">
          <span className="absolute left-8">{currency}</span>
          <input
            {...inputProps}
            className={`p-2 pl-10 border-2 rounded-lg ${
              errorText ? "border-red-500" : ""
            }`}
            type="text"
            ref={ref}
            name={inputProps.id}
            onChange={forceNumber}
          />
          {children}
        </div>
        {errorText && <span className="text-red-500">{errorText}</span>}
      </label>
    );
  }
);
