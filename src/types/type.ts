export type WebScrapeDataType = {
  title: string;
  url: string;
  contentLength: number;
  content: string;
};

export type openaiResponseType = {
  object: string;
  id: string;
  purpose: string;
  filename: string;
  bytes: number;
  created_at: number;
  status: string;
  status_details: string | null;
};

export type SaveUploadedFileMetadata = openaiResponseType & {
  userId: string;
  editable: boolean;
  fileType: string;
  source: string;
};

export type SaveTextContentToDB = {
  content: string;
  userId: string;
  fileId: number;
};

export type QnAType = {
  id: number;
  question: string;
  answer: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
};

export type Data = {
  id: number;
  fileName: string;
  type: string;
  time: string;
};

export type UserCredential = {
  email: string;
  password: string;
  redirectTo?: string;
};

export type FileMetaData = {
  bytes: number;
  created_at: string;
  id: number;
  filename: string;
  filetype: string;
  source: "qnabox" | "textbox" | "url" | "local";
  editable: boolean;
  openai_id: string;
  purpose: string;
  status: string;
};

export type FileData = {
  fileData: string;
  fileType: string;
  fileName: string;
  userId: string;
};

export type SaveResponseToDB = openaiResponseType & {
  user_id: string;
  file_id: number;
};

export type OpenaiDeleteFileResponse =
  | {
      data: { id: string; object: string; deleted: Boolean };
      error: null;
    }
  | {
      data: null;
      error: string;
    };
