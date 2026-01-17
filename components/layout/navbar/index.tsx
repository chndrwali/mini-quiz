"use client";

import Link from "next/link";
import { ProfileDropdown } from "./profileDropdown";
import { BookOpen } from "lucide-react";
import { ColourfulText } from "@/components/ui/colourfull-text";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6  mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="hidden sm:inline">
            <ColourfulText text="Mini Quiz App" />
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};
