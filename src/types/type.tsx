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
  db_id: number;
  file_id: number;
  filename: string;
  id: string;
  purpose: string;
  status: string;
  created_at: string;
  filetype: string;
};
