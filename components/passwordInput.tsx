"use client";

import { useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn, getPasswordStrength } from "@/lib/utils";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showToggle?: boolean;
  showStrength?: boolean;
}

export const PasswordInput = ({
  className,
  showToggle = true,
  showStrength = false,
  value = "",
  onChange,
  ...props
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const strength =
    showStrength && typeof value === "string"
      ? getPasswordStrength(value)
      : null;

  return (
    <div className="space-y-1">
      <div className="relative">
        <Input
          {...props}
          value={value}
          onChange={onChange}
          type={show ? "text" : "password"}
          className={cn(showToggle && "pr-10", className)}
          onKeyUp={(e) => {
            setCapsLock(e.getModifierState("CapsLock"));
          }}
        />

        {showToggle && (
          <button
            type="button"
            onClick={() => setShow((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
          >
            {show ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {capsLock && (
        <div className="flex items-center gap-1 text-xs text-yellow-600">
          <AlertTriangle className="h-3 w-3" />
          Caps Lock aktif
        </div>
      )}

      {strength && value && (
        <div className="space-y-1">
          <div className="h-1 w-full rounded bg-muted overflow-hidden">
            <div
              className={cn("h-full transition-all", strength.color)}
              style={{ width: `${(strength.score / 4) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Kekuatan password:{" "}
            <span className="font-medium">{strength.label}</span>
          </p>
        </div>
      )}
    </div>
  );
};
