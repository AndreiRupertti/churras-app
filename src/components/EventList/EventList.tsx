"use client";

import { HTMLAttributes, useState } from "react";
import { EventCard } from "@components/EventCard/EventCard";
import { Sidebar } from "@components/base/Sidebar";
import { ParticipantListItem } from "@components/ParticipantListItem/ParticipantListItem";
import { EventListResponse, Event } from "types/event";

interface EventListProps extends HTMLAttributes<HTMLDivElement> {
  events: EventListResponse["items"];
}

export const EventList = (props: EventListProps) => {
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { events, ...divProps } = props;

  const onEventClick = (event: Event) => {
    setOpenDetail(true);
    setSelectedEvent(event);
  };

  return (
    <>
      <div {...divProps} className="flex flex-col self-center w-11/12">
        <div className="flex flex-row justify-start flex-wrap gap-4 -mt-8">
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
          <div className="flex justify-center items-center p-4 max-w-80 min-w-80 md:w-80 sm:w-full w-lg min-h-40  rounded shadow shadow-blue-500/40  bg-white">
            <div className="text-3x1 font-bold">+</div>
          </div>
        </div>
      </div>
      <Sidebar open={openDetail} onClose={() => setOpenDetail(false)}>
        <div className="flex flex-col gap-2 p-5">
          {selectedEvent &&
            selectedEvent.participants.map((person) => (
              <div key={person.name}>
                <ParticipantListItem
                  initialValue={person.isPaid}
                  name={person.name}
                  amountToPay={person.amountToPay}
                />
              </div>
            ))}
        </div>
      </Sidebar>
    </>
  );
};
