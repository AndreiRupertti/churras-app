import { formatMoney } from "@/utils/formatMoney";
import { HTMLAttributes, useState } from "react";

interface ParticipantListItemProps extends HTMLAttributes<HTMLInputElement> {
  initialValue: boolean;
  name: string;
  amountToPay: number;
  onToggle?: (value: boolean) => void;
}

export const ParticipantListItem = (props: ParticipantListItemProps) => {
  const [checkbox, setCheckbox] = useState(props.initialValue);
  const toggleCheckbox = () => {
    setCheckbox(!checkbox);
    props.onToggle?.(!checkbox);
  };
  return (
    <div className="h-12 p-y-5 border-b-2 border-dotted ">
      <div className="flex flex-row justify-between">
        <label
          role="button"
          className="text-xl font-semibold flex flex-row gap-5"
        >
          <input
            role="button"
            className="appearance-none w-6 h-6 rounded-full checked:bg-yellow-500 border-2 border-yellow-500 self-center"
            type="checkbox"
            checked={checkbox}
            onClick={toggleCheckbox}
          />
          {props.name}
        </label>
        <p
          className={`text-xl font-semibold ${checkbox ? "line-through" : ""}`}
        >
          {formatMoney(props.amountToPay, "BRL")}
        </p>
      </div>
    </div>
  );
};
