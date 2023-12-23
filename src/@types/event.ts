export interface Event {
  id: string;
  name: string;
  description?: string;
  date: string;
  totalPrice: number;
  totalParticipants: number;
  participants: Participant[]
  priceOptions: number[]
}

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
}
