import '@globals/globals.css'
import 'tailwindcss/tailwind.css'
import { EventList } from '@types/event'
import { GetServerSideProps, GetStaticProps } from 'next'
import { AppInitialProps } from 'next/app'
import { split } from 'postcss/lib/list'

const prettyDate = (dateString?: string) => {
  if (!dateString) return 'Sem Data'

  const date = new Date(dateString)
  return date.toLocaleDateString('pt-br', { month: '2-digit', day: '2-digit' })
}

const formatMoney = (value: number, currency: string) => {
  const locale = 'pt-br'
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency,
  });
  return formatter.format(value)
}

export default async function Home() {
  const { items: events } = await getEvents()

  return (
    <div className="p-5 w-full flex flex-row flex-wrap basis-full justify-center bg-yellow-500">
      <div className='flex flex-col justify-content-center w-full
      '>
        <div className='flex h-40 justify-center items-center bg-red-500'>
          <h1 className="text-3xl font-extrabold">Agenda de Churras</h1>
        </div>
        <div className='flex flex-row justify-center flex-wrap gap-4 -mt-4'>
          {events.map((event) => (
            <div key={event.name} className="flex flex-col grow p-4 max-w-80 min-w-80 md:w-80 sm:w-full w-lg min-h-40 justify-between rounded shadow-lg  bg-white">
              <div>
                <div className="text-2xl font-bold text-xl">{prettyDate(event.date)}</div>
                <div className="text-xl font-bold text-l">{event.name}</div>
              </div>
              <div className='flex flex-row justify-between self-end w-full'>
                <p className='text-xl'>👥{event.totalParticipants}</p>
                <p className='text-xl'>💲{formatMoney(event.totalPrice, 'BRL')}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center p-4 max-w-80 min-w-80 md:w-80 sm:w-full w-lg min-h-40  rounded shadow-lg  bg-white">
            <p className='text-3x1 font-bold'>+</p>
          </div>
        </div>

      </div>
    </div>
  )
}

const getEvents = async (): Promise<EventList> => {
  return fetch(`${process.env.API_URL}/event/list`)
    .then(res => res.json())
}
