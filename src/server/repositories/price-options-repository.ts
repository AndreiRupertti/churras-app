import { randomUUID } from "crypto";
import { ISchema } from "pg-mem";
import { PriceOption, PriceOptionInput } from "types/event";
import { camelizeKeys } from "@server/database/parser/camelizeKeys";

export const PriceOptionsRepository = (db: ISchema) => ({
  insert(priceOption: PriceOptionInput) {
    const id = randomUUID();
    db.none(`
        insert into price_options values('${id}', '${priceOption.eventId}', ${priceOption.amount});
    `);

    return camelizeKeys(
      db.one(`select * from price_options where id='${id}'`)
    ) as unknown as PriceOption;
  },
  findByEvent(eventId: string) {
    const { rows } = db.query(
      `select * from price_options where event_id='${eventId}'`
    );

    return rows.map((item) => camelizeKeys(item)) as unknown as PriceOption[];
  },
});
