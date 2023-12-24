export interface Event {
  id: string;
  name: string;
  description?: string;
  date: string;
  totalPrice: number;
  totalParticipants: number;
  participants: Participant[];
  priceOptions: number[];
}

export type EventInput = Omit<
  Event,
  "id" | "participants" | "priceOptions" | "totalParticipants"
>;

export interface EventListResponse {
  items: Event[];
}

export interface Participant {
  id: string;
  eventId: string;
  name: string;
  isPaid: boolean;
  amountToPay: number;
}

export interface ParticipantInput {
  name: string;
  amountToPay: number;
  eventId: string;
  isPaid?: boolean;
}

export interface PriceOption {
  id: string;
  eventId: string;
  amount: number;
}
export type PriceOptionInput = Omit<PriceOption, "id">;

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}
