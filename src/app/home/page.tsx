import '@globals/globals.css'
import 'tailwindcss/tailwind.css'

export default async function Home() {
  const events = await getEvents()
  return (
    <div className="p-5 gap-x-5 gap-y-5 w-full flex flex-row flex-wrap">
      {events.map((event) => (
        <div key={event.name} className="flex-none max-w-sm  w-80 w-lg rounded overflow-hidden shadow-lg">
          <img className="object-cover w-full h-60" src={`${event.imageUrl}`} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl">{event.name}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

const getEvents = async () => {
  return fetch(`${process.env.API_URL}/event/list`)
    .then(res => res.json())
}
