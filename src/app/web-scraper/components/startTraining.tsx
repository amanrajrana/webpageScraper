"use client";
import { Button } from "@/components/ui/button";
import { WebScrapeDataType, openaiResponseType } from "@/types/type";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Loader2Icon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Check if OPENAI_API_KEY is setup
if (!OPENAI_API_KEY) {
  throw new Error("NEXT_PUBLIC_OPENAI_API_KEY is not setup");
}

const supabase = createClient();

export const StartTraining = ({ data }: { data: WebScrapeDataType[] }) => {
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

    // Get hostname from the first item in the array
    const url = new URL(data[0].url);

    const txtFileContent = data
      .map((item) => "Title: " + item.title + "\n\n" + item.content)
      .join("\n\n\n\n");

    try {
      const file = new FormData();

      file.append("purpose", "assistants");
      file.append(
        "file",
        new Blob([txtFileContent], { type: "text/plain" }),
        `${url.hostname}.txt`
      );

      const axiosParams = {
        method: "POST",
        url: "https://api.openai.com/v1/files",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        data: file,
      };

      const response = await axios(axiosParams);

      if (response.data) {
        toast({
          description: "File uploaded to OpenAI successfully.",
        });

        // Save Response to Supabase DB
        await handleSaveResponse(response.data);
      }
    } catch (error: AxiosError | any) {
      console.log(error);
      toast({
        title: error?.code || "Error",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  }

  // Save Response to Supabase DB
  const handleSaveResponse = async (data: openaiResponseType) => {
    toast({
      description: "Saving response to database.",
    });
    const response = await supabase.from("openaifilesinfo").insert([
      {
        id: data.id,
        object: data.object,
        purpose: data.purpose,
        filename: data.filename,
        bytes: data.bytes,
        created_at: data.created_at,
        status: data.status,
        status_details: data.status_details,
      },
    ]);

    if (response.error) {
      throw new Error(response.error.message);
    }

    toast({
      description: "Response saved to database successfully.",
    });
  };

  return (
    <Button
      onClick={handleUploadFileToOpenAI}
      disabled={loading}
      className="w-32 bg-black hover:bg-gray-950"
    >
      {loading ? <Loader2Icon className="animate-spin" /> : "Start Training"}
    </Button>
  );
};
