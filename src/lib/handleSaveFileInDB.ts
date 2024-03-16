import { createClient } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";
const supabase = createClient();

// Save fileData to Supabase DB
type Props = {
  fileData: string;
  fileType: string;
  fileName: string;
  userId: string;
};

/**
 * The function `handleSaveFileDataToDB` saves file data (give by user) to a database using Supabase and displays
 * success messages using toast notifications.
 * @param {Props} data - The `data` parameter in the `handleSaveFileDataToDB`
 */

export const handleSaveFileDataToDB = async (data: Props) => {
  toast({
    description: "Saving file to database.",
  });

  const response = await supabase
    .from("useruploadedfiles")
    .insert([
      {
        filedata: data.fileData,
        filetype: data.fileType,
        filename: data.fileName,
        user_id: data.userId,
      },
    ])
    .select("id");

  if (response.error) {
    throw new Error(response.error.message || "Error saving file to database.");
  }

  toast({
    description: "Response saved to database successfully.",
  });

  // Return id
  return response.data[0].id as number;
};
