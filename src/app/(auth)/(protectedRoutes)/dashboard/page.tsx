"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import DashboardHeader from "./components/header";
import FileListArea from "./components/fileList";
import FileDetailsArea from "./components/fileDetails";
import UserContext from "@/context/user/userContext";
import { useToast } from "@/components/ui/use-toast";
import { Data } from "@/types/type";
import FileMetaDataState from "@/context/fileData/fileDataState";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import fileService from "@/utils/supabase/fileServices";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { toast } = useToast();

  const [sortBy, setSortBy] = useState<"Date" | "Name">("Date");
  const [ascending, setAscending] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [id, setId] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);

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
    fileService
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
    fetchedData();
  }, [fetchedData]);

  return (
    <div className="h-full flex flex-col">
      <section className="col-span-2 p-3 max-h-max">
        <DashboardHeader
          sortBy={sortBy}
          setSortBy={setSortBy}
          ascending={ascending}
          setAscending={setAscending}
        />
      </section>

      <FileMetaDataState>
        <div className="grid md:grid-cols-2 flex-1">
          <section
            className={`border border-l- p-3 overflow-y-auto ${
              toggle ? "hidden md:block" : ""
            } `}
          >
            {/**TODO: Add skeleton while loading file data */}
            <FileListArea data={data} setId={setId} setToggle={setToggle} />
          </section>

          <section
            className={`border h-full border-l-0 p-3 ${
              !toggle && "hidden md:block"
            }`}
          >
            {toggle && (
              <Button
                variant={"secondary"}
                size={"sm"}
                className="px-2 md:hidden"
                onClick={() => setToggle(!toggle)}
              >
                <ChevronLeft size={14} /> File
              </Button>
            )}
            {id ? (
              <FileDetailsArea id={id} />
            ) : (
              <div
                className={`w-full h-full justify-center flex items-center text-muted-foreground text-sm`}
              >
                Select a file
              </div>
            )}
          </section>
        </div>
      </FileMetaDataState>
    </div>
  );
};

export default Dashboard;
