"use client";

import { AddEventButton } from "@components/AddEventButton/AddEventButton";
import { Modal } from "@components/base/Modal";
import { Sidebar } from "@components/base/Sidebar";
import { EventCard } from "@components/EventCard/EventCard";
import { EventDetail } from "@components/EventDetail/EventDetail";
import { EventForm } from "@components/EventForm/EventForm";
import { HTMLAttributes, useState } from "react";
import { Event, EventInput, EventListResponse } from "types/event";
import { revalidateEventList } from "@app/actions";

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
    setOpenCreateEvent(true);
  };

  const onCloseSideBar = () => {
    setOpenDetail(false);
    setSelectedEvent(null);
  };

  const onSaveEvent = (submitInfo: EventInput) => {
    fetch("http://localhost:3000/api/v1/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitInfo),
    })
      .then((res) => {
        console.log(res);
        if (res.status > 200 && res.status < 400) {
          setOpenCreateEvent(false);
          revalidateEventList();
        } else {
          alert(
            "Erro ao criar o event. Preencha todos os campos e tente novamente!"
          );
        }
      })
      .catch((err) => {});
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
        <EventForm
          onSubmit={onSaveEvent}
          onCancel={() => setOpenCreateEvent(false)}
        />
      </Modal>
    </>
  );
};
