import { toast } from "@/components/ui/use-toast";
import dbService from "../supabase/dbServices";
import { User } from "@/types/type";

type Props = {
  user: User;
  fileId: number;
  source: "qnabox" | "textbox";
};

export const fetchedData = async ({ user, fileId, source }: Props) => {
  if (!user) {
    toast({
      title: "Error",
      description: "User not found",
      variant: "destructive",
    });

    return;
  }

  const { data, error } = await dbService.getTextContentByFileId({
    fileId,
    userId: user.id,
    source,
  });

  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });

    return;
  }

  if (data) {
    if (source === "qnabox") {
      const qAndA = JSON.parse(data.data);
      data.data = qAndA;
    }

    return data;
  }
};
