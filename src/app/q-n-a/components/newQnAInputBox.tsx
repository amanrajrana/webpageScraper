import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QnAType } from "@/types/type";
import { Trash2 } from "lucide-react";
import { ChangeEvent } from "react";

type Props = {
  newQnA: QnAType;
  setNewQAndA: (qAndA: QnAType) => void;
  handleAndNewQnA: () => void;
  setQnABoxVisible: (visible: boolean) => void;
};

export default function QnAInputBox({
  newQnA,
  setNewQAndA,
  handleAndNewQnA,
  setQnABoxVisible,
}: Props) {
  return (
    <div className="border p-4 rounded">
      <div className="flex justify-end w-full">
        <Button variant={"ghost"} onClick={() => setQnABoxVisible(false)}>
          <Trash2 className="text-red-600" size={18} />
        </Button>
      </div>

      {/* Question Input Box */}
      <Label>Question:</Label>
      <Input
        className="mb-2"
        type="text"
        value={newQnA.question}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewQAndA({ ...newQnA, question: e.target.value })
        }
        name="question"
      />

      {/* Answer Input Box */}
      <Label>Answer:</Label>
      <Textarea
        value={newQnA.answer}
        rows={10}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setNewQAndA({ ...newQnA, answer: e.target.value })
        }
        name="answer"
      />

      <div className="flex justify-end mt-4">
        <Button
          disabled={newQnA.answer === "" || newQnA.question === ""}
          className="w-full sm:w-24"
          onClick={handleAndNewQnA}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
