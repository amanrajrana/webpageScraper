"use client";

import { FileNameModal } from "@/components/fileNameModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import UserContext from "@/context/user/userContext";
import { handleUploadText } from "@/utils/textUpload";
import { Loader2Icon, RotateCcw, Upload } from "lucide-react";
import { ChangeEvent, useContext, useState } from "react";

export default function TextUploadPage() {
  const { toast } = useToast();
  const { user } = useContext(UserContext);

  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleUpload = async () => {
    setLoading(true);

    if (!user) {
      toast({
        title: "Error",
        description: "Unauthorized user",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await handleUploadText({ text, user_id: user.id, fileName });
    } catch (error: any) {
      toast({
        title: error?.code || "Error",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);
    setText("");
    return;
  };

  return (
    <main className="container w-full">
      <div className="border rounded mt-32">
        <h1 className="border-b px-8 py-4 text-xl font-semibold">Text</h1>
        <div className="p-8">
          <Textarea
            value={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            placeholder="Enter text here..."
            rows={15}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 flex-wrap-reverse my-4">
        <Button
          disabled={text === "" || loading}
          className="w-full gap-1 sm:w-24"
          variant={"outline"}
        >
          <RotateCcw size={16} /> Reset
        </Button>
        <Button
          onClick={(e) => setOpen(true)}
          disabled={!text || loading}
          className="w-full gap-1 sm:w-24"
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
      <FileNameModal
        open={open}
        setOpen={setOpen}
        fileName={fileName}
        setFileName={setFileName}
        cb={handleUpload}
      />
    </main>
  );
}
