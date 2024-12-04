"use client";

import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getAuthStatus } from "@/actions";

export default function AuthCallback() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    router.push("/");
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
}
