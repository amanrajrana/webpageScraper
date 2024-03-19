import { Button } from "@/components/ui/button";
import { FileMetaData } from "@/types/type";
import {
  Circle,
  Clock8,
  Flower,
  HardDrive,
  Info,
  Paperclip,
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
        <div className="flex w-full py-1">
          <span className="w-36 md:w-44 flex gap-x-1.5 items-center">
            <Info size={14} /> File Id
          </span>
          <span className="flex-1 flex gap-x-1.5 items-center overflow-clip">
            {fileData.id}
          </span>
        </div>
        <div className="flex w-full py-1">
          <span className="w-36 md:w-44 flex gap-x-1.5 items-center">
            <Circle size={14} />
            status
          </span>
          <span className="flex-1 flex gap-x-1.5 items-center">
            {fileData.status}
          </span>
        </div>
        <div className="flex w-full py-1">
          <span className="w-36 md:w-44 flex gap-x-1.5 items-center">
            <Flower size={14} />
            purpose
          </span>
          <span className="flex-1 flex gap-x-1.5 items-center">
            {fileData.purpose}
          </span>
        </div>
        <div className="flex w-full py-1">
          <span className="w-36 md:w-44 flex gap-x-1.5 items-center">
            <Paperclip size={14} />
            File Type
          </span>
          <span className="flex-1 flex gap-x-1.5 items-center">
            {fileData.filetype}
          </span>
        </div>
        <div className="flex w-full py-1">
          <span className="w-36 md:w-44 flex gap-x-1.5 items-center">
            <HardDrive size={14} />
            Size
          </span>
          <span className="flex-1 flex gap-x-1.5 items-center">
            {fileData.bytes}
          </span>
        </div>
        <div className="flex w-full py-1">
          <span className="w-36 md:w-44 flex gap-x-1.5 items-center">
            <Clock8 size={14} />
            Created At
          </span>
          <span className="flex-1 flex gap-x-1.5 items-center">
            {new Date(fileData.created_at).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FileDetailsComponent;
