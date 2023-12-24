import { revalidateEventList } from "@app/actions";
import { AddParticipantItem } from "@components/AddParticipantItem/AddParticipantItem";
import { TextIcon } from "@components/base/TextIcon";
import { ParticipantListItem } from "@components/ParticipantListItem/ParticipantListItem";
import { ApiClient } from "@http/api-client";
import { formatMoney } from "@utils/formatMoney";
import { prettyDate } from "@utils/prettyDate";
import { FC, useState } from "react";
import { Event, Participant, ParticipantInput } from "types/event";

interface EventDetailProps {
  event: Event;
}

export const EventDetail: FC<EventDetailProps> = ({ event }) => {
  const [participants, setParticipants] = useState<Participant[]>(
    event.participants
  );

  const createParticipant = (participantInfo: ParticipantInput) => {
    ApiClient.createParticipant(participantInfo)
      .then((participant) => {
        revalidateEventList();
        setParticipants([...participants, participant]);
      })
      .catch(() =>
        alert("Erro ao adicionar participante. Tente novamente por favor!")
      );
  };

  const onTogglePaid = (toggleInfo: { value: boolean; id: string }) => {
    ApiClient.updateParticipant(toggleInfo.id, { isPaid: toggleInfo.value })
      .then(() => {
        revalidateEventList();
      })
      .catch((err) => {
        console.log("Silent Error: ", err);
      });
  };

  const onParticipantDelete = (id: string, indexOfParticipant: number) => {
    ApiClient.deleteParticipant(id)
      .then(() => {
        revalidateEventList();
        const newList = participants.filter(
          (participant) => participant.id !== id
        );
        setParticipants(newList);
      })
      .catch((err) => {
        console.log(err);
        alert("Erro ao remover participante. Tente novamente por favor!");
      });
  };
  return (
    <div className="flex flex-col gap-2 mx-2 md:mx-12 p-5 rounded-lg shadow-2xl border-2 bg-white -mt-24">
      <div className="flex md:flex-row flex-col justify-between mb-8 gap-2">
        <div>
          <div className="text-3xl font-bold">
            {prettyDate(event.date, "pt-br")}
          </div>
          <div className="text-3xl font-bold text-l line-clamp-2">
            {event.name}
          </div>
          <div className="text-lg text-l line-clamp-4 md:line-clamp-2 pt-3">
            {event.description}
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
      {participants.map((person, index) => (
        <div key={person.id}>
          <ParticipantListItem
            initialValue={person.isPaid}
            name={person.name}
            id={person.id}
            amountToPay={person.amountToPay}
            onToggle={onTogglePaid}
            onDelete={() => onParticipantDelete(person.id, index)}
          />
        </div>
      ))}
      <AddParticipantItem event={event} onAdd={createParticipant} />
    </div>
  );
};
