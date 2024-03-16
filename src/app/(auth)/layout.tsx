import UserState from "@/context/user/userState";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <UserState>{children}</UserState>;
}
