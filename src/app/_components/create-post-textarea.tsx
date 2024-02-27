"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Loader from "@/app/_components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type AutosizeTextAreaRef, AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import type { RootState } from "@/redux";
import { getUserState } from "@/redux/userSlice";
import type { APIResponse } from "@/utils/interface";

const CreatePostTextArea = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const textAreaRef = React.useRef<AutosizeTextAreaRef>(null);

  const router = useRouter();
  const user = useSelector((store: RootState) => getUserState(store));

  const mutation = api.post.create.useMutation({
    onSuccess: (response: APIResponse) => {
      setTitle("");
      setContent("");
      setIsLoading(false);
      if (textAreaRef.current) textAreaRef.current.textArea.style.height = "55px";

      toast(response.message)
      router.refresh();
    },
    onError: (error) => {
      setIsLoading(false);
      toast(error.message);

      console.log(error);
    },
  });

  const createPost = () => {
    if (title && content) {
      setIsLoading(true);

      mutation.mutate({
        title,
        content,
        userId: user.id,
        userName: user.name,
        userAvatar: user.imageUrl
      });
    } else {
      toast("Please fill out the title and the content.");
    }
  };

  return (
    <div className="flex w-full p-4 rounded-xl border border-gray-200 shadow-lg shadow-gray-100">
      <div className="flex items-start justify-start mr-4">
        <Avatar className="h-6 w-6">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>{user.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-grow flex-col">
        <input
          placeholder="Title of your post"
          className="mb-2 outline-none"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
          disabled={isLoading}
        />

        <AutosizeTextarea
          ref={textAreaRef}
          placeholder="Share your thoughts with the world!"
          className="tracking-wider border-0 border-b border-gray-300 p-0 text-base resize-none rounded-none focus-visible:border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
          disabled={isLoading}
        />

        <div className="flex w-full justify-end">
          <Button className="w-16 h-10 mt-4 rounded-lg text-sm text-white" disabled={isLoading} onClick={createPost}>
            {isLoading ? <Loader /> : "Post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostTextArea;
