"use client";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { WebScrapeDataType } from "@/types/type";
import { useToast } from "@/components/ui/use-toast";
import { Loader2Icon } from "lucide-react";

type Message = {
  type: "error" | "success" | "warning";
  text: string;
};

type Props = {
  setData: React.Dispatch<React.SetStateAction<WebScrapeDataType[]>>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UrlInputBox({ setData }: Props) {
  const { toast } = useToast();

  const [url, setUrl] = useState<string>("");
  const [isFetchAll, setIsFetchAll] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>();

  const handleClick = async () => {
    if (!url) {
      setMessage({
        type: "error",
        text: "Please enter a URL",
      });
      return;
    }

    setLoading(true);
    setMessage({
      type: "warning",
      text: "Fetching data... It will take a while.",
    });

    try {
      // Call API to fetch data
      const response = await axios.get(
        `${API_URL}/api/scrape/${
          isFetchAll ? "multi" : "single"
        }-url?url=${url}`
      );

      if (response.data) {
        if (response.data.length === 0) {
          setMessage({
            type: "error",
            text: "No data found. Check your URL and try again.",
          });

          setLoading(false);
          return;
        }

        setData(response.data);
      }
    } catch (error: AxiosError | any) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.error ||
          error.message ||
          "Something went wrong. Please try again.",
      });

      toast({
        title: error?.code || "Error",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);
    setMessage(undefined);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      <Label htmlFor="url">Enter website URL:</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://yourwebsite.com"
          name="url"
          id="url"
        />
        <Button onClick={handleClick} disabled={loading || url === ""}>
          {loading ? (
            <>
              <Loader2Icon className="animate-spin" />
            </>
          ) : (
            "Fetch"
          )}
        </Button>
      </div>
      <div
        className={`${
          (message?.type === "success" && "text-green-500") ||
          (message?.type === "error" && "text-red-600") ||
          (message?.type === "warning" && "text-yellow-500")
        } text-sm font-medium`}
      >
        {message?.text}
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isFetchAll}
          onCheckedChange={() => setIsFetchAll(!isFetchAll)}
        />
        <Label>Get all url of this domain!</Label>
      </div>
    </div>
  );
}
