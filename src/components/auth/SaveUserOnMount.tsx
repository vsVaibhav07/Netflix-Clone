"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

export default function SaveUserOnMount() {
  const { user } = useUser();

  React.useEffect(() => {
    if (user) {
      fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        }),
      });
    }
  }, [user]);

  return null;
}
