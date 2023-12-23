import { randomUUID } from "crypto";
import { ISchema } from "pg-mem";
import { EventInput, Event } from "types/event";
import { camelizeKeys } from "@server/database/parser/camelizeKeys";

export const EventRepository = (db: ISchema) => ({
  insert(event: Partial<EventInput>) {
    const id = randomUUID();
    db.none(`
    insert into events values('${id}', '${event.name}', '${event.date}', '${event.description}', ${event.totalPrice});
    `);

    return camelizeKeys(
      db.one(`select * from events where id='${id}'`)
    ) as unknown as Event;
  },
  findAll() {
    const { rows } = db.query("select * from events");

    return rows.map((item) => camelizeKeys(item)) as unknown as Event[];
  },
});
