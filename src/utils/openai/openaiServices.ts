import CONF from "@/conf/conf";
import axios from "axios";

export class OpenaiServices {
  apiURL;
  apiKey;

  constructor() {
    this.apiURL = CONF.openai.ApiUrl + "/files";
    this.apiKey = CONF.openai.ApiKey;
  }

  //* Upload file to OpenAI
  async uploadFile(file: FormData) {
    try {
    } catch (error) {}
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
  async deleteFile(fileId: string) {
    const axiosParams = {
      method: "DELETE",
      url: this.apiURL + `/${fileId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    };

    return await axios(axiosParams);
  }
}

export const openaiServices = new OpenaiServices();
