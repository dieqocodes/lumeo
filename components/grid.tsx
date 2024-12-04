"use client";

import Masonry from "react-masonry-css";
import { Posts } from "@prisma/client";
import ProfilePost from "./profile-post";
import RegularPost from "./regular-post";

export default function Grid({
  data,
  isProfile = false,
}: {
  data: Posts[];
  isProfile?: boolean;
}) {
  const breakpointColumnsObj = {
    default: 4,
    3000: 5,
    2000: 4,
    1200: 3,
    1000: 2,
    500: 1,
  };

  return (
    <Masonry className="flex gap-4" breakpointCols={breakpointColumnsObj}>
      {data.map((post) =>
        isProfile ? (
          <ProfilePost {...post} key={post.id} />
        ) : (
          <RegularPost {...post} key={post.id} />
        )
      )}
    </Masonry>
  );
}
