import { DataType, newDb } from "pg-mem";
import * as mocks from "./mocks";

export function createConnection() {
  const db = newDb({
    noErrorDiagnostic: true,
  });

  db.public.none(`
      CREATE TABLE "events" (
          "id" uuid NOT NULL,
          "name" varchar(255) NOT NULL,
          "date" varchar(255) NOT NULL,
          "description" varchar(500) NOT NULL,
          "total_price" float NOT NULL,
          CONSTRAINT "pk_event_id" PRIMARY KEY ("id")
      );
    `);

  db.public.none(`
      CREATE TABLE "participants" (
          "id" uuid NOT NULL,
          "name" varchar(255) NOT NULL,
          "event_id" uuid NOT NULL,
          "amount_to_pay" float NOT NULL,
          "is_paid" bool NOT NULL,
          CONSTRAINT "pk_participant_id" PRIMARY KEY ("id")
      );
    `);

  db.public.none(`
      CREATE TABLE "price_options" (
          "id" uuid NOT NULL,
          "event_id" uuid NOT NULL,
          "amount" float NOT NULL,
          CONSTRAINT "pk_price_option_id" PRIMARY KEY ("id")
      );
    `);

  db.public.none(`
      CREATE TABLE "users" (
          "id" uuid NOT NULL,
          "email" varchar(255) NOT NULL,
          "password" varchar(255) NOT NULL,
          CONSTRAINT "pk_user_id" PRIMARY KEY ("id")
      );
    `);

  mocks.events.forEach((event) => {
    db.public.none(`
        insert into events values('${event.id}', '${event.name}', '${event.date}', '${event.description}', ${event.totalPrice});
    `);
  });

  mocks.participants.forEach((p) => {
    db.public.none(`
        insert into participants values('${p.id}', '${p.name}', '${p.eventId}', '${p.amountToPay}', ${p.isPaid});
    `);
  });

  mocks.users.forEach((user) => {
    db.public.none(`
        insert into users values('${user.id}', '${user.email}', '${user.password}');
    `);
  });

  return db.public;
}
let conn: ReturnType<typeof newDb>["public"];

export default () => {
  if (!conn) {
    conn = createConnection();
  }

  return conn;
};
