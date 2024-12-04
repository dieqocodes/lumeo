import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { pacifico } from "@/app/fonts";
import SignOut from "./sign-out";
import SignIn from "./sign-in";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Nav() {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();

  return (
    <div className="w-full h-16 sticky z-50 bg-white border-b">
      <MaxWidthWrapper className="h-full flex justify-between items-center">
        <Link href="/">
          <p className={cn(pacifico.className, "text-3xl")}>Lumeo</p>
        </Link>
        <nav className="flex items-center gap-8">
          {auth && (
            <>
              {NAV_LINKS.map((i) => (
                <Link href={i.href} key={i.id}>
                  <p>{i.label}</p>
                </Link>
              ))}
              <SignOut />
            </>
          )}
          {!auth && (
            <>
              <Link href="/">
                <p>Home</p>
              </Link>
              <SignIn />
            </>
          )}
        </nav>
      </MaxWidthWrapper>
    </div>
  );
}
