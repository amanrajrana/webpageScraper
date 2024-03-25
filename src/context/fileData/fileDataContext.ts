import { Data } from "@/types/type";
import { Dispatch, SetStateAction, createContext } from "react";

type FileDataContextType = {
  data: Data[];
  loading: boolean;
  sortBy: "Date" | "Name";
  ascending: boolean;
  setAscending: Dispatch<SetStateAction<boolean>>;
  setSortBy: (value: "Date" | "Name") => void;
  fetchedData: () => void;
  setData: Dispatch<SetStateAction<Data[]>>;
};

const FileDataContext = createContext<FileDataContextType>({
  data: [],
  loading: false,
  sortBy: "Date",
  ascending: false,
  setAscending: () => {},
  setSortBy: () => {},
  fetchedData: () => {},
  setData: () => {},
});

export default FileDataContext;
