import { toast } from "@/components/ui/use-toast";
import CONF from "@/conf/conf";
import { OpenaiDeleteFileResponse } from "@/types/type";
import axios, { AxiosError } from "axios";
import dbService from "@/utils/supabase/dbServices";

export class OpenaiServices {
  apiURL;
  apiKey;

  constructor() {
    this.apiURL = CONF.openai.ApiUrl + "/files";
    this.apiKey = CONF.openai.ApiKey;
  }

  //* Upload file to OpenAI
  async uploadFile(file: FormData) {
    const axiosParams = {
      method: "POST",
      url: this.apiURL,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${this.apiKey}`,
      },
      data: file,
    };

    return await axios(axiosParams);
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

export const openaiServices = new OpenaiServices();
