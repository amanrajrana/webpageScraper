"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { QnAType } from "@/types/type";
import { PenBoxIcon } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import QnAInputBox from "./newQnAInputBox";

type Props = {
  qAndA: QnAType[];
  setQAndA: Dispatch<SetStateAction<QnAType[]>>;
};

export default function AccordionSection({ qAndA, setQAndA }: Props) {
  const dialogButtonRef = useRef<HTMLButtonElement>(null);

  const [newQnA, setNewQAndA] = useState<QnAType>({
    id: 0,
    question: "",
    answer: "",
  });

  const handleClick = (id: number) => {
    setNewQAndA(qAndA.find((qAndA) => qAndA.id === id)!);
    dialogButtonRef.current?.click();
  };

  const handleEdit = () => {
    setQAndA(qAndA.map((qAndA) => (qAndA.id === newQnA.id ? newQnA : qAndA)));
    dialogButtonRef.current?.click();
  };

  const handelDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this QnA?")) return;
    const updatedQnA = qAndA.filter((qAndA) => qAndA.id !== id);
    setQAndA(updatedQnA);
  };

  return (
    <div className="mb-8">
      {qAndA.map((qAndA, index) => (
        <Accordion key={index} type="single" collapsible className="w-full">
          <AccordionItem value={`${qAndA.id}`}>
            <AccordionTrigger>{qAndA.question}</AccordionTrigger>
            <AccordionContent>
              {qAndA.answer}

              <div className="mt-4 flex gap-x-2 justify-end">
                <Button
                  onClick={() => handelDelete(qAndA.id)}
                  variant={"destructive"}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleClick(qAndA.id)}
                  variant={"outline"}
                  className="gap-x-1"
                >
                  <PenBoxIcon size={14} /> Edit
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <QnAInputBox
        newQnA={newQnA}
        setNewQAndA={setNewQAndA}
        dialogButtonRef={dialogButtonRef}
        handleAndNewQnA={handleEdit}
      />
    </div>
  );
}
