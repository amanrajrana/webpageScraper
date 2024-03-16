import { User } from "@/types/type";
import { Dispatch, SetStateAction, createContext } from "react";

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loadingUserSession: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loadingUserSession: true,
});

export default UserContext;
