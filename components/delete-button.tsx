"use client";

import { Button } from "./ui/button";
import { deleteButton } from "@/actions";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <Button
      className="w-1/2"
      variant="destructive"
      onClick={() => deleteButton(id)}
    >
      Delete
    </Button>
  );
}
