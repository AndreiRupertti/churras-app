import { formatMoney } from "@utils/formatMoney";
import { Button } from "@components/base/Button";
import { Icon } from "@components/base/Icon";
import { HTMLAttributes, useState } from "react";

interface ParticipantListItemProps extends HTMLAttributes<HTMLInputElement> {
  initialValue: boolean;
  id: string;
  name: string;
  amountToPay: number;
  onToggle?: (info: { id: string; value: boolean }) => void;
  onDelete?: (info: { id: string; value: boolean }) => void;
}

export const ParticipantListItem = (props: ParticipantListItemProps) => {
  const [checkbox, setCheckbox] = useState(props.initialValue);
  const toggleCheckbox = () => {
    setCheckbox(!checkbox);
    props.onToggle?.({ id: props.id, value: !checkbox });
  };

  const onDelete = () => {
    props.onDelete?.({ id: props.id, value: !checkbox });
  };
  return (
    <div className="h-12 p-y-5 border-b-2 border-dotted ">
      <div className="flex flex-row justify-between gap-2">
        <label
          role="button"
          className="text-xl  text-nowrap overflow-hidden font-semibold flex flex-row gap-5 shrink"
        >
          <input
            role="button"
            className="appearance-none min-w-6 w-6 h-6 rounded-full checked:bg-yellow-500 border-2 border-yellow-500 self-center"
            type="checkbox"
            checked={checkbox}
            onChange={toggleCheckbox}
          />
          {props.name}
        </label>
        <div className="flex flex-row gap-2 items-center">
          <p
            className={`text-xl font-semibold ${
              checkbox ? "line-through" : ""
            }`}
          >
            {formatMoney(props.amountToPay, "BRL")}
          </p>
          <Button decoration="danger" iconOnly onClick={onDelete}>
            <Icon name="delete" size={20} color="black" />
          </Button>
        </div>
      </div>
    </div>
  );
};
