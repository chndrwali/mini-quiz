import { create } from "zustand";
import type { UserProfile } from "@/types/profile";

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  updating: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (payload: { name: string; email: string }) => Promise<boolean>;
  clearProfile: () => void;
}

interface ChangePasswordState {
  loading: boolean;
  error: string | null;
  success: boolean;

  changePassword: (payload: {
    old_password: string;
    new_password: string;
  }) => Promise<boolean>;

  resetState: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: true,
  updating: false,
  error: null,

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");

      if (!token) {
        set({
          error: "Token tidak ditemukan.",
          loading: false,
        });
        return;
      }

      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (!res.ok) throw new Error();

      set({
        profile: json.data,
        loading: false,
      });
    } catch {
      set({
        error: "Gagal memuat profil.",
        loading: false,
      });
    }
  },

  updateProfile: async ({ name, email }) => {
    try {
      set({ updating: true, error: null });

      const token = localStorage.getItem("access_token");
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error();

      set((state) => ({
        profile: state.profile
          ? {
              ...state.profile,
              name,
              email,
              updated_at: new Date().toISOString(),
            }
          : state.profile,
        updating: false,
      }));

      return true;
    } catch {
      set({ updating: false, error: "Gagal update profile" });
      return false;
    }
  },

  clearProfile: () =>
    set({
      profile: null,
      loading: true,
      error: null,
    }),
}));

export const useChangePasswordStore = create<ChangePasswordState>((set) => ({
  loading: false,
  error: null,
  success: false,

  changePassword: async ({ old_password, new_password }) => {
    try {
      set({ loading: true, error: null, success: false });

      const token = localStorage.getItem("access_token");

      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ old_password, new_password }),
      });

      if (!res.ok) throw new Error();

      set({ loading: false, success: true });
      return true;
    } catch {
      set({
        loading: false,
        error: "Password lama salah atau password baru tidak valid.",
      });
      return false;
    }
  },

  resetState: () => {
    set({ loading: false, error: null, success: false });
  },
}));
