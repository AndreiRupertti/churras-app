import { FC, useState } from "react";
import { Event, Participant, ParticipantInput } from "types/event";
import { ParticipantListItem } from "@components/ParticipantListItem/ParticipantListItem";
import { TextIcon } from "@components/base/TextIcon";
import { AddParticipantItem } from "@components/AddParticipantItem/AddParticipantItem";
import { prettyDate } from "@utils/prettyDate";
import { formatMoney } from "@utils/formatMoney";
import { revalidateEventList } from "@app/actions";

interface EventDetailProps {
  event: Event;
}

export const EventDetail: FC<EventDetailProps> = ({ event }) => {
  const [participants, setParticipants] = useState<Participant[]>(
    event.participants
  );

  const createParticipant = (participantInfo: ParticipantInput) => {
    fetch("http://localhost:3000/api/v1/participant", {
      method: "POST",
      body: JSON.stringify(participantInfo),
      headers: {
        "content-type": "application-json",
      },
    }).then(async (res) => {
      const body = await res.json();
      if (res.status >= 200 && res.status < 400) {
        setParticipants([...participants, body]);
        revalidateEventList();
      } else {
        alert("Erro ao adicionar participante. Tente novamente por favor!");
      }
    });
  };

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
      {participants.map((person) => (
        <div key={person.id}>
          <ParticipantListItem
            initialValue={person.isPaid}
            name={person.name}
            amountToPay={person.amountToPay}
          />
        </div>
      ))}
      <AddParticipantItem event={event} onAdd={createParticipant} />
    </div>
  );
};