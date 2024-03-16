"use client";
import { Button } from "@/components/ui/button";
import { WebScrapeDataType } from "@/types/type";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Info, Loader2Icon } from "lucide-react";
import {
  handleSaveResponseToDB,
  handleUploadFileToOpenAI,
} from "@/lib/uploadFileToOpenAI";

const StartTraining = ({ data }: { data: WebScrapeDataType[] }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalChar, setTotalChar] = useState<number>(0);

  async function handleButtonUpload() {
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

    const file = new Blob([txtFileContent], { type: "text/plain" });

    try {
      const response = await handleUploadFileToOpenAI(
        file,
        url.hostname + ".txt"
      );

      // Save Response to Supabase DB
      if (response.data) {
        await handleSaveResponseToDB(response.data);
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: error?.code || "Error",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  }

  useEffect(() => {
    let total = 0;
    data?.forEach((item) => {
      if (item.contentLength) total += item.contentLength;
    });

    setTotalChar(total);
  }, [data]);

  return (
    <div className="bg-zinc-900 md:px-4 md:py-2 rounded-md flex gap-8 items-center text-sm text-green-100 text-opacity-60 font-semibold">
      <div className="hidden md:block">
        <h6>Document</h6>
        <p>
          <span className="text-lg text-white text-opacity-100">
            {data?.length || 0}
          </span>{" "}
          Links
        </p>
      </div>
      <div className="hidden md:block">
        <h6 className="flex gap-x-1 items-center">
          Characters
          <Info className="h-4 w-4" />
        </h6>
        <p>
          <span className="text-lg text-white text-opacity-100">
            {totalChar || 0}
          </span>{" "}
          chars
        </p>
      </div>
      <div>
        <Button
          onClick={handleButtonUpload}
          disabled={loading}
          className="w-32 bg-black hover:bg-gray-950"
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Start Training"
          )}
        </Button>
      </div>
    </div>
  );
};

export default StartTraining;
