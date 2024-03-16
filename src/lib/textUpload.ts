import { handleSaveFileDataToDB } from "./handleSaveFileInDB";
import {
  handleSaveResponseToDB,
  handleUploadFileToOpenAI,
} from "./uploadFileToOpenAI";

type Props = {
  text: string;
  name?: string;
  user_id: string;
};

export const handleUploadText = async (props: Props) => {
  const { text, name, user_id } = props;

  if (!text) {
    throw new Error("No text to upload.");
  }

  const fileName = name || `text-${new Date().toISOString()}.txt`;

  const data = new Blob([text], { type: "text/plain" });

  const [response] = await Promise.all([
    handleUploadFileToOpenAI(data, fileName),
    handleSaveFileDataToDB({
      fileData: text,
      fileType: "text/plain",
      fileName,
      userId: user_id,
    }),
  ]);

  // Save Response to Supabase DB
  // await handleSaveResponseToDB(response.data);
};
