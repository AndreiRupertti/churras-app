"use server";

import { ApiClient } from "@http/api-client";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function revalidateEventList() {
  revalidateTag("event-list");
}

export async function login(loginInfo: { email: string; password: string }) {
  const c = cookies();
  return ApiClient.login(loginInfo).then((response) => {
    c.set("accessToken", response.accessToken);
    redirect("/");
  });
}

export async function logout() {
  const c = cookies();
  c.delete("accessToken");
}
