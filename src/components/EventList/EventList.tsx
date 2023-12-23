"use client";

import { AddEventButton } from "@components/AddEventButton/AddEventButton";
import { Button } from "@components/base/Button";
import { DatePickerInput } from "@components/base/DatePickerInput";
import { Modal } from "@components/base/Modal";
import { PriceOptionsInput } from "@components/base/PriceOptionsInput";
import { Sidebar } from "@components/base/Sidebar";
import { TextAreaInput } from "@components/base/TextAreaInput";
import { TextInput } from "@components/base/TextInput";
import { EventCard } from "@components/EventCard/EventCard";
import { EventDetail } from "@components/EventDetail/EventDetail";
import { HTMLAttributes, useState } from "react";
import { Event, EventListResponse } from "types/event";

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

  const onCloseSideBar = () => {
    setOpenDetail(false);
    setSelectedEvent(null);
  };
  // TODO: participants empty state

  return (
    <>
      <div {...divProps} className="flex flex-col w-full bg-white">
        <div className="flex flex-row justify-self-center flex-wrap gap-4 px-3 md:pl-24 -mt-8">
          {events.map((event) => (
            <EventCard
              role="button"
              key={event.id}
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
      <Sidebar open={openDetail} onClose={onCloseSideBar}>
        {selectedEvent && <EventDetail event={selectedEvent} />}
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
            <PriceOptionsInput label="Opções de preço:" maxOpts="10" />
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
