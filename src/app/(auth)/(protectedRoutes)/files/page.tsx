"use client";

import { useContext, useState } from "react";
import FileInputBox from "./fileInputBox";
import { Button } from "@/components/ui/button";
import { Loader2Icon, RotateCcw, Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import UserContext from "@/context/user/userContext";
import handleUploadFile from "@/utils/services/uploadFile";

export default function FileUploadPage() {
  const { user } = useContext(UserContext);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to reset the selected file
  const handleReset = () => {
    toast({ description: "File reset" });
    setSelectedFile(null);
  };

  // Function to handle file submission
  const handleSubmission = async () => {
    console.log("Submitting file");
    if (!selectedFile) return;

    setLoading(true);

    const fileName = selectedFile.name;
    const fileType = selectedFile.type;

    // Uploading file to OpenAI
    const file = new Blob([selectedFile], { type: selectedFile.type });

    if (!user) throw new Error("Unauthorized user. Please login.");

    const { error } = await handleUploadFile({
      data: file,
      editable: false,
      fileName,
      fileType: selectedFile.type,
      source: "local",
      userId: user.id,
    });

    if (error) {
      toast({
        title: error.code || "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      description: "File uploaded to OpenAI Database successfully.",
    });

    setLoading(false);
    handleReset();
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
