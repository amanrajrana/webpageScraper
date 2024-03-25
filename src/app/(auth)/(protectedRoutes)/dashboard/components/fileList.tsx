"use client";

import { Badge } from "@/components/ui/badge";
import FileDataContext from "@/context/fileData/fileDataContext";
import { Data } from "@/types/type";
import { Dispatch, SetStateAction, useContext } from "react";

type Prams = {
  setId: Dispatch<SetStateAction<number | undefined>>;
  setToggle: Dispatch<SetStateAction<boolean>>;
};

const FileListArea = ({ setId, setToggle }: Prams) => {
  const { data } = useContext(FileDataContext);

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
