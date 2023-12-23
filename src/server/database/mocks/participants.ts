import { randomUUID } from "crypto";
import { events } from "./events";
import faker from "@fakerjs/faker";
const f = faker();

export const participants = [
  {
    id: randomUUID(),
    eventId: events[0].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[0].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[1].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[1].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[2].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[2].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[3].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[3].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[4].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[4].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[5].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[5].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[6].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
  {
    id: randomUUID(),
    eventId: events[6].id,
    name: f.firstName(),
    amountToPay: 20.0,
    isPaid: false,
  },
];
