import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { RefObject } from "react";

type Props = {
  fileName: string;
  setFileName: (fileName: string) => void;
  cb: () => void;
  fileNameModalRef: RefObject<HTMLButtonElement>;
};

export function FileNameModal({
  fileName,
  setFileName,
  cb,
  fileNameModalRef,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button ref={fileNameModalRef} className="hidden" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter File Name</AlertDialogTitle>
          <AlertDialogDescription>
            <Label htmlFor="file-name">File Name</Label>
            <Input
              id="file-name"
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value.toLowerCase())}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={!fileName} onClick={cb}>
            Upload
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
