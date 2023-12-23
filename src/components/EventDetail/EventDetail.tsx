import { FC } from "react";
import { Event } from "types/event";
import { ParticipantListItem } from "@components/ParticipantListItem/ParticipantListItem";
import { TextIcon } from "@components/base/TextIcon";
import { AddParticipantItem } from "@components/AddParticipantItem/AddParticipantItem";
import { prettyDate } from "@utils/prettyDate";
import { formatMoney } from "@utils/formatMoney";

interface EventDetailProps {
  event: Event;
}

export const EventDetail: FC<EventDetailProps> = ({ event }) => {
  return (
    <div className="flex flex-col gap-2 mx-2 md:mx-12 p-5 rounded-lg shadow-2xl border-2 bg-white -mt-24">
      <div className="flex md:flex-row flex-col justify-between mb-8">
        <div>
          <div className="text-3xl font-bold">
            {prettyDate(event.date, "pt-br")}
          </div>
          <div className="text-3xl font-bold text-l line-clamp-2">
            {event.name}
          </div>
        </div>
        <div className="flex flex-col">
          <TextIcon
            text={event.totalParticipants}
            iconName="people"
            fontSize="3xl"
            size={[40, 32]}
          />
          <TextIcon
            text={formatMoney(event.totalPrice, "BRL")}
            iconName="dollarSign"
            fontSize="3xl"
            size={40}
          />
        </div>
      </div>
      {event.participants.map((person) => (
        <div key={person.id}>
          <ParticipantListItem
            initialValue={person.isPaid}
            name={person.name}
            amountToPay={person.amountToPay}
          />
        </div>
      ))}
      <AddParticipantItem event={event} />
    </div>
  );
};
