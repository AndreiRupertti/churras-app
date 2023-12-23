import { randomInt, randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { setTimeout } from 'timers/promises'

export async function GET() {

  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  const participants = [
    { id: randomUUID(), eventId: '111', name: 'Jose Algusto', isPaid: false, amountToPay: 20.00 },
    { id: randomUUID(), eventId: '111', name: 'Mariana A.', isPaid: false, amountToPay: 20.00 },
    { id: randomUUID(), eventId: '111', name: 'Mari B.', isPaid: false, amountToPay: 20.00 },
    { id: randomUUID(), eventId: '111', name: 'Isadora', isPaid: false, amountToPay: 20.00 },
    { id: randomUUID(), eventId: '111', name: 'Hugo', isPaid: false, amountToPay: 20.00 },
    { id: randomUUID(), eventId: '111', name: 'Leco', isPaid: false, amountToPay: 10.00 },
    { id: randomUUID(), eventId: '111', name: 'Hugo', isPaid: false, amountToPay: 20.00 },
    { id: randomUUID(), eventId: '111', name: 'Leco', isPaid: false, amountToPay: 10.00 },
    { id: randomUUID(), eventId: '111', name: 'Hugo', isPaid: false, amountToPay: 20.00 },
  ]

  const eventsResponse = {
    items: [
      { id: '111', name: 'Niver do Gui', description, date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20), priceOptions: [20.00, 10.00]   },
      { id: '222', name: 'Final de Ano', description,  date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20), priceOptions: [20.00, 10.00] },
      { id: '333', name: 'Sem Motivo', description,  date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20), priceOptions: [20.00, 10.00]  },
      { id: '444', name: 'Sem Motivo 2', description,  date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20), priceOptions: [20.00, 10.00]  },
      { id: '555', name: 'Sem Motivo 3', description,  date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20), priceOptions: [20.00, 10.00]  },
      { id: '666', name: 'Sem Motivo 4', description,  date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20), priceOptions: [20.00, 10.00]  },
      { id: '777', name: 'Super long event name pls dont do this to me mr. event creator =(. Super long event name pls dont do this to me mr. event creator =(',  description, date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20), priceOptions: [20.00, 10.00]  },
      { id: '888', name: 'Sem Motivo 5',  description, date: '2023-12-21T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20), priceOptions: [20.00, 10.00]  },
    ]
  }

  eventsResponse.items = eventsResponse.items.map(event => {
    const participantsPerEvent = participants.filter((part) => part.eventId === event.id)
    return {
      ...event,
      participants: participantsPerEvent,
      totalParticipants: participantsPerEvent.length
    }
  })

  await setTimeout(500) // fake delay

  return NextResponse.json(eventsResponse)
}
