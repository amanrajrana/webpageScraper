"use client";

import supabase from "@/utils/supabase/supabase";
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
import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type message = {
  type: "success" | "error";
  message: string;
};

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<message | null>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (data.user && data.session) {
      router.replace("/dashboard");
    }
  };

  // Handle request for Magic Link
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check password and confirm password
    if (password !== confirmPassword) {
      setMessage({
        type: "error",
        message: "Passwords do not match",
      });
      return;
    }

    setMessage(null); // Reset message state
    setLoading(true); // Set loading state

    // Send magic link to email
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    // Handle error
    if (error) {
      setMessage({
        type: "error",
        message: error.message,
      });
      return;
    }

    // Handle success
    if (data) {
      setMessage({
        type: "success",
        message: "Check your email for confirmation link",
      });
    }

    // Reset loading state
    setLoading(false);
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
                minLength={8}
              />
            </div>

            {/* Confirm password input box */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-password">Confirm Password:</Label>
              <Input
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirm-password"
                type="password"
                placeholder="Re-enter your password"
                required
                minLength={8}
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
        </CardContent>
        <CardFooter className="border-t flex-col">
          <p className="relative -top-3.5 text-center w-full">
            <span className="bg-white px-2 py-1">or</span>
          </p>
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-black hover:underline font-medium"
            >
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignUp;
