import Grid from "@/components/grid";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import db from "@/db";

export default async function Home() {
  const data = await db.posts.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <MaxWidthWrapper className="py-10">
      <Grid data={data} />
    </MaxWidthWrapper>
  );
}
