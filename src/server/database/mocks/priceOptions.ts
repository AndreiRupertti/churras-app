import { randomUUID } from "crypto";
import { events } from "./events";

export const priceOptions = [
  {
    id: randomUUID(),
    eventId: events[0].id,
    amount: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[0].id,
    amount: 10.0,
  },
  {
    id: randomUUID(),
    eventId: events[1].id,
    amount: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[1].id,
    amount: 10.0,
  },
  {
    id: randomUUID(),
    eventId: events[2].id,
    amount: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[2].id,
    amount: 10.0,
  },
  {
    id: randomUUID(),
    eventId: events[3].id,
    amount: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[3].id,
    amount: 10.0,
  },
  {
    id: randomUUID(),
    eventId: events[4].id,
    amount: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[4].id,
    amount: 10.0,
  },
  {
    id: randomUUID(),
    eventId: events[5].id,
    amount: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[5].id,
    amount: 10.0,
  },
  {
    id: randomUUID(),
    eventId: events[6].id,
    amount: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[6].id,
    amount: 10.0,
  },
];
