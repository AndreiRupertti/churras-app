import { render, screen } from "@testing-library/react";
import { randomUUID } from "crypto";
import * as fns from "date-fns";
import { Event } from "types/event";
import { EventCard } from "./EventCard";

describe("Event Card", () => {
  const event = {
    id: randomUUID(),
    name: "Jogo do Grêmio",
    description: "Description",
    date: "2024-05-07T14:40:35.979Z",
    totalPrice: 280.0,
    totalParticipants: 2,
  };

  const setup = (eventOverrride: Partial<Event> = {}) => {
    return render(<EventCard {...event} {...eventOverrride} />);
  };

  test("displays event info", async () => {
    setup();

    expect(await screen.findByText(event.name)).toBeVisible();
    expect(await screen.findByText(event.totalParticipants)).toBeVisible();
    expect(await screen.findByText("R$ 280,00")).toBeVisible();
    expect(await screen.queryByText("Finalizado")).toBe(null);
  });

  test("displays badge when event is over", async () => {
    const eventDate = fns.subDays(new Date(), 2);
    setup({ date: eventDate.toISOString() });

    expect(await screen.findByText("Finalizado")).toBeVisible();
  });
});
