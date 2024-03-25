import CONF from "@/conf/conf";
import {
  Data,
  FileMetaData,
  SaveTextContentToDB,
  SaveUploadedFileMetadata,
} from "@/types/type";
import { createClient } from "@supabase/supabase-js";

export class DbServices {
  supabase;

  constructor() {
    this.supabase = createClient(CONF.supabase.url, CONF.supabase.anonKey);
  }

  //* Save uploaded file metadata to DB
  async saveUploadedFileMetadata(data: SaveUploadedFileMetadata) {
    const res = await this.supabase
      .from("openai_datavault")
      .insert([
        {
          object: data.object,
          openai_id: data.id,
          purpose: data.purpose,
          filename: data.filename,
          filetype: data.fileType,
          size: data.bytes,
          editable: data.editable,
          source: data.source,
          status: data.status,
          status_details: data.status_details,
          user_id: data.userId,
        },
      ])
      .select("id");

    if (res.error) return { id: null, error: res.error };

    return { id: res.data[0].id as number, error: null };
  }

  //* Save text content to DB
  async saveTextContentToDB(data: SaveTextContentToDB) {
    return await this.supabase.from("text_files").insert([
      {
        content: data.content,
        user_id: data.userId,
        file_id: data.fileId,
      },
    ]);
  }

  //* Get files by user ID
  async getFilesByUserId({
    userId,
    orderBy,
    ascending,
  }: {
    userId: string;
    orderBy: string;
    ascending: boolean;
  }) {
    const { data, error } = await this.supabase
      .from("openai_datavault")
      .select("id, filetype, filename, created_at")
      .eq("user_id", `${userId}`)
      .order(`${orderBy}`, { ascending });

    if (error) return { data: null, error };

    const formattedData: Data[] = data.map((file: Record<string, any>) => {
      return {
        id: file.id,
        fileName: file.filename,
        type: file.filetype,
        time: new Date(file.created_at).toLocaleString(),
      };
    });

    return { data: formattedData, error: null };
  }

  //* Get file details by ID
  async getFileDetailsById(info: { fileId: number; userId: string }) {
    const { data, error }: { data: any; error: any } = await this.supabase
      .from("openai_datavault")
      .select(
        "id, openai_id, purpose, filename, size, status, filetype, created_at, editable, source)"
      )
      .eq("id", info.fileId)
      .eq("user_id", info.userId);

    if (error) return { error, data: null };

    if (data.length < 1) {
      return { error: null, data: null };
    }

    return {
      data: {
        bytes: data[0].size,
        created_at: data[0].created_at,
        id: data[0].id,
        filename: data[0].filename,
        filetype: data[0].filetype,
        source: data[0].source,
        editable: data[0].editable,
        openai_id: data[0].openai_id,
        purpose: data[0].purpose,
        status: data[0].status,
      },
      error: null,
    } as { data: FileMetaData; error: null };
  }

  //* Delete File by id
  async deleteFileById(info: { id: number; userId: string }) {
    return await this.supabase
      .from("openai_datavault")
      .delete()
      .eq("id", info.id)
      .eq("user_id", info.userId);
  }

  //* Get text content by file ID
  async getTextContentByFileId(info: {
    fileId: number;
    userId: string;
    source: "qnabox" | "textbox";
  }) {
    const { data, error } = await this.supabase
      .from("openai_datavault")
      .select("id, filename, openai_id, text_files (content)")
      .eq("id", info.fileId)
      .eq("user_id", info.userId)
      .eq("source", info.source);

    if (error) return { data: null, error };

    console.log("data: ", data[0]);

    if (data.length < 1) {
      return { data: null, error: { message: "No data found" } };
    }

    return {
      data: {
        data: data[0].text_files[0].content,
        openaiId: data[0].openai_id,
        filename: data[0].filename,
      },
      error: null,
    };
  }

  //* Update text content by file ID
  async updateTextContentByFileId(info: {
    content: string;
    fileId: number;
    userId: string;
  }) {
    return await this.supabase
      .from("text_files")
      .update({ content: info.content, updated_at: new Date().toISOString() })
      .eq("file_id", info.fileId)
      .eq("user_id", info.userId);
  }

  //* Update'openai_id' filed in  openai_vault
  async updateOpenaiIdAndFileName(info: {
    id: number;
    fileName: string;
    openai_id: string;
    userId: string;
  }) {
    return await this.supabase
      .from("openai_datavault")
      .update({ openai_id: info.openai_id, filename: info.fileName })
      .eq("id", info.id)
      .eq("user_id", info.userId);
  }
}

const dbService = new DbServices();
export default dbService;
