"use client";

import { Upload } from "lucide-react";
import { ChangeEvent, DragEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  CustomIconCSV,
  CustomIconDoc,
  CustomIconPdf,
  CustomIconText,
  CustomIconUnsupported,
} from "@/svg";

type Props = {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
};

export default function FileInputBox({ selectedFile, setSelectedFile }: Props) {
  const { toast } = useToast();

  // STATE VARIABLES
  const [unsupportedFileType, setUnsupportedFileType] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setUnsupportedFileType(false);
  };

  const handleDrop = (e: DragEvent<HTMLSpanElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleFile = (file: File) => {
    // Check if file is not null
    if (!file) return;

    const fileName = file.name;

    // Check if file type is supported
    if (
      !["txt", "pdf", "csv", "doc"].includes(fileName.split(".").pop() || "")
    ) {
      setUnsupportedFileType(true);
      toast({
        description: "Unsupported File",
        variant: "destructive",
      });
      return;
    }

    setUnsupportedFileType(false);
    setSelectedFile(file);
  };

  const getFileTypeIcon = (fileType: string) => {
    const height = 200;

    switch (fileType) {
      case "txt":
        return <CustomIconText height={height} />;
      case "pdf":
        return <CustomIconPdf height={height} />;
      case "csv":
        return <CustomIconCSV height={height} />;
      case "doc":
        return <CustomIconDoc height={height} />;
      default:
        setUnsupportedFileType(true);
        return <CustomIconUnsupported height={height} />;
    }
  };

  if (selectedFile) {
    const fileName = selectedFile.name;
    return (
      <div className="w-full flex justify-center flex-col">
        {getFileTypeIcon(fileName.split(".").pop() || "")}
        <p className="text-center">{fileName}</p>
      </div>
    );
  }

  return (
    <>
      <label
        htmlFor="file"
        className={`${
          unsupportedFileType ? "border-red-400 bg-red-100" : ""
        } border-2 border-dashed py-16 px-8 flex justify-center items-center flex-col gap-y-1.5 cursor-pointer hover:bg-gray-50 transition-colors duration-300`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload />
        <p>Drag & drop here, or click to select files</p>
        <p className="text-gray-600 text-sm">
          Supported File Types: .pdf, .doc, .txt and .csv
        </p>
      </label>

      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          e.target.files && handleFile(e.target.files[0])
        }
        type="file"
        className="hidden"
        id="file"
        accept=".pdf,.txt,.csv,.doc"
      />
      {unsupportedFileType && (
        <p className="text-red-500 text-sm">
          Unsupported file type. Choose only .pdf, .doc, .txt and .csv
        </p>
      )}
    </>
  );
}
