import { Badge } from "@components/base/Badge";
import { TextIcon } from "@components/base/TextIcon";
import { formatMoney } from "@utils/formatMoney";
import { prettyDate } from "@utils/prettyDate";
import { HTMLAttributes } from "react";

interface EventCardProps extends HTMLAttributes<HTMLDivElement> {
  date: string;
  name: string;
  totalParticipants: string | number;
  totalPrice: number;
}

export const EventCard = (props: EventCardProps) => {
  const { date, name, totalParticipants, totalPrice, ...divProps } = props;
  const locale = "pt-br";

  const isEventOver = new Date(date) < new Date();

  return (
    <div
      {...divProps}
      className="relative flex flex-col p-4 w-full md:max-w-96 md:w-96 min-h-40 justify-between rounded shadow-xl bg-white"
    >
      {isEventOver && (
        <Badge label="Finalizado" color="green" position="top-right" />
      )}
      <div>
        <div className="text-2xl font-bold">{prettyDate(date, locale)}</div>
        <div className="text-xl font-bold text-l line-clamp-2">{name}</div>
      </div>
      <div className="flex flex-row justify-between self-end w-full">
        <TextIcon text={totalParticipants} iconName="people" size={[28, 24]} />
        <TextIcon
          text={formatMoney(totalPrice, "BRL")}
          iconName="dollarSign"
          size={24}
        />
      </div>
    </div>
  );
};
