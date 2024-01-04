"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, Plus, RotateCcw, Upload } from "lucide-react";
import { useState } from "react";
import AccordionSection from "./components/accordion";
import { QnAType } from "@/types/type";
import QnAInputBox from "./components/newQnAInputBox";
import {
  handleSaveResponseToDB,
  handleUploadFileToOpenAI,
} from "@/lib/handleUploadFile";
import { toast } from "@/components/ui/use-toast";

/* The code is defining a React functional component called `QuestionAndAnswerPage`. */
export default function QuestionAndAnswerPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [qAndA, setQAndA] = useState<QnAType[]>([]);
  const [QnABoxVisible, setQnABoxVisible] = useState<boolean>(false);
  const [newQnA, setNewQAndA] = useState<QnAType>({
    id: 0,
    question: "",
    answer: "",
  });

  const handleAddNewQnA = () => {
    // add new qna to qAndA state
    setQAndA([...qAndA, newQnA]);

    // reset newQnA state with updated id
    setNewQAndA({ id: qAndA.length, question: "", answer: "" });

    // hide input box
    setQnABoxVisible(false);
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      const txtFileContent = qAndA
        .map(
          (item) =>
            "Question: " + item.question + "\n" + "Answer: " + item.answer
        )
        .join("\n\n\n\n");

      // create a file from txtFileContent
      const file = new Blob([txtFileContent], { type: "text/plain" });

      // create a file name
      const fileName = `qna-${new Date().toISOString()}.txt`;

      // upload file to openai
      const response = await handleUploadFileToOpenAI(file, fileName);

      if (response.data) {
        toast({
          description: "File uploaded to OpenAI successfully.",
        });
      }

      // Save Response to Supabase DB
      toast({
        description: "Saving response to Supabase DB...",
      });

      await handleSaveResponseToDB(response.data);
    } catch (error: any) {
      toast({
        title: error?.code || "Error",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);

    setQAndA([]);
  };

  return (
    <main className="container">
      <div className="border rounded mt-32">
        <h1 className="border-b px-8 py-4 text-xl font-semibold">Q&A</h1>
        <div className="p-8">
          {qAndA.length > 0 && <AccordionSection qAndA={qAndA} />}

          {QnABoxVisible ? (
            <QnAInputBox
              handleAndNewQnA={handleAddNewQnA}
              newQnA={newQnA}
              setNewQAndA={setNewQAndA}
              setQnABoxVisible={setQnABoxVisible}
            />
          ) : (
            <div className="w-full flex justify-end">
              <Button
                className="w-full sm:w-max"
                onClick={() => setQnABoxVisible(true)}
              >
                <Plus className="mr-1" size={16} /> Add Q&A
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2 flex-wrap-reverse my-4">
        <Button
          disabled={qAndA.length <= 0 || loading}
          className="w-full gap-1 sm:w-24"
          variant={"outline"}
        >
          <RotateCcw size={16} /> Reset
        </Button>
        <Button
          disabled={qAndA.length <= 0 || loading}
          className="w-full gap-1 sm:w-24"
          onClick={handleUpload}
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
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
