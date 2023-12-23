import { formatMoney } from "@/utils/formatMoney";
import { ChangeEvent, HTMLAttributes, useRef, useState } from "react";

interface PriceOptionsInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onInput"> {
  onInput?: (priceOpts: number[]) => void;
  label: string;
}

export const PriceOptionsInput = (props: PriceOptionsInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [pricesOpts, setPriceOpts] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { label, onInput, ...inputProps } = props;
  const addPrice = () => {
    const value = ref.current?.value.replace(",", ".") ?? "";

    if (validateValue(value)) {
      setError(null);
      setPriceOpts([...pricesOpts, Number(value)]);
      onInput?.(pricesOpts);
    } else {
      setError("Valor inválido!");
    }
  };

  const removePrice = (index: number) => {
    const newPriceList = pricesOpts.filter(
      (_, priceIndex) => priceIndex !== index
    );
    setPriceOpts(newPriceList);
  };

  const validateValue = (value: string) => {
    const v = value.replace(",", ".");
    const price = Number(v);
    console.log(price);
    if (isNaN(price) || price <= 0) return false;
    return true;
  };

  const forceNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (!validateValue(e.target.value)) {
      e.target.value = e.target.value.slice(0, e.target.value.length - 1);
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <label
        role="button"
        className="text-xl font-semibold flex flex-col gap-2"
      >
        {label}
        <div className="flex flex-row gap-2 items-center">
          <span className="absolute left-8">R$</span>
          <input
            {...inputProps}
            ref={ref}
            className={`p-2 pl-10 border-2 rounded-lg ${
              error ? "border-red-500" : ""
            }`}
            type="text"
            onChange={forceNumber}
          />
          <div
            className="rounded-lg bg-blue-500 w-12 h-full text-2xlg text-white flex justify-center items-center"
            onClick={addPrice}
          >
            <span>+</span>
          </div>
        </div>
        {error && <span className="text-red-500">{error}</span>}
        {pricesOpts.map((price, index) => (
          <div className="p-2 rounded-lg bg-blue-500 flex fle-row justify-between text-white">
            {formatMoney(price, "BRL")}
            <span
              role="button"
              className="w-2/12 flex justify-center border-l-2 border-dotted text-white"
              onClick={() => removePrice(index)}
            >
              X
            </span>
          </div>
        ))}
      </label>
    </div>
  );
};
