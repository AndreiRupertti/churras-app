import { NextResponse } from 'next/server'
import { setTimeout } from 'timers/promises'

export async function GET(request: Request) {
  const eventsResponse = {
    items: [
      { name: 'Niver do Gui', date: '2023-12-21T14:40:35.979Z', totalPrice: 28000  },
      { name: 'Final de Ano', date: '2023-12-21T14:40:35.979Z', totalPrice: 28000 },
      { name: 'Sem Motivo', date: '2023-12-21T14:40:35.979Z', totalPrice: 28000  },
    ]
  }

  await setTimeout(2000)

  return NextResponse.json(eventsResponse)
}
