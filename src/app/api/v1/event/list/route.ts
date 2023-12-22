import { randomInt } from 'crypto'
import { NextResponse } from 'next/server'
import { setTimeout } from 'timers/promises'

export async function GET() {

  const participants = [
    { eventId: '111', name: 'Jose Algusto', isPaid: false, amountToPay: 20.00 },
    { eventId: '111', name: 'Mariana A.', isPaid: false, amountToPay: 20.00 },
    { eventId: '111', name: 'Mari B.', isPaid: false, amountToPay: 20.00 },
    { eventId: '111', name: 'Isadora', isPaid: false, amountToPay: 20.00 },
    { eventId: '111', name: 'Hugo', isPaid: false, amountToPay: 20.00 },
    { eventId: '111', name: 'Leco', isPaid: false, amountToPay: 10.00 },
  ]

  const eventsResponse = {
    items: [
      { id: '111', name: 'Niver do Gui', date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { id: '222', name: 'Final de Ano', date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20) },
      { id: '333', name: 'Sem Motivo', date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { id: '444', name: 'Sem Motivo 2', date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { id: '555', name: 'Sem Motivo 3', date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { id: '666', name: 'Sem Motivo 4', date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { id: '777', name: 'Super long event name pls dont do this to me mr. event creator =(. Super long event name pls dont do this to me mr. event creator =(', date: '2024-02-11T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { id: '888', name: 'Sem Motivo 5', date: '2023-12-21T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
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
