import { HTMLAttributes } from "react";

interface ParticipantListItemProps extends HTMLAttributes<HTMLInputElement> {
  initialValue: boolean;
  name: string;
  amountToPay: number;
  onToggle?: (value: boolean) => void;
}

export const ParticipantListItem = (props: ParticipantListItemProps) => {
  return (
    <div className="h-16">
      <div className="4">
        <label className="text-xl font-semibold flex flex-row gap-5">
          <input
            className="appearance-none w-6 h-6 rounded-full checked:bg-yellow-500 border-2"
            type="checkbox"
            checked={props.initialValue}
          />
          {props.name}
        </label>
      </div>
    </div>
  );
};
