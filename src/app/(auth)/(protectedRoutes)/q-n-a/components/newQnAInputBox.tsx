import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QnAType } from "@/types/type";
import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";

type Props = {
  newQnA: QnAType;
  setNewQAndA: Dispatch<SetStateAction<QnAType>>;
  handleAndNewQnA: () => void;
  dialogButtonRef?: RefObject<HTMLButtonElement>;
};

export default function QnAInputBox({
  newQnA,
  setNewQAndA,
  handleAndNewQnA,
  dialogButtonRef,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={dialogButtonRef} className={dialogButtonRef && "hidden"}>
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl max-h-full">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-y-2 flex-col h-full">
          <Label htmlFor="question">Question:</Label>
          <Input
            id="question"
            value={newQnA.question}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewQAndA({ ...newQnA, question: e.target.value })
            }
            className="mb-4"
          />

          <Label htmlFor="answer">Answer:</Label>
          <Textarea
            id="answer"
            value={newQnA.answer}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setNewQAndA({ ...newQnA, answer: e.target.value })
            }
            rows={10}
            className="flex-1"
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={newQnA.answer === "" || newQnA.question === ""}
            className="w-full sm:w-24"
            onClick={handleAndNewQnA}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
