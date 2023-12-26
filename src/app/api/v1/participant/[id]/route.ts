import { NextResponse } from "next/server";
import { ParticipantRepository } from "@server/repositories";
import conn from "@server/database/connection";
import z from "zod";
import { auth, unauthorized } from "@server/auth";

const participantInputSchema = z.object({
  isPaid: z.boolean(),
});

export async function PUT(
  req: Request,
  { params }: { params: { id: string; slug: string } }
) {
  const body = await req.json();

  const participantId = params.id ?? params.slug;
  try {
    const db = conn();
    const user = await auth(req, db);
    if (!user) return unauthorized();

    const input = await participantInputSchema.parseAsync(body);

    const participant = await ParticipantRepository(db).update(participantId, {
      is_paid: input.isPaid,
    });

    return NextResponse.json({ ...participant });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string; slug: string } }
) {
  const participantId = params.id ?? params.slug;
  try {
    const db = conn();

    await ParticipantRepository(db).delete(participantId);

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
