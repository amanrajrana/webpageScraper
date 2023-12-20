import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { APIResponseType } from "@/types/type";

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ url: "Domain is required" }, { status: 400 });
  }

  if (!(url.includes("http://") || url.includes("https://"))) {
    return NextResponse.json(
      { error: "Domain can only start with http:// or https://" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $("style").remove();
    $("script").remove();
    $("[style]").removeAttr("style");

    return NextResponse.json(
      [
        {
          title: $("title").text(),
          url,
          contentLength: $("body").text().replace(/\s+/g, " ").trim().length,
          content: $("body").text().replace(/\s+/g, " ").trim(),
        },
      ] as APIResponseType[],
      { status: 200 }
    );
  } catch (error: AxiosError | Error | any) {
    return NextResponse.json({ error: error.toString() }, { status: 400 });
  }
};
