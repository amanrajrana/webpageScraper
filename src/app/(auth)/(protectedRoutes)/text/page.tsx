"use client";

import { FileNameModal } from "@/components/fileNameModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import UserContext from "@/context/user/userContext";
import { fetchedData } from "@/utils/services/fetchSavedText";
import { handleUpdateFiles } from "@/utils/services/updateFiles";
import handleUploadFile from "@/utils/services/uploadFile";
import dbService from "@/utils/supabase/dbServices";
import { Loader2Icon, RotateCcw, Upload } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  use,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export default function TextUploadPage() {
  const { toast } = useToast();
  const { user } = useContext(UserContext);
  const searchParams = useSearchParams();
  const fileNameModalRef = useRef<HTMLButtonElement>(null);

  const [text, setText] = useState<string>(""); // State to store the text content
  const [loading, setLoading] = useState<boolean>(false); // State to store the loading status
  const [fileName, setFileName] = useState<string>(""); // State to store the file name
  const [openaiId, setOpenaiId] = useState<string>(""); // State to store the openai id only help when file will be edit
  const [mode, setMode] = useState<string | null>(searchParams.get("mode"));

  const fileId = searchParams.get("fileid");

  // Function to handle when new file is created
  const handleUploadNew = async () => {
    const res = await handleUploadFile({
      data: new Blob([text], { type: "text/plain" }),
      editable: true,
      fileName,
      fileType: "text/plain",
      source: "textbox",
      userId: user?.id!,
    });

    if (res.error) {
      toast({
        title: res.error.code || "Error",
        description: res.error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (res.data && res.data.id) {
      const { error } = await dbService.saveTextContentToDB({
        content: text,
        fileId: res.data.id,
        userId: user?.id!,
      });

      if (error) {
        toast({
          title: error.code || "Error",
          description: error.message,
          variant: "destructive",
        });

        setLoading(false);
        return;
      }
    }

    toast({
      title: "Success",
      description: "File uploaded successfully",
    });

    setText("");
    return;
  };

  const updateEditedFile = async () => {
    const { error } = await handleUpdateFiles({
      id: Number(fileId),
      openai_id: openaiId,
      userId: user?.id!,
      data: new Blob([text], { type: "text/plain" }),
      text,
      fileName,
    });

    if (error) {
      toast({
        title: error.code || "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
  };

  const handleClick = async () => {
    setLoading(true);

    if (!user) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (mode === "edit") {
      await updateEditedFile();
    } else {
      await handleUploadNew();
    }

    setLoading(false);
  };

  // Fetch data when mode=edit
  useEffect(() => {
    if (mode === "edit" && user && fileId) {
      fetchedData({ user, fileId: Number(fileId), source: "textbox" }).then(
        (data) => {
          if (data) {
            setText(data.data);
            setOpenaiId(data.openaiId);
            setFileName(data.filename);

            return;
          }

          setMode("new");
        }
      );
    }
  }, [mode, fileId, user, searchParams]);

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

      {/* Buttons for resenting and uploading */}
      <div className="flex justify-end gap-2 flex-wrap-reverse my-4">
        <Button
          disabled={text === "" || loading}
          className="w-full gap-1 sm:w-24"
          variant={"outline"}
        >
          <RotateCcw size={16} /> Reset
        </Button>
        <Button
          onClick={(e) => fileNameModalRef.current?.click()}
          disabled={!text || loading}
          className="w-full gap-1 sm:w-24"
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <>
              <Upload size={16} /> {mode === "edit" ? "Update" : "Upload"}
            </>
          )}
        </Button>
      </div>
      <FileNameModal
        fileNameModalRef={fileNameModalRef}
        fileName={fileName}
        setFileName={setFileName}
        cb={handleClick}
      />
    </main>
  );
}
