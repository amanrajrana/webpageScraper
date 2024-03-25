import { PostgrestError } from "@supabase/supabase-js";
import { openaiServices } from "../openai/openaiServices";
import dbService from "../supabase/dbServices";

const handleDeleteFile = async (info: {
  id: number;
  openai_id: string;
  userId: string;
}): Promise<{ error: PostgrestError | null }> => {
  try {
    await openaiServices.deleteFile(info.openai_id);

    const { error } = await dbService.deleteFileById({
      id: info.id,
      userId: info.userId,
    });

    console.log("error: ", error);

    if (error) return { error };
  } catch (error) {
    return { error: error as PostgrestError };
  }

  return { error: null };
};

export default handleDeleteFile;
