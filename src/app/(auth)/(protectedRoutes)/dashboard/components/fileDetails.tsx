import { useToast } from "@/components/ui/use-toast";
import UserContext from "@/context/user/userContext";
import { FileMetaData } from "@/types/type";
import supabase from "@/utils/supabase/supabase";
import React, { useCallback, useContext, useEffect, useState } from "react";
import FileDetailsComponent from "./FileDetailsComponent";
import { Loader } from "lucide-react";

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
    const { data, error }: { data: any; error: any } = await supabase
      .from("openaifilesinfo")
      .select(
        "db_id, id, purpose, filename, bytes, status, file_id, useruploadedfiles(filetype, created_at)"
      )
      .eq("file_id", id)
      .filter("user_id", "eq", user.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });

      setLoading(false);
      return;
    }

    if (data.length < 1) {
      setLoading(false);
      return;
    }

    setFileData({
      bytes: data[0].bytes,
      created_at: data[0].useruploadedfiles.created_at,
      db_id: data[0].db_id,
      file_id: data[0].file_id,
      filename: data[0].filename,
      filetype: data[0].useruploadedfiles.filetype,
      id: data[0].id,
      purpose: data[0].purpose,
      status: data[0].status,
    });

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
