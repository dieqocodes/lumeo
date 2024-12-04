"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/db";
import { revalidatePath } from "next/cache";

export async function getAuthStatus() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user.id || !user.email) {
    throw new Error("Invalid user data");
  }

  const userExists = await db.users.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!userExists) {
    const data = await db.users.create({
      data: {
        id: user.id,
        name: user.given_name!,
        imageUrl: user.picture!,
      },
    });
  }

  return { success: true };
}

export async function createComment(payload: {
  postId: string;
  content: string;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user.id || !user.email) {
    throw new Error("Invalid user data");
  }

  const data = await db.comments.create({
    data: {
      userId: user.id,
      postId: payload.postId,
      content: payload.content,
    },
  });

  revalidatePath("/i/[id]");

  return { success: true };
}

export async function deleteButton(id: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user.id || !user.email) {
    throw new Error("Invalid user data");
  }

  const data = await db.posts.delete({
    where: {
      id: id,
      userId: user.id,
    },
  });

  revalidatePath("/profile");

  return { success: true };
}

export async function createPost(payload: { imageUrl: string }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user.id || !user.email) {
    throw new Error("Invalid user data");
  }

  const data = await db.posts.create({
    data: {
      imageUrl: payload.imageUrl,
      userId: user.id,
    },
  });

  return { success: true };
}
