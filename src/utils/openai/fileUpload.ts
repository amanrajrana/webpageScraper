import { toast } from "@/components/ui/use-toast";
import CONF from "@/conf/conf";
import { openaiResponseType } from "@/types/type";
import axios from "axios";

export async function handleUploadFileToOpenAI(data: Blob, fileName: string) {
  const file = new FormData();

  file.append("purpose", "assistants");
  file.append("file", data, fileName);

  const axiosParams = {
    method: "POST",
    url: CONF.openai.ApiUrl + "/files",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${CONF.openai.ApiKey}`,
    },
    data: file,
  };

  const response = await axios(axiosParams);

  if (response.data.error) {
    throw new Error(response.data.error.message);
  }

  toast({
    description: "File uploaded to OpenAI successfully.",
  });

  return response.data as openaiResponseType;
}
