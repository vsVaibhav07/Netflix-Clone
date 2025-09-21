import {
  fetchContentByCategory,
  fetchContentByGenres,
  fetchContentByName,
} from "@/app/api/Movies";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("resultFor");
    if (!q || q.trim() === '') {
      return NextResponse.json(
        { error: "No query provided" },
        { status: 400 }
      );
    }
    const [inTitle, inCategory, inGenres] = await Promise.all([
      fetchContentByName(q),
      fetchContentByCategory(q),
      fetchContentByGenres(q),
    ]);
    return NextResponse.json({
      inTitle,
      inCategory,
      inGenres,
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}