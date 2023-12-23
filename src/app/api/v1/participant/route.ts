import { NextResponse } from "next/server";
import { ParticipantRepository } from "@server/repositories";
import conn from "@server/database/connection";
import z from "zod";

const participantInputSchema = z.object({
  name: z.string().min(1).max(100),
  amountToPay: z.number().positive(),
  eventId: z.string().uuid(),
});

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  try {
    const db = conn();
    const event = await participantInputSchema.parseAsync(body);

    const participant = await ParticipantRepository(db).insert(event);

    return NextResponse.json({ ...participant });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ ...err }, { status: 400 });
  }
}
