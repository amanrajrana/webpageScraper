import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex gap-2">
        <Button variant={"outline"}>
          <Link href={"/signup"}>Sign Up</Link>
        </Button>
        <Button>
          <Link href={"/login"}>Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
