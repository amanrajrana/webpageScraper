import { APIResponseType } from "@/types/type";
import { useEffect, useState } from "react";
import { TextContentDownloadButton } from "./textDownloadButton";
import { Info } from "lucide-react";

type Props = {
  data: APIResponseType[];
};

export default function StickyDiv({ data }: Props) {
  const [totalChar, setTotalChar] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    let total = 0;
    data?.forEach((item) => {
      if (item.contentLength) total += item.contentLength;
    });

    const fileName = () => {
      const url = new URL(data[0].url);
      return `${url.hostname}.txt`;
    };

    setFileName(fileName);

    setTotalChar(total);
  }, [data]);

  return (
    <div className="bg-zinc-900 md:px-4 md:py-2 rounded-md flex gap-8 items-center text-sm text-green-100 text-opacity-60 font-semibold">
      <div className="hidden md:block">
        <h6>Document</h6>
        <p>
          <span className="text-lg text-white text-opacity-100">
            {data?.length || 0}
          </span>{" "}
          Links
        </p>
      </div>
      <div className="hidden md:block">
        <h6 className="flex gap-x-1 items-center">
          Characters
          <Info className="h-4 w-4" />
        </h6>
        <p>
          <span className="text-lg text-white text-opacity-100">
            {totalChar || 0}
          </span>{" "}
          chars
        </p>
      </div>
      <div>
        <TextContentDownloadButton data={data} fileName={fileName} />
      </div>
    </div>
  );
}
