import { EventCard } from "@components/EventCard/EventCard";
import "@globals/globals.css";
import { EventList } from "@types/event";
import "tailwindcss/tailwind.css";

export default async function Home() {
  const { items: events = [] } = await getEvents();

  // TODO: empty state

  return (
    <div className="p-5 w-full flex flex-row flex-wrap basis-full justify-center bg-yellow-500">
      <div className="flex flex-col justify-center w-full">
        <div className="flex h-40 justify-center items-center bg-red-500">
          <h1 className="text-3xl font-extrabold">Agenda de Churras</h1>
        </div>
        <div className="flex flex-col self-center w-11/12 bg-blue-500">
          <div className="flex flex-row justify-start flex-wrap gap-4 -mt-4">
            {events.map((event) => (
              <EventCard
                key={event.name} // TODO: change to id
                name={event.name}
                date={event.date}
                totalParticipants={event.totalParticipants}
                totalPrice={event.totalPrice}
              />
            ))}
            <div className="flex justify-center items-center p-4 max-w-80 min-w-80 md:w-80 sm:w-full w-lg min-h-40  rounded shadow-lg  bg-white">
              <p className="text-3x1 font-bold">+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getEvents = async (): Promise<EventList> => {
  return fetch(`${process.env.API_URL}/event/list`).then((res) => res.json());
};
