import { APIResponseType } from "@/types/type";
import { useEffect, useState } from "react";
import { TextContentDownloadButton } from "./textDownloadButton";

type Props = {
  data: APIResponseType[];
};

export default function StickyDiv({ data }: Props) {
  const [totalChar, setTotalChar] = useState<number>(0);

  useEffect(() => {
    let total = 0;
    data?.forEach((item) => {
      if (item.contentLength) total += item.contentLength;
    });

    setTotalChar(total);
  }, [data]);

  return (
    <div className="bg-green-900 bg-opacity-90 md:px-4 md:py-2 rounded-md flex gap-8 items-center text-sm text-green-100 text-opacity-60 font-semibold">
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
        <h6>Characters</h6>
        <p>
          <span className="text-lg text-white text-opacity-100">
            {totalChar || 0}
          </span>{" "}
          chars
        </p>
      </div>
      <div>
        <TextContentDownloadButton
          data={data}
          fileName={"data_" + Date.now() + ".txt"}
        />
      </div>
    </div>
  );
}
