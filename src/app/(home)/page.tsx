import { Header } from "@components/base/Header";
import { Footer } from "@components/base/Footer";
import { EventList } from "@components/EventList/EventList";
import "@globals/globals.css";
import "tailwindcss/tailwind.css";
import { EventListResponse } from "types/event";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const { items: events = [] } = await getEvents();

  if (!cookies().has("accessToken")) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col h-full">
      <Header text="Agenda de Churras" />
      <EventList events={events} />
      <Footer />
    </div>
  );
}

const getEvents = async (): Promise<EventListResponse> => {
  return fetch(`${process.env.API_URL}/event/list`, {
    next: { revalidate: 0, tags: ["event-list"] },
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
      return Promise.resolve({ items: [] });
    });
};
