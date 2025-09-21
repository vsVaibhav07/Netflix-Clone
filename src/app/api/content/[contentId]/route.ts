import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ contentId: string }> }
) {
  try {
    const { contentId } = await context.params;
    const content = await prisma.content.findFirst({
      where: {
        id: contentId,
      },
      include: { episodes: true },
     
    });
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching Content:", error);
    return NextResponse.json(
      { error: "Failed to fetch Content" },
      { status: 500 }
    );
  }
}
