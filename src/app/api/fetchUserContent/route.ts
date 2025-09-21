import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  try {
     const userId = request.url.split("userId=")[1]; 
  if (!userId) return NextResponse.json([], { status: 400 });

  const content = await prisma.content.findMany({
    where: { uploaderId: userId },
    include: { episodes: true }, 
    orderBy: { createdAt: "desc" },
   
  });
  const response = {
    movies: content.filter(c => c.category === "Movie"),
    webSeries: content.filter(c => c.category === "Web-Series"),
    tvSerials: content.filter(c => c.category === "TV-Serial"),
  };

  return NextResponse.json(response);
    
  } catch (error) {
     return NextResponse.json(error);
    
  }
 
}
