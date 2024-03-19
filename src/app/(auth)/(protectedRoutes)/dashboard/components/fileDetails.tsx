import { useToast } from "@/components/ui/use-toast";
import UserContext from "@/context/user/userContext";
import { FileMetaData } from "@/types/type";
import React, { useCallback, useContext, useEffect, useState } from "react";
import FileDetailsComponent from "./FileDetailsComponent";
import { Loader } from "lucide-react";
import fileService from "@/utils/supabase/fileServices";

const FileDetailsArea = ({ id }: any) => {
  const { user } = useContext(UserContext);
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(true);
  const [fileData, setFileData] = useState<FileMetaData>();

  const fetchedData = useCallback(async () => {
    setFileData(undefined);
    setLoading(true);

    console.log("fetching data: ", id);

    if (!user) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });

      return;
    }

    // Fetch data from supabase
    const { data, error } = await fileService.getFileDetailsById({
      fileId: id,
      userId: user.id,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });

      setFileData(undefined);
      setLoading(false);
      return;
    }

    if (!data) {
      setLoading(false);
      return;
    }

    setFileData(data);

    setLoading(false);
  }, [id, user, toast]);

  useEffect(() => {
    fetchedData();
  }, [fetchedData]);

  return loading ? (
    <div className="flex h-full justify-center items-center w-full">
      <Loader className="animate-spin" />
    </div>
  ) : fileData ? (
    <FileDetailsComponent fileData={fileData} />
  ) : (
    <p className="w-full h-full flex justify-center items-center">
      No data found
    </p>
  );
};

export default FileDetailsArea;
