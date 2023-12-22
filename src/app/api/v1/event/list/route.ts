import { randomInt } from 'crypto'
import { NextResponse } from 'next/server'
import { setTimeout } from 'timers/promises'

export async function GET() {

  const eventsResponse = {
    items: [
      { name: 'Niver do Gui', date: '2023-12-21T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { name: 'Final de Ano', date: '2023-12-21T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20) },
      { name: 'Sem Motivo', date: '2023-12-21T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { name: 'Sem Motivo 2', date: '2023-12-21T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { name: 'Sem Motivo 3', date: '2023-12-21T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { name: 'Sem Motivo 4', date: '2023-12-21T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { name: 'Sem Motivo 5', date: '2023-12-21T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
      { name: 'Sem Motivo 6', date: '2023-12-21T14:40:35.979Z', totalPrice: 280.00, totalParticipants: randomInt(20)  },
    ]
  }

  await setTimeout(2000)

  return NextResponse.json(eventsResponse)
}
