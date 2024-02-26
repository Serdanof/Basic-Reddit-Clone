"use client";

import { unstable_noStore as noStore } from "next/cache";
import React from "react";
import { useDispatch } from "react-redux";
import { useClerk } from "@clerk/clerk-react";
import Sidebar from "@/app/_components/sidebar";
import type { AppDispatch } from "@/redux";
import { addUser } from "@/redux/userSlice";

export default function Home() {
  noStore();

  const { user } = useClerk();
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    if (user) {
      dispatch(addUser({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        imageUrl: user.imageUrl
      }));
    }
  }, [dispatch, user]);

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Sidebar />
    </main>
  );
}
