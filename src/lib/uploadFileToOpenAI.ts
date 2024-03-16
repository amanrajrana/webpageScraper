import axios from "axios";
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
import { createClient } from "@/utils/supabase/client";
import { openaiResponseType } from "@/types/type";
import { toast } from "@/components/ui/use-toast";
const supabase = createClient();

// Check if OPENAI_API_KEY is setup
if (!OPENAI_API_KEY) {
  throw new Error("NEXT_PUBLIC_OPENAI_API_KEY is not setup");
}

export async function handleUploadFileToOpenAI(data: Blob, fileName: string) {
  const file = new FormData();

  file.append("purpose", "assistants");
  file.append("file", data, fileName);

  const axiosParams = {
    method: "POST",
    url: "https://api.openai.com/v1/files",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
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

// Save Response to Supabase DB
type Props = openaiResponseType & {
  user_id: string;
  file_id: number;
};

export const handleSaveResponseToDB = async (data: Props) => {
  toast({
    description: "Saving response to database.",
  });
  const response = await supabase.from("openaifilesinfo").insert([
    {
      id: data.id,
      object: data.object,
      purpose: data.purpose,
      filename: data.filename,
      bytes: data.bytes,
      created_at: data.created_at,
      status: data.status,
      status_details: data.status_details,
      user_id: data.user_id,
      file_id: data.file_id,
    },
  ]);

  if (response.error) {
    throw new Error(response.error.message);
  }

  toast({
    description: "Response saved to database successfully.",
  });
};
