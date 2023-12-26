"use client";

import { Button } from "@components/base/Button";
import * as actions from "@app/actions";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();
  const logout = () => {
    actions.logout();
    router.refresh();
  };
  return (
    <Button
      label="Logout"
      decoration="text"
      className="absolute left-1 top-1 underline underline-offset-2"
      onClick={logout}
    />
  );
};
