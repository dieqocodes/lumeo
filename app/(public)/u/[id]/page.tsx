import MaxWidthWrapper from "@/components/max-width-wrapper";
import db from "@/db";
import { Separator } from "@/components/ui/separator";
import Grid from "@/components/grid";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await db.users.findUnique({
    where: {
      id,
    },
    include: {
      posts: true,
    },
  });

  return (
    <MaxWidthWrapper className="py-10 flex flex-col gap-4">
      <div className="w-full h-[20vh] flex jsutify-start items-center gap-2">
        <img
          src={data?.imageUrl}
          alt="avatar"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <p className="text-2xl font-[600]">{data?.name}</p>
        </div>
      </div>
      <Separator />
      <Grid data={data?.posts!} />
    </MaxWidthWrapper>
  );
}
