import { Header } from "@components/base/Header";
import { EventList } from "@components/EventList/EventList";
import "@globals/globals.css";
import "tailwindcss/tailwind.css";
import { EventListResponse } from "types/event";

export default async function Home() {
  const { items: events = [] } = await getEvents();

  return (
    <div className="w-full flex flex-row flex-wrap justify-center bg-yellow-300">
      <div className="flex flex-col justify-center w-full">
        <Header text="Agenda de Churras" />
        <EventList events={events} />
      </div>
    </div>
  );
}

const getEvents = async (): Promise<EventListResponse> => {
  return fetch(`${process.env.API_URL}/event/list`, {
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
      return Promise.resolve({ items: [] });
    });
};
