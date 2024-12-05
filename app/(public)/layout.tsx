import Nav from "@/components/nav";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
