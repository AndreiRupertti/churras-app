import { randomUUID } from "crypto";
import { ISchema } from "pg-mem";
import { ParticipantInput, Participant } from "types/event";
import { camelizeKeys } from "@server/database/parser/camelizeKeys";

export const ParticipantRepository = (db: ISchema) => ({
  insert(participant: ParticipantInput) {
    const id = randomUUID();
    db.none(`
          insert into participants values('${id}', '${participant.name}', '${
            participant.eventId
          }', '${participant.amountToPay}', ${participant.isPaid ?? false});
      `);

    return camelizeKeys(
      db.one(`select * from participants where id='${id}'`)
    ) as unknown as Participant;
  },
  update(id: string, participant: { is_paid: boolean }) {
    db.none(`
          UPDATE participants SET is_paid=${participant.is_paid} WHERE id='${id}'
      `);

    return camelizeKeys(
      db.one(`select * from participants where id='${id}'`)
    ) as unknown as Participant;
  },
  findByEvent(eventId: string) {
    const { rows } = db.query(
      `select * from participants where event_id='${eventId}'`
    );

    return rows.map((item) => camelizeKeys(item)) as unknown as Participant[];
  },
});
