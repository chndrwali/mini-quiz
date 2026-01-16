"use client";

import { useProfileStore } from "@/store/profile.store";
import { UserProfile } from "@/types/profile";

const EMPTY_PROFILE: UserProfile = {
  name: "",
  email: "",
  id: "",
  role: "user",
  updated_at: "",
  created_at: "",
  is_verified: false,
};
export const useSafeProfile = (): UserProfile => {
  const profile = useProfileStore((state) => state.profile);

  return profile ?? EMPTY_PROFILE;
};
