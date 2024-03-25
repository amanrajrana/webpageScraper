// STEP: delete file from openai
// STEP2: upload new file to openai
// STEP3: update new openai_id to the database

import { openaiServices } from "../openai/openaiServices";
import dbService from "../supabase/dbServices";
import { toast } from "@/components/ui/use-toast";

type Props = {
  id: number;
  openai_id: string;
  userId: string;
  text: string;
  data: Blob;
  fileName: string;
};

export const handleUpdateFiles = async ({
  id,
  openai_id,
  userId,
  data,
  text,
  fileName,
}: Props) => {
  // Delete file from openai
  await openaiServices.deleteFile(openai_id);

  const file = new FormData();
  file.append("purpose", "assistants");
  file.append("file", data, fileName);

  // Upload new file to openai
  const response = await openaiServices.uploadFile(file);

  if (response.data.error) {
    toast({
      title: response.data.error.code || "Error",
      description: response.data.error.message,
      variant: "destructive",
    });

    return { error: response.data.error };
  }

  const { error } = await dbService.updateOpenaiIdAndFileName({
    id,
    openai_id: response.data.id,
    userId,
    fileName,
  });

  if (error) {
    await openaiServices.deleteFile(response.data.id);
    return { error };
  }

  const { error: error2 } = await dbService.updateTextContentByFileId({
    fileId: id,
    content: text,
    userId,
  });

  if (error2) {
    toast({
      title: error2.code || "Error",
      description: error2.message,
      variant: "destructive",
    });

    return { error: error2 };
  }

  toast({
    title: "Success",
    description: "File updated successfully",
  });

  return { error: null };
};
