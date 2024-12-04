import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Posts } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteButton from "./delete-button";

export default function ProfilePost(props: Posts) {
  return (
    <Dialog>
      <DialogTrigger>
        <img src={props.imageUrl} alt="post image" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
        </DialogHeader>
        <div className="w-full flex gap-4">
          <Link href={`/i/${props.id}`} className="w-1/2">
            <Button className="w-full">View</Button>
          </Link>
          <DeleteButton id={props.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
