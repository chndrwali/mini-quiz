"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface AlertDialogCustomProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClick: () => void;
  title: string;
  description: string;
  textConfirm: string;
  classNameConfirm: string;
}

export const AlertDialogCustom = ({
  open,
  onOpenChange,
  onClick,
  title,
  description,
  textConfirm,
  classNameConfirm,
}: AlertDialogCustomProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <div className="flex justify-end gap-2">
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={onClick} className={classNameConfirm}>
            {textConfirm}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
