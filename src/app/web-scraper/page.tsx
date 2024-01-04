"use client";

import React, { useState } from "react";
import UrlInputBox from "./components/urlInputBox";
import { WebScrapeDataType } from "@/types/type";
import { DataTable } from "./components/dataTable";

export default function WebScraperPage() {
  const [data, setData] = useState<WebScrapeDataType[]>([]);

  return (
    <main className="container space-y-8">
      <div className="w-full mt-32">
        <UrlInputBox setData={setData} />
      </div>

      <DataTable data={data} setData={setData} />
      <div className="fixed left-0 bottom-4 md:bottom-8 w-full flex justify-center">
        {/* {data.length > 0 && <StickyDiv data={data} />} */}
      </div>
    </main>
  );
}
