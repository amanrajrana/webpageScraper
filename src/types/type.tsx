export type APIResponseType = {
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
