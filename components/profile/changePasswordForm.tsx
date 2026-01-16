"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useChangePasswordStore } from "@/store/profile.store";

export const ChangePasswordForm = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const { changePassword, loading, error, resetState } =
    useChangePasswordStore();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Konfirmasi password tidak sama.");
      return;
    }

    const ok = await changePassword({
      old_password: oldPassword,
      new_password: newPassword,
    });

    if (ok) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onSuccess?.();
      resetState();
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label>Password Lama</Label>
        <Input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="space-y-1">
        <Label>Password Baru</Label>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="space-y-1">
        <Label>Konfirmasi Password Baru</Label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Ubah Password"}
        </Button>
      </div>
    </form>
  );
};
