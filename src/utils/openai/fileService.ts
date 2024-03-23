import { toast } from "@/components/ui/use-toast";
import CONF from "@/conf/conf";
import { OpenaiDeleteFileResponse } from "@/types/type";
import axios, { AxiosError } from "axios";
import dbService from "@/utils/supabase/dbServices";

export class FileService {
  apiURL;
  apiKey;

  constructor() {
    this.apiURL = CONF.openai.ApiUrl + "/files";
    this.apiKey = CONF.openai.ApiKey;
  }

  //* Upload file to OpenAI
  async uploadFile(data: UploadFileProps) {
    const file = new FormData();
    file.append("purpose", "assistants");
    file.append("file", data.data, data.fileName);

    const axiosParams = {
      method: "POST",
      url: this.apiURL,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${this.apiKey}`,
      },
      data: file,
    };

    const response = await axios(axiosParams);

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
      toast({
        title: error.code || "Error",
        description: error.message,
        variant: "destructive",
      });

      this.deleteFile(response.data.id);
      return { error, data: null };
    }

    return { data: { id }, error: null };
  }

  //* Delete file from OpenAI
  async deleteFile(fileId: string): Promise<OpenaiDeleteFileResponse> {
    const axiosParams = {
      method: "DELETE",
      url: this.apiURL + `/${fileId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    };

    const response = await axios(axiosParams);

    if (response.data.error) {
      return { error: response.data.error.message, data: null };
    }

    return { data: response.data, error: null };
  }
}

export const fileService = new FileService();

type UploadFileProps = {
  data: Blob;
  fileName: string;
  userId: string;
  editable: boolean;
  fileType: string;
  source: string;
};
