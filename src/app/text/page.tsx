"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function TextUploadPage() {
  const [text, setText] = useState<string>("");

  return (
    <main className="container w-full">
      <div className="border rounded mt-32">
        <h1 className="border-b px-8 py-4 text-xl font-semibold">Text</h1>
        <div className="p-8">
          <Textarea
            value={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            placeholder="Enter text here..."
            rows={15}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 flex-wrap-reverse my-4">
        <Button
          disabled={text === ""}
          className="w-full gap-1 sm:w-24"
          variant={"outline"}
        >
          <RotateCcw size={16} /> Reset
        </Button>
        <Button disabled={text === ""} className="w-full gap-1 sm:w-24">
          <Upload size={16} /> Upload
        </Button>
      </div>
    </main>
  );
}
