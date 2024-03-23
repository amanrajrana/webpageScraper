import { Button } from "@/components/ui/button";
import { FileMetaData } from "@/types/type";
import {
  Circle,
  Clock8,
  Flower,
  FolderGit2,
  HardDrive,
  Info,
  Paperclip,
  Pencil,
  Trash2,
} from "lucide-react";

type Props = {
  fileData: FileMetaData;
};

function FileDetailsComponent({ fileData }: Props) {
  return (
    <div className="p-3 space-y-4">
      <div className="flex justify-between w-full">
        <div>
          <h3 className="font-bold text-sm">FILE</h3>
          <p className="text-lg font-bold">{fileData.filename}</p>
        </div>

        <Button variant={"destructive"} size={"icon"}>
          <Trash2 size={18} />
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
          <Button className="gap-x-1 px-3">
            <Pencil size={14} />
            Edit
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
