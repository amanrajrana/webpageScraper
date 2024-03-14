"use client";

import supabase from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";

const Welcome = () => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    const { data, error } = await supabase.auth.refreshSession();

    if (error) {
      console.error("Error:", error);
      alert("Please sign in");
      return;
    }

    if (data) {
      console.log("Data:", data);
      if (data.user && data.user.email) {
        setUser(data.user.email);
      }
    }
  };

  return <div>Welcome : {user}</div>;
};

export default Welcome;
