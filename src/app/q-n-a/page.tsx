"use client";

import { Button } from "@/components/ui/button";
import { Plus, RotateCcw, Upload } from "lucide-react";
import { useState } from "react";
import AccordionSection from "./components/accordion";
import { QnAType } from "@/types/type";
import QnAInputBox from "./components/newQnAInputBox";

export default function QuestionAndAnswerPage() {
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
                <Plus className="mr-1" size={16} /> Add QnA
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2 flex-wrap-reverse my-4">
        <Button
          disabled={qAndA.length <= 0}
          className="w-full gap-1 sm:w-24"
          variant={"outline"}
        >
          <RotateCcw size={16} /> Reset
        </Button>
        <Button disabled={qAndA.length <= 0} className="w-full gap-1 sm:w-24">
          <Upload size={16} /> Upload
        </Button>
      </div>
    </main>
  );
}
