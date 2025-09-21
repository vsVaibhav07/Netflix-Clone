import { prisma } from "@/lib/prisma";

export const fetchContentByCategory = async (category: string) => {
  const content = await prisma.content.findMany({
    where: {
      category: {
        contains: category,
        mode: "insensitive",
      },
    },
  });
  return content;
};

export const fetchContentByGenres = async (genre: string) => {
  // Ensure the genre name is formatted correctly for a case-sensitive 'has'
  const formattedGenre = genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
  const content = await prisma.content.findMany({
    where: {
      genres: {
        has: formattedGenre,
      },
    },
    include: { episodes: true },
    orderBy: { createdAt: "desc" },
  });
  return content;
};

export const fetchContentByName = async (title: string) => {
  const content = await prisma.content.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
    include: { episodes: true },
    orderBy: { createdAt: "desc" },
  });
  return content;
};

export const fetchContentByUserId=async(userId:string)=>{

  const content=await prisma.content.findMany({
    where:{
      uploaderId:userId
    },
    include: { episodes: true },
    orderBy: { createdAt: "desc" },
  })
  return content
}