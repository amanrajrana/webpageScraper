"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Data } from "@/types/type";
import UserContext from "../user/userContext";
import { useToast } from "@/components/ui/use-toast";
import dbService from "@/utils/supabase/dbServices";
import FileDataContext from "./fileDataContext";

const FileDataState = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(UserContext);
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"Date" | "Name">("Date");
  const [ascending, setAscending] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);

  const fetchedData = useCallback(() => {
    if (!user) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });

      return;
    }

    const reFormatedSortBy = sortBy === "Date" ? "created_at" : "filename";

    // Fetch data from supabase
    dbService
      .getFilesByUserId({
        userId: user.id,
        orderBy: reFormatedSortBy,
        ascending,
      })
      .then(({ data, error }) => {
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });

          return;
        }
        setData(data);
      });
  }, [ascending, sortBy, toast, user]);

  useEffect(() => {
    setLoading(true);
    fetchedData();
    setLoading(false);
  }, [fetchedData]);

  return (
    <FileDataContext.Provider
      value={{
        loading,
        data,
        sortBy,
        ascending,
        setSortBy,
        setData,
        setAscending,
        fetchedData,
      }}
    >
      {children}
    </FileDataContext.Provider>
  );
};

export default FileDataState;
