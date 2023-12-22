export interface Event {
  name: string;
  description?: string;
  date: string;
  totalPrice: number;
  totalParticipants: number;
  participants: Participant[]
}

export interface EventListResponse {
  items: Event[];
}

export interface Participant {
  eventId: string;
  name: string;
  isPaid: boolean;
  amountToPay: number;
}
