"use client";

import { useState } from "react";
import FileInputBox from "./components/fileInputBox";
import { Button } from "@/components/ui/button";
import { Loader2Icon, RotateCcw, Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  handleSaveFileDataToDB,
  handleSaveResponseToDB,
  handleUploadFileToOpenAI,
} from "@/lib/handleUploadFile";

export default function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleReset = () => {
    toast({ description: "File reset" });
    setSelectedFile(null);
  };

  const getFileAsBase64 = async (file: File) => {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error("FileReader failed to load file"));
        }
      };

      reader.onerror = (e) => {
        reject(new Error("FileReader encountered an error while reading file"));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmission = async () => {
    console.log("Submitting file");
    if (!selectedFile) return;

    setLoading(true);

    try {
      const fileName = selectedFile.name;
      const fileType = selectedFile.type;

      // Saving file to DB
      const fileData = await getFileAsBase64(selectedFile);

      // Uploading file to OpenAI
      const data = new Blob([selectedFile], { type: selectedFile.type });

      const [response] = await Promise.all([
        handleUploadFileToOpenAI(data, fileName),
        handleSaveFileDataToDB(fileData, fileType, fileName),
      ]);

      await handleSaveResponseToDB(response.data);
    } catch (error: SuppressedError | any) {
      toast({
        title: error?.status || "Error",
        description: error.message || "Error uploading file",
        variant: "destructive",
      });
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <main className="container">
      <div className="border rounded mt-32">
        <h1 className="border-b px-8 py-4 text-xl font-semibold">Files</h1>
        <div className="p-8">
          <FileInputBox
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 flex-wrap-reverse my-4">
        <Button
          disabled={!selectedFile || loading}
          className="w-full gap-1 sm:w-24"
          variant={"outline"}
          onClick={handleReset}
        >
          <RotateCcw size={16} /> Reset
        </Button>
        <Button
          disabled={!selectedFile || loading}
          className="w-full gap-1 sm:w-24"
          onClick={handleSubmission}
        >
          {loading ? (
            <>
              <Loader2Icon className="animate-spin" />
            </>
          ) : (
            <>
              <Upload size={16} /> Upload
            </>
          )}
        </Button>
      </div>
    </main>
  );
}
