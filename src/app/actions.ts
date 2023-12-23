"use server";

import { revalidateTag } from "next/cache";

export async function revalidateEventList() {
  revalidateTag("event-list");
}
