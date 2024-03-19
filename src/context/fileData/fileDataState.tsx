"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { FileMetaData } from "@/types/type";
import supabase from "@/utils/supabase/supabase";
import FileMetaDataContext from "./fileDataContext";
import UserContext from "../user/userContext";
import { useToast } from "@/components/ui/use-toast";

const FileMetaDataState = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(UserContext);
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [fileMetaData, setFileMeteData] = useState<null | FileMetaData>(null);
  const [fileId, setFileId] = useState<string>("");

  return (
    <FileMetaDataContext.Provider value={{ loading, setFileId, fileMetaData }}>
      {children}
    </FileMetaDataContext.Provider>
  );
};

export default FileMetaDataState;
