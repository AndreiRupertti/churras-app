"use client";

import { HTMLAttributes, useState } from "react";
import { EventCard } from "@components/EventCard/EventCard";
import { Sidebar } from "@components/base/Sidebar";
import { TextInput } from "@components/base/TextInput";
import { TextAreaInput } from "@components/base/TextAreaInput";
import { Button } from "@components/base/Button";
import { PriceOptionsInput } from "@components/base/PriceOptionsInput";
import { DatePickerInput } from "@components/base/DatePickerInput";
import { ParticipantListItem } from "@components/ParticipantListItem/ParticipantListItem";
import { EventListResponse, Event } from "types/event";
import { prettyDate } from "@/utils/prettyDate";
import { TextIcon } from "@components/base/TextIcon";
import { AddEventButton } from "@components/AddEventButton/AddEventButton";
import { formatMoney } from "@/utils/formatMoney";
import { Modal } from "../base/Modal";

interface EventListProps extends HTMLAttributes<HTMLDivElement> {
  events: EventListResponse["items"];
}

export const EventList = (props: EventListProps) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { events, ...divProps } = props;

  const onEventClick = (event: Event) => {
    setOpenDetail(true);
    setSelectedEvent(event);
  };

  const addEvent = () => {
    console.log("Event add!");
    setOpenCreateEvent(true);
  };
  // TODO: participants empty state

  return (
    <>
      <div {...divProps} className="flex flex-col w-full bg-white">
        <div className="flex flex-row justify-self-center flex-wrap gap-4 px-3 md:pl-24 -mt-8">
          {events.map((event) => (
            <EventCard
              role="button"
              key={event.name} // TODO: change to id
              name={event.name}
              date={event.date}
              totalParticipants={event.totalParticipants}
              totalPrice={event.totalPrice}
              onClick={() => onEventClick(event)}
            />
          ))}
          <AddEventButton onClick={addEvent} />
        </div>
      </div>
      <Sidebar open={openDetail} onClose={() => setOpenDetail(false)}>
        {selectedEvent && (
          <div className="flex flex-col gap-2 mx-2 md:mx-12 p-5 rounded-lg shadow-2xl border-2 bg-white -mt-24">
            <div className="flex md:flex-row flex-col justify-between mb-8">
              <div>
                <div className="text-3xl font-bold">
                  {prettyDate(selectedEvent.date, "pt-br")}
                </div>
                <div className="text-3xl font-bold text-l line-clamp-2">
                  {selectedEvent.name}
                </div>
              </div>
              <div className="flex flex-col">
                <TextIcon
                  text={selectedEvent.totalParticipants}
                  iconName="people"
                  fontSize="3xl"
                  size={[40, 32]}
                />
                <TextIcon
                  text={formatMoney(selectedEvent.totalPrice, "BRL")}
                  iconName="dollarSign"
                  fontSize="3xl"
                  size={40}
                />
              </div>
            </div>
            {selectedEvent.participants.map((person) => (
              <div key={person.name}>
                <ParticipantListItem
                  initialValue={person.isPaid}
                  name={person.name}
                  amountToPay={person.amountToPay}
                />
              </div>
            ))}
          </div>
        )}
      </Sidebar>
      <Modal
        title="Novo Churras"
        open={openCreateEvent}
        onClose={() => setOpenCreateEvent(false)}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            <TextInput label="Nome do Evento:" />
            <DatePickerInput label="Data do evento:" />
            <PriceOptionsInput label="Opções de preço:" />
            <TextAreaInput label="Descrição:" className="w-full md:w-10/12" />
          </div>
          <div className="flex flex-col md:flex-row justify-end md:justify-end gap-3 h-40 md:h-auto p-5 pt-14">
            <Button
              type="secondary"
              label="Cancelar"
              className="w-full md:w-52"
              onClick={() => setOpenCreateEvent(false)}
            />
            <Button type="primary" label="Salvar" className="w-full md:w-52" />
          </div>
        </div>
      </Modal>
    </>
  );
};
