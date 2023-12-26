import { Header } from "@components/base/Header";
import { Footer } from "@components/base/Footer";
import { EventList } from "@components/EventList/EventList";
import "@globals/globals.css";
import "tailwindcss/tailwind.css";
import { EventListResponse } from "types/event";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiClient } from "@http/api-client";
import { Pages } from "@enums/pages";
import { isAuthenticated } from "@server/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda do Churras",
  icons: {
    icon: "/bbq.svg",
  },
};

export default async function Home() {
  const { items: events = [] } = await getEvents();

  if (!isAuthenticated()) {
    redirect(Pages.LOGIN);
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
  const { value: token } = cookies().get("accessToken") ?? {};
  const fallback = { items: [] };
  const reqConfig = {
    next: { revalidate: 0, tags: ["event-list"] },
    headers: { authorization: token! },
  };
  return ApiClient.getEvents(reqConfig).catch((e) => {
    console.log(e);
    return Promise.resolve(fallback);
  });
};
