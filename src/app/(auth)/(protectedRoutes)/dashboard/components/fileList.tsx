import { Badge } from "@/components/ui/badge";
import { Data } from "@/types/type";
import { Dispatch, SetStateAction } from "react";

type Prams = {
  data: Data[];
  setId: Dispatch<SetStateAction<number>>;
  setToggle: Dispatch<SetStateAction<boolean>>;
};

const FileListArea = ({ data, setId, setToggle }: Prams) => {
  const onClickHandler = (id: number) => {
    setToggle(true);
    setId(id);
  };

  return (
    <div>
      {data.map((file, index) => (
        <div
          onClick={() => onClickHandler(file.id)}
          key={index}
          className="flex justify-between items-center cursor-pointer py-3 px-4 font-semibold hover:rounded-md hover:bg-muted"
        >
          <div>
            {file.fileName}{" "}
            <Badge
              variant="outline"
              className="text-xs font-mono text-muted-foreground p-1 py-0 font-thin"
            >
              {file.type}
            </Badge>
          </div>
          <div className="text-xs font-normal">{file.time}</div>
        </div>
      ))}
    </div>
  );
};

export default FileListArea;
