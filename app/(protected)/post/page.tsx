import PostForm from "@/components/post-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Post() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user.id || !user.email) {
    throw new Error("Invalid user data");
  }

  return <PostForm />;
}
