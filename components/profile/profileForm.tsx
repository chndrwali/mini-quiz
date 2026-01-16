"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useSafeProfile } from "@/hooks/useSafeProfile";
import { useProfileStore } from "@/store/profile.store";

interface ProfileFormProps {
  onSuccess?: () => void;
}

export const ProfileForm = ({ onSuccess }: ProfileFormProps) => {
  const profile = useSafeProfile();

  const { updateProfile, updating } = useProfileStore();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await updateProfile({
      name,
      email,
    });

    if (success && onSuccess) {
      setName("");
      setEmail("");
      onSuccess();
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label>Nama</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={updating}
        />
      </div>

      <div className="space-y-1">
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={updating}
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={updating}>
          {updating ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
};
