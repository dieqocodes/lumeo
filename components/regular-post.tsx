import { Posts } from "@prisma/client";
import Link from "next/link";

export default function RegularPost(props: Posts) {
  return (
    <Link href={`/i/${props.id}`}>
      <img src={props.imageUrl} alt="post image" className="mb-4" />
    </Link>
  );
}
