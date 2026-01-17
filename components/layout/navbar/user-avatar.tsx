import { cn, getInitials } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const avatarVariants = cva("", {
  variants: {
    size: {
      default: "h-9 w-9",
      xs: "h-4 w-4",
      sm: "h-6 w-6",
      s: "h-8 w-8",
      lg: "h-10 w-10",
      xl: "h-[160px] w-[160px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  name: string;
  className?: string;
}

export const UserAvatar = ({ name, className, size }: UserAvatarProps) => {
  return (
    <Avatar className={cn(avatarVariants({ size, className }))}>
      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};
