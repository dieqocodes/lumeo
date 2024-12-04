"use client";

import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export default function SignIn() {
  return (
    <LoginLink>
      <Button size="sm">Sign In</Button>
    </LoginLink>
  );
}
