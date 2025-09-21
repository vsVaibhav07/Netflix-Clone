import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function GET(
  _req: Request,
   context: { params: Promise<{ seriesId: string }> }
) {
  try {
    const { seriesId } = await context.params;
    const episodes =await prisma.episode.findMany({
      where: {
        contentId:seriesId,
      },
      orderBy: { episodeNumber: "asc" },
    });
     return NextResponse.json(episodes);
  } catch (error) {
     console.error("Error fetching episodes:", error);
    return NextResponse.json(
      { error: "Failed to fetch episodes" },
      { status: 500 }
    );
  }
}


export async function POST(req:Request,context: { params: Promise<{ seriesId: string }> }) {
  try {
    const { seriesId } = await context.params;
    const body = await req.formData();

    const newEpisode = await prisma.episode.create({
      data: {
        title: body.get("title") as string,
        description: body.get("description") as string,
        seasonNumber: Number(body.get("seasonNumber")),
        episodeNumber: Number(body.get("episodeNumber")),
        contentId: seriesId,
        thumbnailurl: body.get("thumbnailurl") as string,
        videoUrl: body.get("videoUrl") as string,
      },
    });

    revalidatePath(`/series/${seriesId}`);
    redirect(`/series/${seriesId}`);
    return NextResponse.json(newEpisode, { status: 201 });
  } catch (error) {
    console.error("Error creating episode:", error);
    return NextResponse.json(
      { error: "Failed to create episode" },
      { status: 500 }
    );
  }
}
