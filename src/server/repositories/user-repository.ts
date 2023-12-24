import { randomUUID } from "crypto";
import { ISchema } from "pg-mem";
import { User } from "types/event";
import { camelizeKeys } from "@server/database/parser/camelizeKeys";

export const UserRepository = (db: ISchema) => ({
  insert(user: Omit<User, "id">) {
    const id = randomUUID();
    db.none(`
        insert into users values('${id}', '${user.email}', '${user.password}');
    `);

    return camelizeKeys(
      db.one(`select * from users where id='${id}'`)
    ) as unknown as Event;
  },
  findOne(filter: Omit<User, "id">) {
    const item = db.one(
      `select * from users where email='${filter.email}' and password='${filter.password}'`
    );

    if (!item) return item;
    return camelizeKeys(item) as unknown as User[];
  },
});
