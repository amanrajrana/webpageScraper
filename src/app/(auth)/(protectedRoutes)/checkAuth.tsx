"use client";

import UserContext from "@/context/user/userContext";
import { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SideMenu from "@/components/sideMenu";
import LoadingSpinner from "@/components/loadingSpinner";

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const { user, loadingUserSession } = useContext(UserContext);

  useEffect(() => {
    if (!loadingUserSession && !user) {
    }
  });

  if (loadingUserSession) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full h-full flex justify-center items-center flex-col gap-2">
        <p>You need to be logged in to view this page.</p>
        <Button>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <SideMenu />
      <div className="flex-1 w-full overflow-y-auto">{children}</div>
    </>
  );
}
