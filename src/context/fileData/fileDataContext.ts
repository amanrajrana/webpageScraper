import { FileMetaData } from "@/types/type";
import { Dispatch, SetStateAction, createContext } from "react";

type FileDataContextType = {
  fileMetaData: null | FileMetaData;
  loading: boolean;
  setFileId: Dispatch<SetStateAction<string>>;
};

const FileMetaDataContext = createContext<FileDataContextType>({
  fileMetaData: null,
  loading: false,
  setFileId: () => {},
});

export default FileMetaDataContext;
