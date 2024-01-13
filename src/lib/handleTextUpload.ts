import {
  handleSaveFileDataToDB,
  handleSaveResponseToDB,
  handleUploadFileToOpenAI,
} from "./handleUploadFile";

export const handleUploadText = async (text: string, name?: string) => {
  if (!text) {
    throw new Error("No text to upload.");
  }

  const fileName = name || `text-${new Date().toISOString()}.txt`;

  const data = new Blob([text], { type: "text/plain" });

  const [response] = await Promise.all([
    handleUploadFileToOpenAI(data, fileName),
    handleSaveFileDataToDB(text, "text", fileName),
  ]);

  // Save Response to Supabase DB
  await handleSaveResponseToDB(response.data);
};
