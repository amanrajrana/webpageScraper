import LoadingSpinner from "@/components/loadingSpinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import FileDataContext from "@/context/fileData/fileDataContext";
import UserContext from "@/context/user/userContext";
import { FileMetaData } from "@/types/type";
import handleDeleteFile from "@/utils/services/deleteFile";
import {
  Circle,
  Clock8,
  Flower,
  FolderGit2,
  HardDrive,
  Info,
  Loader2Icon,
  Paperclip,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";

type Prams = {
  fileData: FileMetaData;
  setId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

function FileDetailsComponent({ fileData, setId }: Prams) {
  const { user } = useContext(UserContext);
  const { data, setData } = useContext(FileDataContext);
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const deleteFile = async () => {
    if (!confirm("Are you sure you want to delete this file?") || !user) return;

    setLoading(true);
    const { error } = await handleDeleteFile({
      id: fileData.id,
      openai_id: fileData.openai_id,
      userId: user.id,
    });

    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Unable to delete file",
      });

      setLoading(false);
      return;
    }

    toast({
      description: "File deleted",
    });

    setLoading(false);
    const newData = data.filter((file) => file.id !== fileData.id);
    setData([...newData]);
    setId(undefined);
  };
  return (
    <div className="p-3 space-y-4">
      <div className="flex justify-between w-full">
        <div>
          <h3 className="font-bold text-sm">FILE</h3>
          <p className="text-lg font-bold">{fileData.filename}</p>
        </div>

        <Button
          onClick={deleteFile}
          disabled={loading}
          variant={"destructive"}
          size={"icon"}
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </Button>
      </div>

      <div className="pb-4 border-b">
        <FileList
          icon={<Info size={14} />}
          title={"File Id"}
          value={fileData.openai_id}
        />

        <FileList
          icon={<Circle size={14} />}
          title={"Status"}
          value={fileData.status}
        />

        <FileList
          icon={<Flower size={14} />}
          title={"Purpose"}
          value={fileData.purpose}
        />

        <FileList
          icon={<Paperclip size={14} />}
          title={"File Type"}
          value={fileData.filetype}
        />

        <FileList
          icon={<FolderGit2 size={14} />}
          title="source"
          value={fileData.source}
        />

        <FileList
          icon={<HardDrive size={14} />}
          title={"Size"}
          value={fileData.bytes + " bytes"}
        />

        <FileList
          icon={<Clock8 size={14} />}
          title={"Created At"}
          value={new Date(fileData.created_at).toLocaleString()}
        />
      </div>

      {fileData.editable && (
        <div className="flex w-full items-center justify-end">
          <Button className="gap-x-1 px-3" asChild>
            <Link
              href={`${
                fileData.source === "qnabox" ? "/q-n-a" : "/text"
              }?mode=edit&fileid=${fileData.id}`}
            >
              <Pencil size={14} />
              Edit
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileDetailsComponent;

type FileListProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

const FileList = ({ icon, title, value }: FileListProps) => {
  return (
    <div className="flex w-full py-1">
      <span className="w-36 md:w-44 flex gap-x-1.5 items-center">
        {icon}
        {title}
      </span>
      <span className="flex-1 flex gap-x-1.5 items-center">{value}</span>
    </div>
  );
};
