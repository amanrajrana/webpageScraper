"use client";

import authService from "@/utils/supabase/authServices";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useContext, useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserContext from "@/context/user/userContext";

type message = {
  type: "success" | "error";
  message: string;
};

const LogIn = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<message | null>();
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  });

  // Handle request for Magic Link
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage(null); // Reset message state
    setLoading(true); // Set loading state

    const { data, error } = await authService.signInWithEmail({
      email: email,
      password: password,
    });

    setLoading(false);

    // Handle error
    if (error) {
      setUser(null);
      setMessage({
        type: "error",
        message: error.message,
      });

      return;
    }

    if (data.user && data.user.email) {
      setUser({
        id: data.user.id,
        email: data.user.email,
      });

      router.replace("/dashboard");
    }
  };

  return (
    <section className="w-full h-full min-h-max flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid w-full items-center gap-4"
            onSubmit={handleSubmit}
          >
            {/* Display Status related message */}
            {message && (
              <div
                className={`${
                  message.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                } py-1.5 px-2 rounded-md text-sm`}
              >
                <h6 className="font-semibold uppercase">{message.type}</h6>
                <p>{message.message}</p>
              </div>
            )}

            {/* Email input box */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email:</Label>
              <Input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Enter your Email"
                required
              />
            </div>

            {/* Password Input box */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password:</Label>
              <Input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button disabled={loading} className="w-full gap-x-2" type="submit">
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin" /> Sending...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="text-muted-foreground  mt-4">
            Reset Password?{" "}
            <span className="text-black cursor-pointer hover:underline font-medium">
              click here
            </span>
          </div>
        </CardContent>
        <CardFooter className="border-t flex-col">
          <p className="relative -top-3.5 text-center w-full">
            <span className="bg-white px-2 py-1">or</span>
          </p>
          <p className="text-muted-foreground">
            New here?{" "}
            <Link
              href={"/signup"}
              className="text-black hover:underline font-medium text-base"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default LogIn;
