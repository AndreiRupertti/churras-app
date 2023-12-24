import { formatMoney } from "@utils/formatMoney";
import { MoneyInput } from "@components/base/MoneyInput";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

interface PriceOptionsInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onInput"> {
  onInput?: (priceOpts: number[]) => void;
  label: string;
  maxOpts: string | number;
}

export const PriceOptionsInput = (props: PriceOptionsInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [pricesOpts, setPriceOpts] = useState<number[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const { label, onInput, maxOpts, ...inputProps } = props;

  const addPrice = () => {
    const value = Number(ref.current?.value.replace(",", ".") ?? "");
    if (ref.current && value) {
      if (pricesOpts.length + 1 > Number(maxOpts)) {
        setError(`Máximo de ${maxOpts} opções`);
      } else {
        ref.current.value = "";
        setError(undefined);
        setPriceOpts([...pricesOpts, value]);
      }
    } else {
      setError("Valor inválido!");
    }
  };

  useEffect(() => {
    onInput?.(pricesOpts);
  }, [pricesOpts.join("")]);
  const removePrice = (index: number) => {
    const newPriceList = pricesOpts.filter(
      (_, priceIndex) => priceIndex !== index
    );
    setPriceOpts(newPriceList);
  };

  return (
    <div className="flex flex-col w-1/2 gap-4">
      <div className="flex flex-row items-end gap-3">
        <MoneyInput
          currency="R$"
          label="Opções de preço:"
          errorText={error}
          ref={ref}
        >
          <div
            className="rounded-lg bg-blue-500 w-12 h-12 text-2xlg text-white flex justify-center items-center"
            onClick={addPrice}
          >
            <span>+</span>
          </div>
        </MoneyInput>
      </div>
      {pricesOpts.map((price, index) => (
        <div
          key={`${index}-price`}
          className="p-2 rounded-lg bg-blue-500 flex fle-row justify-between text-white"
        >
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
    </div>
  );
};
