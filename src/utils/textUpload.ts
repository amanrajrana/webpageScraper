import { toast } from "@/components/ui/use-toast";
import { handleUploadFileToOpenAI } from "@/utils/openai/fileUpload";
import fileService from "@/utils/supabase/fileServices";

type Props = {
  text: string;
  fileName: string;
  user_id: string;
};

export const handleUploadText = async (props: Props) => {
  const { text, fileName, user_id } = props;

  if (!text) {
    throw new Error("No text to upload.");
  }

  const data = new Blob([text], { type: "text/plain" });

  toast({
    description: "Uploading file",
  });

  const openaiResponse = await handleUploadFileToOpenAI(data, fileName);
  const file_id = await fileService.uploadFile({
    fileData: text,
    fileType: "text/plain",
    fileName,
    userId: user_id,
  });

  toast({
    description: "File uploaded to OpenAI & Database successfully.",
  });

  fileService
    .saveResponseToDB({ ...openaiResponse, user_id, file_id })
    .then((error) => {
      if (error) {
        toast({
          title: error.code || "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    });

  toast({
    description: "Saved Response in Database successfully.",
  });
};
