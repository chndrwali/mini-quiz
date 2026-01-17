"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useProfileStore } from "@/store/profile.store";
import { ProfileForm } from "./profileForm";
import { useSafeProfile } from "@/hooks/useSafeProfile";
import { ModalCustom } from "../responsiveModal";
import { ChangePasswordForm } from "./changePasswordForm";
import { LoaderFive } from "../ui/loader";
import { toast } from "sonner";

export const ProfileAccount = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { loading, fetchProfile } = useProfileStore();
  const profile = useSafeProfile();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleProfileUpdateSuccess = () => {
    setOpenEdit(false);
    toast.success("Profil berhasil diperbarui", { position: "top-center" });
  };

  const handlePasswordChangeSuccess = () => {
    setOpenPassword(false);
    toast.success("Password berhasil diubah", { position: "top-center" });
  };

  if (loading || !profile) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <LoaderFive text="Loading profile" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Profil Akun</h1>

      <Card className="p-4 sm:p-6 ">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Nama</p>
            <p className="text-lg font-semibold">{profile.name}</p>
          </div>

          <span className="px-2 py-1 text-sm rounded-full bg-muted text-muted-foreground">
            {profile.role.toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Email</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{profile.email}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium
        ${
          profile.is_verified
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
              >
                {profile.is_verified
                  ? "Email Terverifikasi"
                  : "Belum Verifikasi"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div>
            <p>Bergabung sejak</p>
            <p className="font-medium text-foreground">
              {profile.created_at
                ? new Date(profile.created_at).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>
            <p>Terakhir diperbarui</p>
            <p className="font-medium text-foreground">
              {profile.updated_at
                ? new Date(profile.updated_at).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col">
          <Button onClick={() => setOpenEdit(true)}>Ubah Profil</Button>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => setOpenPassword(true)}
          >
            Ubah Password
          </Button>
        </div>
      </Card>

      <ModalCustom
        title="Ubah Profil"
        open={openEdit}
        onOpenChange={setOpenEdit}
      >
        <ProfileForm onSuccess={handleProfileUpdateSuccess} />
      </ModalCustom>

      <ModalCustom
        title="Ubah Password"
        open={openPassword}
        onOpenChange={setOpenPassword}
      >
        <ChangePasswordForm onSuccess={handlePasswordChangeSuccess} />
      </ModalCustom>
    </div>
  );
};
