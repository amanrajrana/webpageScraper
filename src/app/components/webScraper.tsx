"use client";
import { APIResponseType } from "@/types/type";
import { useState } from "react";
import UrlInputBox from "./urlInputBox";
import { DataTable } from "./dataTable";
import StickyDiv from "./stickyDiv";

export default function WebScraperSection() {
  const [data, setData] = useState<APIResponseType[]>([]);

  return (
    <div className="container space-y-8">
      <div className="w-full mt-24">
        <UrlInputBox setData={setData} />
      </div>

      <DataTable data={data} setData={setData} />
      <div className="fixed left-0 bottom-4 md:bottom-8 w-full flex justify-center">
        {data.length > 0 && <StickyDiv data={data} />}
      </div>
    </div>
  );
}
