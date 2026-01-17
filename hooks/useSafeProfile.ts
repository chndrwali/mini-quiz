"use client";

import { useProfileStore } from "@/store/profile.store";
import { UserProfile } from "@/types/profile";

export const useSafeProfile = (): UserProfile => {
  const profile = useProfileStore((state) => state.profile);

  if (!profile) {
    return {
      name: "Guest",
      email: "Guest@gmail.com",
      id: "",
      role: "user",
      updated_at: "",
      created_at: "",
      is_verified: false,
    };
  }

  return profile;
};
