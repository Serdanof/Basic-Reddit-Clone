"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { useClerk } from "@clerk/clerk-react";
import type { AppDispatch } from "@/redux";
import { addUser } from "@/redux/userSlice";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useClerk();
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    if (user?.id) {
      dispatch(
        addUser({
          id: user.id,
          name: user.fullName ?? "",
          email: user.emailAddresses[0]?.emailAddress ?? "",
          imageUrl: user.imageUrl,
        }),
      );
    }
  }, [dispatch, user]);

  return <div>{children}</div>;
}
