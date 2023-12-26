"use client";
import { Button } from "@/components/ui/button";
import { APIResponseType } from "@/types/type";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Loader2Icon } from "lucide-react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const StartTraining = ({ data }: { data: APIResponseType[] }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleUploadFileToOpenAI() {
    if (data.length === 0) {
      toast({
        title: "File is empty",
        description: "Please upload a file first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/openai/upload-file`, {
        content: data,
      });

      if (response.data) {
        toast({
          title: "Success",
          description: response.data.message,
        });
      }
    } catch (error: AxiosError | any) {
      toast({
        title: error?.code || "Error",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  }
  return (
    <Button
      onClick={handleUploadFileToOpenAI}
      disabled={loading}
      className="w-32 bg-black hover:bg-gray-950"
    >
      {loading ? (
        <>
          <Loader2Icon className="animate-spin" />
        </>
      ) : (
        "Start Training"
      )}
    </Button>
  );
};
