import CONF from "@/conf/conf";
import { Data, FileData, SaveResponseToDB } from "@/types/type";
import { createClient } from "@supabase/supabase-js";

export class FileService {
  supabase;

  constructor() {
    this.supabase = createClient(CONF.supabase.url, CONF.supabase.anonKey);
  }

  async uploadFile(data: FileData) {
    const response = await this.supabase
      .from("useruploadedfiles")
      .insert([
        {
          filedata: data.fileData,
          filetype: data.fileType,
          filename: data.fileName,
          user_id: data.userId,
        },
      ])
      .select("id");

    if (response.error) throw new Error(response.error.message);

    return response.data[0].id as number;
  }

  async saveResponseToDB(data: SaveResponseToDB) {
    const { error } = await this.supabase.from("openaifilesinfo").insert([
      {
        id: data.id,
        object: data.object,
        purpose: data.purpose,
        filename: data.filename,
        bytes: data.bytes,
        created_at: data.created_at,
        status: data.status,
        status_details: data.status_details,
        user_id: data.user_id,
        file_id: data.file_id,
      },
    ]);

    return error;
  }

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
      .from("useruploadedfiles")
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

  async getFileDetailsById({
    fileId,
    userId,
  }: {
    fileId: number;
    userId: string;
  }) {
    const { data, error }: { data: any; error: any } = await this.supabase
      .from("openaifilesinfo")
      .select(
        "db_id, id, purpose, filename, bytes, status, file_id, useruploadedfiles(filetype, created_at)"
      )
      .eq("file_id", fileId)
      .filter("user_id", "eq", userId);

    if (error) return { error, data: null };

    if (data.length < 1) {
      return { error: null, data: null };
    }

    return {
      data: {
        bytes: data[0].bytes,
        created_at: data[0].useruploadedfiles.created_at,
        db_id: data[0].db_id,
        file_id: data[0].file_id,
        filename: data[0].filename,
        filetype: data[0].useruploadedfiles.filetype,
        id: data[0].id,
        purpose: data[0].purpose,
        status: data[0].status,
      },
      error: null,
    };
  }
}

const fileService = new FileService();
export default fileService;
