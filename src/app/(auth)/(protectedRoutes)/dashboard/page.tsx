"use client";

import { useState } from "react";
import DashboardHeader from "./components/header";
import FileListArea from "./components/fileList";
import FileDetailsArea from "./components/fileDetails";
import FileDataState from "@/context/fileData/fileDataState";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Dashboard = () => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <FileDataState>
      <div className="h-full flex flex-col">
        <section className="col-span-2 p-3 max-h-max">
          <DashboardHeader />
        </section>

        <div className="grid md:grid-cols-2 flex-1">
          <section
            className={`border border-l- p-3 overflow-y-auto ${
              toggle ? "hidden md:block" : ""
            } `}
          >
            {/*//TODO: Add skeleton while loading file data */}
            <FileListArea setId={setId} setToggle={setToggle} />
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
              <FileDetailsArea id={id} setId={setId} />
            ) : (
              <div
                className={`w-full h-full justify-center flex items-center text-muted-foreground text-sm`}
              >
                Select a file
              </div>
            )}
          </section>
        </div>
      </div>
    </FileDataState>
  );
};

export default Dashboard;
