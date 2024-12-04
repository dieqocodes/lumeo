"use client";

import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export default function SignOut() {
  return (
    <LogoutLink>
      <Button size="sm" variant="destructive">
        Sign Out
      </Button>
    </LogoutLink>
  );
}
