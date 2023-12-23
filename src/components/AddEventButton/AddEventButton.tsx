import { HTMLAttributes } from "react";
import { Icon } from "@components/base/Icon";

type AddEventButtonProps = HTMLAttributes<HTMLDivElement>;

export const AddEventButton = (props: AddEventButtonProps) => {
  return (
    <div
      {...props}
      role="button"
      className="relative flex flex-col justify-center items-center p-4 w-full md:max-w-96 md:w-96 min-h-40 justify-between rounded shadow-xl bg-gray-200"
    >
      <div className="relative flex justify-center rounded-full bg-yellow-300 p-5">
        <Icon name="bbq" size={[40, 44]} color="black" />
      </div>
      <span className="text-xl">Adicionar Churras</span>
    </div>
  );
};
