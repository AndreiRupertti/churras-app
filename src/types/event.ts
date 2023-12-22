export interface Event {
    name: string,
    description?: string,
    date: string,
    totalPrice: number,
    totalParticipants: number
}

export interface EventList {
    items: Event[]
}