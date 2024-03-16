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

export const handleSaveFileDataToDB = async (data: Props) => {
  toast({
    description: "Saving file to database.",
  });

  const response = await supabase.from("useruploadedfiles").insert([
    {
      filedata: data.fileData,
      filetype: data.fileType,
      filename: data.fileName,
      user_id: data.userId,
    },
  ]);

  if (response.error) {
    throw new Error(response.error.message || "Error saving file to database.");
  }

  console.log("Response saved to database successfully.", response.data);

  toast({
    description: "Response saved to database successfully.",
  });
};
