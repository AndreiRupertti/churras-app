import { randomInt, randomUUID } from "crypto";

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const events = [
  {
    id: randomUUID(),
    name: "Niver do Gui",
    description,
    date: "2024-02-11T14:40:35.979Z",
    totalPrice: 280.0,
    totalParticipants: randomInt(20),
  },
  {
    id: randomUUID(),
    name: "Final de Ano",
    description,
    date: "2024-02-11T14:40:35.979Z",
    totalPrice: 280.0,
    totalParticipants: randomInt(20),
  },
  {
    id: randomUUID(),
    name: "Sem Motivo",
    description,
    date: "2024-02-11T14:40:35.979Z",
    totalPrice: 280.0,
    totalParticipants: randomInt(20),
  },
  {
    id: randomUUID(),
    name: "Sem Motivo 2",
    description,
    date: "2024-02-11T14:40:35.979Z",
    totalPrice: 280.0,
    totalParticipants: randomInt(20),
  },
  {
    id: randomUUID(),
    name: "Sem Motivo 3",
    description,
    date: "2024-02-11T14:40:35.979Z",
    totalPrice: 280.0,
    totalParticipants: randomInt(20),
  },
  {
    id: randomUUID(),
    name: "Sem Motivo 4",
    description,
    date: "2024-02-11T14:40:35.979Z",
    totalPrice: 280.0,
    totalParticipants: randomInt(20),
  },
  {
    id: randomUUID(),
    name: "Super long event name pls dont do this to me mr. event creator =(. Super long event name pls dont do this to me mr. event creator =(",
    description,
    date: "2024-02-11T14:40:35.979Z",
    totalPrice: 280.0,
  },
];

const priceOptions = [
  { id: randomUUID(), eventId: events[0], amount: 20.0 },
  { id: randomUUID(), eventId: events[0], amount: 10.0 },
  { id: randomUUID(), eventId: events[1], amount: 20.0 },
  { id: randomUUID(), eventId: events[1], amount: 10.0 },
  { id: randomUUID(), eventId: events[3], amount: 20.0 },
  { id: randomUUID(), eventId: events[3], amount: 10.0 },
  { id: randomUUID(), eventId: events[4], amount: 20.0 },
  { id: randomUUID(), eventId: events[4], amount: 10.0 },
  { id: randomUUID(), eventId: events[5], amount: 20.0 },
  { id: randomUUID(), eventId: events[5], amount: 10.0 },
  { id: randomUUID(), eventId: events[6], amount: 20.0 },
  { id: randomUUID(), eventId: events[6], amount: 10.0 },
  { id: randomUUID(), eventId: events[7], amount: 20.0 },
  { id: randomUUID(), eventId: events[7], amount: 10.0 },
];

const participants = [
  {
    id: randomUUID(),
    eventId: events[0],
    name: "Jose Algusto",
    isPaid: false,
    amountToPay: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[0],
    name: "Mariana A.",
    isPaid: false,
    amountToPay: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[0],
    name: "Mari B.",
    isPaid: false,
    amountToPay: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[0],
    name: "Isadora",
    isPaid: false,
    amountToPay: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[0],
    name: "Hugo",
    isPaid: false,
    amountToPay: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[0],
    name: "Leco",
    isPaid: false,
    amountToPay: 10.0,
  },
  {
    id: randomUUID(),
    eventId: events[0],
    name: "Hugo",
    isPaid: false,
    amountToPay: 20.0,
  },
  {
    id: randomUUID(),
    eventId: events[0],
    name: "Leco",
    isPaid: false,
    amountToPay: 10.0,
  },
  {
    id: randomUUID(),
    eventId: events[0],
    name: "Hugo",
    isPaid: false,
    amountToPay: 20.0,
  },
];

const getItemsByRepo = (repo: string): { id: string }[] => {
  if (repo === "Events") return events;
  if (repo === "Participants") return participants;
  if (repo === "PriceOptions") return priceOptions;
  return [];
};

const fakeRepo = (repo: "Events" | "Participants" | "PriceOptions") => {
  const items = getItemsByRepo(repo) ?? [];
  return {
    findById(id: string) {
      items.find((i) => i.id === id);
    },
    findAllBy(filter: Record<string, unknown>) {
      items.filter((i) =>
        Object.entries(filter).every(([filterKey, filterValue]) => {
          // @ts-ignore
          i[filterKey] === filterValue;
        })
      );
    },
    findAllBy(filter: Record<string, unknown>) {
      items.filter((i) =>
        Object.entries(filter).every(([filterKey, filterValue]) => {
          // @ts-ignore
          i[filterKey] === filterValue;
        })
      );
    },
  };
};
