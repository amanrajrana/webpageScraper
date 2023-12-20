"use client";
import { Button } from "@/components/ui/button";
import { APIResponseType } from "@/types/type";
import React from "react";

type DownloadButtonProps = {
  data: APIResponseType[];
  fileName: string;
};

export const TextContentDownloadButton = ({
  data,
  fileName,
}: DownloadButtonProps) => {
  // This is the code that will be used to download the text file
  const downloadTextFile = () => {
    // const txtFileContent = textContent.title + "\n\n" + textContent.content;
    const txtFileContent = data
      .map((item) => "Title: " + item.title + "\n\n" + item.content)
      .join("\n\n\n\n");

    const blob = new Blob([txtFileContent], { type: "text/plain" });

    const link = document.createElement("a");

    link.download = fileName;

    link.href = URL.createObjectURL(blob);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <Button
      className="bg-green-600 text-white hover:bg-green-500"
      onClick={downloadTextFile}
    >
      Download .txt File
    </Button>
  );
};
