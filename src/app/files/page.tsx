"use client";

import { useState } from "react";
import FileInputBox from "./components/fileInputBox";
import { Button } from "@/components/ui/button";
import { RotateCcw, Upload } from "lucide-react";

export default function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <main className="container">
      <div className="border rounded mt-32">
        <h1 className="border-b px-8 py-4 text-xl font-semibold">Files</h1>
        <div className="p-8">
          <FileInputBox setSelectedFile={setSelectedFile} />
        </div>
      </div>
      <div className="flex justify-end gap-2 flex-wrap-reverse my-4">
        <Button className="w-full gap-1 sm:w-24" variant={"outline"}>
          <RotateCcw size={16} /> Reset
        </Button>
        <Button className="w-full gap-1 sm:w-24">
          <Upload size={16} /> Upload
        </Button>
      </div>
    </main>
  );
}
