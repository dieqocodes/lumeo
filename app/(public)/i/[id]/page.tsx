import CommentForm from "@/components/comment-form";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import db from "@/db";
import moment from "moment";
import Link from "next/link";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await db.posts.findUnique({
    where: {
      id,
    },
    include: {
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      },
    },
  });

  const postId = data?.id;
  return (
    <MaxWidthWrapper className="flex gap-4 py-10">
      <div className="w-1/2 h-[85vh] grid place-items-center">
        <img
          src={data?.imageUrl}
          alt="post image"
          className="h-[80vh] object-contain"
        />
      </div>
      <div className="w-1/2 h-[85vh]">
        <div className="w-full h-[80vh] flex flex-col justify-between">
          <div className="w-4/5 mx-auto flex flex-col gap-4 h-full py-4 overflow-y-scroll no-scrollbar">
            {data?.comments.map((comment) => (
              <div key={comment.id} className="w-full flex flex-col gap-4">
                <div className="w-full flex justify-between">
                  <Link href={`/u/${comment.userId}`}>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={comment.user.imageUrl!}
                          alt={comment.user.name}
                        />
                        <AvatarFallback>
                          {comment.user.name.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-[600]">{comment.user.name}</p>
                    </div>
                  </Link>
                  <p className="text-muted-foreground text-xs">
                    {moment(comment.createdAt).fromNow()}
                  </p>
                </div>
                <p>{comment.content}</p>
                <Separator />
              </div>
            ))}
          </div>
          <CommentForm postId={postId!} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
