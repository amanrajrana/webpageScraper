"use client";

import UserContext from "@/context/user/userContext";
import { useContext } from "react";

const Welcome = () => {
  const { user } = useContext(UserContext);

  return <div>Welcome : {user && user.email}</div>;
};

export default Welcome;
