import React from "react";
import { currentUser } from "@clerk/nextjs";

import CreatePostTextArea from "@/app/_components/create-post-textarea";
import PostList from "@/app/_components/post-list";
import { api } from "@/trpc/server";
import type { Post } from "@/utils/interface";

export default async function MyPostsPage() {
  const user = await currentUser();
  const postList: Post[] = (await api.post.get.query()).result;

  return (
    <div className="flex w-full flex-col px-4 py-10 md:w-[600px] md:px-0">
      {user && <CreatePostTextArea />}

      {
        postList && postList.length > 0 ?
          postList
            .filter((post: Post) => post.userId === user?.id)
            .map((post: Post) => <PostList key={post.id} data={post} />) : (
            <p className="w-full p-10 text-center text-gray-400">No articles posted</p>
          )
      }
    </div>
  );
}
