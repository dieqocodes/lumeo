import { ReactNode } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Nav from "@/components/nav";

export default async function Layout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();

  if (!auth) redirect("/api/auth/login");
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
