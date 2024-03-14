"use client";

import SideMenu from "@/components/sideMenu";
import { Toaster } from "@/components/ui/toaster";
import supabase from "@/utils/supabase/supabase";
import { use, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    const { data, error } = await supabase.auth.refreshSession();

    if (error) {
      // console.error("Error:", error);
      setOpen(true);
      return;
    }

    if (data) {
      if (data.user && data.user.email) {
        setUser(data.user.email);
      }
    }
  };

  if (!user) {
    return (
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Required</AlertDialogTitle>
            <AlertDialogDescription>
              To access this feature please login using email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.replace("/")}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <>
      <SideMenu />
      <div className="flex-1 w-full overflow-y-auto">{children}</div>
      <Toaster />
    </>
  );
}
