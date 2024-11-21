import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";
import { pacifico } from "../fonts";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full relative">
        <Image
          src="https://images.unsplash.com/photo-1607749111659-e1c8e05f5f24?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="friends group"
          fill
          className="object-cover"
        />
        <div className="absolute top-0 right-0 w-full h-full bg-black/70 grid place-items-center">
          <div className="w-1/2 text-white">
            <p className={cn(pacifico.className, "text-5xl mb-4")}>Lumeo</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              suscipit illum blanditiis at ipsum veniam corporis nihil
              necessitatibus dolores maiores!
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full grid place-items-center">{children}</div>
    </div>
  );
}
