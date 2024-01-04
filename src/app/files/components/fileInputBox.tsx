"use client";

import { Upload } from "lucide-react";
import { ChangeEvent, DragEvent, useState } from "react";

type FileInputBoxProps = {
  setSelectedFile: (file: File | null) => void;
};

export default function FileInputBox({ setSelectedFile }: FileInputBoxProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();

    if (e.dataTransfer.files) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  return (
    <>
      <label
        htmlFor="file"
        className="border-2 border-dashed py-16 px-8 flex justify-center items-center flex-col gap-y-1.5 cursor-pointer hover:bg-gray-50 transition-colors duration-300"
        onDragOver={(e: DragEvent) => e.preventDefault()}
        onDrop={() => handleDrop}
      >
        <Upload />
        <p>Drag & drop here, or click to select files</p>
        <p className="text-gray-600 text-sm">
          Supported File Types: .pdf, .txt
        </p>
      </label>
      <input
        onChange={handleFileChange}
        type="file"
        className="hidden"
        id="file"
        accept=".pdf,.txt,.csv"
      />
    </>
  );
}
