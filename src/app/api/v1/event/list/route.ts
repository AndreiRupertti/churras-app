import conn from "@server/database/connection";
import {
  EventRepository,
  PriceOptionsRepository,
  ParticipantRepository,
} from "@server/repositories";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = conn();
  const events = EventRepository(db).findAll();

  const participantRepo = ParticipantRepository(db);
  const priceOptionsRepo = PriceOptionsRepository(db);

  const items = events.map((event) => {
    const participants = participantRepo.findByEvent(event.id);
    const priceOptions = priceOptionsRepo.findByEvent(event.id);

    return {
      ...event,
      participants,
      totalParticipants: participants.length,
      priceOptions: priceOptions.map((option) => option.amount),
    };
  });
  return NextResponse.json({ items });
}
