"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QnAType } from "@/types/type";
import React from "react";

type AccordionSectionProps = {
  qAndA: QnAType[];
};

export default function AccordionSection({ qAndA }: AccordionSectionProps) {
  return (
    <div className="mb-8">
      {qAndA.map((qAndA, index) => (
        <Accordion key={index} type="single" collapsible className="w-full">
          <AccordionItem value={`${qAndA.id}`}>
            <AccordionTrigger>{qAndA.question}</AccordionTrigger>
            <AccordionContent>{qAndA.answer}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
