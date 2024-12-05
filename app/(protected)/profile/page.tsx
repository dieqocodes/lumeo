import MaxWidthWrapper from "@/components/max-width-wrapper";
import db from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Separator } from "@/components/ui/separator";
import Grid from "@/components/grid";

export default async function Profile() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user.id || !user.email) {
    throw new Error("Invalid user data");
  }

  const data = await db.users.findUnique({
    where: {
      id: user.id,
    },
    include: {
      posts: true,
    },
  });

  const posts = data?.posts;
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
      <Grid data={posts!} isProfile />
    </MaxWidthWrapper>
  );
}
