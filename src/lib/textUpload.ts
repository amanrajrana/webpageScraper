import { handleSaveFileDataToDB } from "./handleSaveFileInDB";
import {
  handleSaveResponseToDB,
  handleUploadFileToOpenAI,
} from "./uploadFileToOpenAI";

type Props = {
  text: string;
  fileName: string;
  user_id: string;
};

export const handleUploadText = async (props: Props) => {
  console.log("Uploading text");

  const { text, fileName, user_id } = props;

  if (!text) {
    throw new Error("No text to upload.");
  }

  const data = new Blob([text], { type: "text/plain" });

  const [response, file_id] = await Promise.all([
    handleUploadFileToOpenAI(data, fileName),
    handleSaveFileDataToDB({
      fileData: text,
      fileType: "text/plain",
      fileName,
      userId: user_id,
    }),
  ]);

  // Save Response to Supabase DB
  await handleSaveResponseToDB({ ...response, user_id, file_id });
};
