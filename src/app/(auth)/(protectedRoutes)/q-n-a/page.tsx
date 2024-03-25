"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, RotateCcw, Upload } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import AccordionSection from "./components/accordion";
import { QnAType } from "@/types/type";
import QnAInputBox from "./components/newQnAInputBox";
import { toast } from "@/components/ui/use-toast";
import UserContext from "@/context/user/userContext";
import { FileNameModal } from "@/components/fileNameModal";
import handleUploadFile from "@/utils/services/uploadFile";
import dbService from "@/utils/supabase/dbServices";
import { useSearchParams } from "next/navigation";
import { fetchedData } from "@/utils/services/fetchSavedText";
import { handleUpdateFiles } from "@/utils/services/updateFiles";

/* The code is defining a React functional component called `QuestionAndAnswerPage`. */
export default function QuestionAndAnswerPage() {
  const { user } = useContext(UserContext);
  const searchParams = useSearchParams();

  const fileId = searchParams.get("fileid");
  const fileNameModalRef = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<string | null>(searchParams.get("mode"));
  const [fileName, setFileName] = useState<string>("");
  const [openaiId, setOpenaiId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [qAndA, setQAndA] = useState<QnAType[]>([]);
  const [newQnA, setNewQAndA] = useState<QnAType>({
    id: 0,
    question: "",
    answer: "",
  });

  const handleAddNewQnA = () => {
    setQAndA([...qAndA, newQnA]);
    setNewQAndA({ id: qAndA.length, question: "", answer: "" });
    toast({
      description: "New Q&A added",
    });
  };

  const txtFileContent = (data: QnAType[]) => {
    let content = "";
    data.forEach((d) => {
      content += `${d.question}\n${d.answer}\n\n`;
    });
    return content;
  };

  const uploadAsNewFile = async () => {
    const res = await handleUploadFile({
      data: new Blob([txtFileContent(qAndA)], { type: "text/plain" }),
      editable: true,
      fileName,
      fileType: "text/plain",
      userId: user?.id!,
      source: "qnabox",
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
        content: JSON.stringify(qAndA),
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
  };

  const updateExistingFile = async () => {
    const { error } = await handleUpdateFiles({
      id: Number(fileId),
      openai_id: openaiId,
      userId: user?.id!,
      data: new Blob([txtFileContent(qAndA)], { type: "text/plain" }),
      text: JSON.stringify(qAndA),
      fileName,
    });

    if (error) {
      setLoading(false);
      return;
    }
  };

  const handleUpload = async () => {
    setLoading(true);

    if (!user) throw new Error("Unauthorized user. Please login.");

    if (mode === "edit") {
      await updateExistingFile();
    } else {
      await uploadAsNewFile();
    }

    setLoading(false);
    setQAndA([]);
  };

  useEffect(() => {
    if (mode === "edit" && user && fileId) {
      fetchedData({ user, fileId: Number(fileId), source: "qnabox" }).then(
        (data) => {
          if (data) {
            setQAndA(data.data);
            setOpenaiId(data.openaiId);
            setFileName(data.filename);

            toast({
              description: "Data fetched successfully",
            });

            return;
          }

          toast({
            description: "Data not found",
            variant: "destructive",
          });

          setMode("new");
        }
      );
    }
  }, [mode, fileId, user]);

  return (
    <main className="container">
      <div className="border rounded mt-32">
        <h1 className="border-b px-8 py-4 text-xl font-semibold">Q&A</h1>
        <div className="p-8">
          {qAndA.length > 0 && (
            <AccordionSection qAndA={qAndA} setQAndA={setQAndA} />
          )}

          <div className="w-full flex justify-end">
            <QnAInputBox
              handleAndNewQnA={handleAddNewQnA}
              newQnA={newQnA}
              setNewQAndA={setNewQAndA}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 flex-wrap-reverse my-4">
        <Button
          disabled={qAndA.length <= 0 || loading || mode === "edit"}
          className="w-full gap-1 sm:w-24"
          variant={"outline"}
        >
          <RotateCcw size={16} /> Reset
        </Button>
        <Button
          disabled={qAndA.length <= 0 || loading}
          className="w-full gap-1 sm:w-24"
          onClick={() => fileNameModalRef.current?.click()}
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
        fileNameModalRef={fileNameModalRef}
        fileName={fileName}
        setFileName={setFileName}
        cb={handleUpload}
      ></FileNameModal>
    </main>
  );
}
