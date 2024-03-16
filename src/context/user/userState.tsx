"use client";

import { useEffect, useState } from "react";
import UserContext from "./userContext";
import { User } from "@/types/type";
import supabase from "@/utils/supabase/supabase";

const UserState = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUserSession, setLoadingUserSession] = useState<boolean>(true);

  useEffect(() => {
    console.log("UserState useEffect");
    setLoadingUserSession(true);

    supabase.auth
      .getUser()
      .then(({ data, error }) => {
        if (error) {
          setUser(null);
          setLoadingUserSession(false);
          return;
        }

        if (data.user && data.user.email) {
          setUser({
            id: data.user.id,
            email: data.user.email,
          });
        }
      })
      .finally(() => {
        setLoadingUserSession(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUserSession }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
