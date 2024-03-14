"use client";

import supabase from "@/utils/supabase/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

type message = {
  type: "success" | "error";
  message: string;
};

const SingIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<message | null>();

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
  const handleSubmit = async () => {
    // Validate email
    if (email.length < 6 || !email.includes("@")) {
      setMessage({
        type: "error",
        message: "Enter valid email",
      });

      return;
    }

    setMessage(null); // Reset message state
    setLoading(true); // Set loading state

    // Send magic link to email
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "http://localhost:3000/dashboard",
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
        message: "Check your email for the login link",
      });
    }

    // Reset loading state
    setLoading(false);
  };

  return (
    <section className="w-full h-full min-h-max flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Login via magic link</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
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
                <Label htmlFor="name">Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="Enter your Email"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full gap-x-2"
            type="submit"
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin" /> Sending...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SingIn;
