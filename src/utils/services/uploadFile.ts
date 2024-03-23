import { toast } from "@/components/ui/use-toast";
import { openaiServices } from "../openai/openaiServices";
import { AxiosError } from "axios";
import dbService from "@/utils/supabase/dbServices";

export type UploadFileProps = {
  data: Blob;
  fileName: string;
  userId: string;
  editable: boolean;
  fileType: string;
  source: string;
};

const handleUploadFile = async (data: UploadFileProps) => {
  const file = new FormData();
  file.append("purpose", "assistants");
  file.append("file", data.data, data.fileName);

  const response = await openaiServices.uploadFile(file);

  toast({
    description: "File uploaded to OpenAI successfully.",
  });

  if (response.data.error) {
    toast({
      title: response.data.error.code || "Error",
      description: response.data.error.message,
      variant: "destructive",
    });

    return { error: response.data.error as AxiosError, data: null };
  }

  toast({
    description: "File uploaded to OpenAI successfully.",
  });

  const { id, error } = await dbService.saveUploadedFileMetadata({
    bytes: response.data.bytes,
    created_at: response.data.created_at,
    filename: response.data.filename,
    id: response.data.id,
    object: response.data.object,
    purpose: response.data.purpose,
    status: response.data.status,
    status_details: response.data.status_details,
    userId: data.userId,
    editable: data.editable,
    fileType: data.fileType,
    source: data.source,
  });

  if (error) {
    await openaiServices.deleteFile(response.data.id);
    return { error, data: null };
  }

  return { data: { id }, error: null };
};

export default handleUploadFile;
