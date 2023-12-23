import { NextResponse } from "next/server";
import { EventRepository, PriceOptionsRepository } from "@server/repositories";
import conn from "@server/database/connection";
import z from "zod";

const eventInputSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  priceOptions: z.array(z.number()).nonempty(),
  totalPrice: z.number().positive(),
  date: z.string(),
});

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  try {
    const db = conn();
    const event = await eventInputSchema.parseAsync(body);

    const insertedEvent = await EventRepository(db).insert(event);

    const priceOptions = await event.priceOptions.map(async (option) => {
      const priceOption = await PriceOptionsRepository(db).insert({
        eventId: insertedEvent.id,
        amount: option,
      });
      return priceOption.amount;
    });

    return NextResponse.json({ ...insertedEvent, priceOptions });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ ...err }, { status: 400 });
  }
}
