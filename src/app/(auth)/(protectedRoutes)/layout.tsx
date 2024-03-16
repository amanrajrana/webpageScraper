import CheckAuth from "./checkAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CheckAuth>{children}</CheckAuth>;
}
